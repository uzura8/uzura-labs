<template>
<div>
  <div v-if="posts.length > 0">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th class="is-size-7">{{ $t('common.status') }}</th>
          <th class="is-size-6">{{ $t('form.title') }}</th>
          <th class="is-size-6">{{ $t('common.category') }}</th>
          <th class="is-size-7">{{ $t('common.edit') }}</th>
          <th class="is-size-6">{{ $t('common.publishAt') }}</th>
          <th class="is-size-6">{{ $t('common.lastUpdatedAt') }}</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th class="is-size-7">{{ $t('common.status') }}</th>
          <th class="is-size-6">{{ $t('form.title') }}</th>
          <th class="is-size-6">{{ $t('common.category') }}</th>
          <th class="is-size-7">{{ $t('common.edit') }}</th>
          <th class="is-size-6">{{ $t('common.publishAt') }}</th>
          <th class="is-size-6">{{ $t('common.lastUpdatedAt') }}</th>
        </tr>
      </tfoot>
      <tbody>
        <admin-posts-table-row
          v-for="post in posts"
          :key="post.slug"
          :post="post"
        ></admin-posts-table-row>
      </tbody>
    </table>
    <nav v-if="hasNext" class="u-mt2r">
      <a class="u-clickable" @click="fetchPosts({ untilTime:lastItemTime })">{{ $t('common.more') }}</a>
    </nav>
  </div>
  <div v-else>
    <p>{{ $t('msg["Data is empty"]') }}</p>
  </div>
</div>
</template>
<script>
import { Admin } from '@/api'
import AdminPostsTableRow from '@/components/organisms/AdminPostsTableRow'

export default{
  name: 'AdminPostList',

  components: {
    AdminPostsTableRow,
  },

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

    lastItemTime () {
      const lastIndex = this.posts.length - 1
      return this.posts.length > 0 ? encodeURI(this.posts[lastIndex].createdAt) : null
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
        let items = await Admin.getPosts(this.serviceId, null, params_copied, this.adminUserToken)
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

