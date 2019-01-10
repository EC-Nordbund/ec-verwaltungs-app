---   
sidebar: auto   
---  
# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Mutation](#mutation)
  * [Objects](#objects)
    * [AK](#ak)
    * [Adresse](#adresse)
    * [Anmeldung](#anmeldung)
    * [EcKreis](#eckreis)
    * [Email](#email)
    * [FZ](#fz)
    * [FZAntrag](#fzantrag)
    * [Organisation](#organisation)
    * [Person](#person)
    * [PersonAK](#personak)
    * [PersonAdresse](#personadresse)
    * [PersonEmails](#personemails)
    * [PersonTelefon](#persontelefon)
    * [Telefon](#telefon)
    * [User](#user)
    * [VGGemeinde](#vggemeinde)
    * [Veranstaltung](#veranstaltung)
    * [VeranstaltungsOrt](#veranstaltungsort)
    * [VeranstaltungsOrtKontakt](#veranstaltungsortkontakt)
    * [_AKPersonen](#_akpersonen)
    * [_AddAKPersonenPayload](#_addakpersonenpayload)
    * [_AddEcKreisPersonenPayload](#_addeckreispersonenpayload)
    * [_AddEcKreisVgGemeindePayload](#_addeckreisvggemeindepayload)
    * [_AddFZPersonPayload](#_addfzpersonpayload)
    * [_AddFZSeenByPayload](#_addfzseenbypayload)
    * [_AddOrganisationAdressePayload](#_addorganisationadressepayload)
    * [_AddOrganisationEmailPayload](#_addorganisationemailpayload)
    * [_AddOrganisationTelefonPayload](#_addorganisationtelefonpayload)
    * [_AddPersonAdressenPayload](#_addpersonadressenpayload)
    * [_AddPersonAksPayload](#_addpersonakspayload)
    * [_AddPersonAnmeldungenPayload](#_addpersonanmeldungenpayload)
    * [_AddPersonEmailsPayload](#_addpersonemailspayload)
    * [_AddPersonFzsPayload](#_addpersonfzspayload)
    * [_AddPersonLetzterFzAntragPayload](#_addpersonletzterfzantragpayload)
    * [_AddPersonTelefonPayload](#_addpersontelefonpayload)
    * [_AddVGGemeindeAdressePayload](#_addvggemeindeadressepayload)
    * [_AddVGGemeindePersonenPayload](#_addvggemeindepersonenpayload)
    * [_AddVeranstaltungAnmeldungenPayload](#_addveranstaltunganmeldungenpayload)
    * [_AddVeranstaltungVeranstaltungsortPayload](#_addveranstaltungveranstaltungsortpayload)
    * [_AddVeranstaltungsOrtAdressePayload](#_addveranstaltungsortadressepayload)
    * [_AddVeranstaltungsOrtKontaktAdressePayload](#_addveranstaltungsortkontaktadressepayload)
    * [_AddVeranstaltungsOrtKontaktEmailPayload](#_addveranstaltungsortkontaktemailpayload)
    * [_AddVeranstaltungsOrtKontaktTelefonPayload](#_addveranstaltungsortkontakttelefonpayload)
    * [_AddVeranstaltungsOrtKontaktePayload](#_addveranstaltungsortkontaktepayload)
    * [_AddVeranstaltungsOrtOrganisationPayload](#_addveranstaltungsortorganisationpayload)
    * [_Neo4jDate](#_neo4jdate)
    * [_Neo4jDateTime](#_neo4jdatetime)
    * [_Neo4jLocalDateTime](#_neo4jlocaldatetime)
    * [_Neo4jLocalTime](#_neo4jlocaltime)
    * [_Neo4jTime](#_neo4jtime)
    * [_PersonAdressen](#_personadressen)
    * [_PersonAks](#_personaks)
    * [_PersonAnmeldungen](#_personanmeldungen)
    * [_PersonEmails](#_personemails)
    * [_PersonTelefon](#_persontelefon)
    * [_RemoveAKPersonenPayload](#_removeakpersonenpayload)
    * [_RemoveEcKreisPersonenPayload](#_removeeckreispersonenpayload)
    * [_RemoveEcKreisVgGemeindePayload](#_removeeckreisvggemeindepayload)
    * [_RemoveFZPersonPayload](#_removefzpersonpayload)
    * [_RemoveFZSeenByPayload](#_removefzseenbypayload)
    * [_RemoveOrganisationAdressePayload](#_removeorganisationadressepayload)
    * [_RemoveOrganisationEmailPayload](#_removeorganisationemailpayload)
    * [_RemoveOrganisationTelefonPayload](#_removeorganisationtelefonpayload)
    * [_RemovePersonAdressenPayload](#_removepersonadressenpayload)
    * [_RemovePersonAksPayload](#_removepersonakspayload)
    * [_RemovePersonAnmeldungenPayload](#_removepersonanmeldungenpayload)
    * [_RemovePersonEmailsPayload](#_removepersonemailspayload)
    * [_RemovePersonFzsPayload](#_removepersonfzspayload)
    * [_RemovePersonLetzterFzAntragPayload](#_removepersonletzterfzantragpayload)
    * [_RemovePersonTelefonPayload](#_removepersontelefonpayload)
    * [_RemoveVGGemeindeAdressePayload](#_removevggemeindeadressepayload)
    * [_RemoveVGGemeindePersonenPayload](#_removevggemeindepersonenpayload)
    * [_RemoveVeranstaltungAnmeldungenPayload](#_removeveranstaltunganmeldungenpayload)
    * [_RemoveVeranstaltungVeranstaltungsortPayload](#_removeveranstaltungveranstaltungsortpayload)
    * [_RemoveVeranstaltungsOrtAdressePayload](#_removeveranstaltungsortadressepayload)
    * [_RemoveVeranstaltungsOrtKontaktAdressePayload](#_removeveranstaltungsortkontaktadressepayload)
    * [_RemoveVeranstaltungsOrtKontaktEmailPayload](#_removeveranstaltungsortkontaktemailpayload)
    * [_RemoveVeranstaltungsOrtKontaktTelefonPayload](#_removeveranstaltungsortkontakttelefonpayload)
    * [_RemoveVeranstaltungsOrtKontaktePayload](#_removeveranstaltungsortkontaktepayload)
    * [_RemoveVeranstaltungsOrtOrganisationPayload](#_removeveranstaltungsortorganisationpayload)
    * [_VeranstaltungAnmeldungen](#_veranstaltunganmeldungen)
  * [Inputs](#inputs)
    * [_AKInput](#_akinput)
    * [_AdresseInput](#_adresseinput)
    * [_AnmeldungInput](#_anmeldunginput)
    * [_EcKreisInput](#_eckreisinput)
    * [_EmailInput](#_emailinput)
    * [_FZAntragInput](#_fzantraginput)
    * [_FZInput](#_fzinput)
    * [_Neo4jDateInput](#_neo4jdateinput)
    * [_Neo4jDateTimeInput](#_neo4jdatetimeinput)
    * [_Neo4jLocalDateTimeInput](#_neo4jlocaldatetimeinput)
    * [_Neo4jLocalTimeInput](#_neo4jlocaltimeinput)
    * [_Neo4jTimeInput](#_neo4jtimeinput)
    * [_OrganisationInput](#_organisationinput)
    * [_PersonAKInput](#_personakinput)
    * [_PersonAdresseInput](#_personadresseinput)
    * [_PersonEmailsInput](#_personemailsinput)
    * [_PersonInput](#_personinput)
    * [_PersonTelefonInput](#_persontelefoninput)
    * [_TelefonInput](#_telefoninput)
    * [_UserInput](#_userinput)
    * [_VGGemeindeInput](#_vggemeindeinput)
    * [_VeranstaltungInput](#_veranstaltunginput)
    * [_VeranstaltungsOrtInput](#_veranstaltungsortinput)
    * [_VeranstaltungsOrtKontaktInput](#_veranstaltungsortkontaktinput)
  * [Enums](#enums)
    * [AKStatus](#akstatus)
    * [DSGVOStatus](#dsgvostatus)
    * [ECMitglied](#ecmitglied)
    * [Geschlecht](#geschlecht)
    * [PersonStatus](#personstatus)
    * [Position](#position)
    * [Role](#role)
    * [Schwimmen](#schwimmen)
    * [VGMitglied](#vgmitglied)
    * [_AKOrdering](#_akordering)
    * [_AdresseOrdering](#_adresseordering)
    * [_EcKreisOrdering](#_eckreisordering)
    * [_EmailOrdering](#_emailordering)
    * [_FZAntragOrdering](#_fzantragordering)
    * [_FZOrdering](#_fzordering)
    * [_OrganisationOrdering](#_organisationordering)
    * [_PersonOrdering](#_personordering)
    * [_RelationDirections](#_relationdirections)
    * [_TelefonOrdering](#_telefonordering)
    * [_UserOrdering](#_userordering)
    * [_VGGemeindeOrdering](#_vggemeindeordering)
    * [_VeranstaltungOrdering](#_veranstaltungordering)
    * [_VeranstaltungsOrtKontaktOrdering](#_veranstaltungsortkontaktordering)
    * [_VeranstaltungsOrtOrdering](#_veranstaltungsortordering)
    * [vgORec](#vgorec)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [ID](#id)
    * [Int](#int)
    * [String](#string)

</details>

## Query
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>getAnmeldung</strong></td>
<td valign="top"><a href="#anmeldung">Anmeldung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Person</strong></td>
<td valign="top">[<a href="#person">Person</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vorname</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">nachname</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebDat</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#geschlecht">Geschlecht</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentECState</td>
<td valign="top"><a href="#ecmitglied">ECMitglied</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">juLeiCaNr</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fuehrerschein</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rettungsschwimmer</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ersteHilfe</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentVGState</td>
<td valign="top"><a href="#vgmitglied">VGMitglied</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">status</td>
<td valign="top"><a href="#personstatus">PersonStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">dsgvo</td>
<td valign="top"><a href="#dsgvostatus">DSGVOStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">letzteDSGVOAuskunft</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_personordering">_PersonOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Veranstaltung</strong></td>
<td valign="top">[<a href="#veranstaltung">Veranstaltung</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kurzBezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">begin</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">minTNAlter</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">maxTNAlter</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetze</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeW</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeM</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisFruehbucher</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisNormal</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisLastMinute</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungNormal</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungFruehbucher</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungLastMinute</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fruehbucherBis</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lastMinuteAb</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kannVorortBezahltWerden</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">hatGWarteliste</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_veranstaltungordering">_VeranstaltungOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrt</strong></td>
<td valign="top">[<a href="#veranstaltungsort">VeranstaltungsOrt</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_max</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_min</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vollverpflegung</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">selbstversorger</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_veranstaltungsortordering">_VeranstaltungsOrtOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrtKontakt</strong></td>
<td valign="top">[<a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtKontaktID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">typ</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_veranstaltungsortkontaktordering">_VeranstaltungsOrtKontaktOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Organisation</strong></td>
<td valign="top">[<a href="#organisation">Organisation</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_organisationordering">_OrganisationOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AK</strong></td>
<td valign="top">[<a href="#ak">AK</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">AKID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gehoertZu</td>
<td valign="top"><a href="#vgorec">vgORec</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_akordering">_AKOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>EcKreis</strong></td>
<td valign="top">[<a href="#eckreis">EcKreis</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">EcKreisID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_eckreisordering">_EcKreisOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>VGGemeinde</strong></td>
<td valign="top">[<a href="#vggemeinde">VGGemeinde</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VGGemeindeID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_vggemeindeordering">_VGGemeindeOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>FZ</strong></td>
<td valign="top">[<a href="#fz">FZ</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">seenOn</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kommentar</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_fzordering">_FZOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>FZAntrag</strong></td>
<td valign="top">[<a href="#fzantrag">FZAntrag</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">FZAntragID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">erstellt</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_fzantragordering">_FZAntragOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Adresse</strong></td>
<td valign="top">[<a href="#adresse">Adresse</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">strasse</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">plz</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ort</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">land</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_adresseordering">_AdresseOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Email</strong></td>
<td valign="top">[<a href="#email">Email</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_emailordering">_EmailOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Telefon</strong></td>
<td valign="top">[<a href="#telefon">Telefon</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_telefonordering">_TelefonOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>User</strong></td>
<td valign="top">[<a href="#user">User</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userName</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">pwdHash</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">salt</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ablaufDatum</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">role</td>
<td valign="top"><a href="#role">Role</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">_id</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_userordering">_UserOrdering</a></td>
<td></td>
</tr>
</tbody>
</table>

## Mutation
<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logout</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>changePassword</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">oldPWD</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">newPWD</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateUser</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreatePerson</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vorname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">nachname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebDat</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#geschlecht">Geschlecht</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentECState</td>
<td valign="top"><a href="#ecmitglied">ECMitglied</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">juLeiCaNr</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fuehrerschein</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rettungsschwimmer</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ersteHilfe</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentVGState</td>
<td valign="top"><a href="#vgmitglied">VGMitglied</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">status</td>
<td valign="top"><a href="#personstatus">PersonStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">dsgvo</td>
<td valign="top"><a href="#dsgvostatus">DSGVOStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">letzteDSGVOAuskunft</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdatePerson</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vorname</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">nachname</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebDat</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#geschlecht">Geschlecht</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentECState</td>
<td valign="top"><a href="#ecmitglied">ECMitglied</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">juLeiCaNr</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fuehrerschein</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rettungsschwimmer</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ersteHilfe</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">currentVGState</td>
<td valign="top"><a href="#vgmitglied">VGMitglied</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">status</td>
<td valign="top"><a href="#personstatus">PersonStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">dsgvo</td>
<td valign="top"><a href="#dsgvostatus">DSGVOStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">letzteDSGVOAuskunft</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeletePerson</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonAdressen</strong></td>
<td valign="top"><a href="#_addpersonadressenpayload">_AddPersonAdressenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_personadresseinput">_PersonAdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonAdressen</strong></td>
<td valign="top"><a href="#_removepersonadressenpayload">_RemovePersonAdressenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonEmails</strong></td>
<td valign="top"><a href="#_addpersonemailspayload">_AddPersonEmailsPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_personemailsinput">_PersonEmailsInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonEmails</strong></td>
<td valign="top"><a href="#_removepersonemailspayload">_RemovePersonEmailsPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonTelefon</strong></td>
<td valign="top"><a href="#_addpersontelefonpayload">_AddPersonTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_persontelefoninput">_PersonTelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonTelefon</strong></td>
<td valign="top"><a href="#_removepersontelefonpayload">_RemovePersonTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonFzs</strong></td>
<td valign="top"><a href="#_addpersonfzspayload">_AddPersonFzsPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonFzs</strong></td>
<td valign="top"><a href="#_removepersonfzspayload">_RemovePersonFzsPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonLetzterFzAntrag</strong></td>
<td valign="top"><a href="#_addpersonletzterfzantragpayload">_AddPersonLetzterFzAntragPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzantraginput">_FZAntragInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonLetzterFzAntrag</strong></td>
<td valign="top"><a href="#_removepersonletzterfzantragpayload">_RemovePersonLetzterFzAntragPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzantraginput">_FZAntragInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonAks</strong></td>
<td valign="top"><a href="#_addpersonakspayload">_AddPersonAksPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_akinput">_AKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_personakinput">_PersonAKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonAks</strong></td>
<td valign="top"><a href="#_removepersonakspayload">_RemovePersonAksPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_akinput">_AKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddPersonAnmeldungen</strong></td>
<td valign="top"><a href="#_addpersonanmeldungenpayload">_AddPersonAnmeldungenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_anmeldunginput">_AnmeldungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemovePersonAnmeldungen</strong></td>
<td valign="top"><a href="#_removepersonanmeldungenpayload">_RemovePersonAnmeldungenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateVeranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kurzBezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">begin</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">minTNAlter</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">maxTNAlter</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetze</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeW</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeM</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisFruehbucher</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisNormal</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisLastMinute</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungNormal</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungFruehbucher</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungLastMinute</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fruehbucherBis</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lastMinuteAb</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kannVorortBezahltWerden</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">hatGWarteliste</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateVeranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kurzBezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">begin</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">minTNAlter</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">maxTNAlter</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetze</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeW</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeM</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisFruehbucher</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisNormal</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisLastMinute</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungNormal</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungFruehbucher</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungLastMinute</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fruehbucherBis</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lastMinuteAb</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kannVorortBezahltWerden</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">hatGWarteliste</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteVeranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungAnmeldungen</strong></td>
<td valign="top"><a href="#_addveranstaltunganmeldungenpayload">_AddVeranstaltungAnmeldungenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_anmeldunginput">_AnmeldungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungAnmeldungen</strong></td>
<td valign="top"><a href="#_removeveranstaltunganmeldungenpayload">_RemoveVeranstaltungAnmeldungenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungVeranstaltungsort</strong></td>
<td valign="top"><a href="#_addveranstaltungveranstaltungsortpayload">_AddVeranstaltungVeranstaltungsortPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungVeranstaltungsort</strong></td>
<td valign="top"><a href="#_removeveranstaltungveranstaltungsortpayload">_RemoveVeranstaltungVeranstaltungsortPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltunginput">_VeranstaltungInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateVeranstaltungsOrt</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_max</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_min</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vollverpflegung</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">selbstversorger</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateVeranstaltungsOrt</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_max</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_min</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vollverpflegung</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">selbstversorger</td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteVeranstaltungsOrt</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtOrganisation</strong></td>
<td valign="top"><a href="#_addveranstaltungsortorganisationpayload">_AddVeranstaltungsOrtOrganisationPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtOrganisation</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortorganisationpayload">_RemoveVeranstaltungsOrtOrganisationPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtAdresse</strong></td>
<td valign="top"><a href="#_addveranstaltungsortadressepayload">_AddVeranstaltungsOrtAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtAdresse</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortadressepayload">_RemoveVeranstaltungsOrtAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtKontakte</strong></td>
<td valign="top"><a href="#_addveranstaltungsortkontaktepayload">_AddVeranstaltungsOrtKontaktePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtKontakte</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortkontaktepayload">_RemoveVeranstaltungsOrtKontaktePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortinput">_VeranstaltungsOrtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateVeranstaltungsOrtKontakt</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtKontaktID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">typ</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateVeranstaltungsOrtKontakt</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtKontaktID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">typ</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteVeranstaltungsOrtKontakt</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VeranstaltungsOrtKontaktID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtKontaktAdresse</strong></td>
<td valign="top"><a href="#_addveranstaltungsortkontaktadressepayload">_AddVeranstaltungsOrtKontaktAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtKontaktAdresse</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortkontaktadressepayload">_RemoveVeranstaltungsOrtKontaktAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtKontaktTelefon</strong></td>
<td valign="top"><a href="#_addveranstaltungsortkontakttelefonpayload">_AddVeranstaltungsOrtKontaktTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtKontaktTelefon</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortkontakttelefonpayload">_RemoveVeranstaltungsOrtKontaktTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVeranstaltungsOrtKontaktEmail</strong></td>
<td valign="top"><a href="#_addveranstaltungsortkontaktemailpayload">_AddVeranstaltungsOrtKontaktEmailPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVeranstaltungsOrtKontaktEmail</strong></td>
<td valign="top"><a href="#_removeveranstaltungsortkontaktemailpayload">_RemoveVeranstaltungsOrtKontaktEmailPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_veranstaltungsortkontaktinput">_VeranstaltungsOrtKontaktInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateOrganisation</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateOrganisation</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteOrganisation</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddOrganisationAdresse</strong></td>
<td valign="top"><a href="#_addorganisationadressepayload">_AddOrganisationAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveOrganisationAdresse</strong></td>
<td valign="top"><a href="#_removeorganisationadressepayload">_RemoveOrganisationAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddOrganisationTelefon</strong></td>
<td valign="top"><a href="#_addorganisationtelefonpayload">_AddOrganisationTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveOrganisationTelefon</strong></td>
<td valign="top"><a href="#_removeorganisationtelefonpayload">_RemoveOrganisationTelefonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_telefoninput">_TelefonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddOrganisationEmail</strong></td>
<td valign="top"><a href="#_addorganisationemailpayload">_AddOrganisationEmailPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveOrganisationEmail</strong></td>
<td valign="top"><a href="#_removeorganisationemailpayload">_RemoveOrganisationEmailPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_organisationinput">_OrganisationInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_emailinput">_EmailInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateAK</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">AKID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gehoertZu</td>
<td valign="top"><a href="#vgorec">vgORec</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateAK</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">AKID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gehoertZu</td>
<td valign="top"><a href="#vgorec">vgORec</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteAK</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">AKID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddAKPersonen</strong></td>
<td valign="top"><a href="#_addakpersonenpayload">_AddAKPersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_akinput">_AKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">data</td>
<td valign="top"><a href="#_personakinput">_PersonAKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveAKPersonen</strong></td>
<td valign="top"><a href="#_removeakpersonenpayload">_RemoveAKPersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_akinput">_AKInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateEcKreis</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">EcKreisID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateEcKreis</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">EcKreisID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteEcKreis</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">EcKreisID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddEcKreisVgGemeinde</strong></td>
<td valign="top"><a href="#_addeckreisvggemeindepayload">_AddEcKreisVgGemeindePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_eckreisinput">_EcKreisInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveEcKreisVgGemeinde</strong></td>
<td valign="top"><a href="#_removeeckreisvggemeindepayload">_RemoveEcKreisVgGemeindePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_eckreisinput">_EcKreisInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddEcKreisPersonen</strong></td>
<td valign="top"><a href="#_addeckreispersonenpayload">_AddEcKreisPersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_eckreisinput">_EcKreisInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveEcKreisPersonen</strong></td>
<td valign="top"><a href="#_removeeckreispersonenpayload">_RemoveEcKreisPersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_eckreisinput">_EcKreisInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateVGGemeinde</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VGGemeindeID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateVGGemeinde</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VGGemeindeID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">website</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteVGGemeinde</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">VGGemeindeID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVGGemeindeAdresse</strong></td>
<td valign="top"><a href="#_addvggemeindeadressepayload">_AddVGGemeindeAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVGGemeindeAdresse</strong></td>
<td valign="top"><a href="#_removevggemeindeadressepayload">_RemoveVGGemeindeAdressePayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_adresseinput">_AdresseInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddVGGemeindePersonen</strong></td>
<td valign="top"><a href="#_addvggemeindepersonenpayload">_AddVGGemeindePersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveVGGemeindePersonen</strong></td>
<td valign="top"><a href="#_removevggemeindepersonenpayload">_RemoveVGGemeindePersonenPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_vggemeindeinput">_VGGemeindeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateFZ</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">seenOn</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kommentar</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateFZ</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">seenOn</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kommentar</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteFZ</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddFZPerson</strong></td>
<td valign="top"><a href="#_addfzpersonpayload">_AddFZPersonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveFZPerson</strong></td>
<td valign="top"><a href="#_removefzpersonpayload">_RemoveFZPersonPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AddFZSeenBy</strong></td>
<td valign="top"><a href="#_addfzseenbypayload">_AddFZSeenByPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>RemoveFZSeenBy</strong></td>
<td valign="top"><a href="#_removefzseenbypayload">_RemoveFZSeenByPayload</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">from</td>
<td valign="top"><a href="#_personinput">_PersonInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">to</td>
<td valign="top"><a href="#_fzinput">_FZInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateFZAntrag</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">FZAntragID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">erstellt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateFZAntrag</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">FZAntragID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">erstellt</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteFZAntrag</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">FZAntragID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateAdresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">strasse</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">plz</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ort</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">land</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateAdresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">strasse</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">plz</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ort</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">land</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteAdresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateEmail</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateEmail</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteEmail</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>CreateTelefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateTelefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteTelefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>UpdateUser</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userName</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">pwdHash</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">salt</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ablaufDatum</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">role</td>
<td valign="top"><a href="#role">Role</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DeleteUser</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### AK

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AKID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gehoertZu</strong></td>
<td valign="top"><a href="#vgorec">vgORec</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#_akpersonen">_AKPersonen</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Adresse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>adressID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>strasse</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>plz</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ort</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>land</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Anmeldung

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### EcKreis

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>EcKreisID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>website</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vgGemeinde</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#person">Person</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_personordering">_PersonOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Email

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>emailID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### FZ

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>fzID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">Person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>seenBy</strong></td>
<td valign="top"><a href="#person">Person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>seenOn</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kommentar</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### FZAntrag

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>FZAntragID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Organisation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>organisationsID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ansprechpartner</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Person

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>personID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vorname</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nachname</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gebDat</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>geschlecht</strong></td>
<td valign="top"><a href="#geschlecht">Geschlecht</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentECState</strong></td>
<td valign="top"><a href="#ecmitglied">ECMitglied</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>juLeiCaNr</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fuehrerschein</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rettungsschwimmer</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ersteHilfe</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adressen</strong></td>
<td valign="top">[<a href="#_personadressen">_PersonAdressen</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emails</strong></td>
<td valign="top">[<a href="#_personemails">_PersonEmails</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top">[<a href="#_persontelefon">_PersonTelefon</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fzs</strong></td>
<td valign="top">[<a href="#fz">FZ</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_fzordering">_FZOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzterFzAntrag</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentVGState</strong></td>
<td valign="top"><a href="#vgmitglied">VGMitglied</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>aks</strong></td>
<td valign="top">[<a href="#_personaks">_PersonAks</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungen</strong></td>
<td valign="top">[<a href="#_personanmeldungen">_PersonAnmeldungen</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#personstatus">PersonStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dsgvo</strong></td>
<td valign="top"><a href="#dsgvostatus">DSGVOStatus</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteDSGVOAuskunft</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### PersonAK

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PersonAdresse

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PersonEmails

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PersonTelefon

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Telefon

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>telefonID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### User

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userID</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personID</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pwdHash</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>salt</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ablaufDatum</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>role</strong></td>
<td valign="top"><a href="#role">Role</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### VGGemeinde

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VGGemeindeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>website</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#person">Person</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_personordering">_PersonOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Veranstaltung

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kurzBezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungen</strong></td>
<td valign="top">[<a href="#_veranstaltunganmeldungen">_VeranstaltungAnmeldungen</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsort</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>begin</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ende</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minTNAlter</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>maxTNAlter</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anzahlPlaetze</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anzahlPlaetzeW</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anzahlPlaetzeM</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisFruehbucher</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisNormal</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisLastMinute</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisAnzahlungNormal</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisAnzahlungFruehbucher</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisAnzahlungLastMinute</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fruehbucherBis</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastMinuteAb</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kannVorortBezahltWerden</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hatGWarteliste</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### VeranstaltungsOrt

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrtID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organisation</strong></td>
<td valign="top"><a href="#organisation">Organisation</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anzahl_max</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anzahl_min</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vollverpflegung</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>selbstversorger</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kontakte</strong></td>
<td valign="top">[<a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">first</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">offset</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">orderBy</td>
<td valign="top"><a href="#_veranstaltungsortkontaktordering">_VeranstaltungsOrtKontaktOrdering</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### VeranstaltungsOrtKontakt

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrtKontaktID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ansprechpartner</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>typ</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>_id</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AKPersonen

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Person</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddAKPersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddEcKreisPersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddEcKreisVgGemeindePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddFZPersonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddFZSeenByPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddOrganisationAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddOrganisationEmailPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddOrganisationTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonAdressenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonAksPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonAnmeldungenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonEmailsPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonFzsPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonLetzterFzAntragPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddPersonTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVGGemeindeAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVGGemeindePersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungAnmeldungenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungVeranstaltungsortPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtKontaktAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtKontaktEmailPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtKontaktTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtKontaktePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
</tbody>
</table>

### _AddVeranstaltungsOrtOrganisationPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jDate

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jDateTime

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timezone</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jLocalDateTime

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jLocalTime

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jTime

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timezone</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonAdressen

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonAks

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdate">_Neo4jDate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>AK</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonAnmeldungen

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Veranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonEmails

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Email</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonTelefon

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveAKPersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveEcKreisPersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveEcKreisVgGemeindePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#eckreis">EcKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveFZPersonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveFZSeenByPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveOrganisationAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveOrganisationEmailPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveOrganisationTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonAdressenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonAksPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#ak">AK</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonAnmeldungenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonEmailsPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonFzsPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fz">FZ</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonLetzterFzAntragPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#fzantrag">FZAntrag</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemovePersonTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVGGemeindeAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVGGemeindePersonenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#vggemeinde">VGGemeinde</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungAnmeldungenPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungVeranstaltungsortPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltung">Veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtKontaktAdressePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#adresse">Adresse</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtKontaktEmailPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#email">Email</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtKontaktTelefonPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#telefon">Telefon</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtKontaktePayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#veranstaltungsortkontakt">VeranstaltungsOrtKontakt</a></td>
<td></td>
</tr>
</tbody>
</table>

### _RemoveVeranstaltungsOrtOrganisationPayload

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>from</strong></td>
<td valign="top"><a href="#veranstaltungsort">VeranstaltungsOrt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>to</strong></td>
<td valign="top"><a href="#organisation">Organisation</a></td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungAnmeldungen

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">Adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">Email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">Telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetime">_Neo4jDateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Person</strong></td>
<td valign="top"><a href="#person">Person</a></td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### _AKInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>AKID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _AdresseInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>adressID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _AnmeldungInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#position">Position</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vegetarisch</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lebensmittelAllergien</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesundheitsinformationen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bemerkungen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>radfahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fahrgemeinschaften</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>klettern</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>sichEntfernen</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bootFahren</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>schwimmen</strong></td>
<td valign="top"><a href="#schwimmen">Schwimmen</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _EcKreisInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>EcKreisID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _EmailInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>emailID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _FZAntragInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>FZAntragID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _FZInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>fzID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jDateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jDateTimeInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timezone</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jLocalDateTimeInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jLocalTimeInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _Neo4jTimeInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>hour</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>minute</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>second</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nanosecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>millisecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>microsecond</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>timezone</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>formatted</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### _OrganisationInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>organisationsID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _PersonAKInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#_neo4jdateinput">_Neo4jDateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#akstatus">AKStatus</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _PersonAdresseInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _PersonEmailsInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _PersonInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>personID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _PersonTelefonInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#_neo4jdatetimeinput">_Neo4jDateTimeInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _TelefonInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>telefonID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _UserInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>userID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _VGGemeindeInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VGGemeindeID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungsOrtInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrtID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungsOrtKontaktInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>VeranstaltungsOrtKontaktID</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Enums

### AKStatus

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>Ausgetreten</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Mitglied</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Vertreter</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Leiter</strong></td>
<td></td>
</tr>
</tbody>
</table>

### DSGVOStatus

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>normal</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>gesperrt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>pseudonymisiert</strong></td>
<td></td>
</tr>
</tbody>
</table>

### ECMitglied

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>KeinMitglied</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Mitglied</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Foerderer</strong></td>
<td></td>
</tr>
</tbody>
</table>

### Geschlecht

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>weiblich</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>maenlich</strong></td>
<td></td>
</tr>
</tbody>
</table>

### PersonStatus

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>lebend</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>tot</strong></td>
<td></td>
</tr>
</tbody>
</table>

### Position

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>Teilnehmer</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Mitarbeiter</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Kuechenmitarbeiter</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Kuechenleitung</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Leiter</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Hauptleiter</strong></td>
<td></td>
</tr>
</tbody>
</table>

### Role

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>none</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>admin</strong></td>
<td></td>
</tr>
</tbody>
</table>

### Schwimmen

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>NichtErlaubt</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>NichtSchwimmer</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>MittelmaessigerSchwimmer</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>GuterSchwimmer</strong></td>
<td></td>
</tr>
</tbody>
</table>

### VGMitglied

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>KeinMitglied</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Mitglied</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>Ausgetreten</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _AKOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>AKID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>AKID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _AdresseOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>adressID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>adressID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>strasse_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>strasse_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>plz_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>plz_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ort_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ort_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>land_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>land_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _EcKreisOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>EcKreisID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>EcKreisID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>website_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>website_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _EmailOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>emailID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>emailID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>email_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>email_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _FZAntragOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>FZAntragID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>FZAntragID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>erstellt_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>erstellt_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _FZOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>fzID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>fzID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>seenOn_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>seenOn_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kommentar_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kommentar_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _OrganisationOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>organisationsID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>organisationsID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ansprechpartner_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ansprechpartner_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _PersonOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>personID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>personID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>vorname_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>vorname_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>nachname_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>nachname_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>juLeiCaNr_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>juLeiCaNr_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>fuehrerschein_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>fuehrerschein_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>rettungsschwimmer_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>rettungsschwimmer_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ersteHilfe_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ersteHilfe_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _RelationDirections

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>IN</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>OUT</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _TelefonOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>telefonID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>telefonID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>telefon_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>telefon_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _UserOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>userID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>userID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>personID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>personID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>userName_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>userName_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>pwdHash_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>pwdHash_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>salt_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>salt_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ablaufDatum_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ablaufDatum_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _VGGemeindeOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>VGGemeindeID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VGGemeindeID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>website_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>website_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>VeranstaltungID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VeranstaltungID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kurzBezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kurzBezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>minTNAlter_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>minTNAlter_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>maxTNAlter_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>maxTNAlter_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetze_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetze_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetzeW_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetzeW_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetzeM_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahlPlaetzeM_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisFruehbucher_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisFruehbucher_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisNormal_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisNormal_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisLastMinute_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisLastMinute_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungNormal_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungNormal_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungFruehbucher_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungFruehbucher_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungLastMinute_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>preisAnzahlungLastMinute_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>fruehbucherBis_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>fruehbucherBis_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>lastMinuteAb_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>lastMinuteAb_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kannVorortBezahltWerden_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>kannVorortBezahltWerden_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>hatGWarteliste_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>hatGWarteliste_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungsOrtKontaktOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>VeranstaltungsOrtKontaktID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VeranstaltungsOrtKontaktID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ansprechpartner_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>ansprechpartner_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>typ_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>typ_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### _VeranstaltungsOrtOrdering

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>VeranstaltungsOrtID_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VeranstaltungsOrtID_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>bezeichnung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>notizen_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahl_max_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahl_max_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahl_min_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>anzahl_min_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>vollverpflegung_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>vollverpflegung_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>selbstversorger_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>selbstversorger_desc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_asc</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>_id_desc</strong></td>
<td></td>
</tr>
</tbody>
</table>

### vgORec

<table>
<thead>
<th align="left">Value</th>
<th align="left">Description</th>
</thead>
<tbody>
<tr>
<td valign="top"><strong>VG</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>EC</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VGundEC</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

