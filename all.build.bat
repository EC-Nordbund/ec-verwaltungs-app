if exist .\dist\ rm -r .\dist\ 

cd .\packages\forms
yarn build
cd ..\app
yarn build
cd ..\anmeldung
yarn build
cd ..\..
node .\buildDist.js
