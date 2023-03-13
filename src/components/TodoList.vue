<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="bg-purple-50 mb-2">
    <div class="flex ml-8 mr-8 h-3rem bg-white font-bold text-purple-400 border-round align-items-center  justify-content-between">
      <div>
        <check-box class="form-check-input" :input-id="todo.id" name="id" v-model="todo.completed" @change="toggleTodo(index)" :binary="true"/>
        <label class="form-check-label" :for="todo.id" :class="{todo: todo.completed}">{{todo.subject}}</label>
      </div>
      <click-button class="flex form-check-button mr-2" label="Delete" @click="deleteTodo(index)"></click-button>
    </div>
  </div>
</template>

<script setup>
import {defineProps,defineEmits } from 'vue';

const emit = defineEmits(['toggle-todo','delete-todo']);

defineProps({
  todos: Array
});

const deleteTodo = (index) =>{
  emit('delete-todo',index);
}

const toggleTodo = (id) =>{
  emit('toggle-todo',id);
}

</script>

<style lang="scss" scoped>

</style>