<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore'
import { ref } from 'vue'
import SingleSelect from '@/components/SingleSelect.vue'
import { uploadFile } from '@/api/resumeTemplate.ts'

const resume = useResumeStore()
const fileInput = ref<HTMLInputElement | null>(null)
const imgUrl = ref<string>(resume.personalInfo.avatar)
const file = ref<File | null>(null)

// 处理头像上传 (base64)
const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    imgUrl.value = URL.createObjectURL(file.value)
  }
};

const submit = async () => {
  try {
    if(imgUrl.value !== resume.personalInfo.avatar ) {
      if(!imgUrl.value) {
        resume.personalInfo.avatar = ''
        alert('清空成功！')
      } else if (file.value) {
        const res = await uploadFile(file.value)
        resume.personalInfo.avatar = 'https://cp-center-server.hub.feashow.cn' + res.data.url
        alert('上传成功!')
      }
    }
  } catch (err) {
    console.error('头像上传失败:', err)
  }

}

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
    <div class="col-span-2 gap-2 w-30 flex flex-col justify-center items-center">
      <div class="mb-1">
        <label class="text-sm text-gray-700 mb-1">头像上传：</label>
        <span class="border text-xs px-2 bg-gray-200 hover:bg-gray-300 cursor-pointer " @click="imgUrl=''">清空</span>
      </div>

      <div class="relative w-25 h-25 border border-gray-400 rounded-md flex items-center justify-center cursor-pointer"
        @click="fileInput?.click()">
        <!-- 预览头像 -->
        <img v-if="imgUrl" :src="imgUrl" alt="头像"
          class="w-full h-full object-cover rounded-md">
        <!-- 未上传时的加号 -->
        <span v-else class="text-gray-400 text-4xl font-bold">+</span>
        <!-- 隐藏的文件选择框 -->
        <input type="file" ref="fileInput" @change="handleAvatarChange" accept="image/*" class="hidden" />
      </div>
      <span class="text-white bg-green-400 w-20 h-7 text-sm flex justify-center items-center rounded cursor-pointer hover:bg-green-500">
        <span class="icon-[material-symbols--upload] text-lg"></span>
        <span @click="submit">上传</span>
      </span>
    </div>
  </div>
</template>
