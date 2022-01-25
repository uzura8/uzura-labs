<template>
<div>
  <div>
    <h1 class="title">Posts of {{ serviceId }}</h1>
  </div>
  <ul v-if="posts">
    <li
      v-for="post in posts"
      class="block"
    >
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <h4 class="title is-4">
                <router-link
                  :to="`/posts/${serviceId}/${post.slug}`"
                >{{ post.title }}</router-link>
              </h4>
            </div>
          </div>

          <div class="content">
            hogehoge
            <br>
            <time
             itemprop="datepublished"
              :datetime="post.publishAt | dateFormat('')"
            >{{ post.publisheeAt | dateFormat }}</time>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import { Post } from '@/api'

export default{
  name: 'Posts',

  data(){
    return {
      posts: [],
    }
  },

  computed: {
    serviceId() {
      return this.$route.params.serviceId
    },
  },

  created() {
    this.fetchPosts()
  },

  methods: {
    async fetchPosts() {
      this.posts = await Post.get(this.serviceId)
    },
  },
}
</script>

