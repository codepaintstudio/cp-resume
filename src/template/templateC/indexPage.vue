<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore'
import { computed } from 'vue'
import { useTemplateStore } from '@/stores/useTemplateStore'

const templateStore = useTemplateStore()
// Dynamically generate CSS variables
const colorStyles = computed(() => {
  return {
    '--font-family': templateStore.currentTemplate.resumeTemplateContent.setting.fontFamily,
    '--color-theme': templateStore.currentTemplate.resumeTemplateContent.setting.themeColor,
    '--color-font': templateStore.currentTemplate.resumeTemplateContent.setting.fontColor,
    '--line-spacing': `${templateStore.currentTemplate.resumeTemplateContent.setting.lineSpacing}px`,
    '--block-spacing': `${templateStore.currentTemplate.resumeTemplateContent.setting.blockSpacing}px`,
    '--page-margin': `${templateStore.currentTemplate.resumeTemplateContent.setting.pageMargin}px`,
    '--text-color': '#333',
    '--background-color': '#fff',
  }
})

// Referenced store
const resumeStore = useResumeStore()

// Get data from store
const resume = computed(() => resumeStore.$state)

// 计算属性获取 label
const selectedLabel = computed({
  get: () => resumeStore.sections.find((item) => item.key === props.module)?.label || '',
  set: (newLabel: string) => {
    const section = resumeStore.sections.find((item) => item.key === props.module)
    if (section) {
      section.label = newLabel
    }
  },
})

const props = defineProps<{
  module: string
}>()
</script>

<template>
  <div class="resume-container" :style="colorStyles">
    <!-- Personal Information -->
    <section class="card personal-card" v-if="resume.personalInfo && module === 'personalInfo'">
      <div class="personal-left">
        <div class="card-header">
          <h3 class="name">{{ resume.personalInfo.name }}</h3>
        </div>
        <div class="card-content-p">
          <div class="info-row" v-if="resume.personalInfo.gender">
            {{ resume.personalInfo.gender }} |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.age">{{ resume.personalInfo.age }}岁 |&nbsp</div>
          <div class="info-row" v-if="resume.personalInfo.politicalStatus">
            {{ resume.personalInfo.politicalStatus }} |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.phone">
            {{ resume.personalInfo.phone }} |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.university">
            {{ resume.personalInfo.university }} |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.major">
            {{ resume.personalInfo.major }} |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.website">
            <a :href="resume.personalInfo.website" target="_blank">{{
                resume.personalInfo.website
              }}</a>  |&nbsp
          </div>
          <div class="info-row" v-if="resume.personalInfo.email">
            {{ resume.personalInfo.email }}
          </div>
        </div>
      </div>

      <div class="avatar" v-if="resume.personalInfo.avatar">
        <img :src="resume.personalInfo.avatar" alt="Profile Photo" />
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
        <div></div>
      </div>
    </section>

    <!-- Education -->
    <section class="card" v-if="resume.education.length && module === 'education'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div class="flex-card" v-for="edu in resume.education" :key="edu.id">
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
        <div v-for="work in resume.workExperience" :key="work.id">
          <div class="flex-card">
            <h3>{{ work.position }}</h3>
            <p>{{ work.company }}</p>
            <span class="duration">{{ work.startDate }} - {{ work.endDate }}</span>
          </div>
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
        <div v-for="intern in resume.internship" :key="intern.id">
          <div class="flex-card">
            <h3>{{ intern.position }}</h3>
            <p>{{ intern.company }}</p>
            <span class="duration">{{ intern.startDate }} - {{ intern.endDate }}</span>
          </div>

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
        <div v-for="project in resume.projects" :key="project.id">
          <div class="flex-card">
            <h3>{{ project.projectName }}</h3>
            <p>{{ project.role }}</p>

            <span class="duration">{{ project.startDate }} - {{ project.endDate }}</span>
          </div>
          <p>{{ project.briefIntroduction }}</p>
          <ul>
            <li v-for="(desc, index) in project.description.split('\n')" :key="index">
              {{ desc }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Campus Experience -->
    <section class="card" v-if="resume.campusExperience.length && module === 'campusExperience'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div v-for="exp in resume.campusExperience" :key="exp.id">
          <div class="flex-card">
            <h3>{{ exp.title }}</h3>
            <span class="duration">{{ exp.startDate }} - {{ exp.endDate }}</span>
          </div>
          <p>{{ exp.responsibility }}</p>
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

          <div class="flex-card" v-for="honor in resume.honors" :key="honor.id">
            <span>&nbsp • {{ honor.honorName }}</span>
            <span style="margin-right: 1% ;font-size: 12px;color: #888888;">{{ honor.date }}</span>
          </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section class="card" v-if="resume.portfolio.length && module === 'portfolio'">
      <h2 class="card-title">{{ selectedLabel }}</h2>
      <div class="card-content">
        <div v-for="work in resume.portfolio" :key="work.id">
          <div style="margin-top: 15px" class="flex-card">
            <h3>
              <a :href="work.url" target="_blank">{{ work.name }}</a>
            </h3>
            <a :href="work.url" target="_blank">{{ work.url }}</a>
          </div>

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
  //padding: var(--page-margin);
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

.personal-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  font-size: 16px;
  font-weight: 700;
  color: #444;
  margin-bottom: 10px;
  color: var(--color-font);
}

.avatar {
  width: 82px;
  margin: 10px;
  border: #999999 1px solid;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  //border: 1px solid var(--color-theme);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-theme);
  margin-bottom: 8px;
  border-bottom: 2px solid var(--color-theme);
  padding-bottom: 11px;
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
.card-content-p {
  font-size: 14px;
  color: #444;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 70%;
}

.info-row {
  //display: flex;
  margin-bottom: 8px;
}

.label {
  font-weight: 600;
  color: var(--color-theme);
  min-width: 100px;
}

.flex-card {
  display: flex;
  justify-content: space-between;
}

.flex-card h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-theme);
  margin-bottom: 5px;
}

.flex-card p {
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
  content: '• ';
  color: var(--color-theme);
  left: 0;
}

.skill-list li::before {
  content: '✓ ';
}
</style>
