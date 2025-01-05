<template>
  <div class="dashboard">
    <div class="content">
      <header>
        <h1>Character Dashboard</h1>
        <button @click="handleLogout" class="btn btn-logout">
          Logout
        </button>
      </header>
      <main>
        <section class="character-carousel">
          <h2>Your Characters</h2>
          <div v-if="characters.length > 0" class="carousel">
            <button @click="prevCharacter" class="carousel-btn prev" aria-label="Previous character">
              <ChevronLeft class="h-6 w-6" />
            </button>
            <div class="character-card">
              <h3>{{ currentCharacter.name }}</h3>
              <p>Level: {{ currentCharacter.level }}</p>
              <p>XP: {{ currentCharacter.xp }}</p>
              <p>Class: {{ currentCharacter.class }}</p>
              <button @click="accessCharacter(currentCharacter.id)" class="btn btn-secondary">
                Access Character
              </button>
            </div>
            <button @click="nextCharacter" class="carousel-btn next" aria-label="Next character">
              <ChevronRight class="h-6 w-6" />
            </button>
          </div>
          <div v-else class="no-characters">
            <p>You don't have any characters yet.</p>
            <button @click="openCharacterCreationModal" class="btn btn-primary">
              Create New Character
            </button>
            <CharacterCreation
          v-if="isCharacterCreationModalVisible"
          @close="closeCharacterCreationModal"
          @submit="handleCharacterSubmit"
        />
          </div>
        </section>
      </main>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { axiosInstance } from '@/axios';
import CharacterCreation from './Modals/CharacterCreation.vue';

const error = ref('');

const router = useRouter();

const characters = ref([]);

const currentIndex = ref(0);

const currentCharacter = computed(() => characters.value[currentIndex.value]);

const nextCharacter = () => {
  currentIndex.value = (currentIndex.value + 1) % characters.value.length;
};

const prevCharacter = () => {
  currentIndex.value = (currentIndex.value - 1 + characters.value.length) % characters.value.length;
};

const isCharacterCreationModalVisible = ref(false)

const openCharacterCreationModal = () => {
  isCharacterCreationModalVisible.value = true
}
const closeCharacterCreationModal = () => {
  isCharacterCreationModalVisible.value = false
}

const accessCharacter = (id) => {
  router.push(`/character/${id}`);
};
const handleLogout = async () => {
  console.log('Logout process started')
  try {
    console.log('Sending logout request to server')
    await axiosInstance.post('/api/logout');
    console.log('Logout response: ', response.data);

    console.log('Clearing local storage');
    localStorage.removeItem('user');
    console.log('Attempting to redirect to homepage');

    window.location.href = '/';

    setTimeout(() => {
      console.log('Current location after attempted redirect:', window.location.href);
    }, 1000);
  } catch (err) {
    error.value = 'Failed to logout. Please try again.';
    console.error('Logout error:', err);
  }
};
const handleCharacterSubmit = (characterData) => {
  console.log('Submitted character: ', characterData)
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-dark);
  color: var(--text-light);
  font-family: 'Metamorphous', cursive;
}

.content {
  width: 100%;
  max-width: 800px;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

h1 {
  font-size: 3rem;
  color: var(--accent-red);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Oswald';
  margin: 0;
}

h2 {
  font-size: 2rem;
  color: var(--accent-red);
  margin-bottom: 1rem;
  font-family: 'Oswald';
  text-align: center;
}

.character-carousel {
  background-color: rgba(10, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.3);
  margin-bottom: 2rem;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.character-card {
  background-color: rgba(26, 0, 0, 0.5);
  border: 1px solid var(--accent-red);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  flex-grow: 1;
  margin: 0 1rem;
}

.character-card h3 {
  font-size: 1.5rem;
  color: var(--accent-red);
  margin-bottom: 1rem;
}

.character-card p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.carousel-btn {
  background-color: transparent;
  border: none;
  color: var(--accent-red);
  cursor: pointer;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.carousel-btn:hover {
  color: var(--text-light);
  transform: scale(1.1);
}

.no-characters {
  text-align: center;
}

.create-character {
  text-align: center;
  margin-top: 2rem;
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
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 0, 0, 0.5);
}
.btn-logout {
  background-color: transparent;
  color: var(--accent-red);
  border: 2px solid var(--accent-red);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}
.btn-logout:hover {
  background-color: var(--accent-red);
  color: var(--text-light);
}
@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 1rem;
  }
  .content {
    padding: 1rem;
  }

  h1 {
    font-size: 2.5rem;
  }

  .character-carousel {
    padding: 1rem;
  }

  .carousel {
    flex-direction: column;
  }

  .carousel-btn {
    margin: 1rem 0;
  }

  .character-card {
    margin: 1rem 0;
  }
  .btn-logout {
    width: 100%;
  }
}
</style>