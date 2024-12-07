<template>
    <Transition name="RegisterModal">
      <div class="modal-overlay">
        <div class="modal-content">
          <h2>Register</h2>
          <form>
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username"  v-model="username" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="password" required>
            </div>
            <div class="form-group">
              <label for="confirm-password">Confirm Password:</label>
              <input type="password" id="confirm-password" required>
            </div>
            <div class="form-actions">
              <button type="submit">Register</button>
              <button type="button" @click="$emit('close')">Close</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </template>
  <script setup>
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