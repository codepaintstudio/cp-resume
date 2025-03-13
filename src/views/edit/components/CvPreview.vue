<template>
  <div class="resume-container p-6 bg-white rounded-lg">
    <!-- 个人信息 -->
    <div class="personal-info flex justify-between items-center">
      <div class="personal-details">
        <div class="detail-row flex items-center space-x-4">
          <div class="detail-item name text-2xl font-bold">
            <span class="value">{{ resume.personalInfo.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label font-semibold">性别：</span>
            <span class="value">{{ resume.personalInfo.gender }}</span>
          </div>
          <div class="detail-item">
            <span class="label font-semibold">年龄：</span>
            <span class="value">{{ resume.personalInfo.age }}</span>
          </div>
        </div>
        <div class="detail-row mt-2">
          <div class="detail-item">
            <span class="label font-semibold">政治面貌：</span>
            <span class="value">{{ resume.personalInfo.politicalStatus }}</span>
          </div>
        </div>
        <div class="detail-row mt-2 flex space-x-4">
          <div class="detail-item">
            <span class="label font-semibold">电话：</span>
            <span class="value">{{ resume.personalInfo.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label font-semibold">邮箱：</span>
            <span class="value">{{ resume.personalInfo.email }}</span>
          </div>
        </div>
        <div class="detail-row mt-2 flex space-x-4">
          <div class="detail-item">
            <span class="label font-semibold">学校：</span>
            <span class="value">{{ resume.personalInfo.university }}</span>
          </div>
          <div class="detail-item">
            <span class="label font-semibold">专业：</span>
            <span class="value">{{ resume.personalInfo.major }}</span>
          </div>
        </div>
        <div class="detail-row mt-2">
          <div class="detail-item">
            <span class="label font-semibold">网站：</span>
            <a :href="resume.personalInfo.website" target="_blank" class="value text-blue-500 hover:underline">
              {{ resume.personalInfo.website }}
            </a>
          </div>
        </div>
      </div>
      <div class="profile-image">
        <img :src="resume.personalInfo.avatar" alt="个人照片" class="w-24 h-24 rounded-full object-cover">
      </div>
    </div>

    <!-- 教育经历 -->
    <div class="section education-section mt-6" v-if="resume.education.length">
      <div class="section-title font-bold text-xl mb-2">教育经历</div>
      <div class="section-content">
        <div class="item mb-2" v-for="edu in resume.education" :key="edu.id">
          <p class="school">
            <span>{{ edu.school }} ({{ edu.degree }})</span>
            <span class="ml-2">{{ edu.major }}</span>
            <strong v-if="edu.startDate && edu.endDate" class="ml-2">
              {{ edu.startDate }} 至 {{ edu.endDate }}
            </strong>
          </p>
        </div>
      </div>
    </div>

    <!-- 工作/实习经历 -->
    <div class="section experience-section mt-6" v-if="resume.workExperience.length">
      <div class="section-title font-bold text-xl mb-2">工作/实习经历</div>
      <div class="section-content">
        <div class="item mb-2" v-for="work in resume.workExperience" :key="work.id">
          <div class="subtitle font-semibold">
            <span>{{ work.company }}</span>
            <span class="mx-2">{{ work.position }}</span>
            <span>{{ work.startDate }} 至 {{ work.endDate }}</span>
          </div>
          <ul class="list-disc list-inside mt-1">
            <li v-for="(desc, index) in work.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 技能特长 -->
    <div class="section skills-section mt-6" v-if="resume.skills.length">
      <div class="section-title font-bold text-xl mb-2">技能特长</div>
      <ul class="skills-list list-disc list-inside">
        <li v-for="skill in resume.skills" :key="skill.id">{{ skill.skillName }}</li>
      </ul>
    </div>

    <!-- 项目经验 -->
    <div class="section projects-section mt-6" v-if="resume.projects.length">
      <div class="section-title font-bold text-xl mb-2">项目经验</div>
      <div class="section-content">
        <div class="item mb-2" v-for="project in resume.projects" :key="project.id">
          <div class="subtitle font-semibold">
            <span>{{ project.projectName }}</span>
            <span class="mx-2">{{ project.role }}</span>
            <span>{{ project.startDate }}
              <span v-if="project.startDate && project.endDate"> 至 </span>
              {{ project.endDate }}</span>
          </div>
          <hr class="my-1">
          <p class="project-introduction">{{ project.briefIntroduction }}</p>
          <ul class="list-disc list-inside mt-1">
            <li v-for="(desc, index) in project.description.split('\n')" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 自我评价 -->
    <div class="section self-evaluation-section mt-6" v-if="resume.summary">
      <div class="section-title font-bold text-xl mb-2">自我评价</div>
      <p class="self-evaluation">{{ resume.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import { useResumeStore } from '@/stores/useResumeStore';

const resume = useResumeStore();
// const resume = ref({
//   personalInfo: {
//     name: '张三',
//     gender: '男',
//     age: 25,
//     politicalStatus: '中共党员',
//     phone: '13800000000',
//     email: 'zs@qq.com',
//     university: '锦城大学',
//     major: '计算机科学与技术',
//     website: 'https://zhangsan.com',
//     avatar: 'https://via.placeholder.com/150'
//   },
//   honors: [
//     { id: 1, honorName: '国家奖学金' },
//     { id: 2, honorName: '优秀学生干部' }
//   ],
//   education: [
//     { id: 1, school: '锦城大学', degree: '超本科', major: '计算机科学与技术', startDate: '2018-09', endDate: '2022-06' },
//     { id: 2, school: '锦城大学大学院', degree: '超硕士', major: '计算机科学与技术', startDate: '2018-09', endDate: '2022-06' }
//   ],
//   skills: [
//     { id: 1, skillName: 'JavaScript' },
//     { id: 2, skillName: 'Vue.js' },
//     { id: 3, skillName: 'Node.js' }
//   ],
//   workExperience: [
//     {
//       id: 1,
//       company: '某互联网公司',
//       position: '前端工程师',
//       startDate: '2022-07',
//       endDate: '2024-02',
//       description: '负责前端开发工作\n优化前端性能，提高用户体验'
//     }
//   ],
//   projects: [
//     {
//       id: 1,
//       projectName: '个人博客系统',
//       role: '开发者',
//       startDate: '2023-01',
//       endDate: '2023-06',
//       briefIntroduction: '基于 Vue.js 和 Node.js 搭建的博客系统基于 Vue.js 和 Node.js 搭建的博客系统基于 Vue.js 和 Node.js 搭建的博客系统基于 Vue.js 和 Node.js 搭建的博客系统基于 Vue.js 和 Node.js 搭建的博客系统',
//       description: '实现文章管理、评论功能\n支持 Markdown 语法'
//     }
//   ],
//   summary: '热爱编程，具备良好的前端开发能力，熟悉 Vue.js 和 Node.js，具有团队合作精神。'
// });
</script>

<style scoped>
body {
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: 'zql';
}

p {
  margin-top: 0;
  margin-block-end: 0.3em;
}

.resume-container {
  max-width: 960px;
  padding: 20px 30px 3px 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}

.personal-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
  gap: 20px;
}

.personal-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 4px 0px;
  flex: 1 1 60%;
  min-width: 50px;
}

.detail-row {
  display: contents;
  /* Allow grid items to be placed by grid */
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item.full-width {
  grid-column: span 2;
  /* Span across two columns for full-width items */
}

.label {
  min-width: 50px;
  color: #333;
}

.value {
  flex: 1;
  color: #555;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.value a {
  color: #1890ff;
  text-decoration: none;
}

.value a:hover {
  text-decoration: underline;
}

.profile-image {
  /* flex: 0 0 150px;
  margin-top: 10px; */
  text-align: center;
}

.profile-image img {
  width: 60px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .personal-info {
    flex-direction: column;
    align-items: center;
  }

  .personal-details {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .profile-image {
    margin-top: 20px;
    width: 120px;
    height: 120px;
  }

  .profile-image img {
    border-radius: 50%;
  }
}

.section {
  margin-bottom: 10px;
}

.section-title {
  width: 100%;
  color: #4084b2;
  background-color: #478cc8;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
  border-left: 5px solid #4084b2;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.section-content .item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.section-content .item .subtitle {
  font-weight: bold;
  margin-bottom: 5px;
  word-break: break-all;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-introduction {
  font-weight: lighter;
  text-indent: 2em;
}

.section-content .item ul {
  margin: 0;
  padding-left: 20px;
}

.section-content .item ul li {
  margin-bottom: 5px;
  line-height: 1.5;
  word-break: break-word;
}

.skills-list {
  list-style-type: disc;
  padding-left: 20px;
}

.skills-list li {
  margin-bottom: 5px;
}

.self-evaluation {
  font-style: italic;
  word-break: break-word;
  text-indent: 2em;
}

.school {
  display: flex;
  justify-content: space-between;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .personal-info {
    flex-direction: column;
    align-items: center;
  }

  .personal-details {
    flex: 1 1 100%;
    align-items: center;
  }

  .detail-row {
    justify-content: center;
  }

  .detail-item {
    margin-right: 10px;
    min-width: 120px;
  }

  .profile-image {
    flex: 1 1 100%;
    max-width: 100px;
  }
}

/* 颜色相关的css放入style */
.section-title {
  width: 100%;
  color: var(--color-darker);
  background-color: #5782bc;
  font-size: 18px;
  padding: 10px;
  font-weight: bold;
  border-left: 5px solid var(--color-base);
  margin-bottom: 10px;
  box-sizing: border-box;
}
</style>
