---   
sidebar: auto   
---  
# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Objects](#objects)
    * [DateType](#datetype)
    * [Serienbrief](#serienbrief)
    * [TimeStampType](#timestamptype)
    * [adresse](#adresse)
    * [ak](#ak)
    * [akStatus](#akstatus)
    * [alert](#alert)
    * [anmeldeReturn](#anmeldereturn)
    * [anmeldung](#anmeldung)
    * [dublikate](#dublikate)
    * [ecKreis](#eckreis)
    * [email](#email)
    * [field](#field)
    * [fz](#fz)
    * [fzAntrag](#fzantrag)
    * [mutationRoot](#mutationroot)
    * [oraType](#oratype)
    * [person](#person)
    * [personenAK](#personenak)
    * [telefon](#telefon)
    * [user](#user)
    * [userGroup](#usergroup)
    * [vOrtKontakt](#vortkontakt)
    * [veranstaltung](#veranstaltung)
    * [vorteType](#vortetype)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
    * [Float](#float)
    * [Int](#int)
    * [String](#string)

</details>

## Query (rootQuery)
Hauptabfrage Objekt

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
<td colspan="2" valign="top"><strong>ecKreise</strong></td>
<td valign="top">[<a href="#eckreis">ecKreis</a>]</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serienbriefe</strong></td>
<td valign="top">[<a href="#serienbrief">Serienbrief</a>]</td>
<td>

Returnt Liste der serienbriefen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serienbrief</strong></td>
<td valign="top"><a href="#serienbrief">Serienbrief</a></td>
<td>

serienbrief mit einer bestimmten ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sbID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der serienbriefen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>alerts</strong></td>
<td valign="top">[<a href="#alert">alert</a>]</td>
<td>

Gibt liste der Letzten 10 Alerts aus.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getDSE</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Ausgabe der DSE für eine bestimmten User

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">force</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Zwingen die aktuelle DSE anzuzeigen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#person">person</a>]</td>
<td>

Returnt Liste von Personen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a></td>
<td>

Returnt gewählte Person anhand der genannten ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der abgefragten Person.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>moeglicheDublikate</strong></td>
<td valign="top">[<a href="#dublikate">dublikate</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungen</strong></td>
<td valign="top">[<a href="#veranstaltung">veranstaltung</a>]</td>
<td>

Returnt Liste der Veranstaltungen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">veranstaltung</a></td>
<td>

Veranstaltung mit einer bestimmten ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der Veranstaltungen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>aks</strong></td>
<td valign="top">[<a href="#ak">ak</a>]</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top"><a href="#ak">ak</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungen</strong></td>
<td valign="top">[<a href="#anmeldung">anmeldung</a>]</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldung</strong></td>
<td valign="top"><a href="#anmeldung">anmeldung</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeStatus</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">isWP</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>users</strong></td>
<td valign="top">[<a href="#user">user</a>]</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userGroups</strong></td>
<td valign="top">[<a href="#usergroup">userGroup</a>]</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getMyUserData</strong></td>
<td valign="top"><a href="#user">user</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vorte</strong></td>
<td valign="top">[<a href="#vortetype">vorteType</a>]</td>
<td>

Returnt Liste der vorteen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>vort</strong></td>
<td valign="top"><a href="#vortetype">vorteType</a></td>
<td>

vorte mit einer bestimmten ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der vorteen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orgas</strong></td>
<td valign="top">[<a href="#oratype">oraType</a>]</td>
<td>

Returnt Liste der vorteen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>orga</strong></td>
<td valign="top"><a href="#oratype">oraType</a></td>
<td>

vorte mit einer bestimmten ID

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der vorteen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
</tbody>
</table>

## Objects

### DateType

Ein Datum

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
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Tag des Datums.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Monat des Datums.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Jahr des Datum.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>german</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

TT.MM.YYYY layout des Datum.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>input</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

YYYY-MM-TT layout des Datum.

</td>
</tr>
</tbody>
</table>

### Serienbrief

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
<td colspan="2" valign="top"><strong>sbID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>docxDocument</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>geschlechterspizifischeAttribute</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### TimeStampType

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
<td colspan="2" valign="top"><strong>day</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>h</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>min</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>s</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>german</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### adresse

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
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" valign="top"><strong>isOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### ak

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
<td colspan="2" valign="top"><strong>akID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#personenak">personenAK</a>]</td>
<td></td>
</tr>
</tbody>
</table>

### akStatus

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
<td colspan="2" valign="top"><strong>akPersonID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top"><a href="#ak">ak</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>date</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>neuerStatus</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### alert

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
<td colspan="2" valign="top"><strong>alertID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>content</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>von</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### anmeldeReturn

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
<td colspan="2" valign="top"><strong>status</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeID</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### anmeldung

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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">veranstaltung</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>position</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adresse</strong></td>
<td valign="top"><a href="#adresse">adresse</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#email">email</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#telefon">telefon</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wartelistenPlatz</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bisherBezahlt</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>abmeldeZeitpunkt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>abmeldeGebuehr</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>wegDerAbmeldung</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rueckbezahlt</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kommentarAbmeldung</strong></td>
<td valign="top"><a href="#string">String</a></td>
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
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>DSGVO_einverstaendnis</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extra_json</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### dublikate

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
<td colspan="2" valign="top"><strong>personA</strong></td>
<td valign="top"><a href="#person">person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>personB</strong></td>
<td valign="top"><a href="#person">person</a></td>
<td></td>
</tr>
</tbody>
</table>

### ecKreis

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
<td colspan="2" valign="top"><strong>ecKreisID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
</tbody>
</table>

### email

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
<td colspan="2" valign="top"><strong>eMailID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>eMail</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### field

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
<td colspan="2" valign="top"><strong>table</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>field</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### fz

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
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesehenVon</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fzVon</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gesehenAm</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kommentar</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### fzAntrag

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
<td colspan="2" valign="top"><strong>fzAntragID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erzeugt</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
<td></td>
</tr>
</tbody>
</table>

### mutationRoot

Mutationen Objekt

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
<td colspan="2" valign="top"><strong>logOut</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td>

Abmelden

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logIn</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Anmelden

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Benutzername

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Passwort

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">version</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Version der APP

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addUser</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Benutzer hinzufügen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">username</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Benutzername

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

E-Mail an die das Passwort gesendet wird

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Person die dem User zugeordnet wird

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userGroupID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der Benutzergruppe (Rechte).

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ablaufDatum</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Zeitpunkt an dem der User ungültig wird

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editUser</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Benutzer editieren

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Welcher Benutzer soll editiert werden

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userGroupID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der neuen Benutzergruppe

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ablaufDatum</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Von Zeitpunkt an dem der User ungültig wird

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteUser</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Benutzer löschen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID des Benutzer

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>passwordWechseln</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Passwort wechseln

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">oldPWD</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Altes Passwort

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">newPWD</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Neues Passwort

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>acceptsDSE</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Datenschutzhinweise akzeptieren

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addDSE</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Neue Datenschutz

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">text</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

HTML der Datenschutzhinweise

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>feedback</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesamt</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">handhabung</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">funktionswunsch</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bug</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sonstiges</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAlert</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Meldung in Dashboard hinzufügen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">msg</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Nachricht die angezeigt werden soll

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">von</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Autor der Nachricht

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>useAdresse</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Update last Used of Adress

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Adresse

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>markAdressAsOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Set Adress as OLD

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Adresse

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>useEmail</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Update last Used of Email

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Email

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>markEmailAsOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Set Email as OLD

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Email

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>useTelefon</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Update last Used of Telefon

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Telfonnummer

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>markTelefonAsOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Set Telefon as OLD

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der benutzen Telfonnummer

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAdresse</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">strasse</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">plz</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ort</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addEmail</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addTelefon</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editAdresse</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">strasse</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">plz</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ort</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editEmail</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editTelefon</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteAdresse</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Löschen einer Adresse

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteEMail</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Löschen einer Adresse

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteTelefon</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Löschen einer Adresse

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editPersonStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vorname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">nachname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebDat</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addPerson</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vorname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">nachname</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebDat</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addFZ</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenAm</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzVon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenVon</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kommentar</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addFZAntrag</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editSonstiges</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">juLeiCaNr</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ecMitglied</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ecKreis</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">Fuehrerschein</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">Rettungsschwimmer</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ErsteHilfe</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateAKStatus</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">date</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">status</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mergePersons</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_richtig</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_falsch</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>noMerge</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_1</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_2</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAK</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editAK</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Comming Soon...

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addOrganisation</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editOrganisation</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
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
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungAdd</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">begin</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsortID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsortID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenPreise</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisFruehbucher</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungFruehbucher</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisNormal</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisAnzahlungNormal</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisLastMinute</td>
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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lastMinuteAb</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kannVorortBezahltWerden</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenWarteliste</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">hatGeschlechterSpezifischeWarteliste</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetze</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeM</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahlPlaetzeW</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenTNListeZuschuesse</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">xlsx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenTNListeLeiter</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">xlsx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenTNListeMitarbeiter</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">xlsx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungenTNListeKueche</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">xlsx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungBestaetigungsbrief</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">brief</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlechter</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltunginfobrief</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">brief</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlechter</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addVeranstaltungsort</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsortEditStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">organisationsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsortEditSonstiges</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_min</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anzahl_max</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">selbstversorger</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vollverpflegung</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsortAddKontakt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">typ</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsortEditKontakt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtKontaktID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ansprechpartner</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">typ</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsortDeleteKontakt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vOrtKontaktID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungBesonderheiten</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vegetarisch</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lebensmittelAllergien</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesundheitsinformationen</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bemerkungen</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungBezahlt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">betrag</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungRueckbezahlt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">betrag</td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungKontakt</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>abmelden</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gebuehr</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">weg</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">kommentar</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>nachruecken</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmelden</strong></td>
<td valign="top"><a href="#anmeldereturn">anmeldeReturn</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">isWP</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">token</td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">position</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">eMail</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td colspan="2" align="right" valign="top">anmeldeZeitpunkt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">vegetarisch</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lebensmittelAllergien</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesundheitsinformationen</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bemerkungen</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">radfahren</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">schwimmen</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fahrgemeinschaften</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">klettern</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sichEntfernen</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bootFahren</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">extra_json</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungBestaetigungsbrief</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldunginfobrief</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">anmeldeID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serienbriefAdd</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">docx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>serienbriefEdit</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">sbID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">docx</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">geschlecht</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Authentifizierungs-Token

</td>
</tr>
</tbody>
</table>

### oraType

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
<td colspan="2" valign="top"><strong>vOrte</strong></td>
<td valign="top">[<a href="#vortetype">vorteType</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>strasse</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>plz</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ort</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>land</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### person

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
<td valign="top"><a href="#int">Int</a>!</td>
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
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>geschlecht</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>alter</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">wann</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>adressen</strong></td>
<td valign="top">[<a href="#adresse">adresse</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>emails</strong></td>
<td valign="top">[<a href="#email">email</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefone</strong></td>
<td valign="top">[<a href="#telefon">telefon</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungen</strong></td>
<td valign="top">[<a href="#anmeldung">anmeldung</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fzs</strong></td>
<td valign="top">[<a href="#fz">fz</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fzAntraege</strong></td>
<td valign="top">[<a href="#fzantrag">fzAntrag</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datumDesLetztenFZ</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>hatFZ</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">wann</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>juLeiCaNr</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ecKreis</strong></td>
<td valign="top"><a href="#eckreis">ecKreis</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ecMitglied</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top">[<a href="#personenak">personenAK</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bisherigeRollen</strong></td>
<td valign="top">[<a href="#int">Int</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Fuehrerschein</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Rettungsschwimmer</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ErsteHilfe</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>Notizen</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderung</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### personenAK

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
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top"><a href="#ak">ak</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>currentStatus</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>allUpdates</strong></td>
<td valign="top">[<a href="#akstatus">akStatus</a>]</td>
<td></td>
</tr>
</tbody>
</table>

### telefon

Telefonnummer

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
<td valign="top"><a href="#int">Int</a>!</td>
<td>

ID der Telefonnummer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td>

Telefonnummer

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isOld</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastUsed</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### user

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
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ablaufDatum</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userGroup</strong></td>
<td valign="top"><a href="#usergroup">userGroup</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### userGroup

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
<td colspan="2" valign="top"><strong>userGroupID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mutationRechte</strong></td>
<td valign="top">[<a href="#string">String</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fieldAccess</strong></td>
<td valign="top">[<a href="#field">field</a>]</td>
<td></td>
</tr>
</tbody>
</table>

### vOrtKontakt

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
<td colspan="2" valign="top"><strong>vOrtKontaktID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### veranstaltung

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
<td colspan="2" valign="top"><strong>veranstaltungsID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td valign="top">[<a href="#anmeldung">anmeldung</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungsort</strong></td>
<td valign="top"><a href="#vortetype">vorteType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>begin</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ende</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
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
<td valign="top"><a href="#datetype">DateType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastMinuteAb</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
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
<td colspan="2" valign="top"><strong>xlsxZuschuesse</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>xlsxLeiter</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>xlsxMitarbeiter</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>xlsxKueche</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBrief</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>infoBriefGeschlecht</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBrief</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bestaetigungsBriefGeschlecht</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### vorteType

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
<td colspan="2" valign="top"><strong>vOrtID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungen</strong></td>
<td valign="top">[<a href="#veranstaltung">veranstaltung</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>organisation</strong></td>
<td valign="top"><a href="#oratype">oraType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>bezeichnung</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top">[<a href="#vortkontakt">vOrtKontakt</a>]</td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

