<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
                <img :src=carousel.imgUrl>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
//引入swiper
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: ['list'],
    watch: {
        list: {
            // 立即监听:不管数据有没有变化，上来就立即监听一次
            //为什么watch监听不到list：因为这个数据从来都没有发生变化（数据是父亲给的，对象里面该有的数据都是有的）
            //所以需要immediate(立即监听一次)
            immediate: true,
            handler() {
                // 现在只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定，因此还是需要nextTick
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true,
                        cssMode: true,
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true, // 点击小球的时候也切换
                        },
                        mousewheel: true,
                        keyboard: true,
                    })
                })
            }
        }
    }
}
</script>

<style scoped lang="less">

</style>