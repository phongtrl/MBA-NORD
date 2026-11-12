# MBA NORD – Strategi og Ledelse

Norsk kunnskapsbase for mikro- og makroøkonomi. Selvstendig øvingsverktøy, ikke offisielt materiale eller kontrollert pensum fra Nord universitet.

## Åpne via GitHub Pages

Appen er klargjort for GitHub Pages. Ingen lokal HTTP-/HTTPS-server, Python eller installasjon er nødvendig.

Aktiver publisering én gang:
1. Åpne https://github.com/phongtrl/MBA-NORD/settings/pages.
2. Under **Build and deployment**, velg **Source: Deploy from a branch**.
3. Velg **main** og **/ (root)**, og trykk **Save**.
4. Vent til GitHub viser at publiseringen er ferdig, og velg **Visit site**.

Standardadressen etter vellykket publisering er https://phongtrl.github.io/MBA-NORD/.
At filene er pushet til repositoryet betyr ikke i seg selv at Pages er aktivert. Nye endringer på main publiseres automatisk etter at oppsettet er aktivert.

## Innhold

12 fagtemaer med formler, regneeksempler og koblinger til strategi og ledelse, samt søk, fagfilter, quiz med forklaringer, flashkort og interaktiv tilbuds- og etterspørselsmodell.

Fremdrift lagres i nettleseren. Ingen innlogging eller synkronisering; sletting av nettleserdata fjerner fremdriften. Bruk sammen med emneplan, pensumbøker og forelesninger. Modellene forenkler virkeligheten.

## Filer

- `index.html`: startside i hovedmappen
- `style.css`: design og mobiltilpasning
- `app.js`: appfunksjoner
- `data.json`: fagstoff og spørsmål
- `dist/index.html`: videresending for gamle lenker til dist-mappen

Alle stier er relative og fungerer under /MBA-NORD/ på GitHub Pages. Fagstoffet lastes fra data.json, med innebygd reservekopi i index.html. Ved endringer i fagstoffet, oppdater også JSON-blokken med id="study-data" i HTML. Antallet 12 er brukt i visningen og må oppdateres hvis antallet temaer/spørsmål endres.

## Alternativ: lokal filåpning

Last ned ZIP, pakk ut hele mappen og dobbeltklikk index.html. Ingen lokal server kreves. Nettleseren kan begrense lokal lagring ved filåpning. Nettskriftene krever nett, med lokale reservefonter.
