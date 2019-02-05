<template lang="pug">
  v-app(app :dark="dark")
    div.ec_content
      v-card.ec_card(width="500px")
        v-card-title.justify-space.between
          h1(v-font v-primary) Login
          v-spacer
          img(width="80px" src="../../public/ec-logo-512.png")
        v-card-text
          v-alert(type="error" :value="true" v-if="$route.query.error") {{$route.query.error}}
          v-alert(type="info" :value="true" v-if="$route.query.info") {{$route.query.info}}
          v-form(v-model="valid")
            v-text-field(
              v-validate="required"
              data-vv-as="Benutzername"
              :error-messages="errors.collect(schema.name)"

              label="Username" 
              v-model="data.username" 
              required 
              :autofocus="data.username === ''" 
              :disabled="loading"
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
                :rules="rules"
                :disabled="loading"
              )
              span Die Feststelltaste ist aktiviert
        v-card-actions
          v-spacer
          v-btn(v-accent-bg v-white :disabled="!valid || loading" @click="logIn") LogIn
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import * as settings from 'electron-settings'

@Component({})
export default class EcRootLogin extends Vue {
  public static meta = {};

  public data = {
    username : '',
    password : ''
  };
  public dark = false;
  public loading = false;
  public showPasword = false;
  public isElectron = false;
  public isCapsOn = false;
  public valid = false;

  public rules = [
      (value: string) =>
        !value ? `Das Feld darf nicht leer sein!` : true
    ];

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
  }

  public created() {
    window.addEventListener('keyup', this.checkCaps);
    if (this.isElectron) {
      // this.dark = <boolean>settings.get('dark', false)
      // this.data.username = <string>settings.get('username', '')
    }
  }
  public destroyed() {
    window.removeEventListener('keyup', this.checkCaps);
    if (this.isElectron) {
      // settings.set('username', this.data.username)
    }
  }

}
</script>

<style scoped>
/** Ausrichtung der Card **/
.ec_content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas: ". . ." ". center ." ". . .";
  height: 100%;
  width: 100%;
  grid-gap: 10px;
}
.ec_card {
  grid-area: center;
}
img {
  margin-right: 15px
}
</style>
