<template>
<div>
  <ul v-if="posts.length > 0">
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
            {{ post.body }}
            <br>
            <time
             itemprop="datepublished"
              :datetime="post.publishAt | dateFormat('')"
            >{{ post.publishAt | dateFormat }}</time>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <div v-else>
    <p>{{ $t('msg["Data is empty"]') }}</p>
  </div>

  <nav v-if="hasNext" class="u-mt2r">
    <a class="u-clickable" @click="fetchPosts({ untilTime:lastItemPublishedAt })">{{ $t('common.more') }}</a>
  </nav>
</div>
</template>
<script>
import { Post } from '@/api'

export default{
  props: {
  },

  data(){
    return {
      posts: [],
      hasNext: false,
      listCount: 3,
    }
  },

  computed: {
    categorySlug() {
      return this.$route.params.categorySlug
    },

    lastItemPublishedAt () {
      const lastIndex = this.posts.length - 1
      return this.posts.length > 0 ? encodeURI(this.posts[lastIndex].publishAt) : null
    },
  },

  watch: {
    categorySlug() {
      this.posts = []
      this.fetchPosts()
    },
  },

  async created() {
    await this.fetchPosts()
  },

  methods: {
    async fetchPosts(params = {}, isLatest = false) {
      const params_copied = { ...params }
      params_copied.count = this.listCount + 1
      if (this.categorySlug) {
        params_copied.category = this.categorySlug
      }
      this.$store.dispatch('setLoading', true)
      try {
        let items = await Post.get(this.serviceId, null, params_copied)
        if (isLatest) {
          items.reverse()
        } else {
          if (items.length > this.listCount) {
            items.pop()
            this.hasNext = true
          } else {
            this.hasNext = false
          }
        }
        items.map(item => {
          if (isLatest) {
            this.posts.unshift(item)
          } else {
            this.posts.push(item)
          }
        })
        this.$store.dispatch('setLoading', false)
      } catch (err) {
        this.$store.dispatch('setLoading', false)
        this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
      }
    },
  },
}
</script>

