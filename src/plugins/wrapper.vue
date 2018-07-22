<template>
  <div>
    <div style="margin: 15px">
      <v-card class="elevation-10">
        <v-toolbar>
          <ec-x-btn v-if="!mini"/>
          <v-btn icon style="visibility: hidden;"/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>
              {{title}}
            </h1>
          </v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="share" v-if="isElectron">
            <v-icon>
              share
            </v-icon>
          </v-btn>
          <ec-lesezeichen-add 
            v-if="!mini"
            :route="$route.path" 
            :label="label" 
            :type="type" 
            :elID="$route.params.id"
          />
          <slot slot="extension" name="extension" v-if="mini"/>
        </v-toolbar>
        <v-card class="elevation-0" v-if="!mini">
          <v-toolbar tabs class="elevation-0">
            <v-spacer/>
            <slot name="label"/>
            <v-spacer/>
            <slot slot="extension" name="extension"/>
          </v-toolbar>
          <slot/>
        </v-card>
        <slot v-if="mini"/>
        <v-card-actions>
          <slot name="actions"/>
        </v-card-actions>
      </v-card>
    </div>
    <slot name="forms"/>
  </div>
</template>

<script lang="ts">
import electron, { isElectron } from '@/plugins/electron'
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class verteilerDetails extends Vue {
  isElectron = isElectron

  @Prop({ type: Boolean, default: false })
  mini!: boolean

  @Prop({ type: String, required: true })
  title!: string

  @Prop({ type: String, default: 'No-Label' })
  label!: string

  @Prop({ type: String, default: 'No-Type' })
  type!: string

  share() {
    this.$emit('share', (url: string) => {
      electron.clipboard.writeText(`ec://${url}`)
    })
  }
}
</script>
