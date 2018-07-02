<template>
  <v-app app>
    <div class="ec_content">
      <v-card class="ec_card" width="500px">
        <v-card-title>
          <h1 v-font v-primary>
            Login
          </h1>
        </v-card-title>
        <v-card-text>
          <v-alert :value="wrong" type="error">
            Das Password und der Benutzername passen nicht zusammen! Bitte probiere es erneut.
          </v-alert>
          <v-alert :value="auth.autoLogOut" type="info">
            Du wurdest, da du 30min nicht aktiv warst, automatisch abgemeldet. Bitte melde dich neu an!
          </v-alert>
          <!-- <v-alert :value="true" type="info">
            Du wurdest, da die API neugestartet wurde, automatisch abgemeldet. Bitte melde dich neu an! <br>
            Bitte überprüfe ob deine letzte Aktion gespeichert wurde!
          </v-alert> -->
          <v-form v-model="valid">
            <v-text-field
              label="Username"
              v-model="username"
              required
              autofocus
              :rules="getRules('Username')"
              :disabled="checking"
            />
            <v-text-field
              label="Passwort"
              type="password"
              v-model="password"
              required
              :rules="getRules('Passwort')"
              :disabled="checking"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn v-accent-bg v-white :disabled="!valid || checking" @click="login">
            LogIn
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>
<script lang="ts">
import settings from '@/plugins/settings'
import { isElectron } from '@/plugins/electron'
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'
import auth from '@/plugins/auth'

@Component({})
export default class loginForm extends Vue {
  username: string = ''
  password: string = ''
  valid: boolean = false
  checking: boolean = false
  wrong: boolean = false
  auth = auth
  getRules(name: string) {
    return [
      (value: string) =>
        !value
          ? `Es muss ein ${name} angegeben werden`
          : true
    ]
  }
  login() {
    this.checking = true
    if (isElectron) {
      settings.set('username', this.username)
    }
    auth
      .logIn(this.username, this.password)
      .then((val: boolean) => {
        if (val) {
          this.$router.push('/app')
          this.checking = false
        } else {
          this.checking = false
          this.wrong = true
        }
      })
  }
  created() {
    if (isElectron) {
      this.username = <any>settings.get('username', '')
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
  grid-template-areas: '. . .' '. center .' '. . .';
  height: 100%;
  width: 100%;
  grid-gap: 10px;
}
.ec_card {
  grid-area: center;
}
</style>
