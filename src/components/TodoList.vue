<template>
    <div>
      <slot v-for="task in items" :task="task" :key="task.id"></slot>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';

const props = defineProps({
items: {
    type: Array,
    required: true
}
});
</script>
