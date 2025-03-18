<template>
  <div
    class="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300"
    :class="isChecked ? 'bg-blue-500' : 'bg-gray-300'"
    @click="toggleSwitch"
  >
    <div
      class="w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300"
      :class="isChecked ? 'translate-x-5' : 'translate-x-0'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const toggleSwitch = () => {
  isChecked.value = !isChecked.value;
};
</script>
