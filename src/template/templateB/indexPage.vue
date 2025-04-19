<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
import { computed } from 'vue';
import { useTemplateStore } from '@/stores/useTemplateStore';

const templateStore = useTemplateStore();
// 动态生成 CSS 变量的样式
const colorStyles = computed(() => {
  return {
    '--font-family': templateStore.fontId,
    '--color-theme': templateStore.themeColor,
    '--color-font': templateStore.fontColor,
    '--line-spacing': `${templateStore.lineSpacing}px`,
    '--block-spacing': `${templateStore.blockSpacing}px`,
    '--page-margin': `${templateStore.pageMargin}px`,
    '--text-color': '#333',
    '--background-color': '#fff',
  };
});

// 引用的 store
const resumeStore = useResumeStore();

// 获取 store 中的数据
const resume = computed(() => resumeStore.$state);

// 计算属性获取 label
const selectedLabel = computed({
  get: () => resumeStore.sections.find(item => item.key === props.module)?.label || "",
  set: (newLabel: string) => {
    const section = resumeStore.sections.find(item => item.key === props.module);
    if (section) {
      section.label = newLabel;
    }
  },
});

const props = defineProps<{
  module: string;
}>();
</script>

<template>
  <div class="resume" :style="colorStyles">
    <!-- 个人信息 -->
    <section class="personal-section" v-if="resume.personalInfo && module === 'personalInfo'">
      <div class="personal-info">
        <h1 class="name">{{ resume.personalInfo.name }}</h1>
        <div class="info-grid">
          <div class="info-item" v-if="resume.personalInfo.gender">
            <span class="label">性别：</span>{{ resume.personalInfo.gender }}
          </div>
          <div class="info-item" v-if="resume.personalInfo.age">
            <span class="label">年龄：</span>{{ resume.personalInfo.age }}岁
          </div>
          <div class="info-item" v-if="resume.personalInfo.politicalStatus">
            <span class="label">政治面貌：</span>{{ resume.personalInfo.politicalStatus }}
          </div>
          <div class="info-item" v-if="resume.personalInfo.phone">
            <span class="label">电话：</span>{{ resume.personalInfo.phone }}
          </div>
          <div class="info-item" v-if="resume.personalInfo.university">
            <span class="label">学校：</span>{{ resume.personalInfo.university }}
          </div>
          <div class="info-item" v-if="resume.personalInfo.major">
            <span class="label">专业：</span>{{ resume.personalInfo.major }}
          </div>
          <div class="info-item" v-if="resume.personalInfo.website">
            <span class="label">网站：</span>
            <a :href="resume.personalInfo.website" target="_blank">{{ resume.personalInfo.website }}</a>
          </div>
          <div class="info-item" v-if="resume.personalInfo.email">
            <span class="label">邮箱：</span>{{ resume.personalInfo.email }}
          </div>
        </div>
      </div>
      <div class="avatar" v-if="resume.personalInfo.avatar">
        <img :src="resume.personalInfo.avatar" alt="个人照片">
      </div>
    </section>

    <!-- 分割线 -->
    <hr class="section-divider" v-if="module !== 'personalInfo'" />

    <!-- 求职意向 -->
    <section class="section" v-if="resume.jobIntention && module === 'jobIntention'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="info-grid">
        <div class="info-item" v-if="resume.jobIntention.position">
          <span class="label">意向岗位：</span>{{ resume.jobIntention.position }}
        </div>
        <div class="info-item" v-if="resume.jobIntention.city">
          <span class="label">意向城市：</span>{{ resume.jobIntention.city }}
        </div>
        <div class="info-item" v-if="resume.jobIntention.salary">
          <span class="label">期待薪资：</span>{{ resume.jobIntention.salary }}
        </div>
        <div class="info-item" v-if="resume.jobIntention.status">
          <span class="label">求职状态：</span>{{ resume.jobIntention.status }}
        </div>
        <div class="info-item" v-if="resume.jobIntention.type">
          <span class="label">求职类型：</span>{{ resume.jobIntention.type }}
        </div>
      </div>
    </section>

    <!-- 教育经历 -->
    <section class="section" v-if="resume.education.length && module === 'education'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="edu in resume.education" :key="edu.id">
          <div class="item-header">
            <h3 class="institution">{{ edu.school }}</h3>
            <span class="duration">{{ edu.startDate }} - {{ edu.endDate }}</span>
          </div>
          <p class="degree">{{ edu.degree }} - {{ edu.major }}</p>
        </div>
      </div>
    </section>

    <!-- 技能特长 -->
    <section class="section" v-if="resume.skills.length && module === 'skills'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <ul class="skill-list">
        <li v-for="skill in resume.skills" :key="skill.id">{{ skill.skillName }}</li>
      </ul>
    </section>

    <!-- 工作/实习经历 -->
    <section class="section" v-if="resume.workExperience.length && module === 'workExperience'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="work in resume.workExperience" :key="work.id">
          <div class="item-header">
            <h3 class="position">{{ work.position }}</h3>
            <span class="duration">{{ work.startDate }} - {{ work.endDate }}</span>
          </div>
          <p class="company">{{ work.company }}</p>
          <ul class="description-list">
            <li v-for="(desc, index) in work.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 实习经历 -->
    <section class="section" v-if="resume.internship.length && module === 'internship'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="intern in resume.internship" :key="intern.id">
          <div class="item-header">
            <h3 class="position">{{ intern.position }}</h3>
            <span class="duration">{{ intern.startDate }} - {{ intern.endDate }}</span>
          </div>
          <p class="company">{{ intern.company }}</p>
          <ul class="description-list">
            <li v-for="(desc, index) in intern.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 项目经验 -->
    <section class="section" v-if="resume.projects.length && module === 'projects'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="project in resume.projects" :key="project.id">
          <div class="item-header">
            <h3 class="project-name">{{ project.projectName }}</h3>
            <span class="duration">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <p class="role">角色：{{ project.role }}</p>
          <p class="project-intro">{{ project.briefIntroduction }}</p>
          <ul class="description-list">
            <li v-for="(desc, index) in project.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 校园经历 -->
    <section class="section" v-if="resume.campusExperience.length && module === 'campusExperience'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="exp in resume.campusExperience" :key="exp.id">
          <div class="item-header">
            <h3 class="position">{{ exp.title }}</h3>
            <span class="duration">{{ exp.startDate }} - {{ exp.endDate }}</span>
          </div>
          <p class="role">主要职责：{{ exp.responsibility }}</p>
          <ul class="description-list">
            <li v-for="(desc, index) in exp.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 荣誉奖项 -->
    <section class="section" v-if="resume.honors.length && module === 'honors'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <ul class="list">
        <li v-for="honor in resume.honors" :key="honor.id">{{ honor.honorName }}</li>
      </ul>
    </section>

    <!-- 作品展示 -->
    <section class="section" v-if="resume.portfolio.length && module === 'portfolio'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <div class="experience-list">
        <div class="experience-item" v-for="work in resume.portfolio" :key="work.id">
          <div class="item-header">
            <h3 class="project-name">
              <a :href="work.url" target="_blank">{{ work.name }}</a>
            </h3>
          </div>
          <p class="project-intro">{{ work.description }}</p>
        </div>
      </div>
    </section>

    <!-- 自我评价 -->
    <section class="section" v-if="resume.summary && module === 'summary'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <p class="summary">{{ resume.summary }}</p>
    </section>

    <!-- 爱好 -->
    <section class="section" v-if="resume.hobbies && module === 'hobbies'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <p class="summary">{{ resume.hobbies }}</p>
    </section>

    <!-- 自定义内容 -->
    <section class="section" v-if="resume.customize && module === 'customize'">
      <h2 class="section-title">{{ selectedLabel }}</h2>
      <p class="summary">{{ resume.customize }}</p>
    </section>
  </div>
