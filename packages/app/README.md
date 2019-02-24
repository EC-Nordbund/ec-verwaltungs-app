# app5

## Coole Dinge die man in unserem Code finden kann

### 1. Vuetify
Wir nutzen Vuetify als Component Frameworks, was uns 90% der Arbeit abnimmt.

### 2. Electron
Wir nutzen Electron als Framework damit wir eine Desktop App schreiben können.

### 3. Imports
Wir machen die meisten unserer Importe dynamisch. In der datei `import.ts` findet man den entsprechenden Code.
Dabei werden verschiedene Dinge Importiert

#### 3.1 Lib
Alle Components die wir mehrfach nutzen schreiben wir im lib Ordner. Diese werden automatisch importiert und in Vue eingebunden.

#### 3.2 Util
Alle Utils die wir so brauchen landen in diesem Ordner und sind später unter $util abrucfbar

### 4. Router
Unter Pages findet man unsere Route. Die Strucktur scheint dabei sehr komplex zu sein. Allerdings werden die Routes automatisch ausgelesen und in die Tree strucktur gebracht. s. `router.ts`

### 5. API verbindung
Wir haben auf grundlage von Socket.io eine eigene API Schnittstelle entwickelt. Dadurch können wir Daten besser Cachen und wir haben einen besseren Zugrif auf den Datenfluss. - Dies ist noch in Arbeit. Und evtl. nicht zu finden.

### 6. Forms
Wir haben einen Formulargenerator geschrieben. Dieser ist im Ordner `form` zu finden.

### 7. Anschrit
Wir haben ein eigenes Anschrits Formular geschrieben, das nach eingabe der PLZ nur noch die entsprechenden Orte zu lässt.

### 8. Report generator
Wir nutzen einen Report generator um Word Dokumente zu generieren. Dies ist sehr cool.

## Sachen die man hier nicht findet

### 1. Code-Splitting

Man könnte via Code-Splitting einiges an Ladetzeit sparen / verteilen. Dies ist für unsere Zwecke aber nicht nötig.