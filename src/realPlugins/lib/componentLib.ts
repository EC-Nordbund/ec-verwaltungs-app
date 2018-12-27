import addButton from '@/realPlugins/lib/buttons/add';
import iconButton from '@/realPlugins/lib/buttons/icon-btn';
import anmeldungSelect from '@/realPlugins/lib/content/AnmeldungSelect.vue';
import DSGVO from '@/realPlugins/lib/content/DSGVO.vue';
import headline from '@/realPlugins/lib/design/headline';
import liste from '@/realPlugins/lib/design/list';
import newList from '@/realPlugins/lib/design/newList.vue';
import position from '@/realPlugins/lib/design/positionen.vue';
import table from '@/realPlugins/lib/design/table.vue';
import wrapper from '@/realPlugins/lib/design/wrapper.vue';
import formDialog from '@/realPlugins/lib/formElements/formDialog/form';
import datePicker from '@/realPlugins/lib/formElements/inputs/datePicker.vue';
import radio from '@/realPlugins/lib/formElements/inputs/radioGroups/base';
import geschlechtRadio from '@/realPlugins/lib/formElements/inputs/radioGroups/geschlecht';
import positionRadio from '@/realPlugins/lib/formElements/inputs/radioGroups/position';
import typeRadio from '@/realPlugins/lib/formElements/inputs/radioGroups/type';
import selectAK from '@/realPlugins/lib/formElements/inputs/selects/akSelect';
import ecKreisSelect from '@/realPlugins/lib/formElements/inputs/selects/ecKreisSelect';
import orgaSelect from '@/realPlugins/lib/formElements/inputs/selects/orgaSelect';
import selectPerson from '@/realPlugins/lib/formElements/inputs/selects/personSelect';
import selectVerteiler from '@/realPlugins/lib/formElements/inputs/selects/verteilerSelect';
import userGroupSelect from '@/realPlugins/lib/formElements/inputs/selects/verteilerSelect';
import vOrtSelect from '@/realPlugins/lib/formElements/inputs/selects/vOrtSelect';
import switchElement from '@/realPlugins/lib/formElements/inputs/switch';
import Vue from 'vue';

export default {
  install(vue: typeof Vue) {
    vue.component('ec-anmeldungSelect', anmeldungSelect)
    vue.component('ec-dsgvo', DSGVO)
    vue.component('ec-wrapper', wrapper)
    vue.component('ec-radio-geschlecht', geschlechtRadio)
    vue.component('ec-radio-position', positionRadio)
    vue.component('ec-radio-type', typeRadio)
    vue.component('ec-select-person', selectPerson)
    vue.component('ec-select-ak', selectAK)
    vue.component('ec-select-verteiler', selectVerteiler)
    vue.component('ec-select-userGroup', userGroupSelect)
    vue.component('ec-select-orga', orgaSelect)
    vue.component('ec-select-vort', vOrtSelect)
    vue.component('ec-select-ecKreis', ecKreisSelect)
    vue.component('ec-button-add', addButton)
    vue.component('ec-button-icon', iconButton)
    vue.component('ec-form-datePicker', datePicker)
    vue.component('ec-form-radio', radio)
    vue.component('ec-form-switch', switchElement)
    vue.component('ec-headline', headline)
    vue.component('ec-table', table)
    vue.component('ec-list', liste)
    vue.component('ec-form', formDialog)
    vue.component('ec-rolle', position)
    vue.component('ec-list-new', newList)
  }
}
