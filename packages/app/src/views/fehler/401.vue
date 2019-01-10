<template>
  <v-card>
    <v-card-title>
      <h1>Die Seite durfte nicht angesehen werden!</h1>
    </v-card-title>
    <v-card-text>
      <p>Weitere Informationen: {{ $route.query.errorMessage || "" }}</p>
      <p>Vorherige Seite: "{{ $route.query.prev || "" }}"</p>
      <p>
        Versuche bitte diesen Fehler nach einem neustart der Software erneut zu
        Produzieren, und melde ihn dann an app@ec-nordbund.de
      </p>
    </v-card-text>
  </v-card>
</template>
