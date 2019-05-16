import Vue from 'vue';
import { Auth } from '@/plugins/auth';
import ApolloClient from 'apollo-boost';
declare module 'vue/types/vue' {
  interface Vue {
    $authToken: string;
    $apolloClient: ApolloClient<any>;
    $login: (username: string, password: string) => Promise<never>;
    $logout: () => void;
    $util: any;
    $setAuthToken: (authToken: string) => void;
    $notifikation: (title: string, body: string) => Notification;
  }
}
