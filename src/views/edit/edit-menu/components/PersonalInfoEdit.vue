<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore'
import { ref } from 'vue'
import SingleSelect from '@/components/SingleSelect.vue'

const resume = useResumeStore()
const fileInput = ref<HTMLInputElement | null>(null)

// 处理头像上传 (base64)
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      resume.personalInfo.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// 政治面貌和性别选项
const politicalOptions = [
  { value: '', label: '不填' },
  { label: '中共党员', value: '中共党员' },
  { label: '中共预备党员', value: '中共预备党员' },
  { label: '共青团员', value: '共青团员' },
  { label: '群众', value: '群众' },
  { label: '其他', value: '其他' }
];
const genderOptions = [
  { value: '', label: '不填' },
  { label: '男', value: '男' },
  { label: '女', value: '女' },
  { label: '其他', value: '其他' }
];
</script>

<template>
  <div class="grid grid-cols-2 gap-y-8 p-10 px-14 overflow-scroll overscroll-contain no-scrollbar">

    <div class="text-sm text-gray-700">
      <label class="mb-1">姓名：</label>
      <input type="text" v-model="resume.personalInfo.name"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>

    <div class="text-sm text-gray-700">
      <label class="mb-1">性别：</label>
      <SingleSelect :options="genderOptions" v-model="resume.personalInfo.gender" />
    </div>

    <div class="text-sm text-gray-700">
      <label class="mb-1">年龄：</label>
      <input type="text" v-model="resume.personalInfo.age"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
    </div>

    <div class="text-sm text-gray-700">
      <label class="mb-1">政治面貌：</label>
      <SingleSelect :options="politicalOptions" v-model="resume.personalInfo.politicalStatus" />
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


    <!-- 头像上传区域 -->
    <div class="col-span-2 flex flex-col">
      <div class="mb-2">
        <label class="text-sm text-gray-700 mb-1">头像上传：</label>
        <span class="border text-xs px-2 bg-gray-200 hover:bg-gray-300 cursor-pointer " @click="resume.personalInfo.avatar=''">清空</span>
      </div>

      <div class="relative w-24 h-24 border border-gray-400 rounded-md flex items-center justify-center cursor-pointer"
        @click="fileInput?.click()">
        <!-- 预览头像 -->
        <img v-if="resume.personalInfo.avatar" :src="resume.personalInfo.avatar" alt="头像"
          class="w-full h-full object-cover rounded-md">
        <!-- 未上传时的加号 -->
        <span v-else class="text-gray-400 text-4xl font-bold">+</span>
        <!-- 隐藏的文件选择框 -->
        <input type="file" ref="fileInput" @change="handleAvatarChange" accept="image/*" class="hidden" />
      </div>
    </div>
  </div>
</template>
