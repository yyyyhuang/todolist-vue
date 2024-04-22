<template>
    <div v-if="!isEditing" class="todo">
        <a-checkbox 
            v-model:checked="checked"
            @change="onChange"
        >
            {{ `${item.date} - ${item.title}` }}
        </a-checkbox>
        <a-space wrap>
            <a-button 
                type="primary" ghost
                @click="toggleEditForm">
                Edit
            </a-button>
            <a-button 
                type="primary" danger ghost
                @click="deleteTodo">
                Delete
            </a-button>
        </a-space>
    </div>
    <EditItemForm 
        v-else
        :oldTask="item.title"
        @item-edited="itemEdited"
        @item-cancelled="itemCancelled" />
    
</template>

<script setup>
import { ref } from 'vue';

import EditItemForm from './EditItemForm.vue';

const { item } = defineProps({
    item: Object
});

const emit = defineEmits(['toggle-checkbox','item-edited', 'item-deleted'])

let isEditing = ref(false);
const checked = ref(item.completed);

function onChange() {
    emit("toggle-checkbox")
}

function toggleEditForm() {
    isEditing.value = true;
    console.log(isEditing)
}

function deleteTodo() {
    emit("item-deleted")
}

function itemEdited(newValue) {
    emit("item-edited", newValue)
    isEditing.value = false;
}

function itemCancelled() {
    isEditing.value = false;
}


</script>

<style scoped>
.todo {
    margin-bottom: 15px;
}
</style>