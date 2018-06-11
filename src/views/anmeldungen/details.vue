<template>
  <div>
    <v-toolbar tabs ripple>
      <v-btn 
        v-accent-bg dark 
        @click="$router.back()">
        <v-icon>keyboard_arrow_left</v-icon>
        Zurück
      </v-btn>
      <v-spacer/>
      <span v-primary style="font-size: 2.2em !important;" class="headline">
        Timeout (Sebastian Krüger)
      </span>
      <v-spacer/>
      <ec-edit @click="no"/>
      <v-tabs v-model="tabs" fixed-tabs color="transparent" slot="extension">
        <v-tabs-slider/>
        <v-tab href="#tab-2">
          <v-icon>contacts</v-icon>
          Allgemeines
        </v-tab>
        <v-tab href="#tab-3">
          <v-icon>event</v-icon>
          Timeline
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="tab-2">
        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">
                account_box
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Sebastian Krüger
              </v-list-tile-title>
              <v-list-tile-sub-title>
                23.11.1997
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">
                event
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Timeout
              </v-list-tile-title>
              <v-list-tile-sub-title>
                01.04.2018 - 02.04.2018
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="indigo">
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Teilnehmer
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-btn @click="no()">
          Zahlungseingang
        </v-btn>
        <v-btn @click="no()">
          Abmeldung
        </v-btn>
        <v-btn @click="no()">
          Nachrücken
        </v-btn>
        <v-btn @click="no()">
          Rückzahlung
        </v-btn>
      </v-tab-item>
      <v-tab-item id="tab-3">
        <timeline>
          <timeline-title>
            Anmeldung zur Timeout
          </timeline-title>
          <timeline-item><b>15.05.2018 - 18:07:</b> Anmeldung</timeline-item>
          <timeline-item><b>15.05.2018 - 18:17:</b> DS-Einverstanden</timeline-item>
          <timeline-item><b>15.05.2018 - 18:18:</b> Warteliste-Email</timeline-item>
          <timeline-item><b>31.05.2018 - 14:21:</b> Nachrücker-Anfrage</timeline-item>
          <timeline-item><b>31.05.2018 - 15:08:</b> Nachrücken</timeline-item>
          <timeline-item><b>31.05.2018 - 18:31:</b> Bestätigungsbrief</timeline-item>
          <timeline-item><b>15.06.2018 - 09:07:</b> Zahlungseingang</timeline-item>
          <timeline-item><b>30.06.2018 - 08:05:</b> Infobrief</timeline-item>
          <timeline-item><b>05.07.2018 - 13:17:</b> Abmeldung (Krankheit)</timeline-item>
          <timeline-item><b>09.07.2018 - 12:08:</b> Rückzahlung (80%)</timeline-item>
        </timeline>
      </v-tab-item>
    </v-tabs-items>
    Nicht Dynamisch!!! Statischer Content als Idee <br>
    Noch nicht auf neue Components umgestellt...
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader';
import gql from 'graphql-tag';

import auth from '@/plugins/auth';
@Component({})
export default class AnmeldungsDetails extends reloaderBase {
  tabs = null;
  anmeldung = {};
}
</script>
