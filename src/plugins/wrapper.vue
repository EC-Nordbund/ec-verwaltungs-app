<template>
  <div>
    <div style="margin: 15px">
      <v-card class="elevation-10">
        <v-toolbar>
          <ec-x-btn v-if="!mini"/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>
              {{title}}
            </h1>
          </v-toolbar-title>
          <v-spacer/>
          <ec-lesezeichen-add 
            v-if="!mini"
            :route="$route.path" 
            :label="label" 
            :type="type" 
            :elID="$route.params.id"
          />
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
        <v-card-text v-if="mini">
          <slot/>
        </v-card-text>
        <v-card-actions>
          <slot name="actions"/>
        </v-card-actions>
      </v-card>
    </div>
    <slot name="forms"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class verteilerDetails extends Vue {
  @Prop({type: Boolean, default: false})
  mini!: boolean

  @Prop({type: String, required: true})
  title!:string

  @Prop({type: String, default: 'No-Label'})
  label!:string

  @Prop({type: String, default: 'No-Type'})
  type!:string
}
</script>
