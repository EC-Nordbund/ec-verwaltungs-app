<template lang="pug">
  v-text-field(
    v-validate="schema.rule"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    :value="value"
    @input="changeValue"

    :color="isCapsOn ? 'warning' : undefined"
    :messages="isCapsOn ? 'Hinweis: Feststelltaste ist aktiv' : ''"

    v-on="schema.on||{}"
    v-bind="schema"

    :append-icon="passwordVisible ? 'visibility_off' : 'visibility'"
    @click:append="togglePasswordVisibility"

    :type="schema.typ||'password'"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

@Component({})
export default class FormInput extends Mixins(abstractField) {
  private passwordVisible = false;
  private isCapsOn = false;

  private togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.schema.typ = this.passwordVisible ? 'text' : 'password';
  }

  public checkCaps(ev: KeyboardEvent) {
    const key = ev.key;
    if (key.length === 1) {
      this.isCapsOn =
        key.toUpperCase() === key && key.toLowerCase() !== key && !ev.shiftKey;
    } else {
      if (key === 'CapsLock') {
        this.isCapsOn = !this.isCapsOn;
      }
    }
  }

  public created() {
    window.addEventListener('keyup', this.checkCaps);
  }

  public destroyed() {
    window.removeEventListener('keyup', this.checkCaps);
  }
}
</script>
