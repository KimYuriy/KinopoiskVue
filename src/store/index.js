import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        allFilms: [],
        shownFilms: [],
        currentFilm: {},
        currentFilmID: -1,
        isInSavedPage: false,
        isInFoundPage: false
    },
    mutations: {
        setInSavedPage(state, isInSavedPage) {
            state.isInSavedPage = isInSavedPage
        },
        setIsInFoundPage(state, isInFoundPage) {
            state.isInFoundPage = isInFoundPage
        },
        setShownFilms(state) {
            state.shownFilms = state.allFilms
        },
        setAllFilms(state, json) {
            state.allFilms = JSON.parse(JSON.stringify(json)).docs
        },
        findFilm(state, query) {
            state.shownFilms = state.allFilms.filter(film => film.name.includes(query))
        },
        setCurrentFilm(state, film) {
            state.currentFilm = film
        },
        setCurrentFilmID(state, ID) {
            state.currentFilmID = ID
        },
        sortFilms(state, option) {
            state.shownFilms.sort((film1, film2) => {
                return film1[option]?.localeCompare(film2[option])
            })
        }
    },
    actions: {
        saveFilm({state}, filmID) {
            let films = []
            let v = JSON.parse(localStorage.getItem("SAVED_FILMS_KEY"))
            if (v !== null) {
                let index = v.indexOf(filmID)
                if (index === -1) {
                    v.push(filmID)
                }
                else {
                    v.splice(index, 1)
                }
                films = v
            }
            else {
                films.push(filmID)
            }
            localStorage.setItem("SAVED_FILMS_KEY", JSON.stringify(films))
        }
    }
})