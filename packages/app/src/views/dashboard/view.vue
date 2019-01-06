<template>
  <v-card style="height: calc(100% - 20px); display:grid; grid-template-rows: auto 1fr">
    <v-toolbar>
      <v-spacer/>
      <v-toolbar-title>
        <h1 v-font v-primary>Dashboard</h1>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn icon @click="$router.push(`/dashboard/${$route.params.id}/settings`)">
        <v-icon>
          settings
        </v-icon>
      </v-btn>
    </v-toolbar>
    <router-view class="test"/>
  </v-card>  
</template>

<style scoped>
.test{
  display: grid;
  grid-template-columns: repeat(60,1fr);
  grid-template-rows: repeat(60,1fr);
  grid-gap: 5px;
}
</style>
