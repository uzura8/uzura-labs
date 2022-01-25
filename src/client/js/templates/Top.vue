<template>
  <div>
    <h1 class="title">{{ $t('page.top') }}</h1>
    <div>
      <h2 class="title">Posts</h2>
      <ul>
        <li
          v-for="serviceId in serviceIds"
        >
          <router-link :to="`/posts/${serviceId}`">{{serviceId}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import config from '@/config/config'

export default{
  name: 'Top',

  data(){
    return {
    }
  },

  computed: {
    serviceIds() {
      return config.serviceIds
    },
  },

  created() {
  }
}
</script>

