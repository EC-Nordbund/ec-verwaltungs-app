<template lang="pug">
  v-app
    v-toolbar(app color="primary") 
      v-spacer
      h1(style="color: #fff") {{title}}
      v-spacer
      v-btn(icon @click="$emit('cancel')" style="color: #fff;")
        v-icon close
    v-content(app)
      v-form(v-model="valid")
        formular(v-model="value" :schema="schema" :cancel="$emit('cancel')" :save="save")
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

// @ts-ignore
import { VToolbar, VSpacer, VBtn, VIcon, VDialog, VApp, VCard, VCardTitle, VCardText, VCardActions } from 'vuetify/lib';

@Component({
  components: {
    VSpacer,
    VBtn,
    VDialog,
    VToolbar,
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

  private save() {    
    this.$emit('save', this.value);
  }

  @Watch('initVal', {immediate: true})
  onInitValChange() {
    this.value = this.initval;
  }
}
</script>