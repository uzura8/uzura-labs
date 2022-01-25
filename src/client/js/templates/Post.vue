<template>
<div>
  <h1 class="title">{{ post.title }}</h1>
  <div>
    hogehoge
  </div>
  <time
   itemprop="datepublished"
    :datetime="post.publishAt | dateFormat('')"
  >{{ post.publisheeAt | dateFormat }}</time>
</div>
</template>
<script>
import { Post } from '@/api'

export default{
  name: 'Posts',

  data(){
    return {
      post: null,
    }
  },

  computed: {
    serviceId() {
      return this.$route.params.serviceId
    },

    slug() {
      return this.$route.params.slug
    },
  },

  created() {
    this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Post.get(this.serviceId, this.slug)
    },
  },
}
</script>

