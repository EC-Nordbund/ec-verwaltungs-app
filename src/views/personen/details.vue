<template>
  <div>
    <v-toolbar tabs>
      <ec-button-router-back/>
      <v-spacer/>
      <ec-headline>
        <v-avatar :style="{ background: (data.person.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }">
          <span class="headline" v-white>
            {{(data.person.vorname || ' ')[0]}}{{(data.person.nachname || ' ')[0]}}
          </span>
        </v-avatar>
        {{data.person.vorname || ''}} {{data.person.nachname || ''}} ({{data.person.gebDat ? data.person.gebDat.german : ''}})
      </ec-headline>
      <v-spacer/>
      <v-btn v-if="isElectron" color="primary" @click="auskunftsRecht">Auskunftsrecht</v-btn>
      <ec-button-icon @click="editPersonStamm_show = true"/>
      <v-tabs v-model="tabs" fixed-tabs slot="extension">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>Kontaktdaten</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>Anmeldungen</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          <v-icon v-accent>extension</v-icon>
          <v-spacer/>
          <span>Sonstiges</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="tab-2">
        <v-card>
          <!-- Adressen -->
          <ec-list
            :items="data.person.adressen || []"
            :mapper="item=>({title: item.strasse, subTitle: item.plz + ' ' + item.ort})"
            icon="location_on"
            :edit="auth.isMutationAllowed('editAdresse')"
            @edit="editAdresse_open"
          />
          <v-divider/>
          <!-- Email -->
          <ec-list
            :items="data.person.emails || []"
            :mapper="item=>({title: item.email})"
            icon="mail"
            :edit="auth.isMutationAllowed('editEmail')"
            @edit="editEmail_open"
          />
          <v-divider/>
          <!-- Telefone -->
          <ec-list
            :items="data.person.telefone || []"
            :mapper="item=>({title: item.telefon})"
            icon="local_phone"
            :edit="auth.isMutationAllowed('editTelefon')"
            @edit="editTelefon_open"
          />
          <!-- Add Adresse, Email, Telefon -->
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="addAdresse_show = true" v-if="auth.isMutationAllowed('addAdresse')">
              <v-icon>add</v-icon>
              Adresse
            </v-btn>
            <v-btn flat @click="addEmail_show = true" v-if="auth.isMutationAllowed('addEmail')">
              <v-icon>add</v-icon>
              Email
            </v-btn>
            <v-btn flat @click="addTelefon_show = true" v-if="auth.isMutationAllowed('addTelefon')">
              <v-icon>add</v-icon>
              Telefon
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item id="tab-3">
        <!-- Anmeldungen -->
        <ec-list
          :items="data.person.anmeldungen || []"
          :mapper="item=>({
            title: `${item.veranstaltung.bezeichnung} (${item.veranstaltung.begin.german} - ${item.veranstaltung.ende.german})`,
            subTitle: `${item.position === 1 ? 'Teilnehmer' : ''}${item.position === 2 ? 'Mitarbeiter' : ''}${item.position === 3 ? 'Küchenmitarbeiter' : ''}${item.position === 5 ? 'Küchenleiter' : ''}${item.position === 6 ? 'Leiter' : ''}`
          })"
          icon="local_phone"
        />
      </v-tab-item>
      <v-tab-item id="tab-4">
        <v-card>
          <v-expansion-panel> 
            <v-expansion-panel-content ripple>
              <div slot="header">Arbeitskreise</div>
              <ec-list
                :items="data.person.aks || []"
                :mapper="item=>({
                  title: `${item.ak.bezeichnung}`,
                  subTitle: `${item.eintritt.german}${item.austritt === null?'':' - ' + item.austritt.german}${item.leiter?' (Leiter)':''}`
                })"
                icon="map"
                @edit="editAK_open"
                :edit="auth.isMutationAllowed('editAKPerson')"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Verteiler</div>
              <ec-list
                :items="data.person.verteiler || []"
                :mapper="item=>({
                  title: `${item.verteiler.bezeichnung}`,
                  subTitle: `${item.type===1?'TO':''}${item.type===2?'CC':''}${item.type===3?'BCC':''}`,
                  edit: item.verteiler.isAuto && auth.isMutationAllowed('editVerteilerPerson')
                })"
                icon="mail"
                @edit="editVerteiler_open"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Führungszeungniss Anträge</div>
              <v-card>
                Comming soon...
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Führungszeungnisse</div>
              <ec-list
                :items="data.person.fzs || []"
                :mapper="(item)=>({
                  title: item.kommentar,
                  subTitle: `Gesehen am ${item.gesehenAm.german} von ${item.gesehenVon.vorname} ${item.gesehenVon.nachname}`
                })"
                :edit="true"
                icon="extension"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Sonstiges</div>
              <ec-list
                :items="data.person !== {} ? [{title: data.person.juLeiCaNr, subTitle: 'JuLeiCa'}] : []"
                :mapper="item=>item"
                icon="extension"
                :edit="true"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Add AK, Verteiler, FZ, FZ-Antrag -->
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="addAK_show = true" v-if="auth.isMutationAllowed('addAKPerson')">
              <v-icon>add</v-icon>
              Arbeitskreis
            </v-btn>
            <v-btn flat @click="addVerteiler_show = true" v-if="auth.isMutationAllowed('addVerteilerPerson')">
              <v-icon>add</v-icon>
              Verteiler
            </v-btn>
            <v-btn flat @click="addPersonFZ_show = true" v-if="true">
              <v-icon>add</v-icon>
              Führungszeugnis
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- ADD Adresse -->
    <ec-form
      title="Adresse hinzufügen"
      v-model="addAdresse_show"
      @save="addAdresse_save"
      :fieldConfig="addAdresse_config"
    />
    <!-- ADD Telefon -->
    <ec-form
      title="Telefon hinzufügen"
      v-model="addTelefon_show"
      @save="addTelefon_save"
      :fieldConfig="addTelefon_config"
    />
    <!-- ADD Email -->
    <ec-form
      title="Email hinzufügen"
      v-model="addEmail_show"
      @save="addEmail_save"
      :fieldConfig="addEmail_config"
    />
    <!-- EDIT Adresse -->
    <ec-form
      title="Adresse editieren"
      v-model="editAdresse_show"
      @save="editAdresse_save"
      :value="editAdresse_value"
      :fieldConfig="addAdresse_config"
    />
    <!-- EDIT Telefon -->
    <ec-form
      title="Telefon editieren"
      v-model="editTelefon_show"
      @save="editTelefon_save"
      :value="editTelefon_value"
      :fieldConfig="addTelefon_config"
    />
    <!-- EDIT Email -->
    <ec-form
      title="Email editieren"
      v-model="editEmail_show"
      @save="editEmail_save"
      :value="editEmail_value"
      :fieldConfig="addEmail_config"
    />
    <!-- ADD AK -->
    <ec-form
      title="Zu AK hinzufügen"
      v-model="addAK_show"
      @save="addAK_save"
      :fieldConfig="addAK_config"
    />
    <!-- EDIT AK -->
    <ec-form
      title="AK-Zugehörigkeit editieren"
      v-model="editAK_show"
      @save="editAK_save"
      :fieldConfig="editAK_config"
      :value="editAK_value"
    />
    <!-- ADD Verteiler -->
    <ec-form
      title="ZuVerteiler hinzufügen"
      v-model="addVerteiler_show"
      @save="addVerteiler_save"
      :fieldConfig="addVerteiler_config"
    />
    <!-- EDIT Verteiler -->
    <ec-form
      title="Verteiler-Zugehörigkeit editieren"
      deleteBtn
      @delete="editVerteiler_delete"
      v-model="editVerteiler_show"
      @save="editVerteiler_save"
      :fieldConfig="addVerteiler_config"
      :value="editVerteiler_value"
    />
    <!-- EDIT PersonStamm -->
    <ec-form
      title="Personenstamm editieren"
      v-model="editPersonStamm_show"
      @save="editPersonStamm_save"
      :fieldConfig="editPersonStamm_config"
    />
  </div>
