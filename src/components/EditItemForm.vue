<template>
    <a-form
        :model="formState"
        @finish="onFinish">
        <a-form-item 
            name="newValue" 
        >
            <a-input 
                v-model:value.lazy.trim="formState.newValue"
                ref="titleInput" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button 
                type="primary" ghost
                html-type="submit"
            >
                Save
            </a-button>
            <a-button 
                type="primary" danger ghost
                @click="onCancel">
                Cancel
            </a-button>
        </a-form-item>

    </a-form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const { oldTask } = defineProps(['oldTask']);

const emit = defineEmits(["item-edited", "item-cancelled"])

const titleInput = ref(null);

onMounted(() => {
    titleInput.value.focus();
})

const formState = reactive({
    newValue: oldTask
})

function onFinish() {
    if (formState.newValue && formState.newValue !== oldTask) {
        emit("item-edited", formState.newValue)
    }
    
}

function onCancel() {
    emit("item-cancelled")
}
</script>