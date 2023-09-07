<template>
    <div class="outer" v-if="shown" @click.stop="$emit('update:shown', false)">
        <div class="inner" @click.stop>
            <div class="filmItem">
                <img :src="film.poster.url" class="filmImage"/>
                <v-card class="scrollable">
                    <v-card-title>{{ film.name }}</v-card-title>
                    <v-card-subtitle>{{ film.alternativeName !== null? `${film.alternativeName}, `: '' }} {{ film.year }}</v-card-subtitle>
                    <v-card-text>{{ film.description }}</v-card-text>
                    <v-card-text>Длительность: {{ film.movieLength }} минут</v-card-text>
                    <v-divider></v-divider>
                    <v-card-subtitle>{{ isSaved? 'Удалить из закладок' : 'Сохранить в закладках' }}</v-card-subtitle>
                    <v-card-actions>
                        <v-btn @click="save">{{ isSaved? '❌' : '🏷️' }}
                            <v-tooltip activator="parent" location="end">
                                {{ isSaved? 'Удалить из закладок' : 'Сохранить в закладках' }}
                            </v-tooltip>
                        </v-btn>
                    </v-card-actions>
                    <v-card-subtitle>Поставить оценку фильму:</v-card-subtitle>
                    <v-card-actions>
                        <v-btn v-for="number in currentRating" :value="number" @click="setRating(number)">🌭</v-btn>
                        <v-btn v-for="number in range(currentRating, maxRating)" :value="number + 1" @click="setRating(number + 1)">❤️</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        shown: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        ...mapState({
            film: 'currentFilm',
            id: 'currentFilmID'
        })
    },
    data() {
        return {
            isSaved: false,
            currentRating: 0,
            maxRating: 5
        }
    },
    methods: {
        ...mapActions(['saveFilm']),
        save() {
            this.saveFilm(this.id)
            this.isSaved = !this.isSaved
        },
        setRating(rating) {
            let films = []
            let v = JSON.parse(localStorage.getItem("SAVED_RATINGS_KEY"))
            if (v !== null) {
                let data = v.find(data => data.id === this.id)
                if (data === undefined) {
                    v.push({
                        id: this.id,
                        rating: rating
                    })
                }
                else {
                    data.rating = rating
                }
                films = v
            }
            else {
                films.push({
                    id: this.id,
                    rating: rating
                })
            }
            localStorage.setItem("SAVED_RATINGS_KEY", JSON.stringify(films))
            this.currentRating = rating
        },
        getCurretRating() {
            let saved = JSON.parse(localStorage.getItem("SAVED_RATINGS_KEY"))
            if (saved !== null) {
                let data = saved.find(data => data.id === this.id)
                if (data !== undefined) {
                    return data.rating
                }
            }
            return 0
        },
        range(start, end) {
            return Array.from({length: end - start}, (_, index) => start + index)
        }
    },
    updated() {
        let saved = JSON.parse(localStorage.getItem("SAVED_FILMS_KEY"))
        if (saved !== null) {
            this.isSaved = saved.indexOf(this.id) !== -1
        }
        this.currentRating = this.getCurretRating()
    }
}
</script>

<style lang="scss" scoped>
.outer, .inner, .filmItem, .description {
    display: flex;
}

.outer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.5);
}

.inner {
    margin: auto;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    padding: 10px;
    max-width: 65%;
}

.filmItem {
    flex-direction: row;
}

.filmImage {
    max-width: 50%;
}

.scrollable {
    max-height: 80vh;
    overflow-y: auto;
}

.v-card {
    border: none;
    box-shadow: none;
}
</style>