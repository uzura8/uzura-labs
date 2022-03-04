<template>
<div v-if="post">

  <b-message
    v-if="post && !checkPostPublished(post.postStatus, post.publishAt)"
    type="is-warning"
  >{{ $t('msg.thisIsNotPublished', {name: $t('common.post')}) }}</b-message>

  <div class="block">
    <router-link :to="`/admin/posts/${serviceId}`">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('common.posts') }}</span>
    </router-link>
  </div>

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
      <inline-time :datetime="post.publishAt"></inline-time>
    </li>
    <li>
      <label>{{ $t('common.lastUpdatedAt') }}</label>
      <inline-time :datetime="post.updatedAt"></inline-time>
    </li>
  </ul>

</div>
</template>
<script>
import moment from '@/moment'
import { Admin } from '@/api'
import InlineTime from '@/components/molecules/atoms/InlineTime'

export default{
  name: 'AdminPost',

  components: {
    InlineTime,
  },

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
    const hoge = moment.utc().format()
    const fuga = moment.utc().add(3, 'seconds').format()
    await this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Admin.getPosts(this.serviceId, this.slug, null, this.adminUserToken)
    },
  },
}
</script>

