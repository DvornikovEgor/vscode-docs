#!/usr/bin/env python3
"""
Собирает data/cases.js из открытого датасета ByMykel/CSGO-API.

Использование:
    gh api repos/ByMykel/CSGO-API/contents/public/api/en/crates.json -H "Accept: application/vnd.github.raw" > /tmp/crates.json
    gh api repos/ByMykel/CSGO-API/contents/public/api/en/skins.json  -H "Accept: application/vnd.github.raw" > /tmp/skins.json
    python3 scripts/build-data.py /tmp/crates.json /tmp/skins.json
"""
import json
import os
import sys

IMG_PREFIX = "https://community.akamai.steamstatic.com/economy/image/"

RARITY = {
    "Mil-Spec Grade": "milspec",
    "Restricted": "restricted",
    "Classified": "classified",
    "Covert": "covert",
    "Extraordinary": "covert",
}

# Примерные цены кейсов в USD (рыночная цена меняется, это лишь ориентир).
CASE_PRICES = {
    "CS:GO Weapon Case": 95.0, "eSports 2013 Case": 55.0, "Operation Bravo Case": 45.0,
    "CS:GO Weapon Case 2": 12.0, "eSports 2013 Winter Case": 13.0,
    "Winter Offensive Weapon Case": 7.5, "CS:GO Weapon Case 3": 8.0,
    "Operation Phoenix Weapon Case": 4.2, "Huntsman Weapon Case": 5.5,
    "Operation Breakout Weapon Case": 4.5, "eSports 2014 Summer Case": 7.0,
    "Operation Vanguard Weapon Case": 3.2, "Chroma Case": 3.6, "Chroma 2 Case": 3.1,
    "Falchion Case": 1.6, "Shadow Case": 1.3, "Revolver Case": 1.6,
    "Operation Wildfire Case": 1.7, "Chroma 3 Case": 2.6, "Gamma Case": 2.6,
    "Gamma 2 Case": 2.4, "Glove Case": 5.2, "Spectrum Case": 2.7,
    "Operation Hydra Case": 16.0, "Spectrum 2 Case": 2.1, "Clutch Case": 0.65,
    "Horizon Case": 1.1, "Danger Zone Case": 1.0, "Prisma Case": 0.85,
    "Shattered Web Case": 5.0, "CS20 Case": 0.85, "Prisma 2 Case": 0.85,
    "Fracture Case": 0.5, "Operation Broken Fang Case": 4.0, "Snakebite Case": 0.35,
    "Operation Riptide Case": 7.0, "Dreams & Nightmares Case": 1.6, "Recoil Case": 0.3,
    "Revolution Case": 0.6, "Kilowatt Case": 0.55, "Gallery Case": 0.95, "Fever Case": 1.3,
}


def short_img(url):
    if not url:
        return ""
    return url[len(IMG_PREFIX):] if url.startswith(IMG_PREFIX) else url


def main(crates_path, skins_path, out_path):
    crates = json.load(open(crates_path, encoding="utf-8"))
    skins = {s["id"]: s for s in json.load(open(skins_path, encoding="utf-8"))}

    out = []
    for c in crates:
        if c.get("type") != "Case":
            continue

        def item(it, rare=False):
            s = skins.get(it["id"], {})
            name = it["name"]
            weapon, _, finish = name.partition(" | ")
            cat = (s.get("category") or {}).get("name", "")
            d = {
                "w": weapon.replace("★ ", ""),
                "f": finish,
                "r": "rare" if rare else RARITY.get(it["rarity"]["name"], "milspec"),
                "i": short_img(it.get("image") or s.get("image")),
            }
            mn, mx = s.get("min_float"), s.get("max_float")
            if mn is None or mx is None:
                d["nf"] = 1  # без износа (ванильный нож)
            else:
                d["mn"], d["mx"] = mn, mx
            if not s.get("stattrak", True):
                d["nst"] = 1
            if cat == "Gloves":
                d["g"] = 1
            elif cat == "Knives":
                d["k"] = 1
            if it.get("phase"):
                d["ph"] = it["phase"]
            return d

        items = [item(it) for it in c.get("contains", [])]
        rare = [item(it, True) for it in c.get("contains_rare", [])]
        date = (c.get("first_sale_date") or "").replace("/", "-")
        parts = date.split("-")
        if len(parts) == 3:
            date = "%s-%02d-%02d" % (parts[0], int(parts[1]), int(parts[2]))
        out.append({
            "id": c["id"],
            "name": c["name"],
            "img": short_img(c.get("image")),
            "date": date,
            "price": CASE_PRICES.get(c["name"], 1.0),
            "rareName": (c.get("loot_list") or {}).get("name", "★ Rare Special Item ★"),
            "items": items,
            "rare": rare,
        })

    out.sort(key=lambda x: x["date"], reverse=True)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("// Сгенерировано scripts/build-data.py из ByMykel/CSGO-API. Не редактировать вручную.\n")
        f.write("window.IMG_PREFIX = %s;\n" % json.dumps(IMG_PREFIX))
        f.write("window.CASES = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("cases:", len(out), "->", out_path, os.path.getsize(out_path) // 1024, "KB")


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    crates = sys.argv[1] if len(sys.argv) > 1 else "/tmp/crates.json"
    skins = sys.argv[2] if len(sys.argv) > 2 else "/tmp/skins.json"
    main(crates, skins, os.path.join(here, "..", "data", "cases.js"))
