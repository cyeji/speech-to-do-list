<template>
  <div class="grid">
    <div class="border-round col-12 flex justify-content-center" style="margin-bottom: -34px; z-index:9999999"  >
      <div class="col-8">
        <div class="grid flex align-items-end justify-content-around w-full">
          <div class="font-bold text-purple-500 col-2 mb-3">
            date:{{getDate()}}
          </div>
          <div class="col-8 flex justify-content-center">
            <p-image :src="require('@/assets/kuromi.png')" width="200"></p-image>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </div>
    <div class="grid col-12 flex justify-content-center">
        <div class="col-8 relative card border-round h-30rem bg-purple-50 inline-block">
          <div class="text-center py-4">
            <span class="text-4xl pt-2 font-bold"> To-Do List</span>
          </div>
          <TodoSimpleForm @add-todo="addTodo"/>

          <div v-if="!todos.length" class="text-center text-purple-500 font-bold text-2xl mt-2">
            To-do-list를 추가해보세요.
          </div>
          <div class="relative border-0">
            <TodoList
                :todos="todos"
                @toggle-todo="toggleTodo"
                @delete-todo="deleteTodo"/>
          </div>
        </div>

      </div>
    </div>
  <div class="mt-8 mb-8"></div>
  <div class="mb-5" style="height: 10px"></div>
</template>
<script setup>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

const todos = ref([]);

const addTodo = (name) => {
  todos.value.push({
      id: todos.value.length,
      subject: name,
      completed: false,
    });
}

const toggleTodo = (index) => {
  console.log(todos.value[index])
  //todos.value[index].completed = !todos.value[index].completed;
}

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1+ date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
   return year+"-"+month+"-"+day;
}

const deleteTodo = (index) =>{
  todos.value.splice(index,1);
};
</script>
<style>
.todoList{
  margin-left: 35rem;
}
body{
  background-color: #e3dff0;
  /*background-image: url("../src/assets/kuromi.png");*/
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.form-check-input{
  margin-left: 1rem;
  margin-right: 1rem;
}
.form-check-button{

}
.todo{
  color:gray;
  text-decoration:line-through;
}
</style>