<template>
<div v-if="post">

  <b-message
    v-if="isPublished === false"
    type="is-warning"
  >{{ $t('msg.thisIsNotPublished', {name: $t('common.post')}) }}</b-message>

  <div class="block">
    <router-link :to="postsPageUri">
      <i class="fas fa-chevron-left"></i>
      <span>{{ $t('common.posts') }}</span>
    </router-link>
  </div>

  <h1 class="title">
    <span
      v-if="isPublishItem === false"
      class="tag is-dark"
    >{{ $t('common.unpublished') }}</span>

    {{ post.title }}
  </h1>

  <div class="is-pulled-right">
    <eb-dropdown
      position="is-bottom-left"
    >
      <span
        slot="label"
        class="icon"
      >
        <i class="fas fa-edit"></i>
      </span>
      <div class="dropdown-content">
        <router-link
          :to="`/admin/posts/${serviceId}/${post.postId}/edit`"
          class="dropdown-item"
        >
          <span class="icon">
            <i class="fas fa-pen"></i>
          </span>
          <span>{{ $t('common.edit') }}</span>
        </router-link>

        <a
          v-if="isPublishItem"
          @click="updateStatus(false)"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-lock"></i>
          </span>
          <span>{{ $t('common.unpublish') }}</span>
        </a>

        <a
          v-else
          @click="confirmPublish()"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-globe"></i>
          </span>
          <span>{{ $t('common.publish') }}</span>
        </a>

        <a
          @click="confirmDelete()"
          class="dropdown-item is-clickable"
        >
          <span class="icon">
            <i class="fas fa-trash"></i>
          </span>
          <span>{{ $t('common.delete') }}</span>
        </a>

      </div>
    </eb-dropdown>
  </div>

  <post-body
    :body-text="post.bodyText"
    :body-html="post.bodyHtml"
    :format="post.bodyFormat"
  ></post-body>

  <ul class="mt-5">
    <li v-if="'category' in post && post.category">
      <label>{{ $t('common.category') }}</label>
      <span>{{ post.category.label }}</span>
    </li>
    <li v-if="'tags' in post && post.tags">
      <label>{{ $t('common.tag') }}</label>
      <span>
        <span
          v-for="tag in post.tags"
          class="tag ml-2"
          >{{ tag.label }}</span>
      </span>
    </li>
    <li>
      <label>{{ $t('common.publishAt') }}</label>
      <inline-time
        :time-class="isReserved ? 'has-text-warning-dark' : ''"
        :datetime="post.publishAt"
      ></inline-time>
      <span v-if="isReserved" class="tag is-warning">{{ $t('common.reserved') }}</span>
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
import PostBody from '@/components/molecules/atoms/PostBody'
import InlineTime from '@/components/molecules/atoms/InlineTime'
import EbDropdown from '@/components/molecules/EbDropdown'

export default{
  name: 'AdminPost',

  components: {
    InlineTime,
    EbDropdown,
    PostBody,
  },

  data(){
    return {
      post: null,
    }
  },

  computed: {
    postId() {
      return this.$route.params.postId
    },

    isPublished() {
      if (!this.post) return false
      return this.checkPostPublished(this.post.postStatus, this.post.publishAt)
    },

    isPublishItem() {
      if (!this.post) return false
      return this.post.postStatus === 'publish'
    },

    isReserved() {
      return this.getPostPublishStatus(this.post.postStatus, this.post.publishAt) === 'reserved'
    },

    postsPageUri() {
      const uri = `/admin/posts/${this.serviceId}`
      if (!this.$store.state.adminPostsPager.lastIndex) return uri
      return `${uri}?index=${this.$store.state.adminPostsPager.lastIndex}`
    },
  },

  async created() {
    await this.getPost()
  },

  methods: {
    async getPost() {
      this.post = await Admin.getPosts(this.serviceId, this.postId, null, this.adminUserToken)
    },

    confirmPublish() {
      this.$buefy.dialog.confirm({
        message: this.$t('msg.cofirmToPublish'),
        onConfirm: async () => await this.updateStatus(true)
      })
    },

    async updateStatus(isPublish = false) {
      try {
        this.$store.dispatch('setLoading', true)
        const postStatus = isPublish ? 'publish' : 'unpublish'
        const res = await Admin.updatePostStatus(this.serviceId, this.postId, postStatus, this.adminUserToken)
        this.$store.dispatch('setLoading', false)
        this.post = res
        this.$emit('posted', res)
        this.showGlobalMessage(this.$t('msg.changePublishStatusCompleted'), 'is-success')
      } catch (err) {
        console.log(err);//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (this.checkResponseHasErrorMessage(err, true)) {
          this.setErrors(err.response.data.errors)
        }
        this.handleApiError(err, this.$t(`msg["Edit failed"]`))
      }
    },

    confirmDelete() {
      this.$buefy.dialog.confirm({
        message: this.$t('msg.cofirmToDelete'),
        onConfirm: async () => await this.deletePost()
      })
    },

    async deletePost() {
      try {
        this.$store.dispatch('setLoading', true)
        const res = await Admin.deletePost(this.serviceId, this.postId, this.adminUserToken)
        this.$store.dispatch('setLoading', false)
        this.$router.push(`/admin/posts/${this.serviceId}`)
      } catch (err) {
        console.log(err);//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (this.checkResponseHasErrorMessage(err, true)) {
          this.setErrors(err.response.data.errors)
        }
        this.handleApiError(err, this.$t(`msg["Delete failed"]`))
      }
    },
  },
}
</script>

