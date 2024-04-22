<!-- <script setup>
import { reactive, onMounted, ref, watchEffect, watch  } from 'vue';
import TodoList from './components/TodoList.vue';
import TodoItem from './components/TodoItem.vue';
import TodoForm from './components/TodoForm.vue';

import axios from 'axios';

let loading = ref(false);
let id = 6;

let lists = reactive([]);
// let displayData = ref([]);
const activeTab = ref(1);
const currentDate = ref(null);

onMounted(async () => {

  getCurrentDate();
  loading.value = true
  loadTodoList();
});

watch(lists, (newVal) => {
  localStorage.setItem('todoList', newVal)
})

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  currentDate.value = year + "-" + month + "-" + day

}

async function loadTodoList() {
  const storedData = localStorage.getItem('todoList');
  if (storedData) {
    lists = JSON.parse(storedData);
    loading.value = false;
  } else {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      lists.splice(0); // Clear existing items
        response.data.slice(0, 5).forEach(item => {
            lists.push({ 
              id: item.id, 
              title: item.title,
              date: "2024-3-15",
              completed: true });
        });

        // set Local storage
        localStorage.setItem('todoList', JSON.stringify(lists))

    } catch (e) {
      console.error('Error fetching data', e.message)
    } finally {
      loading.value = false
    }
  }
}

function addNewTask(task) {
  const newTask = {
    id: id,
    title: task,
    completed: false,
    date: currentDate
  }
  id++;
  lists.push(newTask)
  // displayData.value.push(newTask);
  console.log("addlist", lists);
}

function editTodo(taskId, newValue) {
  const todoEdit = lists.find(todo => todo.id === taskId);
  todoEdit.title = newValue;
  console.log(lists)
}

function deleteTodo(taskId) {
  const index = lists.findIndex(item => item.id === taskId);
  if (index !== -1) {
    lists.splice(index, 1);
    // console.log("newlist", lists);
  }
}

function updateCompleteStatus(taskId) {
  const updateTodo = lists.find(todo => todo.id === taskId);
  updateTodo.completed = !updateTodo.completed;
  console.log("list", lists)
}

function changeActiveTab(num) {
  activeTab.value = num;
}

const filteredTasks = ref([]);
watchEffect(() => {
  if (activeTab.value === 1) {
    filteredTasks.value = lists;
    console.log("filter", filteredTasks.value)
  } else if (activeTab.value === 2) {
    filteredTasks.value = lists.filter(task => !task.completed);
  } else if (activeTab.value === 3) {
    filteredTasks.value = lists.filter(task => task.completed);
  }
});

</script> -->

<template>
  <div class="navigation-bar">
    <router-link to="/" class="nav-item" active-class="active">Todos</router-link>
    <router-link to="/stats" class="nav-item" active-class="active">Stats</router-link>
  </div>

  <router-view></router-view>

  <!-- <div id="content-container">
    <h1>To-Do List</h1>
    <TodoForm @add-task="addNewTask"/>

    <div  class="tab-group">
      <a-button size="large" class="tab-btn" @click="changeActiveTab(1)">All Tasks</a-button>
      <a-button size="large" class="tab-btn" @click="changeActiveTab(2)">Open Tasks</a-button>
      <a-button size="large" class="tab-btn" @click="changeActiveTab(3)">Completed Tasks</a-button>
    </div>

    <div class="list-container" v-if="!loading">
      <TodoList :items="filteredTasks">
        <template #default="{ task }">
          <TodoItem 
            :item="task"
            @toggle-checkbox="updateCompleteStatus(task.id)"
            @item-edited="editTodo(task.id, $event)"
            @item-deleted="deleteTodo(task.id)" />
        </template>
      </TodoList>
          

    </div>
    <div v-else>Loading...</div> -->
  <!-- </div> -->
</template>

<style scoped>
/* #content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 70vw;
  max-width: 800px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

#content-container h1 {
  margin-bottom: 20px;
  color: #333;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tab-group {
  display: flex;
  justify-content: center;
  margin-bottom: 35px
}

.tab-btn {
  border-radius: 0px;
  width: 200px;
} */



.navigation-bar {
  display: flex;
  background-color: #f0f0f0;
  padding: 10px;
}

.nav-item {
  margin-right: 10px;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  border-radius: 5px;
}

.nav-item:hover {
  background-color: #ddd;
}

.active {
  background-color: #007bff;
  color: #fff;
}
</style>
