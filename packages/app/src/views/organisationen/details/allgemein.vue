<template>
  <ec-simple-page
    :items="[
      {
        title: data.orga.ansprechpartner,
        subTitle: 'Ansprechpartner',
        iconA: 'person'
      },
      {
        divider: true
      },
      {
        title: data.orga.email,
        subTitle: 'E-Mail',
        iconA: 'mail',
        click: mail
      },
      {
        divider: true
      },
      {
        title: data.orga.telefon,
        subTitle: 'Telefon',
        iconA: 'phone'
      },
      {
        divider: true
      },
      {
        title: data.orga.strasse,
        subTitle: `${data.orga.plz} ${data.orga.ort} (${data.orga.land})`,
        iconA: 'location_on',
        click: map
      },
      {
        divider: true
      },
      {
        title: data.orga.notizen,
        iconA: 'extension'
      }
    ]"
    :standard="{
      title: 'N/A',
      iconB: 'edit',
      clickB() {
        $refs.editOrga.show();
      }
    }"
    :countPerPage="countPerPage"
  >
    <ec-form
      ref="editOrga"
      title="Editieren der Organisation"
      :value="value"
      :config="{
        form: [
          {
            name: 'bezeichnung',
            label: 'Bezeichnungen',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst eine Bezeichnung angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Die Bezeichnung darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'ansprechpartner',
            label: 'Ansprechpartner',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst einen Ansprechpartner angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Der Ansprechpartner darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'email',
            label: 'E-Mail',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst eine E-Mail angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Die E-Mail Adresse darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'telefon',
            label: 'Telefon',
            component: 'v-text-field',
            counter: 20,
            rules: [
              v => (!v ? 'Du musst eine Telefonnummer angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Die Telefonnummer darf maximal 20 Zeichen lang sein.'
                  : true
            ],
            mask: '####################'
          },
          {
            name: 'strasse',
            label: 'Strasse',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst eine Strasse angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Die Strasse darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'plz',
            label: 'PLZ',
            component: 'v-text-field',
            counter: 8,
            rules: [
              v => (!v ? 'Du musst eine PLZ angeben!' : true),
              v =>
                v && v.length > 8
                  ? 'Die PLZ darf maximal 8 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'ort',
            label: 'Ort',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst einen Ort angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Der Ort darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'land',
            label: 'Land',
            component: 'v-text-field',
            counter: 50,
            rules: [
              v => (!v ? 'Du musst ein Land angeben!' : true),
              v =>
                v && v.length > 50
                  ? 'Das Land darf maximal 50 Zeichen lang sein.'
                  : true
            ]
          },
          {
            name: 'notizen',
            label: 'Notizen',
            component: 'v-textarea'
          }
        ],
        buttons: [
          {
            onDone() {},
            label: 'Abbrechen',
            needValid: false
          },
          {
            onDone() {},
            label: 'Speichern',
            needValid: true,
            color: 'primary',
            mutation: require('@/graphql/organisationen/editOrga.gql')
          }
        ]
      }"
    />
  </ec-simple-page>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class orgaDetailsVeranstaltungsOrte extends Vue {
  @Prop({ type: Object })
  data!: any;

  @Prop({ type: Number })
  countPerPage!: number;

  value = {
    bezeichnung: "",
    ansprechpartner: "",
    email: "",
    telefon: "",
    strasse: "",
    plz: "",
    ort: "",
    land: "",
    notizen: ""
  };

  @Watch("data", { immediate: true })
  onDataChange() {
    this.value = <any>{};
    this.value = <any>{
      ...this.data
    };
  }

  mail() {
    window.location.href = "mailto:" + this.data.orga.email;
  }

  map() {
    this.$util.map(
      this.data.orga.strasse,
      this.data.orga.plz,
      this.data.orga.ort,
      this.data.orga.land
    );
  }
}
</script>
