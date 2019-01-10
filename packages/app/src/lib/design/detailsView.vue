<template>
  <ApolloQuery
    :query="query"
    :variables="{ authToken: $auth.instance.authToken, id: $route.params.id }"
    :tag="''"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading" class="loading apollo">Loading...</div>
      <div v-else-if="error" class="error apollo">
        An error occured {{ error }}
      </div>
      <v-card v-else-if="data" class="result apollo" style="margin: 5px">
        <v-toolbar color="transparent" class="elevation-0">
          <ec-x-btn />
          <v-spacer />
          <v-toolbar-title>
            <h1 v-font v-primary>{{ getTitle(data) }}</h1>
          </v-toolbar-title>
          <v-spacer />
          <ec-lesezeichen-add
            :route="$route.fullPath"
            :label="getTitle(data)"
            :elID="$route.params.id"
            :type="type"
          />
        </v-toolbar>
        <router-view v-bind="{ data, countPerPage: anzahlElement }" />
        <v-bottom-nav :value="true" color="transparent">
          <v-btn
            v-for="btn in pathes"
            :to="{ path: btn.path, query: { prev: $route.query.prev } }"
            replace
            :key="btn.label"
          >
            <span>{{ btn.label }}</span>
            <v-icon>{{ btn.icon }}</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class ecDetails extends Vue {
  anzahlElement = Math.floor((document.body.offsetHeight - 280) / 72);

  @Prop({ required: true, type: Object })
  query!: any;
  @Prop({ required: true, type: Function })
  getTitle!: Function;
  @Prop({ required: true, type: String })
  type!: string;
  @Prop({ required: true, type: Array })
  pathes!: Array<{
    path: string;
    label: string;
    icon: string;
  }>;
}
</script>
