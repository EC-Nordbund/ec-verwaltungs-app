<template lang="pug">
  v-dialog(v-model="visible" max-width="400px" v-bind="$attrs")
    v-card
      v-card-title
        h1(color="primary") {{title}}
      v-card-text
        v-form(v-model="valid")
          formular(v-model="value" :schema="schema" :cancel="cancel" :save="save")
      v-card-actions
        v-spacer
        v-btn(flat @click="cancel" v-if="!$attrs.noCancel") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="save") {{$attrs.saveName||'Speichern'}}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// @ts-ignore
import { VSpacer, VBtn, VDialog, VApp, VCard, VCardTitle, VCardText, VCardActions } from 'vuetify/lib';

@Component({
  components: {
    VSpacer,
    VBtn,
    VDialog,
    VApp,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
  },
})
export default class EcRootIndexAKIndex extends Vue {
  @Prop()
  private title!: string;

  @Prop()
  private schema!: any;

  @Prop()
  private initval!: any;

  private valid = false;
  private visible = false;
  private value: any = {};

  public show(initval = this.initval, addToSchemaTop = []) {
    addToSchemaTop.forEach(field => {

      // only add if not exist
      if(this.schema.every((f: any) =>
        JSON.stringify(f) !== JSON.stringify(field))) {
          this.schema.unshift(field);
          }
    });    

    return new Promise((res, rej) => {
      this.res = res;
      this.rej = rej;
      this.value = initval;
      this.visible = true;
    });
  }

  private res = (val: any) => {};
  private rej = () => {};

  private save() {
    this.visible = false;
    this.res(this.value);
  }

  private cancel() {
    this.visible = false;
    this.rej();
  }
}
</script>