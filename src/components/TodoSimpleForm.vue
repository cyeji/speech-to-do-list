<template>
  <form @submit.prevent="onSubmit" class="relative text-center mb-2">
    <input-text v-model="todo" placeholder="Type new to-do" class="w-20rem mr-3 h-3rem"></input-text>
    <click-button label="Add" type="submit" class="h-3rem"></click-button>
    <div v-if="hasError" class="mt-2 text-purple-500 text-100 ">
      This file cannot be empty
    </div>
  </form>
</template>
<script setup>
import {defineEmits, ref} from "vue";

const todo = ref('');
const hasError = ref(false);

const emit = defineEmits(['add-todo']);

const onSubmit = () => {
  if(todo.value === ''){
    hasError.value = true;
  }else{
    emit('add-todo', {
      subject : todo.value,
      completed : false
    });
    hasError.value = false;
    todo.value = '';
  }
};

</script>
<script></script>