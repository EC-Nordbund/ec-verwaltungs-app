<template lang="pug">
  .adresse
    v-text-field.strasse(
      label="Straße"
      counter="50"
      required
      :value="(value || {}).strasse"
      @input="changeValue({ort: value.ort, plz: value.plz, strasse: $event})"
      :data-vv-name="schema.name + '_strasse'"
      data-vv-as="Straße"
      :error-messages="errors.collect(schema.name + '_strasse')"
      v-validate="'required|max:50'"
    )
    v-autocomplete.plz(
      v-validate="'required'"
      :value="(value || {}).plz"
      label="PLZ"
      @change="plzChange"
      required
      :data-vv-name="schema.name + '_plz'"
      data-vv-as="PLZ"
      :items="plz"
      :error-messages="errors.collect(schema.name + '_plz')"
    )
    v-autocomplete.ort(
      v-validat.initial="'required'"
      :value="(value || {}).ort"
      label="Ort"
      @change="changeValue({plz: value.plz, ort: $event, strasse: value.strasse})"
      :data-vv-name="schema.name + '_ort'"
      :error-messages="errors.collect(schema.name + '_ort')"
      :items="map[value.plz]"
      :disabled="!value.plz"
      data-vv-as="Ort"
    )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';
// @ts-ignore
import { VAutocomplete, VTextField } from 'vuetify/lib';

@Component({
  components: {
    VAutocomplete,
    VTextField,
  },
})
export default class FormInput extends Mixins(abstractField) {
  public map: any = (window as any).$plz;
  public plz = Object.keys((window as any).$plz);

  public plzChange($event: string) {
    if (this.map[$event].length === 1) {
      this.changeValue({ort: this.map[$event][0], plz: $event, strasse: this.value.strasse});
    } else {
      this.changeValue({ort: undefined, plz: $event, strasse: this.value.strasse});
    }
  }
}
</script>
<style scoped>
.strasse {
  grid-area: s;
}
.plz{
  grid-area: p;
}
.ort{
  grid-area: o;
}
.adresse {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  grid-template-areas: "s s" "p o"
}
</style>

