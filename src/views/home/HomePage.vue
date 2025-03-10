<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


// 引入图标
import { ArrowUp } from 'lucide-vue-next';
const router = useRouter();
const ToCv = () => {
  router.push('/cv');
}
const boxes = ref<null[]>(Array(5).fill(null));
const toTopRef = ref<HTMLElement | null>(null);

const sphere1 = ref<HTMLElement | null>(null);
const sphere2 = ref<HTMLElement | null>(null);

// 防抖函数
function debounce(func: Function, delay: number): Function {
  let timeoutId: number;
  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// 处理滚动事件
const handleScroll = debounce(() => {
  const scrollY = window.scrollY || window.pageYOffset;

  // 定义 sphere1 和 sphere2 的移动范围
  const minScrollY = 0; // 最小 scrollY 值
  const maxScrollY = 100; // 最大 scrollY 值

  // 限制 scrollY 在 minScrollY 和 maxScrollY 之间
  const clampedScrollY = Math.min(Math.max(scrollY, minScrollY), maxScrollY);

  // 获取两个 sphere 的 DOM 元素
  if (sphere1.value && sphere2.value) {
    // 根据 clampedScrollY 计算新的 top 值
    sphere1.value.style.top = `${20 + clampedScrollY * 0.1}vh`;
    sphere2.value.style.top = `${40 + clampedScrollY * 0.1}vh`;
    sphere1.value.style.animationPlayState = 'paused';
    sphere2.value.style.animationPlayState = 'paused';
  }

  // 恢复动画
  setTimeout(() => {
    if (sphere1.value && sphere2.value) {
      sphere1.value.style.animationPlayState = 'running';
      sphere2.value.style.animationPlayState = 'running';
    }
  }, 100);
}, 10);


// 在组件挂载后添加事件监听器
onMounted(() => {
  // 检查 toTopRef.value 是否存在，并且它是一个 HTMLElement
  window.addEventListener('scroll', handleScroll);
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
    <span ref="sphere1" class="sphere sphere1"></span>
    <span ref="sphere2" class="sphere sphere2"></span>
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

          <span class="msgMore">查看全部</span>
          <span class="more"></span>

        </div>

      </div>
    </div>
    <div ref="toTopRef" class="toTop">
      <ArrowUp />
    </div>
  </div>

</template>
<style scoped>
@import '@/assets/styles/Home.css';
@import '../../assets/styles/Home.css';
</style>
