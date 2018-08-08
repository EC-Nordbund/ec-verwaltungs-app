<template>
  <ec-wrapper title="Profil" mini @share="share">
    <template>
      <v-card-text>
        <v-switch label="Dark-Theme"/>          
        <v-text-field label="E-Mail"/>
        <v-text-field label="SMTP-Server"/>
        <v-text-field label="SMTP-Port"/>
        <v-text-field label="IMAP-Server"/>
        <v-text-field label="IMAP-Port"/>
        <v-text-field label="E-Mail Passwort"/>
      </v-card-text>
    </template>

    <template slot="forms">
      
    </template>

    <template slot="actions">
      <v-btn>Password ändern</v-btn>
    </template>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class admin extends Vue {
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
}
</script>