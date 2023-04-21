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
    <LazyLoadList>
      <div class="item" v-for="it in mock">item{{ it }}</div>
    </LazyLoadList>
    <div style="height: 20px" v-for="it in 60"></div>
    <SimpleLazyImage
      img-src="https://images.pexels.com/photos/13623247/pexels-photo-13623247.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" />
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
