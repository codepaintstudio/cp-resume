import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const activeMenu = ref<string | null>(null); // 记录当前打开的菜单名称

  const openMenu = (menuName: string) => {
    activeMenu.value = menuName;
  };

  const closeMenu = () => {
    activeMenu.value = null;
  };

  return { activeMenu, openMenu, closeMenu };
});
