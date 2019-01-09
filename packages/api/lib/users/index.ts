import { AuthKey } from "./authKey";
import { Role, User } from "./user";
import { readFileSync, writeFileSync } from "fs";
import { sha3_512 } from "js-sha3";
export {AuthKey as authKey} from "./authKey";
export {User as user} from "./user";

function hash(pwd: string, salt: string): string {
  return sha3_512(salt + pwd);
}

export function login(username: string, password: string): string {
  const tmpDate = new Date();
  const getUsers = users
    .filter(v => v.userName === username)
    .filter(user => {
      return tmpDate <= new Date(user.ablaufDatum);
    });
  if (getUsers.length !== 1) {
    throw "Username und Password passen nicht zusammen";
  } else {
    const ckUser = getUsers[0];
    const h = hash(password, ckUser.salt);
    if (h === ckUser.pwdHash) {
      const authToken = new AuthKey(ckUser);
      authKeys.push(authToken);
      return authToken.authToken;
    } else {
      throw "Username und Password passen nicht zusammen";
    }
  }
}

export function logout(authToken: string): boolean {
  authKeys = authKeys.filter(v => v.authToken !== authToken);
  return true;
}

export function extend(authToken: string): boolean {
  const tmpDate = new Date();
  const keys = authKeys
    .filter(v => v.authToken === authToken)
    .filter(v => {
      return v.ablaufTime > tmpDate;
    });
  if (keys.length !== 1) {
    return false;
  } else {
    keys[0].extend();
    return true;
  }
}

export function getUser(authToken: string): User {
  const tmpDate = new Date();
  const auth = authKeys
    .filter(v => v.authToken === authToken)
    .filter(v => {
      return v.ablaufTime > tmpDate;
    })[0];
  if (auth === undefined) {
    throw "User not Found";
  }
  auth.extend();
  return auth.user;
}

export let users: User[] = [];
export let authKeys: AuthKey[] = [];

function load() {
  const saveObj = JSON.parse(readFileSync("./save.json").toString());

  saveObj.forEach(v => {
    users.push(
      new User(
        v.userID,
        v.personID,
        v.userName,
        v.pwdHash,
        v.salt,
        v.ablaufDatum,
        v.role
      )
    );
  });
}

function save() {
  writeFileSync(
    "./save.json",
    JSON.stringify(users.map(v => v.toSave()), undefined, 2)
  );
}

load();
save();

setInterval(save, 60 * 60 * 1000);

export function deleteUser(userID: number) {
  users = users.filter(v => v.userID !== userID);
  save();
}
export function addUser(
  personID: number,
  username: string,
  email: string,
  gueltigBis: string,
  userGroupID: number
) {
  const pwd = sha3_512(
    `${username}jkfhhksjdfhjkdfjk${Math.random()}${new Date().toISOString()}`
  ).substr(1, 10);
  const salt = sha3_512(
    `${username}${pwd}clkkk${Math.random()}${new Date().toISOString()}`
  );
  const pwdHash = hash(pwd, salt);

  let nID = -1;
  users.forEach(v => {
    if (nID < v.userID) {
      nID = v.userID;
    }
  });
  nID++;

  users.push(
    new User(nID, personID, username, pwdHash, salt, gueltigBis, userGroupID)
  );

  save();

  const subject = "Anmeldedaten für den EC-Nordbund";
  const to = email;
  const body = `Moin,

Vielen Dank für deinen Einsatz im EC-Nordbund. Du erhälst in dieser E-Mail alle Informationen zu deinem Zugang zu unserer Software dazu folge bitte den folgenden Schritten:

1. Lade dir von https://github.com/ecnordbund/ec-verwaltungs-app/releases die Software runter. Nutze dabei die aktuellste Version bei dem nicht "Pre-release" steht. Wähle die richtige Datei je nach Betriebsystem aus (.exe für windows, .dmg für MacOS, .deb für Linux)
2. Installiere das Programm. Dazu musst du evtl. deinen Virenscanner auschalten. Je nach Virenscanner kann es passieren, dass er die Installation blockt, da diese nicht Zertifiziert / unsicher sei.
3. Das Programm startet automatisch. Du solltest automatisch eine Desktop-Verknüpfung sowie einen eintrag im Startmenü erhalten, mit dem du die Software später erneut starten kannst.
4. Melde dich mit deinen Anmeldedaten an. Diese sind Benutzename: "${username}", Passwort: "${pwd}".
5. Eine Meldung sollte erscheinen, dass du einer Datenschutzerklärung zustimmen musst. Diese solltest du dir genau durchlesen! Mit dem klick auf "Ich stimme der Datenschutzerklärung zu." stimmst du dieser zu. Sie enthält auch Hinweise wie du mit Daten aus unserer Software umgehen musst!
6. Gehe zu "Profil" und klicke auf "Passwort ändern"
7. Erstelle ein neues Passwort.
8. Schaue dich in dem Programm um. Bei fragen besuche die Hilfe oder schreibe eine E-Mail and app@ec-nordbund.de.

Entschieden für Christus grüßt
Thomas Seeger sowie Tobias Krause und Sebastian Krüger
`;

  // return sendMail("app@ec-nordbund.de", {to}, subject, body, false);
}
export function updateUser(userID: number, gueltigBis: string, role: Role) {
  const u = users.filter(v => v.userID === userID)[0];
  u.ablaufDatum = gueltigBis;
  u.role = role;
  save();
}

export function changePWD(
  userID: number,
  oldPWD: string,
  newPWD: string
): boolean {
  const u = users.filter(v => v.userID === userID)[0];
  const oldHash = hash(oldPWD, u.salt);
  if (oldHash === u.pwdHash) {
    const nSalt = sha3_512(
      `${
        u.pwdHash
      }${oldPWD}${Math.random()}${new Date().toISOString()}${newPWD}kjsfksjd`
    );
    const nHsh = hash(newPWD, nSalt);
    u.salt = nSalt;
    u.pwdHash = nHsh;
    return true;
  } else {
    return false;
  }
}
