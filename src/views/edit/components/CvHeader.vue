<template>
  <header class="fixed z-20 top-0 flex w-full justify-between items-center px-10 bg-white shadow-md h-18">

    <div class="flex items-center space-x-2">

      <!-- Logo -->
      <RouterLink to="/"><img src="@/assets/img/edit/logo.png" alt="cp-resume" class="h-16"></RouterLink>

      <RouterLink to="/"><span class="ml-2  text-black text-xl font-bold">CP-ResumeTools</span></RouterLink>


      <!--撤销与云端 -->
      <div class="ml-18 flex items-center space-x-6">
        <button class="text-gray-600 hover:text-blue-500 hover:scale-107 active:scale-100">
          <img src="@/assets/img/edit/header_undo.svg" class="w-4" alt="">
        </button>
        <button class="text-gray-600 hover:text-blue-500 hover:scale-107 active:scale-100">
          <img src="@/assets/img/edit/header_redo.svg" class="w-4" alt="">
        </button>
        <button class="text-gray-600 hover:text-blue-500 ml-2 hover:scale-105 active:scale-100">
          <img src="@/assets/img/edit/header_cloud.svg" class="w-6" alt="">
        </button>
      </div>

    </div>



    <!-- 右侧按钮 -->
    <div class="flex items-center space-x-8 mr-10">
      <button class="h-[35px] flex items-center space-x-3 px-4 py-2 border border-black rounded hover:bg-gray-100">
        <img src="@/assets/img/edit/header_share.svg" class="h-3/4" alt="">
        <span>分享</span>
      </button>
      <button class="h-[35px] flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        <img src="@/assets/img/edit/header_download.svg" class="h-3/4" alt="">
        <span>导出</span>
      </button>
    </div>
  </header>
</template>
