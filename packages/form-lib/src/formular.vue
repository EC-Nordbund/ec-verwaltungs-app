<template lang="pug">
  component(:is="tag||'div'")
    component(v-for="field in schema" :is="'form_' + field.type" :schema="field" :value="value[field.name]" @input="value[field.name] = $event")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {CreateElement} from 'vue';

@Component({})
export default class FormRoot extends Vue {
  @Prop()
  public value!: any;

  @Prop()
  public schema!: any;

  @Prop()
  public tag!: any;
}

</script>
