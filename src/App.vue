<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { LazyImage } from './components/lazyImage';
import { LazyLoadList } from './components/lazyLoadList';
import { SimpleLazyImage } from './components/simpleLazyImage';
const mock = ref(new Array(20).fill(0));
const isLoading = ref<boolean>(false);
let page = 1;
const loadMore = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    mock.value = mock.value.concat(new Array(20).fill(page++));
  }, 1000);
};

const myLucky = ref()
const prizes = ref([
{ x: 0, y: 0, fonts: [{ text: '0', top: '10%' }] },
      { x: 1, y: 0, fonts: [{ text: '1', top: '10%' }] },
      { x: 2, y: 0, fonts: [{ text: '2', top: '10%' }] },
      { x: 3, y: 0, fonts: [{ text: '3', top: '10%' }] },
      { x: 4, y: 0, fonts: [{ text: '4', top: '10%' }] },
      { x: 5, y: 0, fonts: [{ text: '5', top: '10%' }] },
      { x: 6, y: 0, fonts: [{ text: '6', top: '10%' }] },

      { x: 6, y: 1, fonts: [{ text: '7', top: '10%' }] },
      { x: 6, y: 2, fonts: [{ text: '8', top: '10%' }] },
      { x: 6, y: 3, fonts: [{ text: '9', top: '10%' }] },
      { x: 6, y: 4, fonts: [{ text: '10', top: '10%' }] },
      { x: 6, y: 5, fonts: [{ text: '11', top: '10%' }] },
      { x: 6, y: 6, fonts: [{ text: '12', top: '10%' }] },

      { x: 5, y: 6, fonts: [{ text: '13', top: '10%' }] },
      { x: 4, y: 6, fonts: [{ text: '14', top: '10%' }] },
      { x: 3, y: 6, fonts: [{ text: '15', top: '10%' }] },
      { x: 2, y: 6, fonts: [{ text: '16', top: '10%' }] },
      { x: 1, y: 6, fonts: [{ text: '17', top: '10%' }] },
      { x: 0, y: 6, fonts: [{ text: '18', top: '10%' }] },

      { x: 0, y: 5, fonts: [{ text: '19', top: '10%' }] },
      { x: 0, y: 4, fonts: [{ text: '20', top: '10%' }] },
      { x: 0, y: 3, fonts: [{ text: '21', top: '10%' }] },
      { x: 0, y: 2, fonts: [{ text: '22', top: '10%' }] },
      { x: 0, y: 1, fonts: [{ text: '23', top: '10%' }] },
])
const blocks = ref([
    { padding: '10px', background: '#869cfa' },
    { padding: '10px', background: '#e9e8fe' },
])
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <LuckyGrid
        ref="myLucky"
        width="776px"
        height="776px"
        rows="7"
        cols="7"
        :prizes="prizes"
        :blocks="blocks"
    />
    <LazyLoadList>
      <div class="item" v-for="it in mock">item{{ it }}</div>
      <!-- <template v-slot:pagination>
            <div>外面的</div>
          </template> -->
    </LazyLoadList>
    <div style="height: 20px" v-for="it in 60"></div>
    <SimpleLazyImage img-src="https://images.pexels.com/photos/13623247/pexels-photo-13623247.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
    <LazyImage
      img-src="https://images.pexels.com/photos/13623247/pexels-photo-13623247.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
