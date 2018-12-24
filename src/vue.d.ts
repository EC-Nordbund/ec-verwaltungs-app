import { IgetApolloClient } from '@/realPlugins/apollo';
import { Irequire } from '@/realPlugins/electron';
import { updateChecker } from '@/realPlugins/updateChecker';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $require: Irequire
    $getApolloClient: IgetApolloClient
    $updateChecker: typeof updateChecker
  }
}
