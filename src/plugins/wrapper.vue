<template>
  <div>
    <div style="margin: 15px">
      <v-card class="elevation-10">
        <v-toolbar>
          <ec-x-btn/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>{{title}}</h1>
          </v-toolbar-title>
          <v-spacer/>
          <ec-lesezeichen-add 
            :route="$route.path" 
            :label="label" 
            type="Person" 
            :elID="$route.params.id"
          />
        </v-toolbar>
        <v-card class="elevation-0">
          <v-toolbar tabs class="elevation-0">
            <v-spacer/>
            <slot name="label"/>
            <v-spacer/>
            <slot slot="extension" name="extension"/>
          </v-toolbar>
          <slot/>
        </v-card>
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
  @Prop({type: String, required: true})
  title!:string

  @Prop({type: String, required: true})
  label!:string

  @Prop({type: String, required: true})
  type!:string
}
</script>

<style>

</style>
