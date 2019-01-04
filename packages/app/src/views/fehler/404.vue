<template>
  <v-card>
    <v-card-title>
      <h1>Die Seite wurde nicht gefunden!</h1>
    </v-card-title>
    <v-card-text>
      <p v-if="$route.query.errorMessage">
        Weitere Informationen: {{$route.query.errorMessage||''}}
      </p>
      <p>
        Angefragte Seite: "{{$route.query.prev||''}}"
      </p>
    </v-card-text>
  </v-card>
</template>
