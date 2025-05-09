<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'

const userStore = useUserStore()
const fileInput = ref<HTMLInputElement | null>(null)
const currentUser = ref<any>({
  userName: '',
  userPhoneNumber: '',
  userEmail: '',
  avatar: ''
})
const isUpdating = ref(false)

onMounted(async () => {
  await userStore.getUserInfo(userStore.userId);
  currentUser.value = {
    ...userStore.userInfo,
    avatar: getFullAvatarUrl(userStore.userInfo.avatar)
  };
  console.log('完整头像URL:', currentUser.value.avatar);

  // 测试图片是否可访问
  if (currentUser.value.avatar) {
    fetch(currentUser.value.avatar)
      .then(res => console.log('图片访问状态:', res.status))
      .catch(err => console.error('图片访问错误:', err));
  }
});

const updateInfo = async () => {
  try {
    isUpdating.value = true
    await userStore.updateUserInfo(userStore.userId, {
      userName: currentUser.value.userName,
      userPhoneNumber: currentUser.value.userPhoneNumber,
      userEmail: currentUser.value.userEmail
      // 注意：这里不传avatar，因为我们要单独处理
    })
    alert('信息更新成功')
  } catch (error) {
    console.error('更新失败:', error)
    alert(`更新失败: ${error.response?.data?.message || error.message}`)
  } finally {
    isUpdating.value = false
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  try {
    isUpdating.value = true;
    const avatarPath = await userStore.updateUserInfoWithAvatar(file);

    // 更新当前用户头像显示（使用完整URL）
    currentUser.value.avatar = getFullAvatarUrl(avatarPath);

    // alert(`头像更新成功，URL: ${currentUser.value.avatar}`);
    alert('头像更新成功');
    console.log('完整头像URL:', currentUser.value.avatar); // 调试用

  } catch (error: any) {
    console.error('上传失败:', error);
    alert(`头像更新失败: ${error.message}`);
  } finally {
    isUpdating.value = false;
    if (fileInput.value) fileInput.value.value = '';
  }
}
const getFullAvatarUrl = (avatarPath: string): string => {
  if (!avatarPath) return '';

  // 直接使用生产环境URL（不再区分开发/生产环境）
  return avatarPath.startsWith('http')
    ? avatarPath
    : `https://cp-center-server.hub.feashow.cn${avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`}`;
};


</script>

<template>
  <div>
    <div class="flex justify-between items-center w-[100%] h-1/8 px-6 border-b-2 border-[#D9D9D9]">
      <h2 class="text-lg font-semibold">基本信息</h2>
      <a class="text-[#3370FF] mr-[2vw] hover:text-emerald-500" @click="updateInfo()">编辑</a>
    </div>

    <div class="w-[100%] h-7/8 flex flex-col items-center space-y-10 mt-12">
      <div class="flex h-[12vh] items-center">
        <div
          class="w-[120px] h-[120px] rounded-full flex justify-center items-center relative overflow-hidden bg-gray-300"
          :style="{
            backgroundImage: currentUser.avatar ? `url('${currentUser.avatar}')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }" @click="triggerFileInput">
          <span v-if="!currentUser.avatar" class="text-white text-sm">
            点击上传头像
          </span>
          <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload">
          <div v-if="isUpdating"
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
            上传中...
          </div>
        </div>
      </div>


      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">用户名</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          v-model="currentUser.userName" />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定手机</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          v-model="currentUser.userPhoneNumber" />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定邮箱</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          v-model="currentUser.userEmail" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
