<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

// 定义 props，并为其提供默认值
const props = defineProps({
  title: {
    type: String,
    default: "选项"
  },
  options: {
    type: Array as () => string[],
    default: () => ["选项1", "选项2", "选项3"]
  }
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string[]): void;
}>();

const isOpen = ref<boolean>(false);
const selectedOptions = ref<string[]>([]);
const selectedOptionsGet = ref<string[]>([]);
const trigger = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

const clearSelection = () => {
  selectedOptions.value = [];
  emit("update:modelValue", selectedOptions.value);
};

// 监听选项变化，并向父组件传递
watch(selectedOptions, (newVal) => {
  selectedOptionsGet.value = newVal;
});

// 点击外部关闭下拉框
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (!trigger.value?.contains(target) && !dropdown.value?.contains(target)) {
    isOpen.value = false;
    emit("update:modelValue", selectedOptionsGet.value);
  }

};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative block">
    <!-- 触发按钮 -->
    <button ref="trigger" @click="isOpen = !isOpen"
      class="flex h-[2.5rem] items-center border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-gray-100">
      {{ title }}
      <img src="@/assets/img/cv-template/drop_down.svg" alt="" class="h-full ml-[8px]">
    </button>

    <!-- 下拉列表 -->
    <transition name="fade-slide">
      <div v-if="isOpen" ref="dropdown"
        class="absolute left-0 w-48 bg-white shadow-md rounded-lg mt-2 flex flex-col items-center">

        <div class="h-[15rem] w-full overflow-y-scroll no-scrollbar border rounded-t-lg border-gray-300 ">
          <div class="p-2 pl-4">
            <label v-for="(option, index) in props.options" :key="index"
              class="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100">
              <input type="checkbox" v-model="selectedOptions" :value="option" class="w-4 h-4" @click.stop />
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <!-- 清除按钮 -->
        <button @click.stop="clearSelection"
          class="w-5/6 my-2 text-gray-800 py-2 border rounded-lg border-gray-300 hover:bg-gray-100">
          清除
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
  /* Firefox */
}

/* 进入动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}

/* 初始状态 */
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 结束状态 */
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
