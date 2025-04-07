import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";


export const useTemplateStore = defineStore('templateStore', () => {
  const currentTemplate = ref<Template | null>(null)
  const cvTitle = ref<string>(currentTemplate.value?.name || '我的简历')
  const themeColor = ref<string>(currentTemplate.value?.setting.themeColor || '#2b7fff')
  const fontColor = ref<string>(currentTemplate.value?.setting.fontColor || '#ffffff' )
  const lineSpacing = ref<number>(currentTemplate.value?.setting.lineSpacing || 20);
  const blockSpacing = ref<number>(currentTemplate.value?.setting.blockSpacing || 21 );
  const pageMargin = ref<number>(currentTemplate.value?.setting.pageMargin || 21 );
  const fontId = ref<string>(currentTemplate.value?.setting.fontFamily || '')

  const setTemplate = (template: Template) => {
    currentTemplate.value = template
    cvTitle.value = template.name
    themeColor.value = template.setting.themeColor
    fontColor.value = template.setting.fontColor
    lineSpacing.value = template.setting.lineSpacing
    blockSpacing.value = template.setting.blockSpacing
    pageMargin.value = template.setting.pageMargin
    fontId.value = template.setting.fontFamily
  }
  return { currentTemplate, themeColor, fontColor, setTemplate, lineSpacing, blockSpacing, pageMargin, fontId, cvTitle }
},
  {
    persist: true
  }
)
