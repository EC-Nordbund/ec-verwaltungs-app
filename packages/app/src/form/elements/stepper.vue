<template lang="pug">
  v-stepper(v-bind="schema" v-model="currStep")
    template(v-for="(step, stepID) in schema.steps")
      v-stepper-step(:step="stepID+1" :complete="stepID+1 < currStep" :key="stepID+'step'") {{step.label}}
        small(v-if="step.summerize") {{step.summerize}}
      v-stepper-content(:step="stepID+1" :key="stepID+'content'")
        v-form(v-model="valid[stepID]")
          Formular(:value="value[ step.name]" @input="onValueChange({...value, [step.name]: $event})" :schema="step.schema")
          v-btn(v-for="(btn, btnID) in step.btns" :key="stepID+'_'+btnID" v-html="btn.content" @click="clickBtn(btn.click)")
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormStepper extends Mixins(abstractField) {
  public currStep: number = 0;
  public valid: any = {};

  public clickBtn(cb: undefined|((currStep: number, valid: boolean, self: this ) => void | number) ) {
    if (cb) {
      const val = cb(this.currStep, this.valid[this.currStep], this);
      if (val) {
        this.currStep = val;
      }
    }
  }
}
</script>
