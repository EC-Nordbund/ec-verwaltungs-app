require('inquirer').prompt([{
  name: "typ",
  type: "list",
  choices: ["fix", "feat", "docs"]
}, {
  name: "was",
  type: "list",
  choices: [
    "API", "APP", "DOCS", "HELP", "ANMELDUNG"
  ]
}, {
  name: "nachricht",
  type: "input"
}]).then(a => {
  require('child_process').exec(`git commit -m (${a.typ}) ${a.nachricht} [${a.was}]`)
})