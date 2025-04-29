<template>
  <Transition
    name="fade-slide"
    @after-leave="$emit('close')"
  >
    <div
      v-if="visible"
      class="fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow flex items-center gap-2 z-50"
      :class="{
        'bg-green-100': type === 'success',
        'text-green-500': type === 'success',
        'bg-red-200': type === 'error',
        'text-red-500': type === 'error',
      }"
    >
      <span v-if="type === 'success'">√</span>
      <span v-else-if="type === 'error'">×</span>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'

const props = defineProps<{
  type: 'success' | 'error',
  message: string
}>()

const emit = defineEmits(['close'])
const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 2000)
})
</script>

<style scoped>
::v-deep(.fade-slide-enter-active),
::v-deep(.fade-slide-leave-active) {
  transition: all 1s ease;
}
::v-deep(.fade-slide-enter-from),
::v-deep(.fade-slide-leave-to) {
  opacity: 0;
  transform: translateY(-10px);
}
::v-deep(.fade-slide-enter-to),
::v-deep(.fade-slide-leave-from) {
  opacity: 1;
  transform: translateY(0);
}
</style>
