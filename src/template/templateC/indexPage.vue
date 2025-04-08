<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
import { computed } from 'vue';
import { useTemplateStore } from '@/stores/useTemplateStore';

const templateStore = useTemplateStore();
// Dynamically generate CSS variables
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

// Referenced store
const resumeStore = useResumeStore();

// Get data from store
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
  <div class="resume-container" :style="colorStyles">
    <!-- Personal Information -->
    <section class="card personal-card" v-if="resume.personalInfo && module === 'personalInfo'">
      <div class="card-header">
        <h1 class="name">{{ resume.personalInfo.name }}</h1>
        <div class="avatar" v-if="resume.personalInfo.avatar">
          <img :src="resume.personalInfo.avatar" alt="Profile Photo" />
        </div>
      </div>
      <div class="card-content">
        <div class="info-row" v-if="resume.personalInfo.gender">
          <span class="label">性别:</span> {{ resume.personalInfo.gender }}
        </div>
        <div class="info-row" v-if="resume.personalInfo.age">
          <span class="label">年龄:</span> {{ resume.personalInfo.age }} years
        </div>
        <div class="info-row" v-if="resume.personalInfo.politicalStatus">
          <span class="label">政治面貌:</span> {{ resume.personalInfo.politicalStatus }}
        </div>
        <div class="info-row" v-if="resume.personalInfo.phone">
          <span class="label">电话:</span> {{ resume.personalInfo.phone }}
        </div>
        <div class="info-row" v-if="resume.personalInfo.university">
          <span class="label">学校:</span> {{ resume.personalInfo.university }}
        </div>
        <div class="info-row" v-if="resume.personalInfo.major">
          <span class="label">专业:</span> {{ resume.personalInfo.major }}
        </div>
        <div class="info-row" v-if="resume.personalInfo.website">
          <span class="label">网站:</span>
          <a :href="resume.personalInfo.website" target="_blank">{{ resume.personalInfo.website }}</a>
        </div>
        <div class="info-row" v-if="resume.personalInfo.email">
          <span class="label">邮箱:</span> {{ resume.personalInfo.email }}
        </div>
      </div>
    </section>

    <!-- Job Intention -->
    <section class="card" v-if="resume.jobIntention && module === 'jobIntention'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="grid-2x5">
        <div class="info-row" v-if="resume.jobIntention.position">
          <span class="label">意向岗位</span>
        </div>
        <div class="info-row" v-if="resume.jobIntention.city">
          <span class="label">意向城市</span>
        </div>
        <div class="info-row" v-if="resume.jobIntention.salary">
          <span class="label">期待薪资</span>
        </div>
        <div class="info-row" v-if="resume.jobIntention.status">
          <span class="label">求职状态</span>
        </div>
        <div class="info-row" v-if="resume.jobIntention.type">
          <span class="label">求职类型</span>
        </div>
        <div v-if="resume.jobIntention.position">
          {{ resume.jobIntention.position }}
        </div>
        <div v-if="resume.jobIntention.city">
          {{ resume.jobIntention.city }}
        </div>
        <div v-if="resume.jobIntention.salary">
          {{ resume.jobIntention.salary }}
        </div>
        <div v-if="resume.jobIntention.status">
          {{ resume.jobIntention.status }}
        </div>
        <div v-if="resume.jobIntention.type">
          {{ resume.jobIntention.type }}
        </div>
        <div>

        </div>
      </div>
    </section>

    <!-- Education -->
    <section class="card" v-if="resume.education.length && module === 'education'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="edu in resume.education" :key="edu.id">
          <h3>{{ edu.school }}</h3>
          <p>{{ edu.degree }} - {{ edu.major }}</p>
          <span class="duration">{{ edu.startDate }} - {{ edu.endDate }}</span>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section class="card" v-if="resume.skills.length && module === 'skills'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <ul class="skill-list">
          <li v-for="skill in resume.skills" :key="skill.id">{{ skill.skillName }}</li>
        </ul>
      </div>
    </section>

    <!-- Work Experience -->
    <section class="card" v-if="resume.workExperience.length && module === 'workExperience'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="work in resume.workExperience" :key="work.id">
          <h3>{{ work.position }}</h3>
          <p>{{ work.company }}</p>
          <span class="duration">{{ work.startDate }} - {{ work.endDate }}</span>
          <ul>
            <li v-for="(desc, index) in work.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Internship -->
    <section class="card" v-if="resume.internship.length && module === 'internship'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="intern in resume.internship" :key="intern.id">
          <h3>{{ intern.position }}</h3>
          <p>{{ intern.company }}</p>
          <span class="duration">{{ intern.startDate }} - {{ intern.endDate }}</span>
          <ul>
            <li v-for="(desc, index) in intern.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="card" v-if="resume.projects.length && module === 'projects'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="project in resume.projects" :key="project.id">
          <h3>{{ project.projectName }}</h3>
          <p>Role: {{ project.role }}</p>
          <p>{{ project.briefIntroduction }}</p>
          <span class="duration">{{ project.startDate }} - {{ project.endDate }}</span>
          <ul>
            <li v-for="(desc, index) in project.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Campus Experience -->
    <section class="card" v-if="resume.campusExperience.length && module === 'campusExperience'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="exp in resume.campusExperience" :key="exp.id">
          <h3>{{ exp.title }}</h3>
          <p>Main Responsibility: {{ exp.responsibility }}</p>
          <span class="duration">{{ exp.startDate }} - {{ exp.endDate }}</span>
          <ul>
            <li v-for="(desc, index) in exp.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Honors -->
    <section class="card" v-if="resume.honors.length && module === 'honors'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <ul>
          <li v-for="honor in resume.honors" :key="honor.id">{{ honor.honorName }}</li>
        </ul>
      </div>
    </section>

    <!-- Portfolio -->
    <section class="card" v-if="resume.portfolio.length && module === 'portfolio'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="experience-item" v-for="work in resume.portfolio" :key="work.id">
          <h3><a :href="work.url" target="_blank">{{ work.name }}</a></h3>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </section>

    <!-- Summary -->
    <section class="card" v-if="resume.summary && module === 'summary'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <p>{{ resume.summary }}</p>
      </div>
    </section>

    <!-- Hobbies -->
    <section class="card" v-if="resume.hobbies && module === 'hobbies'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <p>{{ resume.hobbies }}</p>
      </div>
    </section>

    <!-- Custom Content -->
    <section class="card" v-if="resume.customize && module === 'customize'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <p>{{ resume.customize }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume-container {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: var(--page-margin);
  font-family: var(--font-family);
  line-height: var(--line-spacing);
  max-width: 900px;
  margin: 0 auto;
}

.card {
  background: #fff;
  border-radius: 8px;
  margin-bottom: var(--block-spacing);
}

.personal-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-font);
}

.avatar {
  width: 200px;
  margin: 10px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 2px solid var(--color-theme);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-theme);
  margin-bottom: 30px;
  border-bottom: 2px solid var(--color-theme);
  padding-bottom: 20px;
}

.grid-2x5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* 5 columns of equal width */
  grid-template-rows: repeat(2, auto);
  /* 2 rows, height adjusts to content */
  gap: 10px;
  /* Space between grid items */
}

.card-content {
  font-size: 14px;
  color: #444;
}

.info-row {
  display: flex;
  margin-bottom: 8px;
}

.label {
  font-weight: 600;
  color: var(--color-theme);
  min-width: 100px;
}

.experience-item {
  margin-bottom: 20px;
}

.experience-item h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-theme);
  margin-bottom: 5px;
}

.experience-item p {
  margin: 5px 0;
  color: #555;
}

.duration {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
  display: block;
}

ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
}

ul li {
  padding-left: 20px;
  margin-bottom: 8px;
}

ul li::before {
  content: "• ";
  color: var(--color-theme);
  left: 0;
}

.skill-list li::before {
  content: "✓ ";
}
</style>
