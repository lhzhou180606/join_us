<template>
    <router-view v-slot="{ Component }">
      <transition name="view" >
            <component :is="Component"></component>
        </transition>
    </router-view>
    <!-- <router-view></router-view> -->
</template>

<script setup lang="ts">
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import { useJobTypeStore } from "@/store/positionType";
import { useHotSearchPosition } from "@/store/position";
import { useConsult } from "@/store/consult";
import { useCity } from "@/store/city";
import { useSwiperStore } from "@/store/swiper";
import { useIndustryStore } from "@/store/industry";
import {emitter} from "@/utils/emitter"
const { preventCity } = useCity();
useJobTypeStore().getJobs(); //职位类型
useHotSearchPosition().getData(preventCity); //热招职位
useHotSearchPosition().getSortOrRandomData(preventCity); //热招职位
useConsult().getConsultCategory(); //资讯分类
useSwiperStore().getSwiper(); //轮播
useIndustryStore().getIndustry(); //行业
useCity().getCity()
// emitter.on('getData',()=>{
//   useCity().getCity()
//   useJobTypeStore().getJobs(); //职位类型
// useHotSearchPosition().getData(preventCity); //热招职位
// useHotSearchPosition().getSortOrRandomData(preventCity); //热招职位
// useConsult().getConsultCategory(); //资讯分类
// useSwiperStore().getSwiper(); //轮播
// useIndustryStore().getIndustry(); //行业

// })
</script>

<style scoped>
.view-enter-from,.view-leave-to{
  opacity: 0;
}
.view-enter-to,.view-leave-from{
  opacity: 1;
  transition: all .5s ease;
}

</style>
