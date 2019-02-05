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
      slot="activator"
      :value="date"
      :label="schema.label"
      prepend-icon="access_time"
      readonly
    )
    v-time-picker(
      v-model="date"
      full-width
      Format="24hr"
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
import abstractField from '@/form/abstract';

@Component({})
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
