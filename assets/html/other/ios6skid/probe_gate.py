import urllib.request
for f in ['3wie-r5ed7bq1.js', '1wta0gpcy3nsy.js']:
    url = 'http://127.0.0.1:8904/_next/static/immutable/chunks/' + f
    src = urllib.request.urlopen(url, timeout=30).read().decode('utf-8', errors='replace')
    needle = 'startsWith(' + chr(34) + 'http' + chr(34) + ')'
    print(f, 'has-http-gate:', needle in src)
