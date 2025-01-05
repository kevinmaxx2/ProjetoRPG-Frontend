<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Create New Character</h2>
        <form @submit.prevent="submitCharacter">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="character.name" required>
          </div>
          <div class="form-group">
            <label for="chronicle">Chronicle:</label>
            <input type="text" id="chronicle" v-model="character.chronicle" required>
          </div>
          <div class="attributes">
            <h3>Attributes</h3>
            <div class="form-group" v-for="attr in attributes" :key="attr">
              <label :for="attr">{{ attr }}:</label>
              <div class="attribute-input">
                <button type="button" class="btn btn-small" @click="decrementAttribute(attr)">-</button>
                <input type="number" :id="attr" v-model="character.attributes[attr]" min="1" required>
                <button type="button" class="btn btn-small" @click="incrementAttribute(attr)">+</button>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Create</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, reactive, computed } from 'vue'

  const emit = defineEmits(['close', 'submit'])

  const character = reactive({
    name: '',
    chronicle: '',
    attributes: {
        Charisma: 10,
        Dexterity: 10,
        Intelligence: 10,
        Wisdom: 10,
        Strength: 10,
        Constitution: 10,
    }
  })
const attributes = ref(['Charisma', 'Dexterity', 'Intelligence', 'Wisdom', 'Strength', 'Constitution'])

const isFormValid = computed(() => {
    return (
        character.name.trim() !== '' &&
        character.chronicle.trim() !== '' &&
        Objects.value(character.attributes).every(value => value > 0)
    )
})

const incrementAttribute = (attr) => {
    character.attributes[attr]++
}
const decrementAttribute = (attr) => {
    if (character.attributes[attr] > 1) {
        character.attributes[attr]--
    }
}

const submitCharacter = () => {
    if (isFormValid.value) {
        emit('submit', { ...character})
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
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
  }
  
  h2, h3 {
    color: var(--accent-red);
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-top: 1rem;
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
  
  .attributes {
    margin-top: 1rem;
  }
  
  .attribute-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .attribute-input input {
    width: 60px;
    text-align: center;
  }
  
  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .points-remaining {
    margin-top: 1rem;
    text-align: center;
    font-weight: bold;
    color: var(--accent-red);
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
  
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>