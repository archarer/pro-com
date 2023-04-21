<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import { throttle } from '../../tools'

const props = withDefaults(defineProps<{
    onReachBottom?: Function
    hasScrollBar?: boolean
    height?: string
    usePaginationIndicator?: boolean
    threshold?: number
    noMore?: boolean
    noMoreText?: string
    isLoading?: boolean
}>(), {
    onReachBottom: () => { },
    hasScrollBar: true,
    height: '300px',
    usePaginationIndicator: false,
    threshold: 20,
    noMore: false,
    noMoreText: '已经到底啦！',
    isLoading: false
})

const emit = defineEmits(['next'])

const slots = useSlots()
const containerEl = ref()
const contentEl = ref()
const footer = ref()
let intersectionObserver: IntersectionObserver
let limitScrollTriggerReachBottomFrequencyFlag = false

const useIntersectionObserver = () => {
    intersectionObserver = new IntersectionObserver((entries) => {
        // 如果 intersectionRatio 为 0，则目标在视野外，
        // 我们不需要做任何事情。
        if (entries[0].intersectionRatio <= 0) return
        if (props.noMore) return
        console.log('触底')
        props.onReachBottom && props.onReachBottom()
    }, {
        root: containerEl.value,
    })
    // 开始监听
    intersectionObserver.observe(footer.value)
}

const useOnScroll = () => {
    containerEl.value.onscroll = throttle((e: Event) => {
        const target = e.target as HTMLElement
        // 容器高度
        let offsetHeight = Math.ceil(target.getBoundingClientRect().height)
        // 滚动高度
        let scrollHeight = target.scrollHeight
        // 当前滚动高度 = 滚动距离 + 容器高度 + [触底阈值]
        let currentHeight = target.scrollTop + offsetHeight + props.threshold
        if (currentHeight >= scrollHeight) {
            if (props.noMore) return
            if (limitScrollTriggerReachBottomFrequencyFlag) return
            console.log('触底')

            props.onReachBottom && props.onReachBottom()
            limitScrollTriggerReachBottomFrequencyFlag = true
            setTimeout(() => {
                limitScrollTriggerReachBottomFrequencyFlag = false
            }, 300)
        }
    }, 100)
}

const init = () => {
    // 初始内容高度小于容器高度说明没有更多内容需要继续加载，则不用监听触底事件
    if (!props.usePaginationIndicator && contentEl.value.offsetHeight > containerEl.value.offsetHeight) {
        if (!IntersectionObserver) {
            useIntersectionObserver()
        } else {
            useOnScroll()
        }
    }
}

const clear = () => {
    if (intersectionObserver) intersectionObserver.unobserve(footer.value)
    if (containerEl.value.onscroll) containerEl.value.onscroll = null
}

onMounted(() => {
    init()
})
onBeforeUnmount(() => {
    clear()
})
</script>

<template>
    <div class="pro-com-container" ref="containerEl" :style="{ height: height }">
        <div class="pro-com-content" ref="contentEl">
            <slot name="default"></slot>
            <div class="pro-com-bottom-space">
                <div class="pro-com-loading" v-show="isLoading && !noMore"></div>
                <div class="pro-com-nomore" v-if="noMore">{{ noMoreText }}</div>
                <div class="pro-com-pagination__wrapper" @click="emit('next')" v-if="usePaginationIndicator">
                    <slot name="pagination" v-if="slots.pagination"></slot>
                    <div class="pro-com-pagination" v-if="!slots.pagination && !noMore">more</div>
                </div>
            </div>
            <div class="pro-com-footer" ref="footer" :style="{ height: threshold + 'px' }" v-if="!usePaginationIndicator">
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('./css/index.css');
</style>