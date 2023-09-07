<template>
    <v-app>
        <nav-bar />
        <router-view class="router"/>
    </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import kinopoisk1 from '@/jsons/kinopoisk1.json'

export default {
    components: {
        NavBar
    },
    data() {
        return {
            filmsJSON: kinopoisk1
        }
    },
    created() {
        this.$store.commit('setAllFilms', this.filmsJSON)
    }
}
</script>

<style scoped>
.router {
    margin: 1%;
}
</style>