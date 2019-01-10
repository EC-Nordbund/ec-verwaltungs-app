<template>
  <v-card-text>
    <ec-liste
      :items="items"
      :standard="standard"
      v-model="page"
      :countPerPage="countPerPage"
    />
    <slot />
  </v-card-text>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class ecSimplePage extends Vue {
  @Prop({ type: Array, required: true })
  items!: any;

  @Prop({ type: Number })
  countPerPage!: number;

  @Prop({ type: Object, default: () => ({}) })
  standard!: any;

  page: any = 1;

  created() {
    this.page = this.$route.query.page || 1;
  }

  @Watch("page")
  onPageChange() {
    this.$router.replace({
      path: this.$route.path,
      query: { page: this.page, prev: this.$route.query.prev }
    });
  }
}
</script>
