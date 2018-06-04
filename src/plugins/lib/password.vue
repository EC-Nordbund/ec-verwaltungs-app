<template>
  <div>
    <v-text-field type="password" label="Password" @input="onInput" :rules="[v => val < 4 ? error : true]"/>
    <v-progress-linear :value="val * 25" height="3" :color="color[val]"></v-progress-linear>
  </div>
</template>
<script lang="js">
// import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

// import zxcvbn from "zxcvbn";


// @Component({})
// export default class password extends Vue {
//   val: number = 0
//   color: Array<string> = [
//     'error',
//     'error',
//     'warning',
//     'warning',
//     'success'
//   ]
//   error: string = ''
//   onInput(value:string) {
//     this.val = zxcvbn(value).score
//     this.error = zxcvbn(value).feedback.warning
//     console.log(zxcvbn(value).feedback.warning)
//     console.log(zxcvbn(value))
//   }
// }
</script>
