<template>
  <v-btn fab ripple absolute right bottom color="primary" v-bind="$attrs" v-on="$listeners">
    <v-icon>
      add
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ecAddBtn extends Vue {}
</script>