const readline = require('readline')

const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let mainPack = require('./package.json')
let elPack = require('./electron/package.json')

rl.question(
  `Aktuelle Version ist ${
    mainPack.version
  }. Was soll die neue Version sein?\n\n`,
  answer => {
    mainPack.version = answer
    elPack.version = answer

    fs.writeFileSync(
      './package.json',
      JSON.stringify(mainPack, null, 2) + '\n'
    )

    fs.writeFileSync(
      './electron/package.json',
      JSON.stringify(elPack, null, 2) + '\n'
    )

    rl.close()
  }
)
