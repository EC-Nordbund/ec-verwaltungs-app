if exist .\dist\ rm -r .\dist\ 

cd .\packages\forms
yarn build

cd ..
type .\forms\dist\ecForm.umd.min.js > .\app\src\assets\ecForm.umd.min.js
type .\forms\dist\ecForm.umd.min.js > .\anmeldung\src\assets\ecForm.umd.min.js
cd app
yarn build

cd ..\anmeldung
yarn build

type .\dist\index.html > .\dist\getInjectedJS.html

cd ..\..

node buildDist.js

echo Du musst die JS Files aus der ./anmeldung/dist/index.html in die ./anmeldung/dist/index.php einfügen!