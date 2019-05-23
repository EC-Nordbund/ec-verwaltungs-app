import { genReport } from '@/report';
import Vue from 'vue';
import { DocumentNode } from 'graphql';

export const name = 'report';

export default {
  loadData: (self: Vue, query: DocumentNode, reportname: string, savename: string, variables: any = {}) => {
    self.$apolloClient.query({
      query,
      variables: {
        authToken: self.$authToken,
        ...variables,
        ...self.$route.params
      },
      fetchPolicy: 'no-cache'
    }).then((res: {data: any}) => {
      genReport(reportname, res.data, savename);
    }).catch((err: {message: string}) => {
      self.$dialog.error({
        text: err.message,
        title: 'Laden und damit generieren des Reports fehlgeschlagen!'
      });
    });
  },
  withData: genReport
};
