import addButton from '@/plugins/lib/buttons/add';
import iconButton from '@/plugins/lib/buttons/icon-btn';
import anmeldungSelect from '@/plugins/lib/content/AnmeldungSelect.vue';
import DSGVO from '@/plugins/lib/content/DSGVO.vue';
import headline from '@/plugins/lib/design/headline';
import liste from '@/plugins/lib/design/list';
import position from '@/plugins/lib/design/positionen.vue';
import table from '@/plugins/lib/design/table.vue';
import wrapper from '@/plugins/lib/design/wrapper.vue';
import formDialog from '@/plugins/lib/formElements/formDialog/form';
import datePicker from '@/plugins/lib/formElements/inputs/datePicker.vue';
import radio from '@/plugins/lib/formElements/inputs/radioGroups/base';
import geschlechtRadio from '@/plugins/lib/formElements/inputs/radioGroups/geschlecht';
import positionRadio from '@/plugins/lib/formElements/inputs/radioGroups/position';
import typeRadio from '@/plugins/lib/formElements/inputs/radioGroups/type';
import selectAK from '@/plugins/lib/formElements/inputs/selects/akSelect';
import ecKreisSelect from '@/plugins/lib/formElements/inputs/selects/ecKreisSelect';
import orgaSelect from '@/plugins/lib/formElements/inputs/selects/orgaSelect';
import selectPerson from '@/plugins/lib/formElements/inputs/selects/personSelect';
import selectVerteiler from '@/plugins/lib/formElements/inputs/selects/verteilerSelect';
import userGroupSelect from '@/plugins/lib/formElements/inputs/selects/verteilerSelect';
import vOrtSelect from '@/plugins/lib/formElements/inputs/selects/vOrtSelect';
import switchElement from '@/plugins/lib/formElements/inputs/switch';
import Vue from 'vue';
Vue.component('ec-anmeldungSelect', anmeldungSelect)
Vue.component('ec-dsgvo', DSGVO)
Vue.component('ec-wrapper', wrapper)
Vue.component('ec-radio-geschlecht', geschlechtRadio)
Vue.component('ec-radio-position', positionRadio)
Vue.component('ec-radio-type', typeRadio)
Vue.component('ec-select-person', selectPerson)
Vue.component('ec-select-ak', selectAK)
Vue.component('ec-select-verteiler', selectVerteiler)
Vue.component('ec-select-userGroup', userGroupSelect)
Vue.component('ec-select-orga', orgaSelect)
Vue.component('ec-select-vort', vOrtSelect)
Vue.component('ec-select-ecKreis', ecKreisSelect)
Vue.component('ec-button-add', addButton)
Vue.component('ec-button-icon', iconButton)
Vue.component('ec-form-datePicker', datePicker)
Vue.component('ec-form-radio', radio)
Vue.component('ec-form-switch', switchElement)
Vue.component('ec-headline', headline)
Vue.component('ec-table', table)
Vue.component('ec-list', liste)
Vue.component('ec-form', formDialog)
Vue.component('ec-rolle', position)
