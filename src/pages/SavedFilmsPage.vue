<template>
    <div class="container">
        <div class="savedFilmsPage" v-if="savedFilms.length > 0">
            <film-card v-for="film in savedFilms" :key="film.id" :filmItem="film" @openFilm="openFilm"/>
        </div>
        <div class="noFilms" v-else>
            <p>Вы пока ничего не сохранили!</p>
        </div>
        <film-item v-model:shown="filmVisible"/>
    </div>
</template>

<script>
import FilmCard from '@/components/FilmCard.vue'
import FilmItem from '@/components/FilmItem.vue'
import { mapState } from 'vuex'

export default {
    components: {
        FilmCard,
        FilmItem
    },
    data() {
        return {
            savedFilms: [],
            filmVisible: false
        }
    },
    computed: {
        ...mapState({
            allFilms: 'allFilms'
        })
    },
    methods: {
        getSavedFilms() {
            let saved = JSON.parse(localStorage.getItem("SAVED_FILMS_KEY"))
            if (saved !== null) {
                for (let id of saved) {
                    for (let film of this.allFilms) {
                        if (id === film.id) {
                            this.savedFilms.push(film)
                        }
                    }
                }
            }
        },
        openFilm() {
            this.filmVisible = true
        }
    },
    mounted() {
        this.getSavedFilms()
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

.savedFilmsPage {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px 30px;
    margin: 0 auto;
}
</style>