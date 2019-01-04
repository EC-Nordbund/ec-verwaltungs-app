import Vue from 'vue';

declare module "vue/types/vue" {
  interface Vue {
    $require: any;
    $getApolloClient: any;
    $updateChecker: any;
    $liste: any;
    $formConfig: {
      [name: string]: any;
    };
  }
}
