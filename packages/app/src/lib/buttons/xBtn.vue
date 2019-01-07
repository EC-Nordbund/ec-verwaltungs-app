<template>
  <v-btn icon @click="$router.push($route.query.prev)">
    <v-icon>
      close
    </v-icon>
  </v-btn>
</template>
<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator'
@Component({})
export default class ecXBtn extends Vue {}
</script>
