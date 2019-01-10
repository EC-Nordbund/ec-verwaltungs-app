<template>
  <ApolloQuery
    :query="query"
    :variables="{ authToken: $auth.instance.authToken }"
    :tag="''"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">An error occured {{ error }}</div>
      <v-card v-else-if="data">
        <v-toolbar color="transparent" class="elevation-0">
          <v-spacer />
          <v-toolbar-title>
            <h1 v-font v-primary>{{ title }}</h1>
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="Suchen"
            prepend-icon="search"
            :append-icon="suchString.length > 0 ? 'close' : undefined"
            v-model="suchString"
            @click:append="
              () => {
                suchString = '';
              }
            "
          />
          <v-data-table
            :rows-per-page-items="[count]"
            :items="getItems(data)"
            :pagination.sync="pageI"
            :search="suchString"
            :headers="headers"
          >
            <template slot="items" slot-scope="rowData">
              <slot name="row" v-bind="rowData" />
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <ec-add-btn @click="$refs.addForm.show()" />
          <ec-form ref="addForm" v-bind="addFormConfig" />
        </v-card-actions>
      </v-card>
      <div v-else>No result :(</div>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({})
export default class ecListView extends Vue {
  count = Math.floor((document.body.offsetHeight - 438) / 48);

  suchString: any = "";

  created() {
    this.pageI = {
      page: this.$route.query.page || 1,
      sortBy: this.$route.query.sortBy || "bezeichnung",
      descending: this.$route.query.descending || false
    };
    this.suchString = this.$route.query.suchString || "";
  }

  pageI: any = {};

  @Watch("suchString")
  onSucheChange() {
    this.onQueryChange();
  }

  @Watch("pageI")
  onPageIChange() {
    this.onQueryChange();
  }

  onQueryChange() {
    this.$router.replace({
      path: this.$route.path,
      query: { ...this.pageI, suchString: this.suchString }
    });
  }

  @Prop({ required: true, type: Array })
  headers!: Array<any>;
  @Prop({ required: true, type: Object })
  query!: any;
  @Prop({ required: true, type: String })
  title!: string;
  @Prop({ required: true, type: Function })
  getItems!: Function;
  @Prop({ required: true, type: Object })
  addFormConfig!: any;
}
</script>
