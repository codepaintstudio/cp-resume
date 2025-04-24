import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";


export const useTemplateStore = defineStore('templateStore', () => {
  const currentTemplate = ref<Template | null>(null)
  const cvTitle = ref<string>(currentTemplate.value?.resumeTemplateName || '我的简历')
  const themeColor = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.themeColor || '#2b7fff')
  const fontColor = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.fontColor || '#ffffff' )
  const lineSpacing = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.lineSpacing || '20');
  const blockSpacing = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.blockSpacing || '21' );
  const pageMargin = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.pageMargin || '21' );
  const fontId = ref<string>(currentTemplate.value?.resumeTemplateContent.setting.fontFamily || '')

  const setTemplate = (template: Template) => {
    currentTemplate.value = template
    cvTitle.value = template.resumeTemplateName
    themeColor.value = template.resumeTemplateContent.setting.themeColor
    fontColor.value = template.resumeTemplateContent.setting.fontColor
    lineSpacing.value = template.resumeTemplateContent.setting.lineSpacing
    blockSpacing.value = template.resumeTemplateContent.setting.blockSpacing
    pageMargin.value = template.resumeTemplateContent.setting.pageMargin
    fontId.value = template.resumeTemplateContent.setting.fontFamily
  }
  return { currentTemplate, themeColor, fontColor, setTemplate, lineSpacing, blockSpacing, pageMargin, fontId, cvTitle }
},
  {
    persist: true
  }
)
