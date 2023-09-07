<template>
    <div class="container">
        <select>
            <option disabled value="">Сортировать по</option>
        </select>
        <div class="allFilmsPage">
            <film-card v-for="film in films" :filmItem="film" :key="film.id" @openFilm="openFilm"/>
        </div>
        <film-item v-model:shown="filmVisible"/>
    </div>
</template>

<script>
import { mapState } from "vuex";
import FilmCard from "@/components/FilmCard.vue";
import FilmItem from '@/components/FilmItem.vue';

export default {
    components: {
        FilmCard,
        FilmItem,
    },
    data() {
        return {
            filmVisible: false,
        }
    },
    computed: {
        ...mapState({
          films: "shownFilms",
        }),
    },
    mounted() {
        this.$store.commit("setShownFilms");
        this.$store.commit("setIsInFoundPage", false);
        this.$store.commit("setInSavedPage", false);
    },
    methods: {
        openFilm() {
            this.filmVisible = true
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
.allFilmsPage {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px 30px;
    margin: 0 auto;
}
</style>