<template>
    <Transition name="LoginModal">
      <div class="modal-overlay">
        <div class="modal-content">
          <div v-if="success" class="success-message">
            {{ success }}
            </div>
          <h2>Login</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email"  v-model="email" required>
              <span v-if="errors?.email">{{ errors.email[0] }}</span>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="password" required>
              <span v-if="errors?.password">{{  errors.password[0] }}</span>
            </div>
            <div class="form-group">
              <
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Login</button>
              <button type="button" @click="$emit('close')" class="btn btn-secondary">Close</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance } from '@/axios';

const router = useRouter()
const email = ref('')
const password = ref('')
const errors = ref({})
const success = ref('')

const handleSubmit = async () => {
  try {
    
    await axiosInstance.get('/sanctum/csrf-cookie');

    
    const response = await axiosInstance.post('/api/login', {
      email: email.value,
      password: password.value
    });

    
    success.value = 'Login successful';
    router.push('/dashboard');
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors || 
                     { credentials: ['Invalid login credentials'] };
    }
  }
};
defineEmits(['close'])

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--primary-light);
  color: var(--text-light);
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
}

h2 {
  color: var(--accent-red);
  margin-bottom: 1rem;
  font-size: 2rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(26, 0, 0, 0.5);
  color: var(--text-light);
  border: 1px solid var(--accent-red);
  border-radius: 4px;
  font-family: 'Metamorphous', cursive;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
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
  color: var(--text-light);
}

.btn-secondary {
  background-color: transparent;
  color: var(--accent-red);
  border: 2px solid var(--accent-red);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
}
</style>
