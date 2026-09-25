# CS2 Case Simulator

Браузерный симулятор открытия кейсов Counter-Strike 2. Работает без сборки и без бэкенда.

## Возможности

- **42 настоящих кейса** (от CS:GO Weapon Case до Fever Case) с реальным составом и картинками из Steam CDN.
- **Официальные шансы Valve**: Армейское 79.92%, Запрещённое 15.98%, Засекреченное 3.2%, Тайное 0.64%, ★ нож/перчатки 0.26%.
- **Честная генерация float**, как в CS2: сначала выбирается «корзина» износа (FN 3%, MW 24%, FT 33%, WW 24%, BS 16%),
  потом значение переносится в диапазон конкретного скина. Также паттерн (0–1000), StatTrak™ (10%), фазы Doppler / Gamma Doppler.
- Анимированная рулетка со звуками (WebAudio), открытие **до 5 кейсов сразу**, режим быстрого открытия, пробел — открыть.
- Баланс, инвентарь (сортировка, фильтр, продажа), статистика (окупаемость, распределение редкостей, лучшие дропы).
- Прогресс сохраняется в `localStorage`.

> Цены предметов **примерные** (модель на основе редкости, оружия, износа и StatTrak) и откалиброваны так,
> что средняя окупаемость кейса — 45–70%, как в реальности. Это не рыночные цены.

## Запуск

```bash
cd cs2-case-simulator
python3 -m http.server 8080
# открыть http://localhost:8080
```

Можно и просто открыть `index.html` в браузере.

## Обновление данных

`data/cases.js` генерируется из открытого датасета [ByMykel/CSGO-API](https://github.com/ByMykel/CSGO-API):

```bash
gh api repos/ByMykel/CSGO-API/contents/public/api/en/crates.json -H "Accept: application/vnd.github.raw" > /tmp/crates.json
gh api repos/ByMykel/CSGO-API/contents/public/api/en/skins.json  -H "Accept: application/vnd.github.raw" > /tmp/skins.json
python3 scripts/build-data.py /tmp/crates.json /tmp/skins.json
```

Цены кейсов задаются в `CASE_PRICES` в `scripts/build-data.py`.

Фанатский проект, не связан с Valve.
