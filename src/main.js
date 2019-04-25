import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuetify from 'vuetify';
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyAlJb_344MJ-PhG4Ssmv7P6NqDHkyyo51s',
    authDomain: 'nodenote-c4a38.firebaseapp.com',
    databaseURL: 'https://nodenote-c4a38.firebaseio.com',
    projectId: 'nodenote-c4a38',
    storageBucket: 'nodenote-c4a38.appspot.com',
    messagingSenderId: '442898762075'
};

let app = '';

Vue.config.productionTip = false;
Vue.prototype.$firebase = firebase;
firebase.initializeApp(config);
library.add(faPlus);
library.add(faTimes);
library.add(faBars);
library.add(faShare);
library.add(faTrash);
library.add(faSignOutAlt);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faCheck);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Vuetify);

// Initialize the app when Firebase Auth object is ready to use
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }
});

global.vm = app;
