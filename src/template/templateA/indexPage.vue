<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
import { computed } from 'vue';
import { useTemplateStore } from '@/stores/useTemplateStore';

// 引入模板 store 并生成动态样式
const templateStore = useTemplateStore();
const ShadesStyle = computed(() => {
  return {
    '--color-theme': templateStore.themeColor,
    '--color-font': templateStore.fontColor,
    '--line-spacing': `${templateStore.lineSpacing}px`,
    '--block-spacing': `${templateStore.blockSpacing}px`,
    '--page-margin': `${templateStore.pageMargin}px`,
    '--font-family': templateStore.fontId,
  };
});

// 引入简历 store 并获取数据
const resumeStore = useResumeStore();
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

// 定义 props
const props = defineProps<{
  module: string;
}>();
</script>

<template>
  <div class="resume-container" :style="ShadesStyle">
    <!-- 个人信息 -->
    <div class="personal-info" v-if="resume.personalInfo && module === 'personalInfo'">
      <div class="personal-details">
        <div class="detail-row">
          <div class="detail-item name">
            <span class="value">{{ resume.personalInfo.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">性别：</span>
            <span class="value">{{ resume.personalInfo.gender }}</span>
          </div>
          <div class="detail-item">
            <span class="label">年龄：</span>
            <span class="value">{{ resume.personalInfo.age }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="label">政治面貌：</span>
            <span class="value">{{ resume.personalInfo.politicalStatus }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="label">电话：</span>
            <span class="value">{{ resume.personalInfo.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label">邮箱：</span>
            <span class="value">{{ resume.personalInfo.email }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item" v-if="resume.personalInfo.university">
            <span class="label">学校：</span>
            <span class="value">{{ resume.personalInfo.university }}</span>
          </div>
          <div class="detail-item">
            <span class="label">专业：</span>
            <span class="value">{{ resume.personalInfo.major }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item" v-if="resume.personalInfo.website">
            <span class="label">网站：</span>
            <a :href="resume.personalInfo.website" target="_blank" class="value">{{ resume.personalInfo.website }}</a>
          </div>
        </div>
      </div>
      <div class="profile-image" v-if="resume.personalInfo.avatar">
        <img :src="resume.personalInfo.avatar" alt="个人照片">
      </div>
    </div>

    <!-- 求职意向 -->
    <div class="section job-intention-section" v-if="resume.jobIntention && module === 'jobIntention'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="detail-row">
          <div class="detail-item">
            <span class="label">意向岗位：</span>
            <span class="value">{{ resume.jobIntention.position }}</span>
          </div>
          <div class="detail-item">
            <span class="label">意向城市：</span>
            <span class="value">{{ resume.jobIntention.city }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="label">期待薪资：</span>
            <span class="value">{{ resume.jobIntention.salary }}</span>
          </div>
          <div class="detail-item">
            <span class="label">求职状态：</span>
            <span class="value">{{ resume.jobIntention.status }}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-item">
            <span class="label">求职类型：</span>
            <span class="value">{{ resume.jobIntention.type }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 教育经历 -->
    <div class="section education-section" v-if="resume.education.length && module === 'education'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="edu in resume.education" :key="edu.id">
          <p class="school">
            <span>{{ edu.school }} ({{ edu.degree }})</span>
            <span>{{ edu.major }}</span>
            <strong v-if="edu.startDate && edu.endDate">{{ edu.startDate }} 至 {{ edu.endDate }}</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- 技能特长 -->
    <div class="section skills-section" v-if="resume.skills.length && module === 'skills'">
      <div class="section-title">{{ selectedLabel }}</div>
      <ul class="skills-list">
        <li v-for="skill in resume.skills" :key="skill.id">{{ skill.skillName }}</li>
      </ul>
    </div>

    <!-- 工作/实习经历 -->
    <div class="section experience-section" v-if="resume.workExperience.length && module === 'workExperience'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="work in resume.workExperience" :key="work.id">
          <div class="subtitle">
            <div class="work-header">
              <span>{{ work.company }}</span>
              <span>{{ work.position }}</span>
              <span>{{ work.startDate }} 至 {{ work.endDate }}</span>
            </div>
          </div>
          <ul>
            <li v-for="(desc, index) in work.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 实习经历 -->
    <div class="section internship-section" v-if="resume.internship.length && module === 'internship'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="intern in resume.internship" :key="intern.id">
          <div class="subtitle">
            <div class="work-header">
              <span>{{ intern.company }}</span>
              <span>{{ intern.position }}</span>
              <span>{{ intern.startDate }} 至 {{ intern.endDate }}</span>
            </div>
          </div>
          <ul>
            <li v-for="(desc, index) in intern.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 项目经验 -->
    <div class="section projects-section" v-if="resume.projects.length && module === 'projects'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="project in resume.projects" :key="project.id">
          <div class="subtitle">
            <div class="project-header">
              <span>{{ project.projectName }}</span>
              <span>{{ project.role }}</span>
              <span>{{ project.startDate }} <span v-if="project.startDate && project.endDate">至</span> {{
                project.endDate }}</span>
            </div>
            <hr>
            <p class="project-introduction">{{ project.briefIntroduction }}</p>
          </div>
          <ul>
            <li v-for="(desc, index) in project.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 校园经历 -->
    <div class="section campus-experience-section"
      v-if="resume.campusExperience.length && module === 'campusExperience'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="exp in resume.campusExperience" :key="exp.id">
          <div class="subtitle">
            <div class="project-header">
              <span>{{ exp.title }}</span>
              <span>{{ exp.startDate }} 至 {{ exp.endDate }}</span>
            </div>

          </div>
          <p><strong>主要职责：</strong> {{ exp.responsibility }}</p>
          <ul>
            <li v-for="(desc, index) in exp.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 荣誉奖项 -->
    <div class="section skills-section" v-if="resume.honors.length && module === 'honors'">
      <div class="section-title">{{ selectedLabel }}</div>
      <ul class="skills-list">
        <li v-for="honor in resume.honors" :key="honor.id">{{ honor.honorName }}</li>
      </ul>
    </div>

    <!-- 作品展示 -->
    <div class="section portfolio-section" v-if="resume.portfolio.length && module === 'portfolio'">
      <div class="section-title">{{ selectedLabel }}</div>
      <div class="section-content">
        <div class="item" v-for="work in resume.portfolio" :key="work.id">
          <div class="subtitle">
            <div class="project-header">
              <a :href="work.url" target="_blank">{{ work.name }}</a>
              <span>网址：{{ work.url }}</span>
            </div>

          </div>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </div>

    <!-- 自我评价 -->
    <div class="section self-evaluation-section" v-if="resume.summary && module === 'summary'">
      <div class="section-title">{{ selectedLabel }}</div>
      <p class="self-evaluation">{{ resume.summary }}</p>
    </div>

    <!-- 爱好 -->
    <div class="section hobbies-section" v-if="resume.hobbies && module === 'hobbies'">
      <div class="section-title">{{ selectedLabel }}</div>
      <p>{{ resume.hobbies }}</p>
    </div>

    <!-- 自定义内容 -->
    <div class="section customize-section" v-if="resume.customize && module === 'customize'">
      <div class="section-title">{{ selectedLabel }}</div>
      <p>{{ resume.customize }}</p>
    </div>
  </div>
</template>

<style scoped>
@import './assets/style.css';

.resume-container {
  margin: var(--page-margin);
  line-height: var(--line-spacing);
  font-family: var(--font-family);
}

ul li::before {
  content: '–';
  left: 0;
  color: var(--color-theme);
}

.section {
  margin-bottom: var(--block-spacing);
}

.section-title {
  width: 100%;
  color: var(--color-font);
  background-color: var(--color-theme);
  line-height: 25px;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
  border-left: 5px solid var(--color-base);
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
