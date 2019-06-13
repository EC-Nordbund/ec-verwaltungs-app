<template lang="pug">
  v-stepper(v-bind="schema" v-model="currStep")
    template(v-for="(step, stepID) in schema.steps")
      v-stepper-step(:step="stepID+1" :complete="stepID+1 < currStep" :key="stepID+'step'" :rules="[()=>!error[stepID+1]]") {{step.label}}
        small(v-if="step.summerize&&!error[stepID+1]") {{step.summerize}}
        small(v-if="error[stepID+1]") Es wurden nicht alle Felder korrekt ausgefüllt!
      v-stepper-content(:step="stepID+1" :key="stepID+'content'")
        v-form(v-model="valid[stepID+1]")
          formular(:value="value[step.name]" @input="onValueChange({...value, [step.name]: $event})" :schema="step.schema")
          div(style="display:flex;")
            v-spacer
            v-btn(v-for="(btn, btnID) in step.btns" :key="stepID+'_'+btnID" v-html="btn.content" @click="clickBtn(btn.click)" color="primary")
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

// @ts-ignore
import { VForm, VStepper, VStepperStep, VBtn } from 'vuetify/lib';

@Component({
  components: {
    VForm,
    VStepper,
    VStepperStep,
    VBtn,
  },
})
export default class FormStepper extends Mixins(abstractField) {
  public currStep: number = 0;
  public valid: any = {};

  public error: any = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false
  };

  public clickBtn(cb: undefined|((currStep: number, valid: boolean, cancel: () => void, save: () => void, self: this, set:any ) => void | number) ) {
    // await this.$validator.validateAll()
    if (cb) {
      const val = cb(this.currStep, this.valid[this.currStep], this.cancel, this.save, this, Vue.set);
      if (val) {
        this.currStep = val;
      }
    }
  }
}
</script>
