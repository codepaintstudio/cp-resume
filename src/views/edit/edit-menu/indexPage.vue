<script setup lang="ts">
import { useMenuStore } from "@/stores/useMenuStore";
import { computed } from "vue";
import { useResumeStore } from '@/stores/useResumeStore';
// import { Menu } from "lucide-vue-next";

const resume = useResumeStore();

// 定义 menuContent 的键集合，并提取为类型
const menuKeys = [
  "基本信息",
  "教育经历",
  "工作经验",
  "项目经验",
  "荣誉奖项",
  "获奖经历",
  "校园经历",
  "技能特长",
  "自我评价",
  "兴趣爱好",
  "自定义",
] as const;

type MenuKey = typeof menuKeys[number];

// 获取菜单状态
const menuStore = useMenuStore();

// 确保 activeMenu 类型为 MenuKey | undefined
const activeMenu = computed(() => {
  return menuKeys.includes(menuStore.activeMenu as MenuKey) ? (menuStore.activeMenu as MenuKey) : undefined;
});

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
</script>

<template>

  <Teleport to="body">
    <div v-if="activeMenu" class="fixed inset-0 bg-black opacity-25"></div>
    <transition name="fade-slide">
      <div v-if="activeMenu" @click.self="menuStore.closeMenu"
        class="fixed inset-0  bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-240 h-150 relative">

          <!-- 基本信息 -->
          <div v-if="activeMenu === '基本信息'">
            <h3 class="text-xl px-8 py-5 font-medium border-b-1 border-gray-300">{{ menuStore.activeMenu }}</h3>
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
          <div v-if="activeMenu === '教育经历'" class="grid h-full border grid-rows-[auto_1fr_auto]">
            <h3 class="text-xl px-8 py-5 border-b-1 font-medium border-gray-300">{{ menuStore.activeMenu }}</h3>

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
                @click.self="menuStore.closeMenu">保存</button>
            </div>

          </div>

          <div v-if="activeMenu === '工作经验'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '项目经验'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '荣誉奖项'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '获奖经历'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '校园经历'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '技能特长'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '自我评价'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '兴趣爱好'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <div v-if="activeMenu === '自定义'">
            <h3 class="text-xl mb-4 font-medium">{{ menuStore.activeMenu }}</h3>
          </div>

          <button @click="menuStore.closeMenu" class="absolute top-2 right-2 text-gray-600">✖</button>
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
