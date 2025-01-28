let app = Vue.createApp({
    data() {
        return {
            max: 15,
            maxPhoto: 5,
            text: '',
            photo: false,
            tweets: [],
        };
    },
    computed: {
        nbRestants() {
            let nb = this.max - this.text.length;
            if (this.photo) {
                nb -= this.maxPhoto; 
            }
            return nb;
        },
        limiteDepassee() {
            return this.nbRestants < 0;
        }
    },
    methods: {
        creeTweet() {
            this.tweets.push({
                text: this.text,
                photo: this.photo,
            });
            this.text = '';
            this.photo = false;
        },
    }
})

app.component('tweet', {
    template: `
        <div>
            <h2>{{ text }}</h2>
            <img v-if="photo" :src="url">
        </div>
    `,
    data() {
        return {
            url: 'https://picsum.photos/200/200?random=' + Math.random(),
        }
    },
    props: {
        text: {
            type: String,
            required: true,
        },
        photo: {
            type: Boolean,
            required: true,
        },
    }
});

app.mount('#app');
