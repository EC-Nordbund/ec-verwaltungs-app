<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Person abmelden
      v-card-text
        v-form(v-model="valid")
          formular(v-model="value" :schema=`[
            {
              name: 'adresse',
              type: 'autocomplete',
              label: 'Adresse',
              rule: "required",
              required: true,
              items: myData.adressen.filter(v=>!v.isOld).map((a) => {
                return {
                  text: a.strasse + " | " + a.plz + " " + a.ort,
                  value: a.adressID
                }
              })
            },
            {
              name: 'email',
              type: 'autocomplete',
              label: 'E-Mail',
              rule: "required",
              required: true,
              items: myData.emails.filter(v=>!v.isOld).map((a) => {
                return {
                  text: a.eMail,
                  value: a.eMailID
                }
              })
            },
            {
              name: 'telefon',
              type: 'autocomplete',
              label: 'Telefon',
              rule: "required",
              required: true,
              items: myData.telefone.filter(v=>!v.isOld).map((a) => {
                return {
                  text: a.telefon,
                  value: a.telefonID
                }
              })
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="visible=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any;

  private myData = {
    adressen: [],
    emails: [],
    telefone: []
  };

  private visible = false;
  private valid = false;
  private value = {
    adresse: 0,
    email: 0,
    telefon: 0
  };

  public show() {
    this.value = {
      adresse: this.data.adresse.adressID,
      email: this.data.email.eMailID,
      telefon: this.data.telefon.telefonID
    };
    this.visible = true;
  }

  @Watch('data')
  public onDataChange() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!, $personID: Int!) {
          person(personID: $personID, authToken: $authToken) {
            adressen {
              adressID
              strasse
              plz
              ort
              lastUsed {
                german
              }
              isOld
            }
            emails {
              eMailID
              eMail
              lastUsed {
                german
              }
              isOld
            }
            telefone {
              telefonID
              telefon
              lastUsed {
                german
              }
              isOld
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken(),
        personID: this.data.person.personID
      }
    }).then((res) => {
      this.myData = res.data.person;
    });
  }
  private abmeldenSave() {
    this.visible = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation(
          $authToken: String!,
          $anmeldeID: String!,
          $adresse: Int!,
          $email: Int!,
          $telefon: Int!
        ) {
          anmeldungKontakt(
            anmeldeID: $anmeldeID,
            authToken: $authToken,
            adressID: $adresse,
            emailID: $email,
            telefonID: $telefon
          )
        }
      `,
      variables: {
        anmeldeID: this.$route.params.id,
        authToken: this.$authToken(),
        ...this.value
      }
    }).then(() => {
      this.$notifikation('Erfolgreich editiert', `Du hast erfolgreich die Kontaktdaten erfolgreich angepasst.`);
      this.$emit('reload');
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
}
</script>