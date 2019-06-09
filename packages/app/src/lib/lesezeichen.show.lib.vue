<template lang="pug">
  v-menu(open-on-hover)
    template(#activator="{on}")
      v-badge(overlap bottom color="red")
        template(#badge)
          span {{Object.keys(liste).length}}
        v-btn(v-on="on" icon)
          v-icon(color="white") star
    v-card
      v-card-title
        h1 Lesezeichen
      v-card-text
        v-list(two-line)
          template(v-for="item in liste")
            v-list-tile(@click="$router.push(item.fullPath)")
              v-list-tile-action
                v-icon person
              v-list-tile-content
                v-list-tile-title {{item.title}}
                v-list-tile-sub-title {{item.subTitle}}
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcLesezeichenShow extends Vue {
  public liste = {};

  public created() {
    this.liste = this.$util.lesezeichen.lesezeichen;
  }
}
</script>
