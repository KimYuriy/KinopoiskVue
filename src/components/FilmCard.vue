<template>
    <v-card max-width="200">
        <v-img :src="filmItem.poster.previewUrl" width="200" max-height="300" @click="areDetailsShown = !areDetailsShown"></v-img>
        <v-card-title>{{ filmItem.name }}</v-card-title>
        <v-expand-transition>
            <div v-show="areDetailsShown === true">
                <v-divider></v-divider>
                <v-card-text>{{ filmItem.shortDescription }}<br>Год: {{ filmItem.year }}<br>⭐: {{ filmItem.rating.kp }}</v-card-text>
                <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn @click="openFilm">Подробнее</v-btn>
                        <v-btn @click="save">{{ isSaved? '❌' : '🏷️' }}
                            <v-tooltip activator="parent" location="end">
                                {{ isSaved? 'Удалить из закладок' : 'Сохранить в закладках' }}
                            </v-tooltip>
                        </v-btn>
                    </v-card-actions>
                </div>
        </v-expand-transition>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        filmItem: {
          type: Object,
          required: true,
        }
    },
    data() {
        return {
          areDetailsShown: false,
          isSaved: false
        }
      },
    methods: {
        ...mapActions(['saveFilm']),
        save() {
            this.saveFilm(this.filmItem.id)
            this.isSaved = !this.isSaved
        },
        openFilm() {
            this.$store.commit('setCurrentFilm', this.filmItem)
            this.$store.commit('setCurrentFilmID', this.filmItem.id)
            this.$emit('openFilm')
        }
    },
    mounted() {
        let saved = JSON.parse(localStorage.getItem("SAVED_FILMS_KEY"))
        if (saved !== null) {
              this.isSaved = saved.indexOf(this.filmItem.id) !== -1
        }
    }
};
</script>