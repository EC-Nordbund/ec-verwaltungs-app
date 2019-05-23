<template lang="pug">
  ec-wrapper(title="Home")
    h1 Vielen Dank für deinen Einsatz im EC-Nordbund!
    //- p Hier folgen verschiede Informationen und Statistiken.
    h2 Wichtige Info! - Release 2.0.0
    p Ich habe eine neue Funktion implementiert, dass man sich nach einem Seiten neuladen nicht neu einloggen muss und dass man mehrere Tabs mit der App haben kann ohne sich einzuloggen.
    h2 !!!Wichtig!!!
    p Man muss sich daher IMMER ordentlich mit dem Button oben rechts ausloggen!!!!!
    
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexHome extends Vue {
}
</script>