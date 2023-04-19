<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        defaultImage?: string
        imgSrc: string
    }>(),
    {
        defaultImage: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
    }
)
const imgRef = ref()
const src = ref<string>(props.defaultImage)
const isSupportIntersectionObserver = !!IntersectionObserver
let intersetionObserver: IntersectionObserver

const loadImage = () => {
    let img = new Image()
    img.onload = () => {
        src.value = props.imgSrc
        img.onload = null
        img.onerror = null
        if (isSupportIntersectionObserver) intersetionObserver.unobserve(imgRef.value)
    }
    img.onerror = () => {
        src.value = props.defaultImage
        img.onload = null
        img.onerror = null
        if (isSupportIntersectionObserver) intersetionObserver.unobserve(imgRef.value)
    }
    img.src = props.imgSrc
}

const useIntersectionObserver = () => {
    intersetionObserver = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio <= 0) return
        loadImage()
    })
    intersetionObserver.observe(imgRef.value)
}

const useBoundingRect = () => { }

const init = () => {
    if (isSupportIntersectionObserver) {
        useIntersectionObserver()
    } else {
        useBoundingRect()
    }
}
onMounted(() => {
    init()
})
</script>

<template>
    <img :src="src" ref="imgRef" />
</template>

<style scoped>
@import url('./css/index.css');
</style>
