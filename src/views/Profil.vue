<template>
  <ec-wrapper title="Profil" mini @share="share">
    <template>
      <v-card-text v-if="false">
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
            <v-form ref="pwdForm" v-model="pwdValid">
              <v-text-field label="Altes Passwort" type="password" v-model="opwd" :rules="[v=>v?true:'Du musst dein Passwort eingeben']"/>
              <v-text-field label="Neues Passwort" type="password" v-model="npwd" :rules="[v=>v?true:'Du musst dein neues Passwort eingeben']"/>
              <v-text-field label="Wiederholung neues Passwort" type="password" v-model="rpwd" :rules="[v=>v?true:'Du musst dein neues Passwort eingeben', v=>v===npwd?true:'Beide eingaben müssen überein Stimmen!']"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="pwdChange_cancel">
              Abbrechen
            </v-btn>
            <v-btn v-secondary-bg v-white @click="pwdChange_save" :disabled="!pwdValid">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template slot="actions">
      <v-dialog max-width="400px">
        <v-btn slot="activator">Fehler Melden / Funktionswunsch</v-btn>
        <v-card>
          <v-card-title>
            <h1>Feedback</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <b>Gesamtbewertung</b>
              <v-rating/>
              <b>Handhabung</b>
              <v-rating/>
              <v-textarea label="Funktionswunsch"/>
              <v-textarea label="Fehler melden"/>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-btn @click="editPWD_show=true">Password ändern</v-btn>
      <v-btn>Datenschutz</v-btn>
    </template>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import auth from '@/plugins/auth'
import { query } from '@/graphql/index'
@Component({})
export default class admin extends Vue {
  pwdValid=false
  editPWD_show = false
  opwd = ''
  npwd = ''
  rpwd = ''
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }

  pwdChange_cancel() {
    this.editPWD_show = false
    this.opwd = ''
    this.npwd = ''
    this.rpwd = ''
    ;(<any>this.$refs).pwdForm.reset()
  }
  pwdChange_save() {
    this.$apollo.mutate({
      mutation: query.profil.updatePWD,
      variables: {
        authToken: auth.authToken,
        newPWD: this.npwd,
        oldPWD: this.opwd
      }
    }).then(v=>{
      if(v.data.passwordWechseln){
        auth.logOut()
      } else {
        alert('Der Passwortwechsel war nicht möglich!')
      }
    })
    this.editPWD_show = false
    this.opwd = ''
    this.npwd = ''
    this.rpwd = ''
    ;(<any>this.$refs).pwdForm.reset()
  }
}
</script>