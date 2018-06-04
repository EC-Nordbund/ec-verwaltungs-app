<template>
  <v-app class="ec_help_wrapper">
    <!-- <div class="ec_help_wrapper"> -->
      <v-toolbar ripple tabs>
        <ec-button-router-back/>
        <v-spacer/>
        <ec-headline>Hilfe</ec-headline>
        <v-spacer/>
        <!-- <ec-button-icon @click="editAKStamm_open"/> -->
      </v-toolbar>
      <!-- TODO: Change URL -->
      <iframe src="http://localhost:8081"/>
    <!-- </div> -->
  </v-app>
</template>

<style>
body {
  display: grid;
  height: 100%;
}
html {
  height: 100%;
}
div .application--wrap {
  display: grid;
  grid-template-rows: 60px 1fr;
}
</style>
