import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'

// Import PrimeFlex
import '../node_modules/primeflex/primeflex.css'                       // PrimeFlex
import '../node_modules/primeicons/primeicons.css'                     // icons

// Importing Prime VUE and themes
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'   // optional
import Tooltip from 'primevue/tooltip';
import Button from 'primevue/button';

import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App)

app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Button', Button);

app.directive('tooltip', Tooltip);

app.use(PrimeVue, { ripple: true });
app.use(router)

app.mount('#app')