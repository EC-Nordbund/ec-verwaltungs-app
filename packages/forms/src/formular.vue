<template lang="pug">
  component(:is="tag||'div'")
    component(v-for="field in schema" :is="'form_' + field.type" :schema="field" :value="value[field.name]" @input="value[field.name] = $event" :save="save" :cancel="cancel")
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

  @Prop({
    required: true,
  })
  public cancel!: any;

  @Prop({
    required: true,
  })
  public save!: any;
}

</script>