</template>

<style scoped>
.resume {
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: var(--line-spacing);
  font-family: var(--font-family);
  max-width: 800px;
}

.personal-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.personal-info {
  flex: 1;
}

.name {
  font-size: 32px;
  font-weight: bold;
  color: var(--color-font);
  margin-bottom: 15px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px 20px;
}

.info-item {
  font-size: 14px;
  color: #555;
}

.label {
  font-weight: bold;
  color: var(--color-theme);
}

.avatar {
  width: 120px;
  height: 120px;
  margin-left: 30px;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.section-divider {
  border: none;
  border-top: 1px solid #eaeaea;
  margin: 6px 0;
}

.section {
  margin-bottom: var(--block-spacing);
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-theme);
  border-left: 4px solid var(--color-theme);
  padding-left: 12px;
  margin-bottom: 15px;
}

.list,
.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li,
.skill-list li {
  padding-left: 18px;
  margin-bottom: 8px;
}

.list li::before,
.skill-list li::before {
  content: '• ';
  left: 0;
  color: var(--color-theme);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}

.institution,
.position,
.project-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-theme);
}

.duration {
  font-size: 12px;
  color: #999;
}

.degree,
.company,
.role {
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.project-intro {
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.description-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.description-list li {
  padding-left: 18px;
  margin-bottom: 5px;
}

.description-list li::before {
  content: '– ';
  left: 0;
  color: var(--color-theme);
}

.summary {
  font-size: 14px;
  line-height: 1.6;
  text-align: justify;
}
</style>
