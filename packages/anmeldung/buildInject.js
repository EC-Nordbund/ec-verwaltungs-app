const fs = require('fs');
const data = fs.readFileSync('./dist/index.html').toString();
const newPhp = fs.readFileSync('./dist/index.php').toString().split('<inject>').join(data.split('</head>')[1]);
fs.writeFileSync('./dist/index.php', newPhp)
