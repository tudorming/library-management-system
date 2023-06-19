import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const theme = {
    primary: '#A3B18A',
    secondary: '#588157',
    third: '#3A5A40',
    fourth: '#344E41',
    background: '#DAD7CD',
    attention: '#ff3333',
    info: '#161a94',
}

export default new Vuetify({
    lang: {
        // t: (key, ...params) => i18n.t(key, params),
    },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    },
});
