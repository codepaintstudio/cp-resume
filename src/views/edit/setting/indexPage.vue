<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import GapSetting from "./components/GapSetting.vue";
import ColorSetting from "./components/ColorSetting.vue";
import TemplateSetting from "./components/TemplateSetting.vue";
import TitleSetting from "./components/TitleSetting.vue";
import WordSetting from "./components/WordSetting.vue";

const buttons = ref([
  { label: "间距设置", icon: "icon-[carbon--text-line-spacing]", component: GapSetting },
  { label: "字体设置", icon: "icon-[ri--font-family]", component: WordSetting },
  { label: "颜色设置", icon: "icon-[streamline--interface-edit-brush-3-brush-color-colors-design-paint-painting-roller-rolling]", component: ColorSetting },
  { label: "标题编辑", icon: "icon-[iconamoon--edit-thin]", component: TitleSetting },
  { label: "更换模板", icon: "icon-[tabler--replace]", component: TemplateSetting }
]);

const activeIndex = ref<number | null>(null);

// 计算当前显示的组件
const dynamicComponent = computed(() => {
  return activeIndex.value !== null ? buttons.value[activeIndex.value].component : null;
});

// 切换菜单显示
const toggleMenu = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// 点击页面其他地方时关闭菜单
const closeMenu = (event: Event) => {
  if (!(event.target as HTMLElement).closest(".menu-container")) {
    activeIndex.value = null;
  }
  // 如果点击蒙层则关闭
  if (event.target === document.getElementById("black_Mask")) {
    activeIndex.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});

const setActiveIndex = (index: number) => {
  // 点击模板关闭菜单
  activeIndex.value = index;
};
</script>

<template>
  <div class="w-22 bg-white rounded-sm p-4 space-y-4 relative menu-container">
    <div v-for="(btn, index) in buttons" :key="index" class="relative z-20">
      <button @click.stop="toggleMenu(index)" class="w-full py-2 text-black rounded flex flex-col items-center space-y-1
               transition-all duration-200 hover:text-blue-500 hover:scale-102 active:scale-100">
        <span :class="[btn.icon, 'text-xl']"></span>
        <span class="text-xs">{{ btn.label }}</span>
      </button>

      <!-- 动态渲染不同组件 -->
      <transition name="fade-slide">
        <div v-if="activeIndex === index && activeIndex !== 4"
          class="absolute z-20 top-1/2 left-20 transform -translate-y-1/2 w-50 h-41 bg-white shadow-[0px_0px_15px_-5px] p-3 rounded-sm">
          <component :is="dynamicComponent"></component>
        </div>
      </transition>
      <div v-if="activeIndex === index && activeIndex === 4" class="fixed z-14 inset-0 bg-black opacity-25"
        id="black_Mask"></div>
      <transition name="fade-slide">
        <div v-if="activeIndex === index && activeIndex === 4"
          class="fixed z-20 w-280 h-180 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-[0px_0px_15px_-5px] p-3 rounded-sm">
          <component @setActiveIndex="setActiveIndex" :is="dynamicComponent"></component>
        </div>
      </transition>
    </div>
  </div>
</template>
