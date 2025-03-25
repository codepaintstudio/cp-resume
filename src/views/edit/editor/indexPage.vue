<script setup lang="ts">
import draggable from "vuedraggable"; // 引入 vuedraggable
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import { useMenuStore } from "@/stores/useMenuStore";
import { useResumeStore } from "@/stores/useResumeStore";
const resumeStore = useResumeStore();

const menuStore = useMenuStore();
const openMenu = (menuName: string) => {
  menuStore.openMenu(menuName);
};

</script>

<template>
  <div class="bg-white p-4 rounded-lg w-56 space-y-2">
    <!-- 固定项：基本信息 -->
    <div @click="openMenu(resumeStore.sections[0].key)"
      class="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow cursor-pointer select-none">
      <span class="text-sm hover:text-blue-400">{{ resumeStore.sections[0].label }}</span>
      <div class="flex items-center space-x-2">
        <ToggleSwitch @click.stop :modelValue="true" />
        <button @click.stop
          class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-not-allowed">
          <span class="icon-[system-uicons--drag] text-xl"></span>
        </button>
      </div>
    </div>

    <!-- 可拖拽列表 -->
    <draggable v-model="resumeStore.sections" handle=".drag-handle" animation="200" item-key="label">
      <template #item="{ element, index }">
        <div v-if="index != 0" :key="index" @click="openMenu(element.key)"
          class="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow cursor-pointer select-none my-2">
          <span class="text-sm hover:text-blue-400">{{ element.label }}</span>
          <div class="flex items-center space-x-2">
            <ToggleSwitch @click.stop v-model="element.value" />
            <!-- 拖拽按钮 -->
            <button @click.stop
              class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 drag-handle">
              <span class="icon-[system-uicons--drag] text-xl"></span>
            </button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
