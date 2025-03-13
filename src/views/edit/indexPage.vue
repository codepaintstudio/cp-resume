<script setup lang="ts">
import CvSetting from "./components/CvSetting.vue";
import CvPreview from "./components/CvPreview.vue";
import CvSettings from "./components/CvEditor.vue";
import CvHeader from "./components/CvHeader.vue";
import EditMenu from "./components/EditMenu.vue";
</script>

<template>
  <div class=" bg-white h-screen w-full">
    <CvHeader></CvHeader>
    <div class="mt-24 flex justify-center space-x-13 min-h-screen pb-10">
      <!-- 左侧功能栏 -->
      <div>
        <CvSetting class="shadow-[0px_0px_15px_-5px] sticky top-20" />
      </div>


      <EditMenu />
      <!-- 中间简历预览 -->
      <div class="flex justify-center">
        <CvPreview class="shadow-[0px_0px_15px_-5px] p-4 rounded-lg" />
      </div>

      <!-- 右侧设置栏 -->
      <div>
        <CvSettings class="shadow-[0px_0px_15px_-5px] sticky top-20" />
      </div>

    </div>
  </div>

</template>
