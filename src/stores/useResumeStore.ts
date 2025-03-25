import { defineStore } from 'pinia';
import type { Education, Honor, PersonalInfo, Project, Skill, WorkExperience } from '@/types/resume';
import { ref } from 'vue';
interface section {
  label: string;
  key: string;
  value: boolean;
}
export interface ResumeState {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  honors: Honor[];
  summary: string;
  currentId: number;
  isFirstVisit: boolean;
  sections: section[];
}

const resumeTemplate = {
  // 基本信息
  personalInfo: {
    name: '',             // 姓名
    gender: '',           // 性别
    phone: '',            // 联系电话
    email: '',            // 电子邮箱
    university: '',        // 所在大学
    politicalStatus: '',  // 政治面貌
    website: '',           // 个人网站
    avatar: '',            // 头像
    major: '',             // 专业
    age: '',               // 年龄
    applicationPosition: '' // 申请职位
  },

  // 教育经历
  education: [
    {
      id: 1,              // 唯一标识
      school: '',         // 学校名称
      degree: '',         // 学位
      major: '',          // 专业
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间1
    }
  ],

  // 工作经验
  workExperience: [
    {
      id: 2,              // 唯一标识
      company: '',        // 公司名称
      position: '',       // 职位
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间
      description: ''  // 描述
    }
  ],

  // 技能
  skills: [
    {
      id: 3,              // 唯一标识
      skillName: ''      // 技能名称
    }
  ],

  // 项目经验
  projects: [
    {
      id: 4,              // 唯一标识
      projectName: '',    // 项目名称
      role: '',           // 担任角色
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间
      description: '',    // 项目描述
      briefIntroduction: '' // 项目简介
    }
  ],
  // 荣誉奖项
  honors: [
    {
      id: 5,              // 唯一标识
      honorName: '',      // 荣誉名称
      date: '',           // 获奖时间
      description: ''     // 描述
    }
  ],
  // 自我评价
  summary: ''
} as const;

const sectionsDefault = ref([
  { label: "基本信息", key: "personalInfo", value: true },
  { label: "教育经历", key: "education", value: true },
  { label: "工作经验", key: "workExperience", value: true },
  { label: "技能特长", key: "skills", value: true },
  { label: "项目经验", key: "projects", value: true },
  { label: "荣誉奖项", key: "honors", value: true },
  { label: "自我评价", key: "summary", value: true },
]);

export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => {

    // 从 localStorage 获取保存的数据
    const savedResumeData = localStorage.getItem('resumeData');
    const savedCurrentId = localStorage.getItem('currentId');
    const isFirstVisit = localStorage.getItem('isFirstVisit') === null; // 是否首次访问
    const savedSections = localStorage.getItem('sections');

    const currentId = savedCurrentId && !isNaN(Number(savedCurrentId))
      ? Number(savedCurrentId)
      : 1;
    const resumeData = savedResumeData ? JSON.parse(savedResumeData) : resumeTemplate;

    // 首次访问标记并自动填充数据
    if (isFirstVisit) {
      localStorage.setItem('isFirstVisit', 'false');
    }

    const sections = savedSections ? JSON.parse(savedSections) : sectionsDefault;

    return {
      ...resumeData,
      currentId,
      isFirstVisit, // 添加到state中
      sections
    };
  },

  actions: {
    // 保存localStorage
    saveToLocalStorage() {
      localStorage.setItem('resumeData', JSON.stringify(this.$state));
      localStorage.setItem('currentId', JSON.stringify(this.currentId));
      localStorage.setItem('sections', JSON.stringify(this.sections));
    },
    // 初始化时检查最大 id，后面新增id是递增的
    initializeCurrentId() {
      const allIds = [
        ...this.education.map(item => item.id),
        ...this.workExperience.map(item => item.id),
        ...this.skills.map(item => item.id),
        ...this.projects.map(item => item.id),
        ...this.honors.map(item => item.id)
      ];
      this.currentId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
      localStorage.setItem('currentId', JSON.stringify(this.currentId));
    },


    // 通用新增方法
    addItem<T extends { id: number }>(list: T[], newItem: Omit<T, 'id'>) {
      const newEntry = { ...newItem, id: this.currentId++ } as T;
      list.push(newEntry);
      this.saveToLocalStorage();
    },

    // 通用删除方法
    deleteItem<T extends { id: number }>(list: T[], id: number) {
      const index = list.findIndex(item => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    // 通用更新方法
    updateItem<T extends { id: number }>(list: T[], updatedItem: T) {
      const index = list.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        list[index] = updatedItem;
        this.saveToLocalStorage();
      }
    },

    // 更新个人信息
    updatePersonalInfo(updatedInfo: Partial<PersonalInfo>) {
      this.personalInfo = { ...this.personalInfo, ...updatedInfo };
      this.saveToLocalStorage();
    },

    // 更新自我评价
    updateSummary(updatedSummary: string) {
      this.summary = updatedSummary;
      this.saveToLocalStorage();
    },

    // 新增教育经历
    addEducation(newItem: Omit<Education, 'id'>) {
      this.addItem(this.education, newItem);
    },

    // 删除教育经历
    deleteEducation(id: number) {
      this.deleteItem(this.education, id);
    },

    // 更新教育经历
    updateEducation(updatedItem: Education) {
      this.updateItem(this.education, updatedItem);
    },

    // 新增工作经验
    addWorkExperience(newItem: Omit<WorkExperience, 'id'>) {
      this.addItem(this.workExperience, newItem);
    },

    // 删除工作经验
    deleteWorkExperience(id: number) {
      this.deleteItem(this.workExperience, id);
    },

    // 更新工作经验
    updateWorkExperience(updatedItem: WorkExperience) {
      this.updateItem(this.workExperience, updatedItem);
    },

    // 新增技能
    addSkill(newItem: Omit<Skill, 'id'>) {
      this.addItem(this.skills, newItem);
    },

    // 删除技能
    deleteSkill(id: number) {
      this.deleteItem(this.skills, id);
    },

    // 更新技能
    updateSkill(updatedItem: Skill) {
      this.updateItem(this.skills, updatedItem);
    },

    // 新增项目经验
    addProject(newItem: Omit<Project, 'id'>) {
      this.addItem(this.projects, newItem);
    },

    // 删除项目经验
    deleteProject(id: number) {
      this.deleteItem(this.projects, id);
    },

    // 更新项目经验
    updateProject(updatedItem: Project) {
      this.updateItem(this.projects, updatedItem);
    },

    // 新增荣誉奖项
    addHonor(newItem: Omit<Honor, 'id'>) {
      this.addItem(this.honors, newItem);
    },

    // 删除荣誉奖项
    deleteHonor(id: number) {
      this.deleteItem(this.honors, id);
    },

    // 更新荣誉奖项
    updateHonor(updatedItem: Honor) {
      this.updateItem(this.honors, updatedItem);
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem('resumeStore');
      if (stored) {
        this.$state = JSON.parse(stored);
      }
    },

    updateSections (newOrder:section[]) {
      this.sections = newOrder;
    }
  }
});


