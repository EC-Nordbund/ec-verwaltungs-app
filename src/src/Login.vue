<template>
  <v-app app :dark="dark">
    <div class="ec_content">
      <v-card class="ec_card" width="500px">
        <v-card-title class="justify-space-between">
          <h1 v-font v-primary>
            Login
          </h1>
          <img width="80px" src="../public/ec-logo-512.png" style="margin-right: 15px"/>
        </v-card-title>
        <v-card-text>
          <v-alert :value="wrong" type="error">
            Das Password und der Benutzername passen nicht zusammen! Bitte probiere es erneut.<br>
            Solltes du dein Passwort vergessen haben melde dich bitte bei Thomas Seeger. Bitte überprüfe in diesem Fall außerdem, dass du die neuste Version benutzt.
          </v-alert>
          <v-alert :value="auth.autoLogOut" type="info">
            Du wurdest, da du 30min nicht aktiv warst, automatisch abgemeldet. Bitte melde dich neu an!
          </v-alert>
          <v-alert :value="showUrlInfo" type="info">
            Die gewünschte Seite wird nach dem Login angezeigt...
          </v-alert>
          <v-form v-model="valid">
            <v-text-field
              label="Username"
              v-model="username"
              required
              :autofocus="username === ''"
              :rules="getRules('Username')"
              :disabled="checking"
            />
            <v-tooltip :value="caps" :disabled="!caps" bottom color='info'>
              <v-text-field
                slot="activator" 
                label="Passwort"
                v-model="password"
                required
                :autofocus="username !== ''"
                :color="caps && !wrong ? 'info' : undefined"
                :append-outer-icon="caps ? 'keyboard_capslock': undefined"
                :append-icon="show_pw ? 'visibility_off' : 'visibility' "
                @click:append="() => (show_pw = !show_pw)"
                :type="show_pw ? 'text' : 'password' "
                v-on:keyup.enter="login"
                :rules="getRules('Passwort')"
                :disabled="checking"
              />
              <span>Die Feststelltaste ist aktiviert</span>
            </v-tooltip>
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
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'
import auth from '@/plugins/auth'
import eventBus from '@/plugins/eventbus'

@Component({})
export default class loginForm extends Vue {
  username: string = ''
  password: string = ''
  caps: boolean = false
  show_pw: boolean = false
  valid: boolean = false
  checking: boolean = false
  wrong: boolean = false
  dark: boolean = false
  auth = auth

  checkCaps(ev: KeyboardEvent) {
    const s = ev.key
    if (s.length === 1) {
      this.caps =
        s.toUpperCase() === s &&
        s.toLowerCase() !== s &&
        !ev.shiftKey
    } else {
      if (s === 'CapsLock') {
        this.caps = !this.caps
      }
    }
  }

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
    if (this.$require.isElectron) {
      this.$require.settings.set('username', this.username)
    }
    auth
      .logIn(this.username, this.password)
      .then(({ status, nextURL }) => {
        if (status) {
          this.$router.push(nextURL)
          this.checking = false
        } else {
          this.checking = false
          this.wrong = true
        }
      })
  }

  showUrlInfo: boolean = false

  created() {
    if (this.$require.isElectron) {
      this.username = <string>this.$require.settings.get('username', '')
      this.dark = <boolean>this.$require.settings.get('dark', false)
    }
    window.addEventListener('keyup', this.checkCaps)

    eventBus.on('login_show_url_info', () => {
      this.showUrlInfo = true
    })
  }
  destroyed() {
    window.removeEventListener('keyup', this.checkCaps)
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
