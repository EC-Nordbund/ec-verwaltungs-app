<template>
  <ec-wrapper title="Profil" mini @share="share">
    <template>
      <v-card-text>
        <v-switch label="Dark-Theme"/>          
        <v-text-field label="E-Mail"/>
        <v-text-field label="Benutzername"/>
        <v-text-field label="SMTP-Server"/>
        <v-text-field label="SMTP-Port"/>
        <v-text-field label="IMAP-Server"/>
        <v-text-field label="IMAP-Port"/>
        <v-text-field label="E-Mail Passwort"/>
      </v-card-text>
    </template>

    <template slot="forms">
      <v-dialog v-model="editPWD_show" width="500px" persistent>
        <v-card>
          <v-card-title>
            <h1 v-font v-primary>Passwort ändern</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Altes Passwort" type="password" v-model="opwd"/>
              <v-text-field label="Neues Passwort" type="password" v-model="npwd"/>
              <v-text-field label="Wiederholung Passwort" type="password" v-model="rpwd"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="pwdChange_cancel">
              Abbrechen
            </v-btn>
            <v-btn v-secondary-bg v-white @click="pwdChange_save">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template slot="actions">
      <v-btn @click="editPWD_show=true">Password ändern</v-btn>
    </template>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '@/plugins/auth'
@Component({})
export default class admin extends Vue {
  editPWD_show = false
  opwd=''
  npwd=''
  rpwd=''
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }

  pwdChange_cancel() {
    this.editPWD_show=false
    this.opwd = ''
    this.npwd = ''
    this.rpwd = ''
    (<any>this.$refs).pwdForm.reset()
  }
  pwdChange_save() {
    this.editPWD_show=false
    this.opwd = ''
    this.npwd = ''
    this.rpwd = ''
    (<any>this.$refs).pwdForm.reset()
    auth.logOut()
  }
}
</script>
