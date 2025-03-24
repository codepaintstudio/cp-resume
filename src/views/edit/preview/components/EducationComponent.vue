<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';

const resume = useResumeStore();
</script>
<template>
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
</template>
<style scoped>
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
