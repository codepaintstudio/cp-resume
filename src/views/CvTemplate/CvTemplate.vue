<script setup lang="ts">
import CvCard from '@/components/CvCard.vue';
</script>
<template>
  <div>简历模板</div>
  <div class="content">
    <RouterLink class="cv-card" v-for="i in 10" :key="i" to="/cv/1011">
      <CvCard></CvCard>
    </RouterLink>
    <i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cv-card {
  margin: 10px 0;
}

i {
  width: 200px;
}
</style>
