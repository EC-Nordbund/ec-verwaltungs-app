<template>
  <v-dialog
    ref="dialog"
    v-model="dialog_open"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      readonly
      :value="german"
      prepend-icon="event"
      v-bind="$attrs"
    />
    <v-date-picker v-model="date_input" scrollable locale="de-de">
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="dialog_open = false">Abbrechen</v-btn>
      <v-btn color="primary" @click="onDateChange(date_input);$refs.dialog.save(date_input)">Speichern</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator';

@Component({})
export default class DatePicker extends Vue {
  dialog_open: boolean = false;
  date_input: string = '';

  inheritAttrs = false;

  @Prop({
    type: String,
    required: false,
    default: ''
  })
  value!: string;

  @Watch('value', { immediate: true })
  onValueChange(value: string) {
    this.date_input = value;
  }

  @Watch('date')
  @Emit('input')
  onDateChange(val: string) {}

  get german(): string {
    if (
      this.date_input === '' ||
      this.date_input === null ||
      this.date_input === undefined
    ) {
      return '';
    } else {
      return this.date_input
        .split('-')
        .reverse()
        .join('.');
    }
  }
}
</script>
