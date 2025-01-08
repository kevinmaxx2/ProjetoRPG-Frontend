<template>
  <Transition name="modal-fade">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <h2>Create New Character</h2>
        <form @submit.prevent="submitCharacter">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="character.name" required>
            <div v-if="errors.name" class="error-message">{{ errors.name[0] }}</div>
          </div>
          <div class="form-group">
            <label for="chronicle">Chronicle:</label>
            <input type="text" id="chronicle" v-model="character.chronicle" required>
            <div v-if="errors.chronicle" class="error-message">{{ errors.chronicle[0] }}</div>
          </div>
          <div class="form-row">
          <div class="form-group half-width">
            <label for="level">Level:</label>
            <input type="number" id="level" v-model="character.level" min="1" required>
            <div v-if="errors.level" class="error-message">{{ errors.level }}</div>
          </div>
          <div class="form-group half-width">
            <label for="xp">XP: </label>
            <input type="number" id="xp" v-model="character.xp" min="0" required>
            <div v-if="errors.xp" class="error-message">{{ errors.xp }}</div>
          </div>
        </div>
          <div class="attributes">
            <h3>Attributes</h3>
            <div class="form-group" v-for="attr in attributes" :key="attr">
              <label :for="attr">{{ attr }}:</label>
              <div class="attribute-input">
                <button type="button" class="btn btn-small" @click="decrementAttribute(attr)" :disabled="character.attributes[attr] <= 1">-</button>
                <input type="number" :id="attr" v-model="character.attributes[attr]" min="1" max="20" required>
                <button type="button" class="btn btn-small" @click="incrementAttribute(attr)" :disabled="character.attributes[attr] >= 20">+</button>
              </div>
            </div>
          </div>
          <div v-if="errors.general" class="error-message">{{ errors.general[0] }}</div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="$emit('close')" :disabled="isLoading">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading || !isFormValid" >
              <span v-if="isLoading" class="spinner">{{ isLoading ? 'Creating...' : 'Create' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
  </template>

  <script setup>
  import { reactive, computed, ref } from 'vue'
  import { axiosInstance } from '@/axios'

  const errors = ref({})
  const isLoading = ref(false)

  const emit = defineEmits(['close', 'submit', 'create-error'])

  const character = reactive({
    name: '',
    chronicle: '',
    level: 1,
    xp: 0,
    attributes: {
        Charisma: 10,
        Dexterity: 10,
        Intelligence: 10,
        Wisdom: 10,
        Strength: 10,
        Constitution: 10,
    }
  })
const attributes = ['Charisma', 'Dexterity', 'Intelligence', 'Wisdom', 'Strength', 'Constitution']

const isFormValid = computed(() => {
    return (
        character.name.trim() !== '' &&
        character.chronicle.trim() !== '' &&
        Objects.value(character.attributes).every(value => value >= 1 && value <= 20)
    )
})

const incrementAttribute = (attr) => {
  if (character.attributes[attr] < 20) {
    character.attributes[attr]++
  }
}
const decrementAttribute = (attr) => {
    if (character.attributes[attr] > 1) {
        character.attributes[attr]--
    }
}

const submitCharacter = async () => {
    if (isFormValid.value) {
        try {
          isLoading.value = true
          errors.value = {}
          const response = await axiosInstance.post('/api/characters', {
            name: character.name,
            chronicle: character.chronicle,
            level: character.level,
            xp: character.xp,
            intelligence: character.attributes.Intelligence,
            dexterity: character.attributes.Dexterity,
            charisma: character.attributes.Charisma,
            strength: character.attributes.Strength,
            wisdom: character.attributes.Wisdom,
            constitution: character.attributes.Constitution
          })
          emit('submit', response.data.character)
          emit('close')
        } catch (error) {
          console.log('Error creating character:', error)
          if (error.response?.status === 422) {
            errors.value = error.response.data.errors
          } else {
            errors.value = { general: ['An unexpected error occured. Please try again.']}
          }
          emit('create-error', errors.value)
        } finally {
          isLoading.value = false
        }
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
  padding: 1.5rem;
  border-radius: 10px;
  width: 90%;
  max-width: 450px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.5);
  border: 2px solid var(--accent-red);
  display: flex;
  flex-direction: column;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #2a0000;
}

.modal-content::-webkit-scrollbar-thumb {
  background-color: var(--accent-red);
  border-radius: 4px;
}

h2, h3 {
  color: var(--accent-red);
  margin-bottom: 1rem;
  font-size: 1.8rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-family: 'Metamorphous', cursive;
  position: sticky;
  top: 0;
  background-color: #1a0000;
  padding: 0.5rem 0;
  z-index: 1;
}

h3 {
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 10px;
}

.form-row {
  display: flex;
  gap: 0.5rem;
}

.half-width {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: var(--accent-red);
}

input {
  width: 100%;
  padding: 0.5rem;
  background-color: rgba(26, 0, 0, 0.7);
  color: #ffffff;
  border: 1px solid var(--accent-red);
  border-radius: 4px;
  font-family: 'Metamorphous', cursive;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px var(--accent-red);
}

.attributes {
  margin-top: 20px;
}

.attribute-input {
  display: flex;
  align-items: center;
  background-color: rgba(26, 0, 0, 0.7);
  border: 1px solid var(--accent-red);
  border-radius: 4px;
  padding: 0.25rem;
}

.attribute-value {
  margin: 0 10px;
}

.attribute-input input {
  width: 50px;
  text-align: center;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: 'Metamorphous', cursive;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-small {
  background: none;
  border: none;
  color: var(--accent-red);
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: color 0.2s ease;
}


.btn-primary {
  background-color: var(--accent-red);
  color: #ffffff;
}

.btn-secondary {
  background-color: transparent;
  color: var(--accent-red);
  border: 1px solid var(--accent-red);
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(139, 0, 0, 0.5);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  position: sticky;
  bottom: 0;
  background-color: #1a0000;
  padding: 0.5rem 0;
  z-index: 1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
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