<template>
  <Transition name="LoginModal">
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
            <div v-if="errors.email" class="error-message">{{ errors.email[0] }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
            <div v-if="errors.password" class="error-message">{{ errors.password[0] }}</div>
          </div>
          <div v-if="errors.general" class="error-message">{{ errors.general[0] }}</div>
          <div v-if="errors.csrf" class="error-message">{{ errors.csrf[0] }}</div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
            <button type="button" @click="$emit('close')" class="btn btn-secondary" :disabled="isLoading">Close</button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance } from '@/axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref({})
const isLoading = ref(false)

const emit = defineEmits(['close', 'login-success', 'login-error'])

const handleSubmit = async () => {
  try {
    isLoading.value = true
    const response = await axiosInstance.post('/api/login', {
      email: email.value,
      password: password.value
    })
    emit('login-success', 'Login successful')
    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors || 
                     { credentials: ['Invalid login credentials'] }
    } else if (error.response?.status === 419) {
      errors.value = { csrf: ['CSRF token mismatch. Please try again.'] }
    } else {
      errors.value = { general: ['An unexpected error occurred. Please try again.'] }
    }
    emit('login-error', errors.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a0000;
  color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.5);
  border: 2px solid var(--accent-red);
}

h2 {
  color: var(--accent-red);
  margin-bottom: 1.5rem;
  font-size: 2.2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Metamorphous', cursive;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--accent-red);
}

input {
  width: 100%;
  padding: 0.7rem;
  background-color: rgba(26, 0, 0, 0.7);
  color: #ffffff;
  border: 1px solid var(--accent-red);
  border-radius: 4px;
  font-family: 'Metamorphous', cursive;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--accent-red);
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn {
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-family: 'Metamorphous', cursive;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: var(--accent-red);
  color: #ffffff;
}

.btn-secondary {
  background-color: transparent;
  color: var(--accent-red);
  border: 2px solid var(--accent-red);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 0, 0, 0.5);
}

.btn:active {
  transform: translateY(1px);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: rgba(255, 0, 0, 0.2);
  color: #ff6b6b;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>