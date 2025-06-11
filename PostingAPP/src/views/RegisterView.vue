<template>
  <v-container class="mt-12" max-width="500">
    <v-card elevation="4" class="pa-6">
      <v-card-title class="text-h5">Criar Conta</v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="name"
          label="Nome"
          :rules="[v => !!v || 'Nome é obrigatório']"
          required
        />

        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          :rules="[v => !!v || 'E-mail é obrigatório']"
          required
        />

        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          :rules="[v => !!v || 'Senha é obrigatória']"
          required
        />

        <v-text-field
          v-model="password_confirmation"
          label="Confirmar Senha"
          type="password"
          :rules="[v => v === password || 'As senhas não coincidem']"
          required
        />

        <v-btn
          type="submit"
          color="primary"
          class="mt-4"
          :loading="loading"
          block
        >
          Registrar
        </v-btn>

        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          dense
        >
          {{ error }}
        </v-alert>

        <v-card-text class="mt-4 text-center">
          Já tem uma conta?
          <RouterLink to="/login">Faça login</RouterLink>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/api' 

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)
const error = ref(null)
const valid = ref(false)
const form = ref(null)

const handleSubmit = async () => {
  const isValid = await form.value.validate()
  if (!isValid) return

  error.value = null
  loading.value = true

  try {
    await apiClient.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })

    router.push('/login')
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.data?.errors) {
      // Exibe primeiro erro de validação do Laravel
      const firstError = Object.values(err.response.data.errors)[0][0]
      error.value = firstError
    } else {
      error.value = 'Erro ao registrar. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>
