import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";


export const useTemplateStore = defineStore('templateStore', () => {
  const currentTemplate = ref<Template | null>(null)
  const themeColor = ref<string>('#203CCB')  // 默认
  const fontColor = ref<string>('#ffffff')
  const lineSpacing = ref<number>(21);
  const blockSpacing = ref<number>(21);
  const pageMargin = ref<number>(21);

  const setTemplate = (template: Template) => {
    currentTemplate.value = template
    console.log(currentTemplate.value)
  }
  return { currentTemplate, themeColor, fontColor, setTemplate, lineSpacing, blockSpacing, pageMargin }
},
{
  persist: true,
})
