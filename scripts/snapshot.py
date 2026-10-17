#!/usr/bin/env python3
"""Explicit, bounded metadata intake. Requires KP_API_KEY only during intake.

Responses are cached outside the repository. Re-running resumes the snapshot;
no endpoint is retried automatically and no credentials enter generated files.
"""
import argparse
import concurrent.futures
import datetime
import hashlib
import html
import json
import os
from pathlib import Path
import re
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://kinopoiskapiunofficial.tech'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--cache', type=Path, default=Path('/tmp/cinema-react-intake'))
    args = parser.parse_args()
    key = os.environ['KP_API_KEY']
    args.cache.mkdir(parents=True, exist_ok=True)

    def api(path):
        dest = args.cache / (hashlib.sha256(path.encode()).hexdigest() + '.json')
        if dest.exists():
            return json.loads(dest.read_text())
        req = urllib.request.Request(BASE + path, headers={'X-API-KEY': key, 'Accept': 'application/json'})
        with urllib.request.urlopen(req, timeout=25) as response:
            data = json.load(response)
        dest.write_text(json.dumps(data, ensure_ascii=False))
        return data

    filters = api('/api/v2.1/films/filters')['genres']
    first = api('/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1')
    top = first['films'][:]
    for page in range(2, min(first['pagesCount'], 13) + 1):
        top += api(f'/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page={page}')['films']
    ids = list(dict.fromkeys(int(f['filmId']) for f in top))[:250]
    favorites = list(dict.fromkeys(int(i) for i in re.findall(r'href="/film/(\d+)/"', (ROOT/'src/parser/page.js').read_text())))
    all_ids = list(dict.fromkeys(ids + favorites))
    assert 200 <= len(ids) <= 250 and len(all_ids) < 400

    def plain(value):
        return html.unescape(re.sub('<[^>]+>', '', value or '')).strip()

    posters = ROOT/'public/posters'
    posters.mkdir(parents=True, exist_ok=True)

    def movie(movie_id):
        raw = api(f'/api/v2.1/films/{movie_id}?append_to_response=RATING')
        film, rating = raw['data'], raw.get('rating', {})
        existing = list(posters.glob(f'{movie_id}.*'))
        dest = existing[0] if existing else None
        if not dest:
            with urllib.request.urlopen(film['posterUrlPreview'], timeout=30) as response:
                image = response.read(3_000_001)
            extension = 'jpg' if image.startswith(b'\xff\xd8') else 'png' if image.startswith(b'\x89PNG') else 'webp' if image.startswith(b'RIFF') and image[8:12] == b'WEBP' else None
            assert 1000 < len(image) <= 3_000_000 and extension, movie_id
            dest = posters/f'{movie_id}.{extension}'
            dest.write_bytes(image)
        description = plain(film.get('description'))
        assert description and (film.get('nameRu') or film.get('nameEn')), movie_id
        return {'id': movie_id, 'nameRu': film.get('nameRu') or film['nameEn'],
                'nameEn': film.get('nameEn') or '', 'year': film['year'],
                'poster': f'/posters/{dest.name}', 'posterSource': film['posterUrlPreview'],
                'description': description, 'slogan': plain(film.get('slogan')),
                'countries': [c['country'] for c in film['countries']],
                'genres': [g['genre'] for g in film['genres']],
                'facts': [plain(f) for f in film.get('facts', [])],
                'ratings': {'kinopoisk': rating.get('rating'), 'imdb': rating.get('ratingImdb'),
                            'critics': rating.get('ratingFilmCritics') if rating.get('ratingFilmCriticsVoteCount') else None}}

    # Three connections, one request per missing resource; failure stops export.
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        movies = list(pool.map(movie, all_ids))
    country_source = (ROOT/'src/scripts/countries.js').read_text()
    countries = json.loads(country_source[country_source.index('['):country_source.rindex(']') + 1])
    flags = {}
    flag_dir = ROOT/'public/flags'
    flag_dir.mkdir(parents=True, exist_ok=True)
    aliases = {'США': 'us', 'СССР': 'ru', 'Корея Южная': 'kr', 'Германия (ФРГ)': 'de', 'Германия (ГДР)': 'de'}
    for country in sorted({c for movie in movies for c in movie['countries']}):
        code = aliases.get(country)
        if not code:
            match = next((c for c in countries if country in c['translations']['rus'].values()), None)
            code = match['cca2'].lower() if match else None
        if code:
            dest = flag_dir/f'{code}.svg'
            if not dest.exists():
                with urllib.request.urlopen(f'https://raw.githubusercontent.com/lipis/flag-icons/v7.5.0/flags/4x3/{code}.svg', timeout=20) as response:
                    dest.write_bytes(response.read())
            flags[country] = f'/flags/{code}.svg'
    catalog = {'schema': 1, 'savedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'flags': flags,
               'source': BASE, 'originalRevision': '7bcc2e2c2c3b312c94b5991b1cc9e4b1a2b38d42',
               'genres': sorted([g for g in filters if g['genre']], key=lambda g: g['genre']),
               'top': ids, 'favorites': favorites, 'films': movies}
    output = ROOT/'public/data/catalog.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'films': len(movies), 'top': len(ids), 'favorites': len(favorites), 'posters': len(movies)}))


if __name__ == '__main__':
    main()
