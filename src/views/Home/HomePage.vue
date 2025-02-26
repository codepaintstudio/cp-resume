<script setup lang="ts">
import { ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const ToCv = () =>{
  router.push('/cv');
}
const boxes = ref<null[]>(Array(5).fill(null));
  const toTopRef = ref<HTMLElement | null>(null);

 // 在组件挂载后添加事件监听器
 onMounted(() => {
   // 检查 toTopRef.value 是否存在，并且它是一个 HTMLElement
   if (toTopRef.value) {
     // 为引用的元素添加点击事件监听器
     toTopRef.value.addEventListener('click', () => {
       window.scrollTo({
         top: 0,
         behavior: 'smooth'
       });
     });
   }
})


</script>
<template>
  <div id="contentMain">
    <span class="sphere sphere1"></span>
    <span class="sphere sphere2"></span>
    <div class="Cmain">
      <div class="Slogon">
        <div class="LogoCenter">
          <div class="msg1">CP-ResumeTools</div>
          <div class="msg2">码绘工作室简历制作</div>
          <div class="MakeResume" @click="ToCv"></div>

        </div>
      </div>

      <div class="BestResume">
        <div class="topLine">
          <span class="leftLine"></span>
          <span class="mainLine">精选简历</span>
          <span class="rightLine"></span>
        </div>
        <div class="resumeList">
          <div v-for="(box, index) in boxes" :key="index" class="resume">/*可添加跳转*/
            Box {{ index + 1 }}
          </div>

        </div>
        <span class="seeMore" @click="ToCv"></span>
      </div>

      <div class="HisResume">
        <div class="topLine2">
          <span class="leftLine"></span>
          <span class="mainLine">历史简历</span>
          <span class="rightLine"></span>
        </div>
        <div class="hisList">
          <div v-for="(box, index) in boxes" :key="index" class="resume">/*可添加跳转*/
            Box {{ index + 1 }}
          </div>
        </div>
        <div class="toMore" @click="ToCv">

            <span class="msgMore" >查看全部</span>
            <span class="more"></span>

        </div>

      </div>
    </div>
    <div ref="toTopRef" class="toTop"></div>
  </div>

</template>
<style scoped>
@import '../../styles/Home.css';
</style>
