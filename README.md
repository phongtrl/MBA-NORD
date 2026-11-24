# MBA NORD – Strategi og Ledelse

Norsk kunnskapsbase for mikro- og makroøkonomi. Selvstendig øvingsverktøy, ikke offisielt materiale eller kontrollert pensum fra Nord universitet.

## Studieløypen i spillteori

Fire moduler fra beste respons og ren Nash-likevekt til blandede strategier, spilltrær og gjentatte spill. Hver modul kobler teori til en oppgave i ECO 5026. Begrepene vises også på engelsk.

I **Nash-verkstedet** markerer du beste respons for spiller 1, deretter for spiller 2, og finner til slutt de rene likevektene. Bruk Chicken, Matching Pennies-varianten eller matrisen med like gevinster.

Studieløypen er inspirert av fagrekkefølgen i [MIT 14.12](https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/resources/lecture-notes/) og [Yale ECON 159](https://oyc.yale.edu/economics/econ-159). Øvingsinnholdet bygger på ECO 5026-materialet.

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

- **57 teoritemaer**, inkludert 30 innen spillteori med hovedideer, forutsetninger, gjennomarbeidede eksempler og strategiske anvendelser.
- **216 quizoppgaver**, hvorav 155 innen spillteori. Velg fag, nivå og 10, 20 eller alle spørsmål. Øv på siste feil eller oppgaver du ennå ikke har besvart riktig.
- **32 interaktive spillmatriser**: marker alle rene Nash-likevekter, håndter like gevinster og spill uten ren likevekt, og vis trinnvise beste-respons-forklaringer.
- **35 åpne regne- og drøftingsoppgaver** med egne svarfelt og trinnvise løsningsforslag. Ni av oppgavene har delspørsmål med hint og sjekklister for egenvurdering i Eksamensøving.
- Flashkort med fagfilter, søkbart fagstoff og interaktiv tilbuds- og etterspørselsmodell.

Spillteori omfatter beste respons, rene og blandede Nash-likevekter, dominant/dominert strategi, fangens dilemma, koordinering, Chicken, Pareto, nullsumspill, sekvensielle spill, delspillperfeksjon, troverdige trusler, gjentatte spill, grim trigger, Cournot, Bertrand, Stackelberg og Bayesiansk Nash.

Anbefalt rekkefølge: byggesteiner → beste respons → ren Nash → spillverksted → blandede strategier → sekvensielle spill → gjentatte spill og oligopol.

Eksamensøvingen i spillteori følger oppgaveformene i ECO 5026-øvingene og tidligere eksamener. Fire egne oppgaver med nye tall dekker dominans i en 3 × 3-matrise, blanding med utfallsvekter, normalform og spilltre, samt endelig og uendelig gjentakelse. Velg **Mikroøkonomi** i Eksamensøving, eller **Quiz om spillteori** under Mikroøkonomi.

## Forelesningsløype fra brukerens notater

Egen meny med 9 forelesningstemaer, 46 nye quizoppgaver og 8 nye åpne oppgaver. Tallene følger de innsendte notatenes Fangens dilemma, Battle of the Sexes, Chicken og Matching Pennies-lignende spill, inkludert en endret Lh-gevinst. De opprinnelige generelle eksemplene beholdes og har andre navn/tall.

I forelesningsløypen kan du bytte førstetrekker for fem spill og se spilltre, normalform og baklengs induksjon. Spilleridentitet og gevinstrekkefølge (spiller 1, spiller 2) bevares. Kontingente planer hh/hl/lh/ll og HH/HL/LH/LL forklares eksplisitt. Filtrene i teori, quiz, flashkort og åpne oppgaver har valget «Fra forelesningsnotatene».

Notatenes tabeller mistet delvis formatering. Matrisene er rekonstruert fra uttrykk og sluttgevinster. Appen viser en rettelsesoversikt for blant annet fortegn, utfallsvekter, begrepet ren Nash og en feil spilleridentitet i det innlimte sammendraget om Battle of the Sexes. Sammenlign med originallysbildene ved avvik. Dette er en renskriving, ikke en kvalitetssikring fra foreleser.

Forelesningsløypen bygger på mikroforelesningsnotatene. Makroøkonomi har egne kursnotater og et kompendium. I Eksamensøving står grunnlaget for hver bearbeidet oppgave ved løsningen.

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

## Makroøkonomi i ECO 5026

Velg Makroøkonomi i menyen for å finne åtte kurstemaer, 26 quizoppgaver og seks åpne oppgaver med løsningsforslag. Oppgavene bygger på multiplikatornotatet, makroøvingene, notatene om valuta og transmisjon og tidligere eksamener. Eksamensøvingen om konjunkturer og produksjonsgap bygger på Kompendium, Makroøkonomi 2026.
