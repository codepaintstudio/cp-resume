<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createTemplate, deleteTemplate, updateTemplate, getTemplateList } from '@/api/resumeTemplate.ts'
import SingleSelect from '@/components/SingleSelect.vue'
import * as constants from 'node:constants'

// 模板列表状态
const templateList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const layoutOptions = [
  { label: '经典', value: 'classical' },
  { label: '双栏', value: 'doubly' },
]

// 对话框控制
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

// 图片上传逻辑
const imgUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null) // input 的引用

// 点击图片 -> 触发 input 点击
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 选中文件后的处理逻辑
const onSelectFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    const file = files[0]
    imgUrl.value = URL.createObjectURL(file) // 预览图
    formData.value.resumeTemplateContent.thumbnail = file
    console.log("上传图片",formData.value.resumeTemplateContent.thumbnail)
  }
}

// 表单数据
const formData = ref({
  resumeTemplateId: '',
  resumeTemplateName: '',
  resumeTemplateContent: {
    description: '',
    folderPath: '',
    thumbnail: constants,
    layout: 'classical',
    style: '简约',
    industry: '互联网',
    color: '蓝色',
    setting: {
      themeColor: '#2b7fff',
      fontColor: '#ffffff',
      fontFamily: 'zql',
      lineSpacing: '21',
      blockSpacing: '21',
      pageMargin: '21'
    }
  }
})

// 获取列表数据
const fetchTemplateList = async () => {
  try {
    const res = await getTemplateList(currentPage.value, pageSize.value)
    templateList.value = res.data.items
    total.value = res.data.total
  } catch (error) {
    alert('获取模板列表失败')
  }
}

// 新增模板
const handleAdd = () => {
  isEdit.value = false
  dialogTitle.value = '新增模板'
  dialogVisible.value = true
  formData.value = {
    id: '',
    resumeTemplateName: '',
    resumeTemplateContent: { /* 默认值 */ }
  }
}

// 编辑模板
const handleEdit = (row: any) => {
  isEdit.value = true
  dialogTitle.value = '编辑模板'
  dialogVisible.value = true
  formData.value = JSON.parse(JSON.stringify(row))
}

// 删除模板
const handleDelete = async (id: string) => {
  if (confirm('确认删除该模板吗？')) {
    try {
      await deleteTemplate(id)
      alert('删除成功')
      fetchTemplateList()
    } catch (error) {
      alert('删除失败')
    }
  }
}

// 提交表单
const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await updateTemplate(
        formData.value.resumeTemplateId,
        formData.value.resumeTemplateName,
        formData.value.resumeTemplateContent
      )
      alert('更新成功')
    } else {
      await createTemplate(
        formData.value.resumeTemplateName,
        formData.value.resumeTemplateContent
      )
      alert('创建成功')
    }
    dialogVisible.value = false
    fetchTemplateList()
  } catch (error) {
    alert(isEdit.value ? '更新失败' : '创建失败')
  }
}

onMounted(() => {
  fetchTemplateList()
})

const closeMenu = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg min-h-[500px]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">简历模板管理</h2>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleAdd"
      >
        新增模板
      </button>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="p-3 text-left border border-gray-300">模板名称</th>
        <th class="p-3 text-left border border-gray-300">布局</th>
        <th class="p-3 text-left border border-gray-300">风格</th>
        <th class="p-3 text-left border border-gray-300">行业</th>
        <th class="p-3 text-left border border-gray-300">颜色</th>
        <th class="p-3 text-left border border-gray-300">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in templateList" :key="item.resumeTemplateId" class="hover:bg-gray-50">
        <td class="p-3 border border-gray-300">{{ item.resumeTemplateName }}</td>
        <td class="p-3 border border-gray-300">{{ item.resumeTemplateContent.layout }}</td>
        <td class="p-3 border border-gray-300">{{ item.resumeTemplateContent.style }}</td>
        <td class="p-3 border border-gray-300">{{ item.resumeTemplateContent.industry }}</td>
        <td class="p-3 border border-gray-300">{{ item.resumeTemplateContent.color }}</td>
        <td class="p-3 border border-gray-300">
          <button
            class="text-blue-500 hover:text-blue-700 mr-3"
            @click="handleEdit(item)"
          >
            编辑
          </button>
          <button
            class="text-red-500 hover:text-red-700"
            @click="handleDelete(item.resumeTemplateId)"
          >
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 模态框 -->
    <div @click="closeMenu"  v-if="dialogVisible" class="fixed z-14 inset-0 bg-black opacity-25"
         id="black_Mask"></div>
    <transition name="fade-slide">
      <div v-if="dialogVisible"
           class="fixed z-20 w-280 h-170 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white shadow-[0px_0px_15px_-5px] p-3 rounded-sm">

          <form class="p-6 grid h-full grid-rows-[auto_1fr_auto]" @submit.prevent="handleSubmit">
            <h3 class="text-lg font-semibold mb-4">{{ dialogTitle }}</h3>

            <div>
              <div class="flex space-x-30">
                <div>
                  <label class="mb-2 mr-1">模板名称</label>
                  <input
                    v-model="formData.resumeTemplateName"
                    class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                  />
                </div>
                <div>
                  <label class="mb-2 mr-1">路径</label>
                  <input
                    v-model="formData.resumeTemplateContent.folderPath"
                    class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                  />
                </div>
                <div>
                  <label class="mr-1">布局</label>
                  <SingleSelect :options="layoutOptions" v-model="formData.resumeTemplateContent.layout" />
                </div>
              </div>

              <div class="flex space-x-30 mt-10">
                <div>
                  <label class="mb-2 mr-1">风格</label>
                  <input
                    v-model="formData.resumeTemplateContent.style"
                    class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                  />
                </div>
                <div>
                  <label class="mb-2 mr-1">行业</label>
                  <input
                    v-model="formData.resumeTemplateContent.industry"
                    class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                  />
                </div>
                <div>
                  <label class="mb-2 mr-1">颜色</label>
                  <input
                    v-model="formData.resumeTemplateContent.color"
                    class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                  />
                </div>

              </div>

              <div class="mt-5">
                <label class="mb-2 mr-1">缩略图</label>
                <div class="w-30 h-35">
                  <img
                    :src="formData.resumeTemplateContent.thumbnail"
                    @click="triggerFileInput"
                    class="w-full h-full object-cover object-top"
                  />

                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="onSelectFile"
                    style="display: none"
                  />
                </div>

              </div>

              <div class="mt-10">
                <label class="block mb-2">描述</label>
                <textarea
                  v-model="formData.resumeTemplateContent.description"
                  class="w-full min-h-20 max-h-30 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end gap-10">
              <button
                type="button"
                class="px-4 py-2 border rounded hover:bg-gray-100"
                @click="closeMenu"
              >
                取消
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                确定
              </button>
            </div>
          </form>
      </div>
    </transition>

  </div>
</template>
