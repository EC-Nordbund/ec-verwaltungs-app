<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title>
        <h1 v-font v-primary>Einstellungen</h1>
        <v-spacer/>
        <ec-button-icon icon="add" @click="addTab_show = true"/>
        <ec-form
          title="Tab hinzufügen"
          v-model="addTab_show"
          :fieldConfig="addTab_config"
          @save="addTab_save" 
        />
      </v-card-title>
      <v-card-text>
        <ec-list icon="tab" edit :items="config" :mapper="item=>({
          title: item.label  
        })"
          @edit="editTab_edit"
        />
        <ec-form
          title="Tab editieren"
          v-model="editTab_show"
          deleteBtn
          :fieldConfig="editTab_config"
          @save="editTab_save"
          @delete="editTab_del"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat>
          Abbrechen
        </v-btn>
        <v-btn v-primary-bg>
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'

import { IConf } from '@/plugins/widgets/types.ts'

@Component({})
export default class widgetContainerSettings extends Vue {
  show: boolean = false
  editTab_show = false
  editTab_config = [
    {
      name: 'label',
      label: 'Label',
      rules: [
        (v: string) =>
          !v ? 'Es muss ein Label angegeben werden!' : true
      ]
    }
  ]
  editTab_save() {}
  editTab_del() {}
  editTab_edit() {
    this.editTab_show = true
  }

  addTab_save() {}
  addTab_config = [
    {
      name: 'label',
      label: 'Label',
      rules: [
        (v: string) =>
          !v ? 'Es muss ein Label angegeben werden!' : true
      ]
    }
  ]
  addTab_show = false

  @Prop({ required: true, type: Boolean })
  value!: boolean

  @Watch('value')
  onValueChange(val: boolean) {
    this.show = val
  }

  @Prop({ required: true, type: Array })
  config!: Array<IConf>

  @Watch('show')
  @Emit('input')
  onShowChange(val: boolean) {}
}
</script>
<style scoped>
</style>
