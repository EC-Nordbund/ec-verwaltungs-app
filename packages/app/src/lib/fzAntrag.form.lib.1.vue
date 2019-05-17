<template lang="pug">
  v-dialog(v-model="showDialog" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Titel non Prop
      v-card-text
        v-form(v-model="valid")
          v-autocomplete(
            name: 'select',
            type: 'autocomplete',
            rule: "required",
            required: true,
            items,
            ...$attrs
          )
      v-card-actions
        v-spacer
        v-btn(flat @click="rej") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="res") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: []})
  private items!: Array<{text:string, value: any}>;

  private res = ()=>{}
  private rej = ()=>{}

  show() {
    return new Promise((res, rej)=>{
      this.res=()=>{
        this.showDialog = false;
        res(this.value.select);
      };
      this.rej=()=>{
        this.showDialog = false;
        rej();
      };
      this.showDialog = true;
    })
  }

  private showDialog = false;
  private valid = false;
  private value = {
    select: ''
  };
}
</script>