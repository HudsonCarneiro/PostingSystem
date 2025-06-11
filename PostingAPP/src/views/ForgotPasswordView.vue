<template>
  <v-container class="mt-12" max-width="500">
    <v-card elevation="4" class="pa-6">
      <v-card-title class="text-h5">Recuperar Senha</v-card-title>

      <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          :rules="[v => !!v || 'E-mail é obrigatório']"
          required
        />

        <v-btn
          type="submit"
          color="primary"
          class="mt-4"
          :loading="loading"
          block
        >
          Enviar link de recuperação
        </v-btn>

        <v-alert
          v-if="success"
          type="success"
          class="mt-4"
          dense
        >
          {{ success }}
        </v-alert>

        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          dense
        >
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
import { ref } from 'vue'
import apiClient from '@/api/api'

const email = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)
const valid = ref(false)
const form = ref(null)

const handleSubmit = async () => {
  const isValid = await form.value.validate()
  if (!isValid) return

  error.value = null
  success.value = null
  loading.value = true

  try {
    const response = await apiClient.post('/forgot-password', {
      email: email.value,
    })

    success.value = response.data.message || 'Se o e-mail existir, um link de redefinição foi enviado.'
  } catch (err) {
    if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else if (err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0][0]
      error.value = firstError
    } else {
      error.value = 'Erro ao enviar solicitação. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>
