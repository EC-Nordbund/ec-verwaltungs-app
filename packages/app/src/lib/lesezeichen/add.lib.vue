<template lang="pug">
  v-btn(icon @click="toggleLesezeichen")
    v-icon star
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcLesezeichenAdd extends Vue {
  @Prop({type: String, required: true})
  title!: string

  @Prop({type: String, required: false})
  subTitle!: string

  toggleLesezeichen() {
    if(this.isLesezeichen){
      this.$util.lesezeichen.remove(this.$route.path)
    } else {
      this.$util.lesezeichen.add(this.title,this.subTitle,this.$route.fullPath,this.$route.path)
    }
    this.isLesezeichen = !this.isLesezeichen
  }

  isLesezeichen: boolean = false

  created() {
    this.isLesezeichen = this.$util.lesezeichen.check(this.$route.path)
  }
}
</script>
