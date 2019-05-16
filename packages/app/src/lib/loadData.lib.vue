<template lang="pug">
  <slot v-if="dataLoaded" :data="data">
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { DocumentNode } from 'graphql';

@Component({})
export default class EcReport extends Vue {
  @Prop({type: Object, required: true})
  public gql!: DocumentNode;

  @Prop({type: Object, required: true})
  public vars!: any;

  @Prop({type: String, required: true})
  public key!: any;

  public data: any = null;

  public dataLoaded = false;

  public created() {
    const SELF = this;
    this.$emit('refetchCb', () => {
      SELF.fetch();
    });
  }

  private fetch() {
    this.$apolloClient.query({
      query: this.gql,
      variables: {
        authToken: this.$authToken,
        ...this.vars
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data[this.key];
      this.dataLoaded = true;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }
}
</script>
