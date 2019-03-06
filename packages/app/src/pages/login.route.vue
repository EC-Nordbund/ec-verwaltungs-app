<template lang="pug">
  v-app(app :dark="dark")
    v-content
      div.align
        v-card()
          v-card-title
            h1(v-font v-primary) Login
            v-spacer
            img(width="80px" src="@/assets/ec-logo-512.png")
          v-card-text
            v-form(v-model="valid")
              v-text-field(
                label="Username" 
                v-model="data.username" 
                required 
                :autofocus="data.username === ''"
                :rules="[v=>!!v?true:'Ein Benutzername muss angegeben werden!']"
              )
              v-tooltip(:value="isCapsOn" :disabled="!isCapsOn" bottom color="info")
                v-text-field(
                  slot="activator"
                  label="Passwort"
                  v-model="data.password"
                  required
                  :autofocus="data.username !== ''"
                  :color="isCapsOn && !$route.query.error ? 'info' : undefined"
                  :append-outer-icon="isCapsOn ? 'keyboard_capslock' : undefined"
                  :append-icon="showPasword ? 'visibility_off' : 'visibility'"
                  @click:append="() => (showPasword = !showPasword)"
                  :type="showPasword ? 'text' : 'password'"
                  @keyup.enter="logIn"
                  :rules="[v=>!!v?true:'Ein Password muss angegeben werden!']"
                )
                span Die Feststelltaste ist aktiviert
          v-card-actions
            v-spacer
            v-btn(v-accent-bg v-white :disabled="!valid || loading" @click="logIn") LogIn
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import * as settings from 'electron-settings'
import gql from 'graphql-tag';

@Component({})
export default class EcRootLogin extends Vue {
  private dark = false;
  private isCapsOn = false;
  private valid = false;
  private loading = false;
  private data = {
    username: '',
    password: ''
  };
  private showPasword = false;


  public checkCaps(ev: KeyboardEvent) {
    const key = ev.key;
    if (key.length === 1) {
      this.isCapsOn =
        key.toUpperCase() === key && key.toLowerCase() !== key && !ev.shiftKey;
    } else {
      if (key === 'CapsLock') {
        this.isCapsOn = !this.isCapsOn;
      }
    }
  }

  public logIn() {
    this.loading = true;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($username: String!, $password: String!) {
          logIn(version: "2.0.0", username: $username, password: $password)
        }
      `,
      variables: this.data
    }).then((res: any) => {
      let path = this.$route.query.next || '/home';
      this.$setAuthToken(res.data.logIn);
      this.$router.push(<string>path);
      this.loading = false;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Anmelden fehlgeschlagen!'
      });
    });
  }

  public created() {
    window.addEventListener('keyup', this.checkCaps);
  }
  public destroyed() {
    window.removeEventListener('keyup', this.checkCaps);
  }

}
</script>

<style scoped lang="scss">
.align {
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: ". . ." ". c ." ". . .";

  height: 100%;

  > div {
    grid-area: c;
  }
}
</style>
