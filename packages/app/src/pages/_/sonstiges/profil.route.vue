<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    | Content
    template(#dialogs)
      formular-selector(name="changePassword" ref="changePassword")  
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private config = {
    title: 'Profil',
    sheet: [
      {
        id: 'pwd_change',
        icon: 'vpn_key',
        label: 'Password ändern',
        click: () => {
          (this.$refs.changePassword as any)
            .show()
            .then(this.changePassword)
            .catch(this.$empty);
        }
      }
    ]
  };

  private changePassword(data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    this.$apolloClient
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $oldPassword: String!
            $newPassword: String!
          ) {
            passwordWechseln(
              authToken: $authToken
              oldPWD: $oldPassword
              newPWD: $newPassword
            )
          }
        `,
        variables: {
          authToken: this.$authToken(),
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        }
      })
      .then(res => {
        if (res.data.passwordWechseln) {
          this.$notifikation('Passwort erfolgreich geändert', '');
        } else {
          (this.$refs.changePassword as any)
            .show(data, [
              {
                type: 'alert',
                text: 'Dein aktuelles Passwort ist nicht richtig',
                color: 'error'
              }
            ])
            .then(this.changePassword);
        }
      })
      .catch((err: any) => {
        this.$dialog.error({
          text: err.message,
          title: 'Speichern fehlgeschlagen!'
        });
      });
  }
}
</script>
