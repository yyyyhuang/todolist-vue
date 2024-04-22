<script setup>
import { reactive, onMounted, ref, watch, onBeforeUnmount, computed} from 'vue';
import { useStore } from 'vuex';
import TodoList from './TodoList.vue';
import TodoItem from './TodoItem.vue';
import TodoForm from './TodoForm.vue';

// import axios from 'axios';

// let loading = ref(false);
// let id = 6;
// let lists = reactive([]);
// const activeTab = ref(1);
// const currentDate = ref(null);
// const filteredTasks = ref([]);

const store = useStore();

const loading = computed(() => store.state.loading);
const lists = computed(() => store.state.lists);
const activeTab = computed(() => store.state.activeTab);
const filteredTasks = computed(() => {
  const activeTab = store.state.activeTab;
  const tasks = store.state.lists;

  if (activeTab === 1) {
    return tasks;
  } else if (activeTab === 2) {
    return tasks.filter(task => !task.completed);
  } else if (activeTab === 3) {
    return tasks.filter(task => task.completed);
  }
});

// const filteredTasks = computed(() => store.state.filteredTasks)

onMounted(() => {
    store.dispatch('loadData');
    getCurrentDate();
})

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const currentDate = `${year}-${month}-${day}`;
  store.commit('setCurrentDate', currentDate); 
}

function addNewTask(task) {
  store.commit('addTodo', task); // Commit mutation to add a new task
}

function editTodo(taskId, newValue) {
  store.commit('editTodo', { id: taskId, newValue }); // Commit mutation to edit a task
}

function deleteTodo(taskId) {
  store.commit('deleteTodo', taskId); // Commit mutation to delete a task
}

function updateCompleteStatus(taskId) {
  store.commit('updateCompleteStatus', taskId); // Commit mutation to update the completion status of a task
}

function changeActiveTab(num) {
  store.commit('changeActiveTab', num); // Commit mutation to change the active tab
}


// onMounted(async () => {
//   getCurrentDate();
//   loadTodoList();
//   initializeFilteredTasks();
// });

// onBeforeUnmount(() => {
//   saveTodoList();
// });

// watch(lists, (newVal) => {
//   localStorage.setItem('todoList', JSON.stringify(newVal))
// })

// function getCurrentDate() {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth() + 1;
//   const day = today.getDate();
//   currentDate.value = year + "-" + month + "-" + day

// }

// async function loadTodoList() {

//   const storedData = localStorage.getItem('todoList');
  
//   if (storedData) {
//     try {
//         lists = JSON.parse(storedData);
//         loading.value = false;
//         console.log("Data loaded from localStorage:", lists);
//     } catch (e) {
//         console.error('Error parsing JSON data from localStorage:', e.message)
//     }
    
//   } else {
//     loading.value = true
//     try {
//       const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
//       lists.splice(0); // Clear existing items
//         response.data.slice(0, 5).forEach(item => {
//             lists.push({ 
//               id: item.id, 
//               title: item.title,
//               date: "2024-3-15",
//               completed: true });
//         });
//         saveTodoList();

//     } catch (e) {
//       console.error('Error fetching data', e.message)
//     } finally {
//       loading.value = false
//     }
//   }
// }

// function saveTodoList() {
//     localStorage.setItem('todoList', JSON.stringify(lists))
// }

// function addNewTask(task) {
//   const newTask = {
//     id: id,
//     title: task,
//     completed: false,
//     date: currentDate
//   }
//   id++;
//   lists.push(newTask);
// //   lists = [...lists];
//   // displayData.value.push(newTask);
//   console.log("addlist", lists);
// }

// function editTodo(taskId, newValue) {
//   const todoEdit = lists.find(todo => todo.id === taskId);
//   todoEdit.title = newValue;
//   console.log(lists)
// }

// function deleteTodo(taskId) {
//   const index = lists.findIndex(item => item.id === taskId);
//   if (index !== -1) {
//     lists.splice(index, 1);
//     // console.log("newlist", lists);
//   }
// }

// function updateCompleteStatus(taskId) {
//   const updateTodo = lists.find(todo => todo.id === taskId);
//   updateTodo.completed = !updateTodo.completed;
//   console.log("list", lists)
// }

// function changeActiveTab(num) {
//   activeTab.value = num;
// }

// function initializeFilteredTasks() {
//   if (activeTab.value === 1) {
//     console.log("effect list", lists)
//     filteredTasks.value = lists;
//     console.log("filter", filteredTasks.value)
//   } else if (activeTab.value === 2) {
//     filteredTasks.value = lists.filter(task => !task.completed);
//   } else if (activeTab.value === 3) {
//     filteredTasks.value = lists.filter(task => task.completed);
//   }
// };

// watch(activeTab, (newVal) => {
//     if (newVal === 1) {
//         filteredTasks.value = lists;
//     } else if (newVal === 2) {
//         filteredTasks.value = lists.filter(task => !task.completed);
//     } else if (newVal === 3) {
//         filteredTasks.value = lists.filter(task => task.completed);
//     }
// })

</script>

<template>
  <div id="content-container">
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
    <div v-else>Loading...</div>
  </div>
</template>

<style scoped>
#content-container {
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
}

</style>