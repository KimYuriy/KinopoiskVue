<template>
    <div class="container">
        <div class="foundFilmsPage">
            <film-card v-for="film in films" :filmItem="film" :key="film.id" @openFilm="openFilm"/>
        </div>
        <film-item v-model:shown="filmVisible"/>
    </div>
</template>

<script>
import FilmCard from '@/components/FilmCard.vue'
import FilmItem from '@/components/FilmItem.vue';
import { mapState } from 'vuex'

export default {
    components: {
        FilmCard,
        FilmItem
    },
    data() {
        return {
            filmVisible: false
        }
    },
    methods: {
        openFilm() {
            this.filmVisible = true
        }
    },
    computed: {
        ...mapState({
            films: 'shownFilms'
        })
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

.foundFilmsPage {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px 30px;
    margin: 0 auto;
}
</style>