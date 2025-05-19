<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createTemplate, deleteTemplate, updateTemplate, getTemplateList, uploadFile } from '@/api/resumeTemplate.ts'
import SingleSelect from '@/components/SingleSelect.vue'
import type { Template } from '@/types/template'
import { useUserStore } from '@/stores/useUserStore.ts'
import { showMessage } from '@/utils/message'
import { showConfirm } from '@/utils/confirm.ts'

// 模板列表状态
const loading = ref(true)
const userStore = useUserStore()
const templateList = ref<Template[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const layoutOptions = [
  { label: '经典', value: 'classical' },
  { label: '双栏', value: 'doubly' },
]

const fontsOptions = [
  { value: "", label: "默认" },
  { value: "zql", label: "ZQL" },
  { value: "SimSun", label: "宋体" },
  { value: "KaiTi", label: "楷体" },
  { value: "ZCOOLKuaiLe-Regular", label: "ZCOOLKuaiLe-Regular" },
  { value: "ZhiMangXing-Regular", label: "ZhiMangXing-Regular" },
  { value: "ZCOOL QingKe HuangYou", label: "ZCOOL QingKe HuangYou" },
];

// 对话框控制
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

// 图片上传逻辑
const imgUrl = ref('')
const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null) // input 的引用

// 点击图片 -> 触发 input 点击
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 选中文件后的处理逻辑
const onSelectFile = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    file.value = files[0]
    imgUrl.value = URL.createObjectURL(file.value) // 预览图
  }
}

// 表单数据
const formData = ref({
  resumeTemplateId: '',
  resumeTemplateName: '',
  resumeTemplateContent: {
    description: '',
    folderPath: '',
    thumbnail: '',
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
    loading.value = false
  } catch (error) {
    loading.value = false
    showMessage({
    type: 'error',
      message: '获取模板列表失败'
    })
  }
}

// 新增模板
const handleAdd = () => {
  isEdit.value = false
  dialogTitle.value = '新增模板'
  dialogVisible.value = true
  imgUrl.value = ''
  file.value = null
  formData.value = {
    resumeTemplateId: '',
    resumeTemplateName: '',
    resumeTemplateContent: {
      description: '',
      folderPath: '',
      thumbnail: '',
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
  }
}

// 编辑模板
const handleEdit = (row: any) => {
  isEdit.value = true
  dialogTitle.value = '编辑模板'
  dialogVisible.value = true
  formData.value = JSON.parse(JSON.stringify(row))
  imgUrl.value = formData.value.resumeTemplateContent.thumbnail
}

// 删除模板
const handleDelete = async (id: string) => {
    try {
      loading.value = true
      await deleteTemplate(id)
      loading.value = false
      showMessage({
      type: 'success',
        message: '删除成功'
      })
      fetchTemplateList()
    } catch (error) {
      loading.value = false
      showMessage({
        type: 'error',
        message: '删除失败'
      })
    }

}

async function onDelete (id: string) {
  try {
    await showConfirm({ message: '确定要删除吗？' })
    await handleDelete(id)
  } catch {
    console.log('用户取消了操作')
  }
}

// 提交表单
const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      if(imgUrl.value !== formData.value.resumeTemplateContent.thumbnail) {
        if(!imgUrl.value) {
          formData.value.resumeTemplateContent.thumbnail = ''
        } else if (file.value) {
          let res = await uploadFile(file.value)
          formData.value.resumeTemplateContent.thumbnail = 'https://cp-center-server.hub.feashow.cn' + res.data.url
        }
      }
      await updateTemplate(
        formData.value.resumeTemplateId,
        formData.value.resumeTemplateName,
        formData.value.resumeTemplateContent
      )
      loading.value = false
      showMessage({
        type:'success',
        message: '更新成功'
      })
    } else {
      await createTemplate(
        formData.value.resumeTemplateName,
        formData.value.resumeTemplateContent
      )
      loading.value = false
      showMessage({
      type: 'success',
        message: '创建成功'
      })
    }
    dialogVisible.value = false
    fetchTemplateList()
  } catch (error) {
    loading.value = false
    showMessage({
      type: 'error',
      message: '操作失败'
    })
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
  <div v-if="userStore.userId !== '10'" class="text-2xl flex justify-center items-center">
    <h1 class="text-2xl text-red-500">您不是管理员，无权管理！</h1>
  </div>
  <div v-else class="p-6 bg-white rounded-lg min-h-[500px]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">简历模板管理</h2>
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        @click="handleAdd"
      >
        新增模板
      </button>
    </div>

    <LoadingSpinner v-if="loading"></LoadingSpinner>

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
            @click="onDelete(item.resumeTemplateId)"
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

              <div class="mt-5 flex justify-center items-center space-x-30">
                <div>
                  <label class="mb-2 mr-1">缩略图</label>
                  <span class="border text-xs px-2 bg-gray-200 hover:bg-gray-300 cursor-pointer " @click="imgUrl=''">清空</span>
                  <div @click="triggerFileInput" class="mt-2 w-30 h-36 border border-gray-400 flex justify-center items-center">
                    <img
                      v-if="imgUrl"
                      :src="imgUrl"
                      alt="预览图"
                      class="w-full h-full object-cover object-top"
                    />

                    <span v-else class="text-gray-400 text-4xl font-bold">+</span>

                    <input
                      ref="fileInput"
                      type="file"
                      accept="image/*"
                      @change="onSelectFile"
                      style="display: none"
                    />
                  </div>
                </div>

                <!-- Setting 配置项 -->
                <div class="mt-10">
                  <div class="grid grid-cols-3 gap-y-5 gap-x-3">
                    <div class="flex items-center">
                      <label class="mr-1">主题色</label>
                      <input
                        v-model="formData.resumeTemplateContent.setting.themeColor"
                        type="color"
                        class="rounded-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div class="flex items-center">
                      <label class="mr-1">标题色</label>
                      <input
                        v-model="formData.resumeTemplateContent.setting.fontColor"
                        type="color"
                        class="rounded-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label class="mr-1">字体</label>
                      <SingleSelect :options="fontsOptions" v-model="formData.resumeTemplateContent.setting.fontFamily" />
                    </div>

                    <div>
                      <label class="mr-1">行间距</label>
                      <input
                        v-model="formData.resumeTemplateContent.setting.lineSpacing"
                        type="number"
                        min="0"
                        max="50"
                        class="border w-25 border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                        placeholder="21"
                      />
                    </div>

                    <div>
                      <label class="mr-1">块间距</label>
                      <input
                        v-model="formData.resumeTemplateContent.setting.blockSpacing"
                        type="number"
                        min="0"
                        max="50"
                        class="border w-25 border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                        placeholder="21"
                      />
                    </div>

                    <div>
                      <label class="mr-1">页边距</label>
                      <input
                        v-model="formData.resumeTemplateContent.setting.pageMargin"
                        type="number"
                        min="0"
                        max="50"
                        class="border w-25 border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
                        placeholder="21"
                      />
                    </div>
                  </div>
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
