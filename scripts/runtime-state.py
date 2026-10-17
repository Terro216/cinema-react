#!/usr/bin/env python3
"""Bounded, privacy-safe release evidence from big-one; no service mutations."""
import argparse
import datetime
import hashlib
import json
from pathlib import Path
import socket
import subprocess

p = argparse.ArgumentParser()
p.add_argument('output', type=Path)
a = p.parse_args()
assert socket.gethostname().split('.')[0] == 'big-one'

def command(*args):
    return subprocess.check_output(args)

names = command('docker', 'ps', '--format', '{{.Names}}').decode().splitlines()
containers = json.loads(command('docker', 'inspect', *names))
result = {'observedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'containers': {}}
for c in containers:
    result['containers'][c['Name'].lstrip('/')] = {
        'id': c['Id'], 'image': c['Image'], 'startedAt': c['State']['StartedAt'],
        'restarts': c['RestartCount'], 'health': c['State'].get('Health', {}).get('Status'),
    }
    if c['Name'] == '/server-homepage':
        auth = sorted(e for e in c['Config']['Env'] if e.startswith(('OWNER_HTPASSWD_ENTRY=', 'ATLAS_')))
        result['portalAuthFingerprint'] = hashlib.sha256(json.dumps(auth).encode()).hexdigest()
config = json.loads(command('docker', 'exec', 'caddy', 'wget', '-qO-', 'http://127.0.0.1:2019/config/'))
result['caddyHosts'] = {}
def visit(node):
    if isinstance(node, dict):
        for match in node.get('match', []):
            for host in match.get('host', []):
                result['caddyHosts'][host] = hashlib.sha256(json.dumps(node, sort_keys=True).encode()).hexdigest()
        for value in node.values(): visit(value)
    elif isinstance(node, list):
        for value in node: visit(value)
visit(config)
a.output.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
a.output.write_text(json.dumps(result, indent=2) + '\n')
a.output.chmod(0o600)
print(json.dumps({'file': str(a.output), 'containers': len(containers), 'caddyHosts': len(result['caddyHosts'])}))
