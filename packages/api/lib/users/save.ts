import sendMail from '../sonstiges/mail';
import {
  AuthKey,
  hashFunc,
  Role,
  User
  } from '.';
import * as fs from 'fs';
import * as path from 'path';

export function hash(pwd: string, salt: string): string {
  return hashFunc(salt + pwd);
}

let users: User[] = load();
let authKeys: AuthKey[] = [];

const configPath = "../../save.json";
const fullPath = path.join(__dirname, configPath);

function load() {
  return JSON.parse(fs.readFileSync(fullPath, "utf8")).map(
    d =>
      new User(
        d.userID,
        d.personID,
        d.userName,
        d.pwdHash,
        d.salt,
        d.ablaufDatum,
        d.role
      )
  );
}

function save(users: User[]) {
  fs.writeFileSync(fullPath, JSON.stringify(users.map(user => user.toSave())));
}

export function changePWD(
  userID: number,
  oldPWD: string,
  newPWD: string
): boolean {
  const us = users.filter(v => v.userID === userID);
  if (us.length === 1) {
    return us[0].changePWD(oldPWD, newPWD);
  } else {
    return false;
  }
}

export function updateUser(
  userID: number,
  gueltigBis: string,
  role: Role
): boolean {
  const us = users.filter(v => v.userID === userID);
  if (us.length === 1) {
    const updateUserResult = us[0].updateUser(gueltigBis, role);
    save(users);
    return updateUserResult;
  } else {
    return false;
  }
}

export function deleteUser(userID: number) {
  users = users.filter(v => v.userID !== userID);
  save(users);
}

export function login(username: string, password: string): string {
  const getUsers = users
    .filter(v => v.userName === username)
    .filter(user => user.isGueltig);

  if (getUsers.length !== 1) {
    throw "Username und Password passen nicht zusammen";
  } else {
    if (getUsers[0].checkPWD(password)) {
      const authToken = new AuthKey(getUsers[0]);
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
  return getAuthToken(authToken, authKey => authKey.extend());
}

export async function addUser(
  personID: number,
  username: string,
  email: string,
  gueltigBis: string,
  role: Role
) {
  const pwd = hashFunc(
    `${username}jkfhhksjdfhjkdfjk${Math.random()}${new Date().toISOString()}`
  ).substr(1, 10);
  const salt = hashFunc(
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
    new User(nID, personID, username, pwdHash, salt, gueltigBis, role)
  );

  save(users);

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

  return await sendMail("app@ec-nordbund.de", {to}, subject, body, false);
}

function getAuthToken<T>(authToken: string, cb: (authKey: AuthKey) => T): T {
  const keys = authKeys
    .filter(key => key.authToken === authToken)
    .filter(key => key.isGueltig);

  if (keys.length === 1) {
    return cb(keys[0]);
  } else {
    throw "Key not Found";
  }
}

export function getUser(authToken: string): User {
  return getAuthToken(authToken, authKey => authKey.user);
}
