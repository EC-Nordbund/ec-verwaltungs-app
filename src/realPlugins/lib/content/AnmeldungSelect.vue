<template>
  <v-dialog max-width="400px" v-model="open">
    <slot slot="activator"/>
    <v-card>
      <v-card-title>
        <h1 v-primary>Anmeldung wählen.</h1>
      </v-card-title>
      <v-card-text>
        <gql-query>
          <template slot-scope="{data}">
            <template v-if="data">
              <v-autocomplete
                :items="(data.anmeldungen||[]).map(v=>v.anmeldeID)"
                label="AnmeldeID wählen."
                v-model="aID"
              />
            </template>
          </template>
          <template slot="query">
            query($authToken: String!) {
            anmeldungen(authToken: $authToken) {
            anmeldeID
            }
            }
          </template>
        </gql-query>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="$router.push(`/app/anmeldungen/${aID}`);open=false">Auswählen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class anmeldungSelect extends Vue {
  aID: string = ''
  open:boolean=false
}
</script>
