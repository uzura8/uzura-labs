<template>
  <tr :class="rowBgColoerClass">
    <td>{{ post.category.label }}</td>
    <td>
      <router-link :to="`/admin/posts/${serviceId}/${post.slug}`">{{ post.title }}</router-link>
    </td>
    <td>{{ post.slug }}</td>
    <td>-</td>
    <td>
      <router-link
        :to="`/admin/posts/${serviceId}/${post.slug}/edit`"
        class="button is-small"
      >
        <span class="icon is-small">
          <i class="fas fa-pen"></i>
        </span>
      </router-link>
    </td>
    <td>
      <span v-if="publishStatus == 'published'" class="tag is-success">{{ $t('common.published') }}</span>
      <span v-else-if="publishStatus == 'reserved'" class="tag is-warning">{{ $t('common.reserved') }}</span>
      <span v-else class="tag is-danger">{{ $t('common.unpublished') }}</span>
    </td>
    <td>-</td>
    <td class="is-size-7"><inline-time :datetime="post.publishAt"></inline-time></td>
    <td class="is-size-7"><inline-time :datetime="post.updatedAt"></inline-time></td>
  </tr>
</template>
<script>
import InlineTime from '@/components/molecules/atoms/InlineTime'

export default{
  name: 'AdminPostsTableRow',

  components: {
    InlineTime,
  },

  props: {
    serviceId: {
      type: String,
      default: '',
    },

    post: {
      type: Object,
      default: null,
    },
  },

  data(){
    return {
    }
  },

  computed: {
    publishStatus() {
      return this.getPostPublishStatus(this.post.postStatus, this.post.publishAt)
    },

    rowBgColoerClass() {
      const publishStatus = this.getPostPublishStatus(this.post.postStatus, this.post.publishAt)
      switch (publishStatus) {
        case 'unpublished':
          return 'has-background-danger-light'
        case 'reserved':
          return 'has-background-warning-light'
        default :
          return ''
      }
    }
  },

  watch: {
  },

  created() {
  },

  methods: {
  },
}
</script>

