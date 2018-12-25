import ecGQLmutate from '@/gql/ecGQLmutate.vue';
import ecGQLquery from '@/gql/ecGQLquery.vue';
import ecGQLwatch from '@/gql/ecGQLwatch.vue';
import Vue from 'vue';

export default {
  install(vue: typeof Vue) {
    vue.component('gql-query', ecGQLquery)
    vue.component('gql-watch', ecGQLwatch)
    vue.component('gql-mutate', ecGQLmutate)
  }
}
