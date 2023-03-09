import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Image from 'primevue/image';
import ProgressBar from 'primevue/progressbar';
import "primeflex/primeflex.css";
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
const app = createApp(App);

app.use(PrimeVue);
app.component('ClickButton', Button);
app.component('InputText',InputText);
app.component('PImage',Image);
app.component('ProgressBard',ProgressBar);
app.component('CheckBox',Checkbox);
app.component('DivideCard',Card);
app.mount("#app");
