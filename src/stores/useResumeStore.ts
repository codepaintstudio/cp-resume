import { defineStore } from 'pinia';
import type { Education, Honor, PersonalInfo, Project, Skill, WorkExperience, JobIntention, CampusExperience, Internship, Portfolio } from '@/types/resume';
import { ref } from 'vue';
interface section {
  label: string;
  key: string;
  value: boolean;
}

interface setting {
  fontColor: string;
  fontFamily: string;
  pageMargin: string;
  themeColor: string;
  lineSpacing: string;
  blockSpacing: string;
}

export interface ResumeState {
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  honors: Honor[];
  jobIntention: JobIntention;
  campusExperience: CampusExperience[];
  internship: Internship[];
  portfolio: Portfolio[];
  summary: string;
  hobbies: string;
  customize: string;


  currentId: number;
  resumeTemplateName: string;
  resumeTemplateId: string;
  setting: setting;
  sections: section[];
}


const resumeTemplate = {
  personalInfo: {
    age: "22",
    name: "李华31",
    email: "lihua@example.com",
    major: "计算机科学与技术",
    phone: "13800138000",
    avatar: "/default_avatar.png",
    gender: "男",
    website: "https: //lihua.dev",
    university: "清华大学",
    politicalStatus: "共青团员",
    applicationPosition: "前端开发工程师"
  },
  jobIntention: {
    city: "北京",
    type: "全职",
    salary: "15k-20k",
    status: "正在找工作",
    position: "前端开发工程师"
  },
  education: [
    {
      id: 1,
      major: "计算机科学与技术",
      degree: "本科",
      school: "清华大学",
      endDate: "2023-07",
      startDate: "2019-09"
    }
  ],
  campusExperience: [
    {
      id: 1,
      title: "学生会技术部部长",
      endDate: "2021-06",
      startDate: "2020-09",
      description: "带领5人团队开发学生会网站，实现活动报名、信息公告等功能，提高工作效率60%。",
      responsibility: "负责校园活动平台开发与维护，组织技术培训"
    }
  ],
  internship: [
    {
      id: 1,
      company: "字节跳动",
      endDate: "2022-09",
      position: "前端实习生",
      startDate: "2022-07",
      description: "参与字节跳动教育产品的前端开发，负责小程序组件的开发与优化。使用Vue3 + TypeScript开发页面组件，提升页面渲染速度约30%。"
    }
  ],
  workExperience: [
    {
      id: 2,
      company: "腾讯",
      endDate: "至今",
      position: "前端开发工程师",
      startDate: "2023-08",
      description: "参与微信小程序及H5页面开发，负责前端架构优化与组件封装，提升用户体验与代码复用性。"
    }
  ],
  skills: [
    { id: 3, skillName: "JavaScript / TypeScript" },
    { id: 4, skillName: "Vue3 / React" },
    { id: 5, skillName: "HTML / CSS / Sass" },
    { id: 6, skillName: "Git / Webpack / Vite" }
  ],
  projects: [
    {
      id: 4,
      role: "前端开发",
      endDate: "2023-06",
      startDate: "2023-03",
      description: "开发一个在线简历编辑与导出平台，用户可可视化编辑内容、实时预览并导出为PDF。",
      projectName: "简历生成平台",
      briefIntroduction: "Vue3 + Pinia + TailwindCSS，前端渲染性能优化，支持本地存储自动保存。"
    }
  ],
  portfolio: [
    {
      id: 1,
      url: "https://lihua.dev/blog",
      name: "个人博客系统",
      description: "基于Nuxt3和Markdown的技术博客系统，支持动态路由、标签分类与暗黑模式切换。"
    }
  ],
  honors: [
    {
      id: 5,
      date: "2022-08",
      honorName: "全国大学生计算机设计大赛一等奖",
      description: "开发智能校园助手小程序，涵盖课表查询、成绩提醒等功能，获得评委一致好评。"
    }
  ],
  summary: "热爱前端开发，注重用户体验与代码质量，具备良好的团队协作与学习能力。熟悉现代前端框架，能够独立完成从开发到上线的全过程。",
  hobbies: "编程、羽毛球、摄影、技术写作",
  customize: "开源贡献者：为多个GitHub开源项目提交过PR，包括UI组件库、开发工具插件等。",
  currentId: 26,
  sections: [
    { label: "基本信息", key: "personalInfo", value: true },
    { label: "求职意向", key: "jobIntention", value: true },
    { label: "教育经历", key: "education", value: true },
    { label: "校园经历", key: "campusExperience", value: true },
    { label: "实习经历", key: "internship", value: true },
    { label: "工作经验", key: "workExperience", value: true },
    { label: "技能特长", key: "skills", value: true },
    { label: "项目经验", key: "projects", value: true },
    { label: "作品展示", key: "portfolio", value: true },
    { label: "荣誉奖项", key: "honors", value: true },
    { label: "自我评价", key: "summary", value: true },
    { label: "兴趣爱好", key: "hobbies", value: true },
    { label: "自定义", key: "customize", value: true }
  ],
  setting: {
    themeColor: "#000000",
    fontColor: "#ffffff",
    fontFamily: "zql",
    lineSpacing: "21",
    blockSpacing: "21",
    pageMargin: "25"
  },
  resumeTemplateId: "202503",
  resumeTemplateName: "简历3"
};


