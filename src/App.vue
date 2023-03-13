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
          <div class="text-center py-4">
            <input-text v-model="searchText" placeholder="Search" class="w-20rem mr-3 h-3rem"/>
          </div>

          <TodoSimpleForm @add-todo="addTodo"/>
          <div >{{error}}</div>
          <div v-if="!todos.length" class="text-center text-purple-500 font-bold text-2xl mt-2">
            To-do-list를 추가해보세요.
          </div>
          <div v-if="!filteredTodos.length && todos.length" class="text-center text-purple-500 font-bold text-2xl mt-2">
            일치하는 일정이 없습니다.
          </div>
          <div class="relative border-0">
            <TodoList
                :todos="filteredTodos"
                @toggle-todo="toggleTodo"
                @delete-todo="deleteTodo"/>
            <PaginationBar
                :rows="limit"
                :totalRecords="getTotalRecords"
                @page="onPage($event)"
                class="flex justify-content-center relative border-round bg-purple-50 inline-block"
                style="cursor: pointer">

            </PaginationBar>
          </div>
        </div>

      </div>
    </div>
  <div class="mt-8 mb-8"></div>
  <div class="mb-5" style="height: 10px"></div>
</template>
<script setup>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

const todos = ref([]);
const error = ref('');
const limit = 3;
const totalRecords = ref(1);
const currentPage = ref(1);

const getTotalRecords = computed(() =>{
  return totalRecords.value;
});

const onPage = (event) =>{
  currentPage.value = event.page+1;
  getTodos();
}

const getTodos = async (page = currentPage.value) =>{
  error.value = '';
  try{
    const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
    totalRecords.value = res.headers['x-total-count'];
    todos.value = res.data;
  }catch (error){
    console.log(error);
    error.value = 'Something get Wrong';
  }
}

const toggleTodo = async (index) =>{
  error.value = '';
  const id = todos.value[index].id;
  try{
    await axios.patch('http://localhost:3000/todos/'+id,{
      completed: todos.value[index].completed
    });
  }catch (error){
    console.log(error);
    error.value = 'Something went wrong';
  }
}

getTodos(currentPage.value);
const addTodo = async (todo) => {
  error.value = '';
  try{
    const res = await axios.post('http://localhost:3000/todos',{
      subject: todo.subject,
      completed: todo.completed,
    });
    todos.value.push(res.data);

  } catch (error){
    console.log(error);
    error.value = 'Something went wrong';
  }
}

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1+ date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
   return year+"-"+month+"-"+day;
}

const deleteTodo = async (index) =>{
  error.value = '';
  const id = todos.value[index].id;
  try{
    await axios.delete('http://localhost:3000/todos/'+id);
    todos.value.splice(index,1);
  }catch (err){
    console.log(err);
    error.value = 'Something went wrong';
  }
};

const searchText = ref('');
const filteredTodos = computed(() =>{
  if(searchText.value){
    return todos.value.filter(todo => {
      return todo.subject.includes(searchText.value);
    });
  }
  return todos.value;
});
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