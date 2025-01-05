<template>
    <transition name="fade">
      <div v-if="show" :class="['alert', `alert-${type}`]" role="alert">
        {{ message }}
        <button @click="$emit('close')" class="close-btn" aria-label="Close alert">
          &times;
        </button>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
    show: Boolean,
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
    },
    message: String
  });
  
  defineEmits(['close']);
  </script>
  
  <style scoped>
  .alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .alert-info {
    background-color: #e6f3ff;
    color: #0066cc;
  }
  
  .alert-success {
    background-color: #d4edda;
    color: #155724;
  }
  
  .alert-warning {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .alert-error {
    background-color: #f8d7da;
    color: #721c24;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>