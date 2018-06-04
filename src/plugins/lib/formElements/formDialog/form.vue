<template>
  <v-dialog width="500px" :value="open" persistent>
    <v-card>
      <v-card-title>
        <h1 v-font v-primary>
          {{title}}
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <template v-for="el in fieldConfig">
            <div :key="el.name">
              <tmp-form-element
                v-bind="el"
                v-model="wert[el.name]"
              />
            </div>
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat @click="cancel">
          Abbrechen
        </v-btn>
        <v-btn v-if="deleteBtn" flat @click="del">
          Löschen
        </v-btn>
        <v-btn v-secondary-bg @click="save" :disabled="!valid">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import formElement from '@/plugins/lib/formElements/formDialog/element.vue'

@Component({
  components: {
    'tmp-form-element': formElement
  },
  model: {
    prop: 'show',
    event: 'openChanged'
  }
})
export default class formDialog extends Vue {
  valid = false
  open = false
  wert:any = {}

  @Prop({type: Boolean, required: true})
  show!: boolean

  @Prop({type: Array, required: true})
  fieldConfig!: Array<any>

  @Prop({type: Boolean, required: false, default: false})
  deleteBtn!: boolean  

  @Prop({type: String, required: false, default: ""})
  title!: string

  @Prop({type: Object, required: false, default: ()=>({})})
  value!: any

  @Watch('show', {immediate: true})
  onShowChange(value: boolean) {
    this.open = value
  }

  @Watch('value', {immediate: true})
  onValueChage(value: any) {
    this.wert = value
  }

  @Watch('open')
  @Emit('openChanged')
  onOpenChange(value: boolean) {}

  @Emit('cancel')
  cancel() {
    this.open = false;
    setTimeout(this.reset, 500);
  }

  del() {
    this.open = false;
    this.$emit('delete', this.wert);
    setTimeout(this.reset, 500);
  }

  save() {
    this.open = false;
    this.$emit('save', this.wert);
    setTimeout(this.reset, 500);
  }
  reset() {
    Object.keys(this.wert).forEach((v) => {
      this.wert[v] = '';
    });
    if (this.$refs && this.$refs.form) {
      (<any>this.$refs.form).reset();
    }
  }

  @Watch('wert')
  onWertChange(value:any) {}
}
</script>
