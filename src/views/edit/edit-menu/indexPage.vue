<script setup lang="ts">
import { useMenuStore } from "@/stores/useMenuStore";
import { computed, ref } from "vue";
import { useResumeStore } from '@/stores/useResumeStore';

const resume = useResumeStore();
const menu = useMenuStore();
// 添加教育经历
const addEducation = () => {
  resume.addEducation({
    school: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: ''
  });
};

//标题编辑逻辑
const isEditing = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const enableEditing = () => {
  isEditing.value = true;
  setTimeout(() => inputRef.value?.focus(), 0);
};
const disableEditing = () => {
  isEditing.value = false;
};

// 计算属性获取 label
const selectedLabel = computed({
  get: () => resume.sections.find(item => item.key === menu.activeMenu)?.label || "",
  set: (newLabel: string) => {
    const section = resume.sections.find(item => item.key === menu.activeMenu);
    if (section) {
      section.label = newLabel;
    }
  },
});
</script>

<template>

  <Teleport to="body">
    <div v-if="menu.activeMenu" class="fixed inset-0 bg-black opacity-25"></div>
    <transition name="fade-slide">
      <div v-if="menu.activeMenu" @click.self="menu.closeMenu"
        class="fixed inset-0  bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-240 h-150 relative">

          <!-- 基本信息 -->
          <div v-if="menu.activeMenu === 'personalInfo'">

            <div class="text-xl px-8 py-5 font-medium border-b border-gray-300">
              <input v-if="isEditing" ref="inputRef" v-model="selectedLabel" @blur="disableEditing"
                @keyup.enter="disableEditing" class="focus:outline-none" />
              <div class="flex space-x-2 items-center" v-else>
                <span>{{ selectedLabel }}</span>
                <i @click="enableEditing" class="icon-[iconamoon--edit-thin] cursor-pointer  hover:text-blue-700"></i>
              </div>

            </div>

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

          </div>

          <!-- 教育经历 -->
          <div v-if="menu.activeMenu === 'education'" class="grid h-full border grid-rows-[auto_1fr_auto]">
            <h3 class="text-xl px-8 py-5 border-b-1 font-medium border-gray-300">{{ selectedLabel }}</h3>

            <div class="overflow-scroll overscroll-contain no-scrollbar ">
              <div v-for="(edu, index) in resume.education" :key="edu.id"
                class="p-10 px-14 border-b-1 border-gray-300 relative">
                <button v-if="index !== 0" @click="resume.deleteEducation(edu.id)"
                  class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
                <div class="grid grid-cols-2 gap-8">
                  <div class="text-sm text-gray-700">
                    <label class="mb-1">学校名称：</label>
                    <input type="text" v-model="edu.school"
                      class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
                  </div>
                  <div class="text-sm text-gray-700">
                    <label class="mb-1">学位：</label>
                    <input type="text" v-model="edu.degree"
                      class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
                  </div>
                  <div class="text-sm text-gray-700">
                    <label class="mb-1">专业：</label>
                    <input type="text" v-model="edu.major"
                      class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
                  </div>
                  <div class="text-sm text-gray-700">
                    <label class="mb-1">开始日期：</label>
                    <input type="date" v-model="edu.startDate"
                      class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
                  </div>
                  <div class="text-sm text-gray-700">
                    <label class="mb-1">结束日期：</label>
                    <input type="date" v-model="edu.endDate"
                      class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex border-t-1 border-gray-300 bottom-0 justify-between px-10 py-5">
              <button @click="addEducation" class="border p-2 rounded-sm text-xs hover:bg-gray-100">+ 添加教育背景</button>
              <button class="bg-blue-600 text-white hover:bg-blue-700 p-2 px-6 rounded-sm text-xs"
                @click.self="menu.closeMenu">保存</button>
            </div>

          </div>

          <div v-if="menu.activeMenu === 'workExperience'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === 'projects'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === 'honors'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === '获奖经历'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === '校园经历'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === 'skills'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === 'summary'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === '兴趣爱好'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <div v-if="menu.activeMenu === '自定义'">
            <h3 class="text-xl mb-4 font-medium">{{ selectedLabel }}</h3>
          </div>

          <button @click="menu.closeMenu" class="absolute top-2 right-2 text-gray-600">✖</button>
        </div>
      </div>
    </transition>
  </Teleport>

</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  scrollbar-width: none;
  /* Firefox */
}

/* 进入动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 初始状态 */
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 结束状态 */
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
