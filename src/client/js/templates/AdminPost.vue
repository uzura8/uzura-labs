<template>
<div v-if="post">
  <h1 class="title">{{ post.title }}</h1>
  <div>
    {{ post.body }}
  </div>
  <ul>
    <li>
      <label>{{ $t('common.category') }}</label>
      <span>{{ post.category.label }}</span>
    </li>
    <li>
      <label>{{ $t('common.publishAt') }}</label>
      <time
       itemprop="datepublished"
        :datetime="post.publishAt | dateFormat('')"
      >{{ post.publishAt | dateFormat }}</time>
    </li>
    <li>
      <label>{{ $t('common.lastUpdatedAt') }}</label>
      <time
       itemprop="datepublished"
        :datetime="post.updatedAt | dateFormat('')"
      >{{ post.updatedAt | dateFormat }}</time>
    </li>
  </ul>

</div>
</template>
<script>
import { Admin } from '@/api'

export default{
  name: 'AdminPost',

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

  async created() {
    await this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Admin.getPosts(this.serviceId, this.slug, null, this.adminUserToken)
    },
  },
}
</script>

