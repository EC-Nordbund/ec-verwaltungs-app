cd packages
cd forms
yarn build
cd ..
type .\forms\dist\ecForm.umd.min.js > .\anmeldung\src\assets\ecForm.umd.min.js
cd anmeldung
yarn build

echo Du musst die JS Files aus der ./dist/index.html in die ./dist/index.php einfügen!