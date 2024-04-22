<template>
    <a-form 
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 64 }"
        @finish="onFinish">
        <a-form-item 
            label="add todo" 
            name="newTask" 
            :rules="[{ required: true, message: 'Please input your task!' }]"
        >
            <a-input v-model:value="formState.newTask" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Add</a-button>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['add-task']);

const formState = reactive({
    newTask: ""
})

const onFinish = values => {
    emit("add-task", formState.newTask)
    formState.newTask = ''
};
</script>