export const useResumeStore = defineStore('resume', {
  state: (): ResumeState => {

    // 从 localStorage 获取保存的数据
    // const savedResumeData = localStorage.getItem('resumeData');
    // const savedCurrentId = localStorage.getItem('currentId');
    // const savedSections = localStorage.getItem('sections');
    //
    // const currentId = savedCurrentId && !isNaN(Number(savedCurrentId))
    //   ? Number(savedCurrentId)
    //   : 1;
    // const resumeData = savedResumeData ? JSON.parse(savedResumeData) : resumeTemplate;
    // const sections = savedSections ? JSON.parse(savedSections) : sectionsDefault;
    //
    // const DEFAULT_DATA = fetchDefaultData();
    const resumeData = resumeTemplate;


    return {
      ...resumeData,
    };
  },

  actions: {

    setResumeData (data: ResumeState) {
      data.currentId = data.currentId && !isNaN(Number(data.currentId))
        ? Number(data.currentId)
        : 1;
      this.$state = data;
      this.saveToLocalStorage();
    },

    // 保存localStorage
    saveToLocalStorage() {
      // localStorage.setItem('resumeData', JSON.stringify(this.$state));
      // localStorage.setItem('currentId', JSON.stringify(this.currentId));
      // localStorage.setItem('sections', JSON.stringify(this.sections));
      sessionStorage.setItem('resumeData', JSON.stringify(this.$state));
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
    },

    // 更新自我评价
    updateSummary(updatedSummary: string) {
      this.summary = updatedSummary;
    },

    updateHobbies(updatedHobbies: string) {
      this.hobbies = updatedHobbies;
    },

    updateCustomize(updatedCustomize: string) {
      this.customize = updatedCustomize;
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

    // 更新求职意向
    updateJobIntention(updatedInfo: Partial<JobIntention>) {
      this.jobIntention = { ...this.jobIntention, ...updatedInfo };
      this.saveToLocalStorage();
    },

    // 新增校园经历
    addCampusExperience(newItem: Omit<CampusExperience, 'id'>) {
      this.addItem(this.campusExperience, newItem);
    },

    // 删除校园经历
    deleteCampusExperience(id: number) {
      this.deleteItem(this.campusExperience, id);
    },

    // 更新校园经历
    updateCampusExperience(updatedItem: CampusExperience) {
      this.updateItem(this.campusExperience, updatedItem);
    },

    // 新增实习经历
    addInternship(newItem: Omit<WorkExperience, 'id'>) {
      this.addItem(this.internship, newItem);
    },

    // 删除实习经历
    deleteInternship(id: number) {
      this.deleteItem(this.internship, id);
    },

    // 更新实习经历
    updateInternship(updatedItem: WorkExperience) {
      this.updateItem(this.internship, updatedItem);
    },

    // 新增作品展示
    addPortfolio(newItem: Omit<Portfolio, 'id'>) {
      this.addItem(this.portfolio, newItem);
    },

    // 删除作品展示
    deletePortfolio(id: number) {
      this.deleteItem(this.portfolio, id);
    },

    // 更新作品展示
    updatePortfolio(updatedItem: Portfolio) {
      this.updateItem(this.portfolio, updatedItem);
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


