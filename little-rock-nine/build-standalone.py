#!/usr/bin/env python3
"""Fabrique une version autonome de la présentation.

Les images de `images/` sont intégrées directement dans le HTML sous forme de
données encodées (data: URI). Le fichier produit fonctionne seul, sans le
dossier d'images : on peut l'envoyer par mail, le mettre sur une clé USB ou le
publier tel quel.

    python3 build-standalone.py            -> little-rock-nine-standalone.html
    python3 build-standalone.py --body-only -> fragment sans <head>/<body>
"""
import base64
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).parent
source = (HERE / "index.html").read_text(encoding="utf-8")


def inline(match):
    name = match.group(1)
    data = (HERE / "images" / name).read_bytes()
    return 'src="data:image/jpeg;base64,%s"' % base64.b64encode(data).decode("ascii")


html = re.sub(r'src="images/([^"]+)"', inline, source)

if "--body-only" in sys.argv:
    # Pour les hébergeurs qui fournissent eux-mêmes <!doctype>, <head> et <body>.
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    head = re.sub(r'<meta charset[^>]*>|<meta name="viewport"[^>]*>', "", head)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
    out = head.strip() + "\n" + body.strip() + "\n"
    target = HERE / "little-rock-nine-fragment.html"
else:
    out = html
    target = HERE / "little-rock-nine-standalone.html"

target.write_text(out, encoding="utf-8")
print("%s — %.1f Mo" % (target.name, target.stat().st_size / 1e6))
