<template>
  <ec-details
    :query="require('@/graphql/organisationen/loadDetails.gql')"
    :getTitle="data => data.orga.bezeichnung"
    type="Organisation"
    :pathes="[
      { path: 'allgemein', label: 'Allgemein', icon: 'history' },
      {
        path: 'veranstaltungsorte',
        label: 'Veranstaltungsorte',
        icon: 'history'
      },
      { path: 'veranstaltungen', label: 'Veranstaltungen', icon: 'history' }
    ]"
  />
</template>
