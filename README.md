# Ausbildungsnachweisgenerator

[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://github.com/Jonasdero/ng-ausbildungsnachweise)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://ng-ausbildungsnachweise.firebaseapp.com/)

Eine Angular-Web-App zum Erstellen von Ausbildungsnachweisen als Word-Dokumente.

## Funktionen

- Ändern von Vor- und Nachnamen, Beruf, Ausbildungsstartdatum
- Einstellen von beliebigen Abteilungsnamen
- Hinzufügen von Ausbildungswochen mit Startdatum, Stunden pro Tag und Tätigkeiten pro Tag
- Speichern aller Ausbildungswochen nach Schema `0NR_dd.MM.yyyy.docx`
- Import von JSON zur Batch-Worderstellung
- Tabellenansicht und zufällige Generierung von Ausbildungsnachweisen

## Tech-Stack

- [Angular 22](https://angular.dev) (NgModule-Architektur)
- [Angular Material](https://material.angular.io) & [Bootstrap 5](https://getbootstrap.com)
- [AngularFire](https://github.com/angular/angularfire) / Firebase (Google-Login)
- [docxtemplater](https://docxtemplater.com) + [PizZip](https://github.com/open-xml-templating/pizzip) für die Word-Erstellung
- ESLint (angular-eslint) statt des veralteten TSLint

## Voraussetzungen

- Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` (siehe `.nvmrc`)
- npm

## Entwicklung

```bash
npm install      # Abhängigkeiten installieren (legacy-peer-deps ist über .npmrc voreingestellt)
npm start        # Dev-Server unter http://localhost:4200
npm run build    # Produktions-Build nach dist/ng-ausbildungsnachweise/browser
npm run lint     # ESLint
npm test         # Unit-Tests (Karma/Jasmine)
npm run deploy   # Build + Firebase-Deploy
```

> Hinweis: `@angular/fire` und `angular-eslint` veröffentlichen ihre Angular-22-kompatiblen
> Peer-Ranges erst zeitversetzt. Deshalb ist in der `.npmrc` `legacy-peer-deps=true` gesetzt.

## Fragen, Anmerkungen oder Fehler?

- Aussagekräftiges Issue erstellen

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/Jonasdero) by Jonasdero
