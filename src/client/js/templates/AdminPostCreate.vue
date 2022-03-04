<template>
<div>
  <h1 class="title">{{ $t('common.createOf', {label: $t('common.post')}) }}</h1>
  <admin-post-form :service-id="serviceId"></admin-post-form>
</div>
</template>
<script>
import AdminPostForm from '@/components/organisms/AdminPostForm'

export default{
  name: 'AdminPost',

  components: {
    AdminPostForm,
  },

  data(){
    return {
    }
  },

  computed: {
    serviceId() {
      return this.$route.params.serviceId
    },
  },

  created() {
  },

  methods: {
  },
}
</script>

