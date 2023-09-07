import { createRouter, createWebHistory } from 'vue-router'
import AllFilmsPage from "@/pages/AllFilmsPage.vue"
import SavedFilmsPage from "@/pages/SavedFilmsPage.vue"
import FoundFilmsPage from "@/pages/FoundFilmsPage.vue"

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AllFilmsPage
        },
        {
            path: '/saved',
            component: SavedFilmsPage
        },
        {
            path: '/found',
            component: FoundFilmsPage
        }
    ]
})