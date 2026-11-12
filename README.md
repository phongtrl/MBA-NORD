# MBA NORD – Strategi og Ledelse

Norsk kunnskapsbase for mikro- og makroøkonomi. Selvstendig øvingsverktøy, ikke offisielt materiale eller kontrollert pensum fra Nord universitet.

## Åpne via GitHub Pages

Ingen lokal HTTP-/HTTPS-server, Python eller installasjon er nødvendig for å bruke appen.

Aktiver publisering én gang:
1. Åpne https://github.com/phongtrl/MBA-NORD/settings/pages.
2. Under **Build and deployment**, velg **Source: Deploy from a branch**.
3. Velg **main** og **/ (root)**, og trykk **Save**.
4. Vent til GitHub viser at publiseringen er ferdig, og velg **Visit site**.

Standardadressen etter vellykket publisering er https://phongtrl.github.io/MBA-NORD/.
Nye endringer på main publiseres automatisk når dette oppsettet er aktivert.

## Innhold

- **40 teoritemaer**, inkludert 21 innen spillteori med hovedideer, forutsetninger, gjennomarbeidede eksempler og strategiske anvendelser.
- **132 quizoppgaver**, hvorav 97 innen spillteori. Velg fag, nivå og 10, 20 eller alle spørsmål. Øv på siste feil eller oppgaver du ennå ikke har besvart riktig.
- **12 interaktive spillmatriser**: marker alle rene Nash-likevekter, håndter like gevinster og spill uten ren likevekt, og vis trinnvise beste-respons-forklaringer.
- **12 åpne regne- og drøftingsoppgaver** med egne svarfelt og trinnvise løsningsforslag. Egenvurdering, ingen automatisk sensur av fritekst.
- Flashkort med fagfilter, søkbart fagstoff og interaktiv tilbuds- og etterspørselsmodell.

Spillteori omfatter beste respons, rene og blandede Nash-likevekter, dominant/dominert strategi, fangens dilemma, koordinering, Chicken, Pareto, nullsumspill, sekvensielle spill, delspillperfeksjon, troverdige trusler, gjentatte spill, grim trigger, Cournot, Bertrand, Stackelberg og Bayesiansk Nash.

Anbefalt rekkefølge: byggesteiner → beste respons → ren Nash → spillverksted → blandede strategier → sekvensielle spill → gjentatte spill og oligopol.

## Fremdrift og egne svar

Fremdrift og fritekstsvar lagres i nettleseren. Ingen innlogging eller synkronisering; sletting av nettleserdata fjerner opplysningene. Bruk samme nettleser og adresse for å fortsette. Tidligere registrert fremdrift fra den opprinnelige 12-oppgaversutgaven migreres automatisk. Quizoversikten teller unike spørsmål som er besvart riktig minst én gang; «Siste svar var feil» bruker siste svar på hvert spørsmål.

Bruk sammen med emneplan, pensumbøker og forelesninger. Eksemplene er pedagogiske modeller med eksplisitte forutsetninger. De bekrefter ikke dekning av en bestemt eksamen eller emneplan.

## Filer og videre utvidelse

- `index.html`: startside og innebygd reservekopi av fagstoff
- `style.css`: design og mobiltilpasning
- `app.js`: appfunksjoner, dynamiske antall, fremdrift og spillanalyse
- `data.json`: `topics`, `questions`, `games`, `written` og dataversjon
- `dist/index.html`: videresending for gamle lenker
- `tests/check-app.cjs`: kontroller av innlasting, progresjon, quiz, matriser og tekstlagring

Alle stier er relative og fungerer under /MBA-NORD/ på GitHub Pages. På web lastes `data.json` uten å gjenbruke en gammel HTTP-cache; ved feil brukes den innebygde reservekopien. Ved filåpning brukes reservekopien direkte. Hold JSON-blokken med id="study-data" i index.html identisk med data.json ved innholdsendringer. Bevar eksisterende tema- og spørsmåls-ID-er for å bevare fremdrift. Hvert spørsmål har en egen stabil ID, et topic-felt, nivå, alternativer, svarindeks og forklaring. Spørsmål med game-felt viser til en matrise. Antall temaer og oppgaver beregnes fra dataene.

## Kontroller (for utvikling)

```sh
node --check app.js
node tests/check-app.cjs
```

Kontrollene bruker Node.js uten tilleggspakker og simulerer DOM for å teste logikk; de erstatter ikke en visuell nettlesertest.

## Alternativ: lokal filåpning

Last ned ZIP, pakk ut hele mappen og dobbeltklikk index.html. Ingen lokal server kreves. Nettleseren kan begrense lokal lagring ved filåpning. Nettskriftene krever nett, med lokale reservefonter.
