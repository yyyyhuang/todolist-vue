import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        lists: [],
        loading: false,
        id: 6,
        activeTab: 1,
        currentDate: null,
        filteredTasks: [],
    },
    mutations: {
        addTodo(state, newTodo) {
            const newTask = {
                id: state.id++,
                title: newTodo,
                completed: false,
                date: state.currentDate
            }
            state.lists.push(newTask);
            localStorage.setItem('todoList', JSON.stringify(state.lists));
        },
        editTodo(state, { id, newValue }) {
            const todo = state.lists.find(todo => todo.id === id);
            if (todo) {
                todo.title = newValue;
                localStorage.setItem('todoList', JSON.stringify(state.lists));
            }
        },
        deleteTodo(state, id) {
            state.lists = state.lists.filter(todo => todo.id !== id);
            localStorage.setItem('todoList', JSON.stringify(state.lists));
        },
        setLists(state, lists) {
            state.lists = lists;
            localStorage.setItem('todoList', JSON.stringify(state.lists));
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setCurrentDate(state, currentDate) {
            state.currentDate = currentDate
        },
        setFilteredTasks(state, filtered) {
            state.filteredTasks = filtered
        },
        changeActiveTab(state, num) {
            state.activeTab = num
        },
        updateCompleteStatus(state, taskId) {
            const updateTodo = state.lists.find(todo => todo.id === taskId);
            updateTodo.completed = !updateTodo.completed; 
        }
    },
    actions: {
        async loadData({ commit }) {
            if(this.state.lists.length === 0) {
                commit('setLoading', true);
                try {
                    // Load data from an API
                    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                    const modifiedData = response.data.slice(0, 5).map(item => ({
                        id: item.id,
                        title: item.title,
                        date: "2024-3-15", 
                        completed: true,    
                    }));
                        commit('setLists', modifiedData);
                        // this.dispatch('updateFilteredTasks');
                } catch (error) {
                console.error('Error fetching data:', error.message);
                } finally {
                    commit('setLoading', false);
                }
            } else {
                const localData = JSON.parse(localStorage.getItem("todoList"))
                commit('setList', localData)
            }
            
        },
        updateFilteredTasks({ commit, state }) {
            if (state.activeTab === 1) {
                commit('setFilteredTasks', state.lists);
            } else if (state.activeTab === 2) {
                commit('setFilteredTasks', state.lists.filter(task => !task.completed));
            } else if (state.activeTab === 3) {
                commit('setFilteredTasks', state.lists.filter(task => task.completed));
            }
        }

    },
    getters: {
        filteredTasks(state) {
            if (state.activeTab === 1) {
            return state.lists;
            } else if (state.activeTab === 2) {
            return state.lists.filter(task => !task.completed);
            } else if (state.activeTab === 3) {
            return state.lists.filter(task => task.completed);
            }
        },
    },
  });