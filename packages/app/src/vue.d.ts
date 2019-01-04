import { LesezeichenList } from '@/plugins/lesezeichen';
import Vue from 'vue';

declare module "vue/types/vue" {
  interface Vue {
    $liste: LesezeichenList;
  }
}
