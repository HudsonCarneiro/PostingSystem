//gerenciar autenticacao 
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),
    actions: {
        async login(email, password) {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,       
            })
            this.token = response.data.token
            localStorage.setItem('token', this.token)
        },
        logout() {
            this.token = null
            localStorage.removeItem('token')
        },
    },
})