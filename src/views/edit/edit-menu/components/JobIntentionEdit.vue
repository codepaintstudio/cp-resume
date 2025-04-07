<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
import SingleSelect from '@/components/SingleSelect.vue'
const resume = useResumeStore();

const salaryOptions = [
  { value: '', label: '不填' },
  { value: '面议', label: '面议' },
  { value: '1k-2k', label: '1k-2k' },
  { value: '2k-4k', label: '2k-4k' },
  { value: '4k-6k', label: '4k-6k' },
  { value: '6k-8k', label: '6k-8k' },
  { value: '8k-10k', label: '8k-10k' },
  { value: '1k-2k', label: '1k-2k' },
  { value: '2k-4k', label: '2k-4k' },
  { value: '4k-6k', label: '4k-6k' },
  { value: '6k-8k', label: '6k-8k' },
  { value: '8k-10k', label: '8k-10k' },
  { value: '10k-12k', label: '10k-12k' },
  { value: '12k-15k', label: '12k-15k' },
  { value: '15k-20k', label: '15k-20k' },
  { value: '20k-30k', label: '20k-30k' },
  { value: '30k-50k', label: '30k-50k' },
]
const statusOptions = [
  { value: '', label: '不填' },
  { value: '面议', label: '面议' },
  { value: '随时到岗', label: '随时到岗' },
  { value: '一周内到岗', label: '一周内到岗' },
  { value: '两周内到岗', label: '两周内到岗' },
  { value: '一个月内到岗', label: '一个月内到岗' },
  { value: '两个月内到岗', label: '两个月内到岗' },
]
const typeOptions = [
  { value: '', label: '不填' },
  { value: '全职', label: '全职' },
  { value: '兼职', label: '兼职' },
  { value: '实习', label: '实习' },
  { value: '见习', label: '见习' }
]
</script>

<template>
  <div
    class="grid grid-cols-2 text-sm text-gray-700 gap-y-8 p-10 px-14 overflow-scroll overscroll-contain no-scrollbar">
    <!-- 求职意向模块 -->

    <div>
      <label class="mb-1">意向岗位：</label>
      <input type="text" v-model="resume.jobIntention.position"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 " />
    </div>
    <div>
      <label class="mb-1">意向城市：</label>
      <input type="text" v-model="resume.jobIntention.city"
        class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 " />
    </div>

    <div>
      <label class="mb-1">期待薪资：</label>
      <SingleSelect v-model="resume.jobIntention.salary" :options="salaryOptions" />
    </div>

    <div>
      <label class="mb-1">求职状态：</label>
      <SingleSelect v-model="resume.jobIntention.status" :options="statusOptions" />
    </div>
    <div>
      <label class="mb-1">求职类型：</label>
      <SingleSelect v-model="resume.jobIntention.type" :options="typeOptions" />
    </div>


  </div>
</template>
