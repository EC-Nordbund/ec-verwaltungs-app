<template lang="pug">
  v-card-text(style="overflow: auto;")
    //- ec-edit-adresse(ref="editAdresse")
    v-list(two-line)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.personID}}
          v-list-tile-sub-title PersonID
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.vorname}} {{data.nachname}}
          v-list-tile-sub-title {{data.gebDat.german}}
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.alter}}
          v-list-tile-sub-title Aktuelles Alter
      v-divider
      v-list-tile(v-for="adresse in data.adressen" :key="adresse.adressID" :class="adresse.isOld?'isOld':''" @click="showAdresse(adresse)")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title {{adresse.strasse}}
          v-list-tile-sub-title {{adresse.plz}} {{adresse.ort}} | Letzte Nutzung: {{adresse.lastUsed.german}}
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();mergeAdresse(adresse)" icon)
            v-icon merge_type
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();deleteAdresse(adresse.adressID)" icon)
            v-icon delete
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();useAdresse(adresse.adressID)" icon)
            v-icon mouse
      v-divider
      v-list-tile(v-for="email in data.emails" :key="email.eMailID" :class="email.isOld?'isOld':''" @click="location.href='mailto:' + email.eMail")
        v-list-tile-action
          v-icon mail
        v-list-tile-content
          v-list-tile-title {{email.eMail}}
          v-list-tile-sub-title E-Mail  | Letzte Nutzung: {{email.lastUsed.german}}
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();deleteEmail(email.eMailID)" icon)
            v-icon delete
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();useEmail(email.eMailID)" icon)
            v-icon mouse
      v-divider
      v-list-tile(v-for="telefon in data.telefone" :key="telefon.telefonID" :class="telefon.isOld?'isOld':''" @click="location.href = 'tel:' + telefon.telefon")
        v-list-tile-action
          v-icon phone
        v-list-tile-content
          v-list-tile-title {{telefon.telefon | telefon}}
          v-list-tile-sub-title Telefon | Letzte Nutzung: {{telefon.lastUsed.german}}
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();deleteTelefon(telefon.telefonID)" icon)
            v-icon delete
        v-list-tile-action
          v-btn(@click="$event.stopPropagation();useTelefon(telefon.telefonID)" icon)
            v-icon mouse
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import gql from 'graphql-tag'
import { AnySoaRecord } from 'dns';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};
  @Prop()
  private data!: any;
  private location = window.location;

  showAdresse(adresse: any) {
    alert("Hier kommt noch eine Karte hin.");
  }
  mergeAdresse(adressID: number) {
    alert("Hier soll das mergen von Adressen passieren können.");
  }
  deleteAdresse(adressID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($adressID: Int!, $authToken: String!) {
          markAdressAsOld(adressID: $adressID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        adressID
      }
    }).then((res: any) => {
      this.$notifikation('Als Alt makiert', `Erfolgreich als veraltet makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
  deleteEmail(emailID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($emailID: Int!, $authToken: String!) {
          markEmailAsOld(emailID: $emailID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        emailID
      }
    }).then((res: any) => {
      this.$notifikation('Als Alt makiert', `Erfolgreich als veraltet makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
  deleteTelefon(telefonID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($telefonID: Int!, $authToken: String!) {
          markTelefonAsOld(telefonID: $telefonID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        telefonID
      }
    }).then((res: any) => {
      this.$notifikation('Als Alt makiert', `Erfolgreich als veraltet makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
  useAdresse(adressID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($adressID: Int!, $authToken: String!) {
          useAdresse(adressID: $adressID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        adressID
      }
    }).then((res: any) => {
      this.$notifikation('Als Aktuell Makiert', `Erfolgreich als aktuell makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
  useEmail(emailID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($emailID: Int!, $authToken: String!) {
          useEmail(emailID: $emailID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        emailID
      }
    }).then((res: any) => {
      this.$notifikation('Als Aktuell Makiert', `Erfolgreich als aktuell makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
  useTelefon(telefonID: number) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($telefonID: Int!, $authToken: String!) {
          useTelefon(telefonID: $telefonID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken,
        telefonID
      }
    }).then((res: any) => {
      this.$notifikation('Als Aktuell Makiert', `Erfolgreich als aktuell makiert`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
}
</script>
<style scoped>
  .isOld {
    background-color: rgba(128, 128, 128, 0.5);
  }
</style>
