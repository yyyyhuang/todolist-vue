<script setup>
import { reactive, onMounted, ref, watch, onBeforeUnmount, computed} from 'vue';
import { useStore } from 'vuex';
import TodoList from './TodoList.vue';
import TodoItem from './TodoItem.vue';
import TodoForm from './TodoForm.vue';

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

// const filteredTasks = computed(() => store.getters.filteredTasks)

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
  store.commit('addTodo', task);
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