import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Template } from "../types/template";

const resumeTemplate  = {
  resumeTemplateId: "202503",
  resumeTemplateName: "简洁模板-c",
  resumeTemplateContent: {
    color: "黑色",
    style: "简约",
    layout: "classical",
    setting: {
      themeColor: "#000000",
      fontColor: "#000000",
      fontFamily: "",
      lineSpacing: 20,
      blockSpacing: 21,
      pageMargin: 21
    },
    industry: "IT",
    thumbnail: "preview.png",
    folderPath: "templateC",
    description: "简约而不简单的简历模板。"
  }
};


export const useTemplateStore = defineStore('templateStore', () => {
  const currentTemplate = ref<Template>(resumeTemplate);

  const setTemplate = (template: Template) => {
    currentTemplate.value = template;
    const setting = currentTemplate.value.resumeTemplateContent.setting;
    setting.lineSpacing = Number(setting.lineSpacing);
    setting.blockSpacing = Number(setting.blockSpacing);
    setting.pageMargin = Number(setting.pageMargin);
  };

  // 导出时转成 string
  const getTemplateForExport = () => {
    const templateCopy = JSON.parse(JSON.stringify(currentTemplate.value)); // 深拷贝
    const setting = templateCopy.resumeTemplateContent.setting;

    setting.lineSpacing = String(setting.lineSpacing);
    setting.blockSpacing = String(setting.blockSpacing);
    setting.pageMargin = String(setting.pageMargin);

    return templateCopy;
  };

  return { currentTemplate, setTemplate, getTemplateForExport };
});

