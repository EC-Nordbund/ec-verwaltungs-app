<template lang="pug">
  v-text-field(v-bind="$attrs", v-on="$listeners", v-model="value", prepend-icon="search", :append-icon="value?'close':undefined", @click:append="value=''")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class EcSearch extends Vue {
  public value = '';

  @Prop({default: 'suche'})
  public queryParam!: string;

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
    this.value = <string>this.$route.query[this.queryParam] || ''
  }
}
;
</script>
