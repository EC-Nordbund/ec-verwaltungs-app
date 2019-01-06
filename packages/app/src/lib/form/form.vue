7<template>
  <v-dialog persistend v-model="show_" :max-width="width">
    <v-card>
      <v-card-title>
        <h1 v-primary v-font>
          {{title}}
        </h1>
      </v-card-title>
      <v-card-text>
        <ec-form-inputs @valid="valid = $event" @input="onDataChange" :config="config.form" :value="value"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <template v-for="btn in config.buttons">
          <ApolloMutation
            :mutation="btn.mutation"
            :variables="data"
            :key="btn.label"
            tag=""
            @done="btn.onDone"
            :refetchQueries="btn.refetchQueries"
            v-if="btn.mutation"
          >
            <template slot-scope="{ mutate, loading }">
              <v-btn :color="btn.color" :disabled="loading || (!valid&&btn.needValid)" @click="show_=false;mutate()">{{btn.label}}</v-btn>
            </template>
          </ApolloMutation>
          <v-btn :color="btn.color" :disabled="(!valid&&btn.needValid)" @click="show_=false;btn.onDone()" v-else :key="btn.label">
            {{btn.label}}
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator';

import ecFormInputs from '@/lib/form/inputForms'

@Component({
  components: {
    ecFormInputs
  }
})
export default class ecForm extends Vue {
  @Prop({
    type: String,
    required: false,
    default: ''
  })
  title!: string;

  @Prop({
    type: String,
    required: false,
    default: '500px'
  })
  width!: string;

  valid:boolean = false

  @Prop({
    type: Object
  })
  config!: any;

  
  @Prop({
    type: Object
  })
  value!: any;


  onDataChange($event:any){
    this.data = {
      ...$event,
      authToken:this.$auth.instance.authToken
    }
  }

  data:any = {}

  show_=false

  public show(){
    this.show_ = true
  }
}
</script>
