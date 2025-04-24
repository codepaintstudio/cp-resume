<template>
  <div class="relative min-w-32 inline-block " ref="selectRef">
    <!-- 选择框 -->
    <div
      :class="{ 'w-30  text-sm flex pr-8 items-center relative border rounded-sm focus:outline-none py-1.5 px-3 bg-white cursor-pointer select-none': true, 'border-blue-500': isOpen, 'border-gray-400': !isOpen }"
      @click="toggleDropdown">
      <span class="w-25 whitespace-nowrap overflow-hidden text-ellipsis">{{ selectedOption || '请选择' }}</span>


      <span :class="{ 'absolute right-3 icon-[ion--md-arrow-dropdown]': true, 'text-blue-500': isOpen }"></span>
    </div>

    <!-- 下拉列表 -->
    <transition name="fade-slide">
      <ul v-if="isOpen"
        class="no-scrollbar absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-auto overscroll-contain">
<!--        不换号 多余的隐藏 用省略号-->
        <li v-for="option in options" :key="option.value" class="px-4 py-2 hover:bg-blue-100 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
          @click="selectOption(option.value)">
          {{ option.label }}
        </li>
      </ul>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  modelValue: string | null
  options: Option[]
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref<string | null>(props.modelValue)
const selectRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  selectedOption.value = option
  emit('update:modelValue', option)
  isOpen.value = false
}

// 点击组件外关闭下拉框
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
