function observable(target, update, logger) {
    return new Proxy(target, {
        get: function (target, prop) {
            return target[prop];
        },
        set: function (target, prop, v) {
            if (update[prop]) {
                update[prop](target[prop], v);
            }
            if (logger) {
                logger(target, prop, v);
            }
            target[prop] = v;
            return true;
        }
    });
}

var data = {
    personen: []
};
function addPerson(vorname, nachname, gebDat) {
    data.personen.push(observable({ vorname: vorname, nachname: nachname, gebDat: gebDat }, {
        vorname: console.log,
        nachname: console.log,
        gebDat: console.log
    }, console.log));
}


addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")
addPerson("vorname", "nachname", "gebDat")

console.log(data);

data.personen[1].vorname = 'neuerVorname'


