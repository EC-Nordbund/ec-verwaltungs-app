import ecGQLmutate from '@/realPlugins/gqlComponents/ecGQLmutate.vue';
import ecGQLquery from '@/realPlugins/gqlComponents/ecGQLquery.vue';
import ecGQLwatch from '@/realPlugins/gqlComponents/ecGQLwatch.vue';
import Vue from 'vue';

export default {
  install(vue: typeof Vue) {
    vue.component('gql-query', ecGQLquery)
    vue.component('gql-watch', ecGQLwatch)
    vue.component('gql-mutate', ecGQLmutate)
  }
}
