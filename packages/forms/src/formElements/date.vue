<template lang="pug">
  v-dialog(
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    lazy
    full-width
    width="290px"
  )
    v-text-field(
      v-validate="schema.rule"
      :data-vv-name="schema.name"
      :data-vv-as="schema.label"
      :error-messages="errors.collect(schema.name)"
      
      slot="activator"
      :value="date.split('-').reverse().join('.')"
      :label="schema.label"
      prepend-icon="event"
      readonly
      v-bind="schema.textfield || {}"
    )
    v-date-picker(
      v-model="date"
      scrollable
      v-bind="schema"
    )
      v-spacer
      v-btn(
        flat
        color="primary"
        @click="modal = false"
      ) Abbrechen
      v-btn(
        flat
        color="primary"
        @click="$refs.dialog.save(date)"
      ) Speichern
</template>

<script lang="ts">
import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
import abstractField from '../abstract';
// @ts-ignore
import { VSpacer, VBtn, VDialog, VDatePicker, VTextField } from 'vuetify/lib';

@Component({
  components: {
    VSpacer,
    VBtn,
    VDialog,
    VDatePicker,
    VTextField,
  },
})
export default class FormInput extends Mixins(abstractField) {
  public modal = false;
  public date = '';

  @Watch('value')
  public onValueChange() {
    this.date = this.value;
  }

  @Watch('date')
  public onDateChange( ) {
    this.changeValue(this.date);
  }
}
</script>
