<template>
  <ec-simple-page
    :items="
      data.vort.veranstaltungen
        .sort((a, b) =>
          a.begin.input < b.begin.input
            ? -1
            : a.begin.input > b.begin.input
            ? 1
            : 0
        )
        .map(v => ({
          title: v.bezeichnung,
          subTitle: `${v.begin.german}${v.ende ? ' - ' : ''}${
            v.ende ? v.ende.german : ''
          }`,
          click: () => {
            $router.push({
              path: '/veranstaltungen/' + v.veranstaltungsID,
              query: { prev: $route.fullPath }
            });
          }
        }))
    "
    :standard="{ iconA: 'event' }"
    :countPerPage="countPerPage"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class orgaDetailsVeranstaltungsOrte extends Vue {
  @Prop({ type: Object })
  data!: any;

  @Prop({ type: Number })
  countPerPage!: number;
}
</script>
