<template>
  <div class="rendered">
    <ThreeJSBook 
      :frontTexture="front"
      :backTexture="back"
      :sideTexture="side"
      :pageTexture="page"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ThreeJSBook from '@/components/ThreeJSBook.vue'

export default {
  name: 'Home',
  components: {
    ThreeJSBook
  },
  data () {
    return {
      front: "tudor-f.jpeg",
      back: "tudor-b.jpeg",
      side: "tudor-side.jpeg",
      page: "tudor-page.jpeg"
    }
  }
}
</script>
