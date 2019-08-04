# EC-Verwaltungs-App

> Unsere Software besteht aus mehreren Teilen, deren Zusammenspiel hier erklärt werden soll. 

## Form Generator

Wir haben einen eignen Formgenerator entwickelt. Dieser basiert auf Vuetify und wird in die anderen Projekte eingebunden.
### Basis
* Vuetify
* Vue
* Vee-Validate

## Anmeldung

Hier soll die Anmeldung für den EC-Nordbund erstellt werden. Dabei gibt es den Generator der Anmeldung für die Verschieden Zwecke und Ziel ist eine js Datei, die eingebnden werden kann die Vue, Vuetify, unsern Form generator enthält. Dabei wird als Ziel eine Funktion in das Window Objekt hinzugefügt, die mit einigen Parametern aufgerufen werden kann und die Anmeldung automatisch einbindet.

### Basis
* Form Generator
* Vuetify
* Vue
* Vee-Validate

## API
Wir nutzen GraphQL als API Framework dabei nutzen wir verschiedene Tools
### Basis
* GraphQL Server
* Eigenes Auth System

## APP
Wir nutzen verschiedene Packete etc. um uns das ganze zu vereinfachen. Wir haben ein automatischen Route generator der Anhand der Ordnerstrucktur die Routes generiert. Wir versuchen eher mehr Dateien zu erstellen als lange Dateien und wir wollen eher html als js.

### Basis
* Form Generator
* Vuetify
* Vue
* Vee-Validate

## Docs, Help
Wir nutzen Vuepress um eine Dokumentation und eine Hilfeseite zu generieren. Nicht sehr spektakulär aber ganz interessant. Einige Docs seiten werden zur Buildzeit generiert.
### Basis
* Vuepress

## DB
Aktuell nutzen wir MYSQL was wir aber durch NEO4J ersetzen wollen.

