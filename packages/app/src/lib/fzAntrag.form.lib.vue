<template lang="pug">
  v-dialog(v-model="abmeldenShow" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) FZ-Antrag
      v-card-text
        v-form(v-model="abmeldenValid")
          formular(v-model="abmeldenValue" :schema=`[
            {
              name: 'mail',
              type: 'autocomplete',
              label: 'E-Mail',
              rule: "required",
              required: true,
              items: data.emails.map(v=>v.eMail)
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="abmeldenShow=false") Abbrechen
        v-btn(color="primary" :disabled="!abmeldenValid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any;

  generate(mail:string) {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation(
          $personID: Int!
          $authToken: String!
          $email: String!
        ) {
          addFZAntrag(
            personID: $personID
            authToken: $authToken
            email: $email
          )
        }
      `,
      variables: {
        authToken: this.$authToken,
        personID: this.$route.params.id,
        email: mail
      }
    }).then(() => {
      this.$notifikation('Erfolgreich Generiert', `Du hast erfolgreich den Antrag generiert. An fz@ec-nordbund.de wurde eine Kopie gesendet!`);
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }

  show() {
    switch (this.data.emails.length) {
      case 0:
        alert('Du musste eine Mail erst eintragen!')
        break;
      case 1:
        this.generate(data.emails[0].eMail)
        break;
      default:
        this.abmeldenShow = true;
        break;
    }
  }

  private abmeldenShow = false;
  private abmeldenValid = false;
  private abmeldenValue = {
    mail: ''
  };
  private abmeldenSave() {
    this.abmeldenShow = false;
    this.generate(this.abmeldenValue.mail)
  }
}
</script>