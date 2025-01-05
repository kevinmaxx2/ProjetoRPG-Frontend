<template>
  <div class="frontpage">
    <header>
      <h1>RPG Character Sheet Creator</h1>
    </header>
    <main>
      <Alert
      :show="alertInfo.show"
      :type="alertInfo.type"
      :message="alertInfo.message"
      @close="closeAlert"
      />
      <p>Create and manage your RPG characters with ease!</p>
      <div class="auth-buttons">
        <button @click="openLoginModal" class="btn btn-primary" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{  isLoading ? 'Loading...' : 'Login' }}
        </button>
        <button @click="openRegisterModal" class="btn btn-secondary" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Loading...' : 'Register' }}
        </button>
      </div>
    </main>

    <Login v-if="isLoginModalOpen"
     @close="closeLoginModal"
     @login-sucess="handleLoginSucess"
     @login-error="handleLoginError" />
    <Register v-if="isRegisterModalOpen" 
     @close="closeRegisterModal"
     @register-sucess="handleRegisterSucess"
     @register-error="handleRegisterError" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Login from '@/components/Modals/Login.vue'
import Register from '@/components/Modals/Register.vue';
import Alert from '@/components/Alert.vue';

const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const isLoading = ref(false)
const alertInfo = ref({ show: false, type: 'info', message: ''})

const openLoginModal = () => {
  isLoginModalOpen.value = true
}
const openRegisterModal = () => {
  isRegisterModalOpen.value = true
}
const closeLoginModal = () => {
  isLoginModalOpen.value = false
}
const closeRegisterModal = () => {
  isRegisterModalOpen.value = false
}

const showAlert = (type, message) => {
  alertInfo.value = { show: true, type, message }
  setTimeout(() => {
    closeAlert()
  }, 5000)
}
const closeAlert = () => {
  alertInfo.value.show = false
}

const handleLoginSucess = () => {
  closeLoginModal()
  showAlert('sucess', 'Login sucessful!')
}

const handleLoginError = (error) => {
  showAlert('error', `Login Failed: ${error}`)
}

const handleRegisterSucess = () => {
  closeRegisterModal()
  showAlert('sucess', 'Registration sucessful!')
}
const handleRegisterError = (error) => {
  showAlert('error', `Register failed: ${error}`)
}
</script>

<style scoped>
.frontpage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.content {
  z-index: 1;
  text-align: center;
  padding: 2rem;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('path/to/your/background-image.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.15;
  z-index: 0;
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 3.5rem;
  color: var(--accent-red);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

main {
  background-color: rgba(10, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
}

p {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-family: 'Metamorphous', cursive;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.6s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background-color: var(--accent-red);
  color: var(--text-light);
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
}

.btn-secondary {
  background-color: transparent;
  color: var(--accent-red);
  border: 2px solid var(--accent-red);
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.3);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 0, 0, 0.5);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  main {
    padding: 1.5rem;
  }

  .auth-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed
}
</style>