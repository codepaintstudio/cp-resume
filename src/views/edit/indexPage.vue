<script setup lang="ts">
import CvSetting from "./setting/indexPage.vue";
import CvPreview from "./preview/indexPage.vue";
import CvEdit from "./editor/indexPage.vue";
import CvHeader from "./header/indexPage.vue";
import EditMenu from "./edit-menu/indexPage.vue";

</script>

<template>
  <div class=" bg-white h-screen w-full">
    <CvHeader></CvHeader>
    <div class="mt-24 flex justify-center space-x-13 min-h-screen pb-10 ">
      <!-- 左侧功能栏 -->
      <div>
        <CvSetting class="shadow-[0px_0px_15px_-5px] sticky top-20 z-11" />
      </div>


      <EditMenu />
      <!-- 中间简历预览 -->
      <div class="flex justify-center">
        <CvPreview class="shadow-[0px_0px_15px_-5px] rounded-lg" />
      </div>

      <!-- 右侧设置栏 -->
      <div>
        <CvEdit class="shadow-[0px_0px_15px_-5px] sticky top-20 z-10" />
      </div>

    </div>
  </div>

</template>
