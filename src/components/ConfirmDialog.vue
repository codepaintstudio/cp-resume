<template>
  <div class="fixed z-14 inset-0 bg-black opacity-25"></div>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="cancel">
        <div class="bg-white rounded-lg shadow-lg p-6 w-80">
          <p class="text-gray-800 text-base mb-4">{{ message }}</p>
          <div class="flex justify-end gap-3">
            <button class="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300" @click="cancel">取消</button>
            <button class="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600" @click="confirm">确定</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue'

const props = defineProps<{ message: string }>()
const emit = defineEmits(['confirm', 'cancel'])

const visible = ref(true)

const confirm = () => {
  visible.value = false
  emit('confirm')
}

const cancel = () => {
  visible.value = false
  emit('cancel')
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
