# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

  * [Query](#query)
  * [Objects](#objects)
    * [DateType](#datetype)
    * [TimeStampType](#timestamptype)
    * [adresse](#adresse)
    * [ak](#ak)
    * [akPerson](#akperson)
    * [anmeldung](#anmeldung)
    * [ecKreis](#eckreis)
    * [email](#email)
    * [field](#field)
    * [fz](#fz)
    * [fzAntrag](#fzantrag)
    * [mutationRoot](#mutationroot)
    * [person](#person)
    * [telefon](#telefon)
    * [unterkunft](#unterkunft)
    * [user](#user)
    * [userGroup](#usergroup)
    * [veranstaltung](#veranstaltung)
    * [verteiler](#verteiler)
    * [verteilerPersonen](#verteilerpersonen)
  * [Scalars](#scalars)
    * [Boolean](#boolean)
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
<td colspan="2" valign="top"><strong>personen</strong></td>
<td valign="top">[<a href="#person">person</a>]</td>
<td>

Returnt Liste von Personen

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltung</strong></td>
<td valign="top"><a href="#veranstaltung">veranstaltung</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">veranstaltungsID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>aks</strong></td>
<td valign="top">[<a href="#ak">ak</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top"><a href="#ak">ak</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>verteilerList</strong></td>
<td valign="top">[<a href="#verteiler">verteiler</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>verteiler</strong></td>
<td valign="top"><a href="#verteiler">verteiler</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>unterkuenfte</strong></td>
<td valign="top">[<a href="#unterkunft">unterkunft</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>unterkunft</strong></td>
<td valign="top"><a href="#unterkunft">unterkunft</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">unterkunftID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldung</strong></td>
<td valign="top"><a href="#anmeldung">anmeldung</a></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>users</strong></td>
<td valign="top">[<a href="#user">user</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top">[<a href="#user">user</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userGroups</strong></td>
<td valign="top">[<a href="#usergroup">userGroup</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>userGroup</strong></td>
<td valign="top"><a href="#usergroup">userGroup</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">userGroupID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getMyUserData</strong></td>
<td valign="top"><a href="#user">user</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>input</strong></td>
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
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>month</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>year</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>h</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>min</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>s</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>german</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderung</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td valign="top">[<a href="#akperson">akPerson</a>]</td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### akPerson

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
<td colspan="2" valign="top"><strong>personAKID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ak</strong></td>
<td valign="top"><a href="#ak">ak</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>eintritt</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>austritt</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>leiter</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderung</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>ansprechPartner</strong></td>
<td valign="top"><a href="#person">person</a></td>
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
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderung</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>emailID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>gesehenAm</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kommentar</strong></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>sended</strong></td>
<td valign="top"><a href="#datetype">DateType</a></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### mutationRoot

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
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>logIn</strong></td>
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
<td colspan="2" valign="top"><strong>addPerson</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAK</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addVerteiler</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">autoSql</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addVeranstaltung</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">beginn</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">unterkunft</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addUnterkunft</strong></td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editPersonStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editAKStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editVerteilerStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">bezeichnung</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">autoSql</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editUnterkunftStamm</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">unterkunftID</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editVeranstaltungsStamm</strong></td>
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
<td colspan="2" align="right" valign="top">begin</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ende</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">unterkunft</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAKPerson</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">eintritt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">leiter</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editAKPerson</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personAKID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">akID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">eintritt</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">austritt</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">leiter</td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addVerteilerPerson</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteVerteilerPerson</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerPersonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editVerteilerPerson</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerPersonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">verteilerID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">type</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addAdresse</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addEmail</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addTelefon</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editAdresse</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">adressID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editEmail</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">emailID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editTelefon</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefonID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">telefon</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>addFZ</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenAm</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenVon</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editFZ</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">fzID</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenAm</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">gesehenVon</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editPersonSonstiges</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">juLeiCaNr</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ecKreis</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">ecMitglied</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editUnterkunftSonstiges</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">unterkunftID</td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" align="right" valign="top">kontaktPerson</td>
<td valign="top"><a href="#int">Int</a></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>editVeranstaltungSonstiges</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
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
<td colspan="2" align="right" valign="top">maxTNAnzahl</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">maxWeiblichTNAnzahl</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">maxMaennlichTNAnzahl</td>
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
<td colspan="2" align="right" valign="top">preisFruehbucherBis</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">preisLastMinuteAb</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">notizen</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">extraFelderAnmeldung</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>pseudonymisieren</strong></td>
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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>mergePersons</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_richtig</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">personID_falsch</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">authToken</td>
<td valign="top"><a href="#string">String</a>!</td>
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
<td valign="top"><a href="#int">Int</a></td>
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
<td colspan="2" valign="top"><strong>aks</strong></td>
<td valign="top">[<a href="#akperson">akPerson</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>verteiler</strong></td>
<td valign="top">[<a href="#verteilerpersonen">verteilerPersonen</a>]</td>
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
<td colspan="2" valign="top"><strong>erstellt</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderung</strong></td>
<td valign="top"><a href="#timestamptype">TimeStampType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### telefon

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
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>telefon</strong></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### unterkunft

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
<td colspan="2" valign="top"><strong>unterkunftID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<td colspan="2" valign="top"><strong>telefon</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>kontaktPerson</strong></td>
<td valign="top"><a href="#person">person</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>veranstaltungen</strong></td>
<td valign="top">[<a href="#veranstaltung">veranstaltung</a>]</td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
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
<td colspan="2" valign="top"><strong>unterkunft</strong></td>
<td valign="top"><a href="#unterkunft">unterkunft</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>anmeldungen</strong></td>
<td valign="top">[<a href="#anmeldung">anmeldung</a>]</td>
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
<td colspan="2" valign="top"><strong>maxTNAnzahl</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>maxWeiblichTNAnzahl</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>maxMaennlichTNAnzahl</strong></td>
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
<td colspan="2" valign="top"><strong>preisFruehbucherBis</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>preisLastMinuteAb</strong></td>
<td valign="top"><a href="#datetype">DateType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>notizen</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>extraFelderAnmeldung</strong></td>
<td valign="top"><a href="#string">String</a></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### verteiler

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
<td colspan="2" valign="top"><strong>verteilerID</strong></td>
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
<td valign="top">[<a href="#verteilerpersonen">verteilerPersonen</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isAuto</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>autoSQL</strong></td>
<td valign="top"><a href="#string">String</a></td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### verteilerPersonen

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
<td colspan="2" valign="top"><strong>verteilerPersonenID</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>verteiler</strong></td>
<td valign="top"><a href="#verteiler">verteiler</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>person</strong></td>
<td valign="top"><a href="#person">person</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
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
<tr>
<td colspan="2" valign="top"><strong>erstelltVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>letzteAenderungVon</strong></td>
<td valign="top"><a href="#user">user</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

