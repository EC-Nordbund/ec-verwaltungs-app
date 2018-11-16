import addButton from '@/plugins/lib/buttons/add';
import iconButton from '@/plugins/lib/buttons/icon-btn';
import headline from '@/plugins/lib/design/headline';
import liste from '@/plugins/lib/design/list';
import position from '@/plugins/lib/design/positionen.vue';
import table from '@/plugins/lib/design/table.vue';
import formDialog from '@/plugins/lib/formElements/formDialog/form';
import datePicker from '@/plugins/lib/formElements/inputs/datePicker.vue';
import radio from '@/plugins/lib/formElements/inputs/radio';
import switchElement from '@/plugins/lib/formElements/inputs/switch';
import Vue from 'vue';

// Import Components
// Install Components
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