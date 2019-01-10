<template>
  <ec-simple-page
    :items="
      data.vort.kontakte.length > 0
        ? data.vort.kontakte
            .map(v => [
              {
                title: kontakt.ansprechpartner,
                subTitle: 'Ansprechpartner',
                iconB: 'edit',
                clickB: () => {
                  edit(v);
                }
              },
              {
                title: kontakt.typ,
                subTitle: 'Typ'
              },
              {
                title: kontakt.telefon,
                subTitle: 'Telefon'
              },
              {
                title: kontakt.email,
                subTitle: 'E-Mail',
                click() {
                  mail(kontakt.email);
                }
              },
              {
                title: kontakt.notizen,
                subTitle: 'Notizen'
              },
              {
                divider: true
              }
            ])
            .flat()
        : [{ title: 'Keine Kontakte vorhanden!' }]
    "
    :countPerPage="countPerPage"
  >
    <ec-add-btn @click="addKontakt" />
  </ec-simple-page>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class orgaDetailsAllgemein extends Vue {
  @Prop({ type: Object })
  data!: any;

  @Prop({ type: Number })
  countPerPage!: number;

  mail(email: string) {
    window.location.href = "mailto:" + email;
  }

  edit(kontakt: any) {
    alert("Comming Soon...");
    //TODO: Edit Kontakt
  }

  addKontakt() {
    alert("Comming Soon...");
    //TODO: Add Kontakt
  }
}
</script>
