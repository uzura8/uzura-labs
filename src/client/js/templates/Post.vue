<template>
<div v-if="post">
  <div class="block">
    <router-link :to="isAdminPath ? `/admin/posts/${serviceId}` : `/posts/${serviceId}`">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('common.posts') }}</span>
    </router-link>
  </div>

  <h1 class="title">{{ post.title }}</h1>

  <post-body
    :body="post.bodyHtml"
  ></post-body>

  <div class="mt-5">
    <time
      itemprop="datepublished"
      :datetime="post.publishAt | dateFormat('')"
    >{{ post.publishAt | dateFormat }}</time>
  </div>

  <nav
    v-if="post.category"
    class="breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <router-link :to="`/posts/${serviceId}/`">{{ $t('common.posts') }}</router-link>
      </li>
      <li
        v-for="parent in post.category.parents"
      >
        <router-link :to="`/posts/${serviceId}/categories/${parent.slug}`">{{ parent.label }}</router-link>
      </li>
      <li>
        <router-link :to="`/posts/${serviceId}/categories/${post.category.slug}`">{{ post.category.label }}</router-link>
      </li>
    </ul>
  </nav>

    <ul v-if="'tags' in post && post.tags">
      <li
        v-for="tag in post.tags"
        class="is-inline-block mr-2"
      >
        <router-link
          :to="`/posts/${serviceId}/tags/${tag.label}`"
          class="tag"
        >{{ tag.label }}</router-link>
      </li>
    </ul>

</div>
</template>
<script>
import { Post } from '@/api'
import PostBody from '@/components/molecules/atoms/PostBody'

export default{
  name: 'Post',

  components: {
    PostBody,
  },

  data(){
    return {
      post: null,
    }
  },

  computed: {
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

