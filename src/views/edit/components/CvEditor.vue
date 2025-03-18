<script setup lang="ts">
import { ref } from "vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import { useMenuStore } from "@/stores/useMenuStore";

const menuStore = useMenuStore();
const openMenu = (menuName: string) => {
  menuStore.openMenu(menuName);
};
const listItems = ref([
  { label: "基本信息", value: true },
  { label: "教育背景", value: false },
  { label: "工作经验", value: false },
  { label: "项目经验", value: false },
  { label: "荣誉证书", value: false },
  { label: "获奖经历", value: false },
  { label: "校园经历", value: false },
  { label: "技能特长", value: true },
  { label: "自我评价", value: false },
  { label: "兴趣爱好", value: false },
  { label: "自定义", value: false },
]);
</script>

<template>
  <div class="bg-white p-4 rounded-lg w-56 space-y-2">
    <div v-for="(item, index) in listItems" :key="index"
      class="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow">
      <span class="text-sm">{{ item.label }}</span>
      <div class="flex items-center space-x-2">
        <ToggleSwitch v-model="item.value" />
        <button @click="openMenu(item.label)"
          class="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-300">
          ⚙️
        </button>
      </div>
    </div>
  </div>
</template>
