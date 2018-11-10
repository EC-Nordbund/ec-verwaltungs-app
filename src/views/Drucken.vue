<template>
  <div>
    <v-toolbar tabs>
      <v-spacer/>
      <ec-headline>
        Liste von Druckaufträgen
      </ec-headline>
      <v-spacer/>
    </v-toolbar>
    <v-card>
      <ec-list :items="[{title: 'Es muss erst geklärt werden welche Daten gespeichert und angezeigt werden!'},{title: 'Die Idee ist dass hier automatisch Info + Bestätigungsbriefe, Mahnungen etc. auftauchen und gedruckt werden können.'}]" :mapper="item=>item" icon="info"/>
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
