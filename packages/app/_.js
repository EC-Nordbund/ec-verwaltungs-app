"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var graphql_tag_1 = require("graphql-tag");
var excel = require("xlsx-template");
function generate(veranstaltungsID, template, authToken, apolloClient) {
    return __awaiter(this, void 0, void 0, function () {
        var url, templateData, instance, replData, resultList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://verwaltung.ec-nordbund.de/templates/" + template + ".xlsx";
                    return [4 /*yield*/, fetch(url).then(function (v) { return v.arrayBuffer(); })];
                case 1:
                    templateData = _a.sent();
                    instance = excel(templateData);
                    return [4 /*yield*/, apolloClient.query({
                            query: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      veranstaltung(\n        authToken: $authToken\n        veranstaltungsID: $veranstaltungsID\n      ) {\n        veranstaltungsID\n        bezeichnung\n        begin {\n          input\n        }\n        ende {\n          input\n        }\n        minTNAlter\n        maxTNAlter\n        anzahlPlaetze\n        anzahlPlaetzeW\n        anzahlPlaetzeM\n        preisNormal\n        preisLastMinute\n        preisFruehbucher\n        fruehbucherBis {\n          german\n        }\n        lastMinuteAb {\n          german\n        }\n        preisAnzahlungNormal\n        preisAnzahlungLastMinute\n        preisAnzahlungFruehbucher\n        kannVorortBezahltWerden\n        hatGWarteliste\n        veranstaltungsort {\n          bezeichnung\n          plz\n          ort\n          land\n        }\n        anmeldungen {\n          anmeldeID\n          position\n          person {\n            vorname\n            nachname\n            geschlecht\n            gebDat {\n              german\n            }\n          }\n          adresse {\n            strasse\n            plz\n            ort\n          }\n          telefon {\n            telefon\n          }\n          email{\n            eMail\n          }\n          bemerkungen\n          gesundheitsinformationen\n          lebensmittelAllergien\n          vegetarisch\n          radfahren\n          schwimmen\n          fahrgemeinschaften\n          klettern\n          sichEntfernen\n          bootFahren\n          wartelistenPlatz\n          anmeldeZeitpunkt {\n            german\n            day\n            month\n            year\n          }\n        }\n      }\n    }"], ["\n      veranstaltung(\n        authToken: $authToken\n        veranstaltungsID: $veranstaltungsID\n      ) {\n        veranstaltungsID\n        bezeichnung\n        begin {\n          input\n        }\n        ende {\n          input\n        }\n        minTNAlter\n        maxTNAlter\n        anzahlPlaetze\n        anzahlPlaetzeW\n        anzahlPlaetzeM\n        preisNormal\n        preisLastMinute\n        preisFruehbucher\n        fruehbucherBis {\n          german\n        }\n        lastMinuteAb {\n          german\n        }\n        preisAnzahlungNormal\n        preisAnzahlungLastMinute\n        preisAnzahlungFruehbucher\n        kannVorortBezahltWerden\n        hatGWarteliste\n        veranstaltungsort {\n          bezeichnung\n          plz\n          ort\n          land\n        }\n        anmeldungen {\n          anmeldeID\n          position\n          person {\n            vorname\n            nachname\n            geschlecht\n            gebDat {\n              german\n            }\n          }\n          adresse {\n            strasse\n            plz\n            ort\n          }\n          telefon {\n            telefon\n          }\n          email{\n            eMail\n          }\n          bemerkungen\n          gesundheitsinformationen\n          lebensmittelAllergien\n          vegetarisch\n          radfahren\n          schwimmen\n          fahrgemeinschaften\n          klettern\n          sichEntfernen\n          bootFahren\n          wartelistenPlatz\n          anmeldeZeitpunkt {\n            german\n            day\n            month\n            year\n          }\n        }\n      }\n    }"]))),
                            variables: {
                                authToken: authToken,
                                veranstaltungsID: veranstaltungsID
                            }
                        }).then(function (v) { return v.data.veranstaltung; }).then(function (v) { return (__assign({}, v, { anmeldungen: v.anmeldungen.map(function (h) { return (__assign({}, h)); }) })); })];
                case 2:
                    replData = _a.sent();
                    instance.substitute(1, replData);
                    resultList = instance.generate({ type: 'arraybuffer' });
                    saveByteArray("TN-Liste." + template + "." + veranstaltungsID + ".xlsx", resultList);
                    return [2 /*return*/];
            }
        });
    });
}
exports.generate = generate;
function getTemplates() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://verwaltung.ec-nordbund.de/templates/list.json').then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getTemplates = getTemplates;
function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    var link = document.getElementById('ec-download');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
}
;
var templateObject_1;
