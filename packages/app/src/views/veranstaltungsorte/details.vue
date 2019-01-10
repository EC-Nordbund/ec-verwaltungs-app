<template>
  <ec-details
    :query="require('@/graphql/veranstaltungsOrte/loadDetails.gql')"
    :getTitle="data => data.vort.bezeichnung"
    type="Veranstaltungsort"
    :pathes="[
      { path: 'allgemein', label: 'Allgemein', icon: 'history' },
      { path: 'kontakt', label: 'Kontakte', icon: 'history' },
      { path: 'veranstaltungen', label: 'Veranstaltungen', icon: 'history' }
    ]"
  />
</template>
