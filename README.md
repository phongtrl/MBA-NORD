# Strategi og Ledelse – Økonomilab
Norsk kunnskapsbase for mikro- og makroøkonomi, laget som selvstendig øvingsverktøy i forbindelse med masterstudier ved Nord universitet. Innholdet er ikke kontrollert mot en bestemt emneplan og er ikke offisielt materiale fra universitetet.

## Start
Fra prosjektmappen:

```sh
python3 -m http.server 8000 --directory dist
```

Åpne http://localhost:8000. Bruk HTTP-server: direkte åpning av index.html kan blokkere lasting av JSON.

## Filer
- `dist/index.html`: tilgjengelig, responsiv applikasjonsstruktur
- `dist/style.css`: design og mobiltilpasning (systemfont som reserve hvis Google Fonts er utilgjengelig)
- `dist/app.js`: navigasjon, søk, fagfilter, quiz, flashkort og interaktiv modell
- `dist/data.json`: 12 fagtemaer og 12 spørsmål med fasit og forklaringer

Ingen byggeverktøy eller tredjeparts JavaScript-avhengigheter. Publiser innholdet i `dist` på en statisk vert. Fremdrift lagres i localStorage per nettleser; sletting av nettleserdata fjerner den. Ingen synkronisering eller innlogging.

Oppdater `topics` og `questions` i JSON for å utvide fagstoffet. Hvert spørsmål refererer til et tema via `topic`. Antallet 12 er brukt i visningen og må oppdateres ved endring av antall temaer/spørsmål.

## Faglig bruk
Eksemplene forenkler virkeligheten. Vurder alltid modellforutsetninger. Bruk sammen med emneplan, pensumbøker og forelesninger. Temaene dekker tilbud/etterspørsel, elastisitet, kostnader, markedsformer, spillteori, eksternaliteter, BNP, inflasjon, pengepolitikk, finanspolitikk, arbeidsledighet og valutakurs.
