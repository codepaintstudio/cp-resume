<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore'
const resume = useResumeStore()
</script>
<template>
  <div class="grid grid-cols-2 gap-y-8 p-10 px-14">
    <div class="text-sm text-gray-700">
      <label class="mb-1">姓名：</label>
      <input type="text" v-model="resume.personalInfo.name"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">性别：</label>
      <input type="text" v-model="resume.personalInfo.gender"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">年龄：</label>
      <input type="text" v-model="resume.personalInfo.age"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">政治面貌：</label>
      <input type="text" v-model="resume.personalInfo.politicalStatus"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">联系电话：</label>
      <input type="text" v-model="resume.personalInfo.phone"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">电子邮箱：</label>
      <input type="email" v-model="resume.personalInfo.email"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">所在大学：</label>
      <input type="text" v-model="resume.personalInfo.university"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">专业：</label>
      <input type="text" v-model="resume.personalInfo.major"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">个人网站：</label>
      <input type="text" v-model="resume.personalInfo.website"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="text-sm text-gray-700">
      <label class="mb-1">头像链接：</label>
      <input type="text" v-model="resume.personalInfo.avatar"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
    <div class="col-span-2 text-sm text-gray-700">
      <label class="mb-1">申请职位：</label>
      <input type=" text" v-model="resume.personalInfo.applicationPosition"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>
  </div>
</template>
<style scoped></style>
