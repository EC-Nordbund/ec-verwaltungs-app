<template lang="pug">
  v-text-field(:append-outer-icon="filter?'more_vert':''" @click:append-outer="$emit('filter')", v-model="value", prepend-icon="search", :append-icon="value?'close':undefined", @click:append="value=''" v-bind="$attrs")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class EcSearch extends Vue {
  public value = '';

  @Prop({default: 'suche'})
  public queryParam!: string;

  @Prop({default: false})
  public filter!: boolean;

  @Watch('value')
  public onValueUpdate() {
    this.$emit('suche', this.value);
    this.$router.replace({
      path: this.$route.path,
      query: {
        ...this.$route.query,
        [this.queryParam]: this.value
      }
    });
  }

  public mounted() {
    this.value = (this.$route.query[this.queryParam] as string) || '';
  }
}
</script>
