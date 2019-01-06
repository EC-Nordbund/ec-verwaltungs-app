import { LesezeichenList } from '@/plugins/lesezeichen';
import Vue from 'vue';
import { auth } from '@/plugins/auth';

declare module "vue/types/vue" {
  interface Vue {
    $liste: LesezeichenList,
    $auth: typeof auth
  }
}
