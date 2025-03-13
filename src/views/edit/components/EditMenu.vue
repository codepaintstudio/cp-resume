<script setup lang="ts">
import { useMenuStore } from "@/stores/useMenuStore";
import { computed } from "vue";

// 定义 menuContent 的键集合，并提取为类型
const menuKeys = [
  "基本信息",
  "教育背景",
  "工作经验",
  "项目经验",
  "荣誉证书",
  "获奖经历",
  "校园经历",
  "技能特长",
  "自我评价",
  "兴趣爱好",
  "自定义",
] as const;

type MenuKey = typeof menuKeys[number];

// 定义 menuContent，键类型为 MenuKey
const menuContent: Record<MenuKey, string> = {
  "基本信息": "这里是基本信息的编辑内容...",
  "教育背景": "这里是教育背景的编辑内容...",
  "工作经验": "这里是工作经验的编辑内容...",
  "项目经验": "这里是项目经验的编辑内容...",
  "荣誉证书": "这里是荣誉证书的编辑内容...",
  "获奖经历": "这里是获奖经历的编辑内容...",
  "校园经历": "这里是校园经历的编辑内容...",
  "技能特长": "这里是技能特长的编辑内容...",
  "自我评价": "这里是自我评价的编辑内容...",
  "兴趣爱好": "这里是兴趣爱好的编辑内容...",
  "自定义": "这里是自定义的编辑内容...",
};

// 获取菜单状态
const menuStore = useMenuStore();

// 确保 activeMenu 类型为 MenuKey | undefined
const activeMenu = computed(() => {
  return menuKeys.includes(menuStore.activeMenu as MenuKey) ? (menuStore.activeMenu as MenuKey) : undefined;
});
</script>

<template>

  <Teleport to="body">
    <div v-if="activeMenu" class="fixed inset-0 bg-black opacity-25"></div>
    <transition name="fade-slide">
      <div v-if="activeMenu" @click.self="menuStore.closeMenu"
        class="fixed inset-0  bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-240 min-h-150 relative">
          <h2 class="text-xl font-bold">{{ activeMenu }}</h2>
          <!-- 使用类型安全的访问 -->
          <p>{{ menuContent[activeMenu] }}</p>
          <button @click="menuStore.closeMenu" class="absolute top-2 right-2 text-gray-600">✖</button>
        </div>
      </div>
    </transition>
  </Teleport>

</template>

<style scoped>
/* 进入动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
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
