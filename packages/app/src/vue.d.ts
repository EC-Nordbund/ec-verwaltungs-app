import Vue from 'vue';
import { Auth } from '@/plugins/auth';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: () => Auth;
    $login: (username: string, password: string) => Promise<never>;
    $logout: () => void;
    $util: any;
  }
}
