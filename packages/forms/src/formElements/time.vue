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
      slot="activator"
      :value="date"
      :label="schema.label"
      prepend-icon="access_time"
      readonly
      v-bind="schema.textfield || {}"
    )
    v-time-picker(
      v-model="date"
      full-width
      Format="24hr"
      v-bind="schema"
      v-on="schema.on||{}"
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
import { VSpacer, VBtn, VDialog, VTimePicker, VTextField } from 'vuetify/lib';

@Component({
  components: {
    VSpacer,
    VBtn,
    VDialog,
    VTimePicker,
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
