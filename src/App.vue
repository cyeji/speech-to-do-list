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
          <form @submit.prevent="onSubmit" class="relative text-center mb-2">
            <input-text v-model="todo" placeholder="Type new to-do" class="w-20rem mr-3 h-3rem"></input-text>
            <click-button label="Add" type="submit" class="h-3rem"></click-button>
            <div v-if="hasError" class="mt-2 text-purple-500 text-100 ">
              This file cannot be empty
            </div>
          </form>
          <div class="relative border-0">
            <div v-for="todo in todos" :key="todo.id" class="bg-purple-50 mb-2">
              <div class="flex ml-8 mr-8 h-3rem bg-white font-bold text-purple-400 border-round align-items-center  justify-content-between">
                <div>
                  <check-box class="form-check-input" :input-id="todo.id" name="id" :value="todo.subject" v-model="todo.completed"/>
                  <label class="form-check-label" :for="todo.id" :class="{todo: todo.completed}">{{todo.subject}}</label>
                </div>
                <click-button class="flex form-check-button mr-2" label="Delete" ></click-button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  <div class="mt-8 mb-8"></div>
  <div class="mb-5" style="height: 10px"></div>
</template>
<script setup>
import {ref} from 'vue';

const todo = ref('');
const todos = ref([
  {id:1,subject:'집가기'}
]);
const hasError = ref(false);

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1+ date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
   return year+"-"+month+"-"+day;
}

const onSubmit = () => {
  if(todo.value === ''){
    hasError.value = true;
  }else{
    todos.value.push({
      id: Date.now(),
      subject: todo.value,
      completed: false,
    });
    hasError.value = false;
    todo.value = '';
  }
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