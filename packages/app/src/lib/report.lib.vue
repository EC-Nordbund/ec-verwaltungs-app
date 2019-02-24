<template lang="pug">
  v-card()
    
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// ()
@Component({})
export default class EcReport extends Vue {
  @Prop({type: String, default: false})
  public file!: string;

  public fileDownload: {
    file: string,
    formularSchema: any
  }|null = null;


  public fetching = false;

  public formData: any;

  public activate() {
    // check that file is there
    // show Formular from schema
  }

  public async formSubmitted(data: any) {
    this.formData = data;
    // call report creator
  }

  public async getData(query: string) {
    // Offensichtlich
  }

  @Watch('file', {immediate: true})
  private async getDocument() {
    this.fetching = true;
    const result = await fetch('https://ec-api.de/graphql?query={personen:{id}}').then((res) => res.json());
    this.fileDownload = result;
    this.fetching = false;
  }
}
</script>
