<template>
    <div class="navBar">
        <h3>Кинопоиск 2.0. Сильнее, умнее, лучше оригинала</h3>
        <div class="controls">
            <input class="mr-2" v-if="inSaved === false && inFound === false" id="searchBar" type="text" placeholder="Название фильма..." v-model="searchQuery" @keyup.enter="searchFilm"/>
            <select @change="changeOption" class="mr-2" v-model="selectedSortOption">
                <option disabled value="">Сортировать по </option>
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.name }}</option>
            </select>
            <button class="mr-2" v-if="inSaved === true || inFound === true" @click="openMainPage">На главную</button>
            <button v-if="inSaved === false || inFound === true" @click="openSavedPage">В закладки</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            searchQuery: '',
            selectedSortOption: '',
            sortOptions: [
                { value: 'name', name: 'Названию'},
                { value: 'year', name: 'Году' },
                { value: 'movieLength', name: 'Хронометражу'}
            ]
        }
    },
    methods: {
        openSavedPage() {
            this.openPage(true, false)
            this.$router.push('/saved')
        },
        openMainPage() {
            this.openPage(false, false)
            this.$router.push('/')
        },
        searchFilm() {
            this.$store.commit('findFilm', this.searchQuery)
            this.openPage(false, true)
            this.searchQuery = ''
            this.$router.push('/found')
        },
        openPage(inSaved, inFound) {
            this.$store.commit('setInSavedPage', inSaved)
            this.$store.commit('setIsInFoundPage', inFound)
        },
        changeOption(event) {
            this.$store.commit('sortFilms', event.target.value)
        }
    },
    computed: {
        ...mapState({
            inSaved: 'isInSavedPage',
            inFound: 'isInFoundPage'
        })
    }
}
</script>

<style scoped>
.navBar {
    padding: 1%;
    display: flex;
    height: fit-content;
    max-height: 10%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: grey;
    color: #fff;
}

#searchBar {
    background: transparent;
    border: 1px solid #fff;
    padding-left: 5px;
    border-radius: 5px;
    color: #fff;
}

#searchBar::placeholder {
    color: #fff;
}
</style>