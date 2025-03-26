<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div v-for="(skill, index) in resume.skills" :key="skill.id" class="p-10 px-14 border-b border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deleteSkill(skill.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
      <div class="text-sm text-gray-700">
        <label class="mb-1">技能名称：</label>
        <br />
        <input type="text" v-model="skill.skillName"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6" />
      </div>
    </div>
  </div>
</template>
