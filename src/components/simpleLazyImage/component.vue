<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { StyleValue } from 'vue'
import longTextObj from '@/assets/longtext'
// to be resolve
// 使用getBoundingClientRect时，无法指定滚动父级，目前只能用于document滚动
const props = withDefaults(
    defineProps<{
        defaultImage?: string
        width?: string
        height?: string
        classes?: string | StyleValue
        styles?: string | StyleValue
        imgSrc: string
    }>(),
    {
        width: '200px',
        height: '200px',
        defaultImage: longTextObj.default_loading_img,
    }
)
const imgRef = ref()
const src = ref<string>(props.defaultImage)
const computedStyle = computed(() => {
    if (typeof props.styles === 'string') {
        return props.styles + ` width: ${props.width}; height: ${props.height}`
    } else {
        return {...props.styles, width: props.width, height: props.height} as StyleValue
    }
})

const loadImage = () => {
    let img = new Image()
    img.onload = () => {
        src.value = props.imgSrc
        img.onload = null
        img.onerror = null
        
    }
    img.onerror = () => {
        src.value = props.defaultImage
        img.onload = null
        img.onerror = null
    }
    img.src = props.imgSrc
}

const init = () => {
    loadImage()
}

onMounted(() => {
    init()
})
</script>

<template>
    <img class="pro-com-img" :class="classes" :style="computedStyle" :src="src" ref="imgRef" />
</template>

<style scoped>
@import url('./css/index.css');
</style>
