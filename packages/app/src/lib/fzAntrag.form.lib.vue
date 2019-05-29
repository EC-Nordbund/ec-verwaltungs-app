<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) FZ-Antrag
      v-card-text
        v-form(v-model="valid")
          formular(v-model="value" :schema=`[
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

  private visible = false;
  private valid = false;
  private value = {
    mail: ''
  };

  public generate(mail: string) {
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
        authToken: this.$authToken(),
        personID: this.$route.params.id,
        email: mail
      }
    }).then(() => {
      this.$notifikation(
        'Erfolgreich Generiert',
        `Du hast erfolgreich den Antrag generiert. An fz@ec-nordbund.de wurde eine Kopie gesendet!`
      );
      this.$emit('reload');
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }

  public show() {
    switch (this.data.emails.length) {
      case 0:
        alert('Du musste eine Mail erst eintragen!');
        break;
      case 1:
        this.generate(this.data.emails[0].eMail);
        break;
      default:
        this.visible = true;
        break;
    }
  }
  private abmeldenSave() {
    this.visible = false;
    this.generate(this.value.mail);
  }
}
</script>