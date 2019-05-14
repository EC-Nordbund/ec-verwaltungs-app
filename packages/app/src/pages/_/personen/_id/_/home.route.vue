<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.personID}}
          v-list-tile-sub-title PersonID
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.vorname}} {{data.nachname}}
          v-list-tile-sub-title {{data.gebDat.german}}
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.alter}}
          v-list-tile-sub-title Aktuelles Alter
      v-divider
      v-list-tile(v-for="adresse in data.adressen" :key="adresse.adresseID" :class="adresse.isOld?'isOld':''" @click="alert('TODO: Karte anzeigen')")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title {{adresse.strasse}}
          v-list-tile-sub-title {{adresse.plz}} {{adresse.ort}}
      v-divider
      v-list-tile(v-for="email in data.emails" :key="email.eMailID" :class="email.isOld?'isOld':''" @click="location.href='mailto:' + email.eMail")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title {{email.eMail}}
          v-list-tile-sub-title E-Mail
      v-divider
      v-list-tile(v-for="telefon in data.telefone" :key="telefon.telefonID" :class="telefon.isOld?'isOld':''" @click="location.href = 'tel:' + telefon.telefon")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title {{telefon.telefon}}
          v-list-tile-sub-title Telefon    
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};
  @Prop()
  private data!: any 
  private location = window.location
}
</script>
<style scoped>
.isOld {
  background-color: red;
}
</style>
