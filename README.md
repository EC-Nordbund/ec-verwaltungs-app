# EC-Verwaltungs-App

## Init

Nach dem Clonen des Projekts sollte als erstes
```sh
  yarn :init
```
ausgeführt werden.

Zum starten der App in zwei Terminals die folgenden Befhele eingeben.

```sh
  yarn start
  yarn serve
```

## MainProzess

Der MainProzess kann unter `/electron/src/main/main.js` editiert werden. Einstellungen im DEV-MODE kommen in `electron/src/main/main.dev.js`

## RenderProzess

Der RenderProzess besteht aus Zwei Teilen

### Vue-App

In `/src` befindet sich die VUE-APP hier ist vorallem der Ordner `/src/views` interessant da hier die einzelnen Angezeigten Routes gespeichert werden.
In `/src/plugins` befinden sich alle Configuarationen und Plugins ordentlich sortiert.

### Sonstiges

In `/public` können für weitere Browser-Windows der `HTML`, `CSS` und `JS` Code angelegt werden. Hier ist z.B. auch das LadeFenster beheimatet.
