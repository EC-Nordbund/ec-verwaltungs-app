import Vue from 'vue'
// Import Components
import geschlechtRadio from '@/plugins/lib_extension/radioGroups/geschlecht'
import positionRadio from '@/plugins/lib_extension/radioGroups/position'
import selectPerson from '@/plugins/lib_extension/selects/personSelect'
import selectAK from '@/plugins/lib_extension/selects/akSelect'
import selectVerteiler from '@/plugins/lib_extension/selects/verteilerSelect'
import typeRadio from '@/plugins/lib_extension/radioGroups/type'
import userGroupSelect from '@/plugins/lib_extension/selects/userGroupSelect'
import orgaSelect from '@/plugins/lib_extension/selects/orgaSelect'
import vOrtSelect from '@/plugins/lib_extension/selects/vOrtSelect'
import ecKreisSelect from '@/plugins/lib_extension/selects/ecKreisSelect'

// Install Components
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