</template>
<script lang="ts">
import electron, { isElectron } from '@/plugins/electron';
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader';
import gql from 'graphql-tag';

import auth from '@/plugins/auth';

@Component({})
export default class PersonenDetails extends reloaderBase {
  isElectron: boolean = isElectron;
  data: { person: any } = {
    person: {}
  };
  editPersonStamm_show = false;
  editPersonStamm_save() {}
  editPersonStamm_config = [
    {
      label: 'Vorname',
      name: 'vorname',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst einen Vornamen angeben!' : true,
        (v: string) =>
          v && v.length > 50
            ? 'Der Vorname darf nicht länger als 50 Zeichen sein!'
            : true
      ],
      counter: 50
    },
    {
      label: 'Nachname',
      name: 'nachname',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst einen Nachname angeben!' : true,
        (v: string) =>
          v && v.length > 50
            ? 'Der Nachname darf nicht länger als 50 Zeichen sein!'
            : true
      ],
      counter: 50
    },
    {
      label: 'Geburtsdatum',
      name: 'gebDat',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst ein Geburtsdatum angeben!' : true
      ],
      componentName: 'ec-form-datePicker'
    },
    {
      label: 'Geschecht',
      name: 'geschlecht',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst ein Geschlecht angeben!' : true
      ],
      componentName: 'ec-radio-geschlecht'
    }
  ];
  auskunftsRechtContent = {};
  auskunftsRecht_show = false;
  addVerteiler_show = false;
  addVerteiler_config = [
    {
      name: 'verteiler',
      label: 'Verteiler auswählen',
      componentName: 'ec-select-verteiler'
    },
    {
      name: 'type',
      label: 'Type'
      // componentName: 'ec-select-type',
    }
  ];
  editVerteiler_show = false;
  editVerteiler_value = {};
  addAK_show = false;
  editAK_show = false;
  addAK_config = [
    {
      name: 'ak',
      label: 'Wähle einen Arbeitskreis',
      componentName: 'ec-select-ak',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Arbeitskreis gewählt werden!'
            : true
      ],
      required: true
    },
    {
      name: 'eintritt',
      label: 'Eintritt',
      componentName: 'ec-form-datePicker',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Eintrittsdatum angegeben werden!'
            : true
      ],
      required: true
    },
    {
      name: 'leiter',
      label: 'Leiter',
      componentName: 'ec-form-checkbox'
    }
  ];
  editAK_config = [
    {
      name: 'ak',
      label: 'Wähle einen Arbeitskreis',
      componentName: 'ec-select-ak',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Arbeitskreis gewählt werden!'
            : true
      ],
      required: true,
      disabled: true
    },
    {
      name: 'eintritt',
      label: 'Eintritt',
      componentName: 'ec-form-datePicker',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Eintrittsdatum angegeben werden!'
            : true
      ],
      required: true
    },
    {
      name: 'austritt',
      label: 'Austritt',
      componentName: 'ec-form-datePicker'
    },
    {
      name: 'leiter',
      label: 'Leiter',
      componentName: 'ec-form-checkbox'
    }
  ];
  editAK_value = {};
  editTelefon_show = false;
  editEmail_show = false;
  editAdresse_show = false;
  editTelefon_value = {};
  editEmail_value = {};
  editAdresse_value = {};
  addTelefon_show = false;
  addTelefon_config = [
    {
      name: 'telefon',
      label: 'Telefon',
      counter: 20,
      required: true,
      rules: [
        (v: string) =>
          !v
            ? 'Es muss eine Telefonnummer angegeben werden!'
            : true,
        (v: string) =>
          v && v.length > 20
            ? 'Die Telefonnummer darf maximal 20 Zeichen lang sein!'
            : true
      ]
    }
  ];
  addEmail_show = false;
  addEmail_config = [
    {
      name: 'email',
      label: 'E-Mail',
      counter: 20,
      required: true,
      rules: [
        (v: string) =>
          !v
            ? 'Es muss eine E-Mail angegeben werden!'
            : true,
        (v: string) =>
          v && v.length > 20
            ? 'Die Mail darf maximal 20 Zeichen lang sein!'
            : true
      ]
    }
  ];
  addAdresse_show = false;
  addAdresse_config = [
    {
      name: 'strasse',
      label: 'Straße',
      counter: 50,
      required: true,
      rules: [
        (v: string) =>
          !v
            ? 'Es muss eine Straße angegeben werden!'
            : true,
        (v: string) =>
          v && v.length > 50
            ? 'Die Straße darf maximal 50 Zeichen lang sein!'
            : true
      ]
    },
    {
      name: 'plz',
      label: 'PostLeitZahl',
      counter: 5,
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Es muss eine PLZ angegeben werden!' : true,
        (v: string) =>
          v && v.length !== 5
            ? 'Die Straße PLZ muss genau 5 Zeichen lang sein!'
            : true
      ]
    },
    {
      name: 'ort',
      label: 'Ort',
      counter: 50,
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Es muss ein Ort angegeben werden!' : true,
        (v: string) =>
          v && v.length > 50
            ? 'Der Ort darf maximal 50 Zeichen lang sein!'
            : true
      ]
    }
  ];
  tabs = null;
  auskunftsRecht() {
    (<any>this.$apollo)
      .getClient()
      .query({
        query: gql`
          query($authToken: String!, $personID: Int!) {
            person(
              authToken: $authToken
              personID: $personID
            ) {
              vorname
              nachname
              gebDat {
                german
              }
              alter
              geschlecht
              juLeiCaNr
              adressen {
                strasse
                plz
                ort
                letzteAenderung {
                  german
                }
                erstellt {
                  german
                }
              }
              emails {
                email
                letzteAenderung {
                  german
                }
                erstellt {
                  german
                }
              }
              telefone {
                telefon
                letzteAenderung {
                  german
                }
                erstellt {
                  german
                }
              }
              anmeldungen {
                veranstaltung {
                  bezeichnung
                  begin {
                    german
                  }
                  ende {
                    german
                  }
                }
                position
                #letzteAenderung {
                #  german
                #}
                #erstellt {
                #  german
                #}
              }
              fzs {
                gesehenAm {
                  german
                }
                gesehenVon {
                  vorname
                  nachname
                }
                kommentar
                #letzteAenderung {
                #  german
                #}
                #erstellt {
                #  german
                #}
              }
              aks {
                eintritt {
                  german
                }
                austritt {
                  german
                }
                leiter
                ak {
                  bezeichnung
                }
                letzteAenderung {
                  german
                }
                erstellt {
                  german
                }
              }
              verteiler {
                type
                verteiler {
                  bezeichnung
                  isAuto
                }
                #letzteAenderung {
                #  german
                #}
                #erstellt {
                #  german
                #}
              }
            }
          }
        `,
        variables: {
          authToken: auth.authToken,
          personID: this.$route.params.id
        }
      })
      .then((v: any) => v.data.person)
      .then((v: any) => {
        const { clipboard, remote } = electron;
        clipboard.writeText(JSON.stringify(v));
        remote.dialog.showMessageBox({
          title: 'Zwischenspeicher',
          message:
            'Die Daten wurden in den Zwischenspeicher zwischengespeichert.'
        });
      });
  }
  editVerteiler_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $verteilerID: Int!
            $authToken: String!
            $personID: Int!
            $type: Int!
            $verteilerPersonID: Int!
          ) {
            editVerteilerPerson(
              verteilerPersonID: $verteilerPersonID
              personID: $personID
              verteilerID: $verteilerID
              type: $type
              authToken: $authToken
            )
          }
        `,
        variables: {
          verteilerPersonenID: value.verteilerPersonenID,
          personID: this.data.person.personID,
          authToken: auth.authToken,
          type: value.type,
          verteilerID: value.verteiler
        }
      })
      .then(this.refetch);
  }
  editVerteiler_open(item: any) {
    this.editVerteiler_value = {};
    this.editVerteiler_value = {
      verteilerPersonenID: item.verteilerPersonenID,
      verteiler: item.verteiler.verteilerID,
      type: item.type
    };
    this.editVerteiler_show = true;
  }
  editVerteiler_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $verteilerPersonID: Int!
          ) {
            deleteVerteilerPerson(
              authToken: $authToken
              verteilerPersonID: $verteilerPersonID
            )
          }
        `,
        variables: {
          verteilerPersonID: value.verteilerPersonenID,
          authToken: auth.authToken,
          type: value.type
        }
      })
      .then(this.refetch);
  }
  addVerteiler_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $bezeichnung: String!
          ) {
            addVerteiler(
              authToken: $authToken
              autoSql: ""
              bezeichnung: $bezeichnung
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          type: value.type,
          verteilerID: value.verteiler
        }
      })
      .then(this.refetch);
  }
  editAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $akID: Int!
            $personAKID: Int!
            $personID: Int!
            $eintritt: String!
            $austritt: String
            $leiter: Boolean!
            $authToken: String!
          ) {
            editAKPerson(
              authToken: $authToken
              akID: $akID
              personAKID: $personAKID
              personID: $personID
              eintritt: $eintritt
              austritt: $austritt
              leiter: $leiter
            )
          }
        `,
        variables: {
          personAKID: value.personAKID,
          personID: this.data.person.personID,
          authToken: auth.authToken,
          eintritt: value.eintritt,
          austritt: value.austritt,
          akID: value.ak,
          leiter:
            value.leiter === null ? false : value.leiter
        }
      })
      .then(this.refetch);
  }
  editAK_open(item: any) {
    this.editAK_value = {};
    this.editAK_value = {
      personAKID: item.personAKID,
      ak: item.ak.akID,
      eintritt: item.eintritt.input,
      austritt: (item.austritt || {}).input,
      leiter: item.leiter
    };
    this.editAK_show = true;
  }
  addAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $akID: Int!
            $personID: Int!
            $eintritt: String!
            $leiter: Boolean!
            $authToken: String!
          ) {
            addAKPerson(
              authToken: $authToken
              akID: $akID
              personID: $personID
              eintritt: $eintritt
              leiter: $leiter
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          eintritt: value.eintritt,
          akID: value.ak,
          leiter:
            value.leiter === null ? false : value.leiter
        }
      })
      .then(this.refetch);
  }
  addAdresse_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $strasse: String!
            $plz: String!
            $ort: String!
            $authToken: String!
          ) {
            addAdresse(
              personID: $personID
              strasse: $strasse
              plz: $plz
              ort: $ort
              authToken: $authToken
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          strasse: value.strasse,
          plz: value.plz,
          ort: value.ort
        }
      })
      .then(this.refetch);
  }
  addTelefon_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $telefon: String!
            $authToken: String!
          ) {
            addTelefon(
              personID: $personID
              telefon: $telefon
              authToken: $authToken
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          telefon: value.telefon
        }
      })
      .then(this.refetch);
  }
  addEmail_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $email: String!
            $authToken: String!
          ) {
            addEmail(
              personID: $personID
              email: $email
              authToken: $authToken
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          email: value.email
        }
      })
      .then(this.refetch);
  }
  editAdresse_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $strasse: String!
            $plz: String!
            $ort: String!
            $authToken: String!
            $adressID: Int!
          ) {
            editAdresse(
              adressID: $adressID
              personID: $personID
              strasse: $strasse
              plz: $plz
              ort: $ort
              authToken: $authToken
            )
          }
        `,
        variables: {
          adressID: value.adressID,
          personID: this.data.person.personID,
          authToken: auth.authToken,
          strasse: value.strasse,
          plz: value.plz,
          ort: value.ort
        }
      })
      .then(this.refetch);
  }
  editTelefon_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $telefon: String!
            $authToken: String!
            $telefonID: Int!
          ) {
            editTelefon(
              telefonID: $telefonID
              personID: $personID
              telefon: $telefon
              authToken: $authToken
            )
          }
        `,
        variables: {
          telefonID: value.telefonID,
          personID: this.data.person.personID,
          authToken: auth.authToken,
          telefon: value.telefon
        }
      })
      .then(this.refetch);
  }
  editEmail_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $email: String!
            $authToken: String!
            $emailID: Int!
          ) {
            editEmail(
              emailID: $emailID
              personID: $personID
              email: $email
              authToken: $authToken
            )
          }
        `,
        variables: {
          emailID: value.emailID,
          personID: this.data.person.personID,
          authToken: auth.authToken,
          email: value.email
        }
      })
      .then(this.refetch);
  }
  editAdresse_open(item: {
    adressID: number;
    strasse: string;
    plz: string;
    ort: string;
  }) {
    console.log(item);
    this.editAdresse_value = {};
    this.editAdresse_value = {
      adressID: item.adressID,
      strasse: item.strasse,
      plz: item.plz,
      ort: item.ort
    };
    console.log(this.editAdresse_value);
    this.editAdresse_show = true;
  }
  editTelefon_open(item: {
    telefonID: number;
    telefon: string;
  }) {
    this.editTelefon_value = {};
    this.editTelefon_value = {
      telefonID: item.telefonID,
      telefon: item.telefon
    };
    this.editTelefon_show = true;
  }
  editEmail_open(item: { emailID: number; email: string }) {
    this.editEmail_value = {};
    this.editEmail_value = {
      emailID: item.emailID,
      email: item.email
    };
    this.editEmail_show = true;
  }
  created() {
    this.variabels = {
      authToken: auth.authToken,
      personID: this.$route.params.id
    };
    this.query = gql`
      query($authToken: String!, $personID: Int!) {
        person(authToken: $authToken, personID: $personID) {
          personID
          vorname
          nachname
          gebDat {
            german
            input
          }
          alter
          geschlecht
          juLeiCaNr
          adressen {
            adressID
            strasse
            plz
            ort
          }
          emails {
            emailID
            email
          }
          telefone {
            telefonID
            telefon
          }
          anmeldungen {
            anmeldeID
            veranstaltung {
              veranstaltungsID
              bezeichnung
              begin {
                german
                input
              }
              ende {
                german
                input
              }
            }
            position
          }
          fzs {
            fzID
            gesehenAm {
              german
              input
            }
            gesehenVon {
              personID
              vorname
              nachname
            }
            kommentar
          }
          aks {
            personAKID
            eintritt {
              german
              input
            }
            austritt {
              german
              input
            }
            leiter
            ak {
              akID
              bezeichnung
            }
          }
          verteiler {
            verteilerPersonenID
            type
            verteiler {
              verteilerID
              bezeichnung
              isAuto
            }
          }
        }
      }
    `;
    super.created();
  }
}
</script>
