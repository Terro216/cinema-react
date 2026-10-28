# API credentials

Live metadata is optional. Supply your own provider key as `KP_API_KEY` in
an ignored local `.env`, or leave it empty to use the 265 saved films.
Copy `.env.example` to `.env` and restrict the file to its owner.

Only the runtime nginx proxy reads this variable. Never put an API credential
in Vite variables, browser code, build arguments, Git history, or committed
snapshots. Images can be built without a key.

Previously committed credentials were removed from repository history.
They must not be recovered or reused from old clones or commits. Removing
them from Git does not revoke them at the provider or erase previously
downloaded copies; replace or revoke exposed credentials with the provider.

Historical release receipts describe the configuration at the time of those
releases. Follow this document for credential handling in new installations.
The saved catalog and frontend need no credential or application-data backup.
