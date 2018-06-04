<template>
  <div>
    <v-toolbar tabs>
      <ec-button-router-back/>
      <v-spacer/>
      <ec-headline>
        Liste von Druckaufträgen
      </ec-headline>
      <v-spacer/>
      <ec-button-router-back class="hidden"/>
    </v-toolbar>
    <v-card>
      <ec-list :items="[{title: 'Es muss erst geklärt werden welche Daten gespeichert und angezeigt werden!'}]" :mapper="item=>item" icon="info"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat>
          Alles Drucken
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped>
.hidden {
  visibility: hidden;
}
</style>
