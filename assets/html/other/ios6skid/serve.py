"""CORS-enabled static server for the ios6skid copy.

The iOS simulator runs installed HTML apps in a sandboxed iframe
(opaque origin). Plain servers work for scripts/styles/images, but the
game's JSON + audio load via fetch/XHR, which the browser blocks without
CORS headers. This server adds `Access-Control-Allow-Origin: *`.

Run from this folder:  python serve.py 8000
Then open:             http://localhost:8000/index.html
"""
import functools
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.webp': 'image/webp',
        '.mp3': 'audio/mpeg',
        '.ttf': 'font/ttf',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
    }

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    with ThreadingHTTPServer(('127.0.0.1', port), Handler) as httpd:
        print('serving on http://127.0.0.1:%d (CORS on)' % port)
        httpd.serve_forever()
