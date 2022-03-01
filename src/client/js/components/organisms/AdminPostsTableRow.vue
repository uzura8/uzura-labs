<template>
  <tr>
    <td>{{ post.category.label }}</td>
    <td>
      <router-link :to="`/admin/posts/${serviceId}/${post.slug}`">{{ post.title }}</router-link>
    </td>
    <td>{{ post.slug }}</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>
      <time
       itemprop="datepublished"
        :datetime="post.publishAt | dateFormat('')"
      >{{ post.publishAt | dateFormat }}</time>
    </td>
    <td>
      <time
       itemprop="dateupdatedat"
        :datetime="post.updatedAt | dateFormat('')"
      >{{ post.updatedAt | dateFormat }}</time>
    </td>
  </tr>
</template>
<script>
import moment from '@/moment'

export default{
  name: 'AdminPostsTableRow',

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
  },

  watch: {
  },

  created() {
  },

  methods: {
  },
}
</script>

