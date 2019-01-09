import { IgetApolloClient } from '@/realPlugins/apollo';
import { Irequire } from '@/realPlugins/electron';
import { IConfig } from '@/realPlugins/formConfig';
import { LesezeichenList } from '@/realPlugins/lesezeichen/neueLesezeichen';
import { updateChecker } from '@/realPlugins/updateChecker';
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $require: Irequire
    $getApolloClient: IgetApolloClient
    $updateChecker: typeof updateChecker
    $liste: LesezeichenList
    $formConfig: {
      [name: string]: IConfig
    }
  }
}
