<template>
  <v-container class="mt-12" max-width="500">
    <v-card elevation="4" class="pa-6">
      <v-card-title class="text-h5">Redefinir Senha</v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          :rules="[v => !!v || 'E-mail é obrigatório']"
          required
        />

        <v-text-field
          v-model="password"
          label="Nova Senha"
          type="password"
          :rules="[v => !!v || 'Senha é obrigatória']"
          required
        />

        <v-text-field
          v-model="password_confirmation"
          label="Confirmar Nova Senha"
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
          Redefinir Senha
        </v-btn>

        <v-alert v-if="success" type="success" class="mt-4" dense>
          {{ success }}
        </v-alert>

        <v-alert v-if="error" type="error" class="mt-4" dense>
          {{ error }}
        </v-alert>

        <v-card-text class="mt-4 text-center">
          <RouterLink to="/login">Voltar ao login</RouterLink>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '@/api/api'

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const token = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const valid = ref(false)
const form = ref(null)

onMounted(() => {
  token.value = route.params.token
})

const handleSubmit = async () => {
  const isValid = await form.value.validate()
  if (!isValid) return

  error.value = null
  success.value = null
  loading.value = true

  try {
    const response = await apiClient.post('/reset-password', {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      token: token.value,
    })

    success.value = response.data.message || 'Senha redefinida com sucesso.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0][0]
      error.value = firstError
    } else {
      error.value = 'Erro ao redefinir senha. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>
