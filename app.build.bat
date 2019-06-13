cd packages
cd forms
yarn build
cd ..
type .\forms\dist\ecForm.umd.min.js > .\app\src\assets\ecForm.umd.min.js
cd app
yarn build