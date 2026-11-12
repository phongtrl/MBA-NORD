# MBA NORD – Strategi og Ledelse

Norsk kunnskapsbase for mikro- og makroøkonomi. Selvstendig øvingsverktøy, ikke offisielt materiale eller kontrollert pensum fra Nord universitet.

## Åpne på PC
1. Last ned repositoryet med **Code → Download ZIP**.
2. Pakk ut hele ZIP-filen.
3. Dobbeltklikk **index.html** i hovedmappen. Appen åpnes i nettleseren uten installasjon eller lokal server.

Alle temaer, quiz, flashkort og økonomilab fungerer også ved direkte filåpning. Nettleseren kan begrense lagring ved filåpning; bruk samme nettleser og filplassering for fremdrift. Ingen innlogging eller synkronisering. Nettskriftene krever nett, med lokale reservefonter.

## Filer
- `index.html`: startside og innebygd kopi av fagstoffet for filåpning
- `style.css`: design og mobiltilpasning
- `app.js`: navigasjon, søk, quiz, flashkort og økonomimodell
- `data.json`: 12 fagtemaer og 12 spørsmål med fasit

På en webserver lastes data.json; ved direkte filåpning brukes den innebygde kopien i HTML. Ved endring av data.json må også JSON-blokken med id="study-data" i index.html oppdateres. Visningen har faste antall på 12; tilpass disse hvis antallet temaer eller spørsmål endres.

## Lokal server (valgfritt)
```sh
python3 -m http.server 8000
```
Åpne http://localhost:8000.

## GitHub Pages
For publisering via GitHub Pages, velg **Settings → Pages → Deploy from a branch → main → / (root)** og lagre. Filene ligger klare i hovedmappen. Aktivering av Pages er en separat innstilling i GitHub.
