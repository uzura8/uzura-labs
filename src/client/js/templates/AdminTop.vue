<template>
<div>
  <h1 class="title">{{ $t('page.adminTop') }}</h1>
  <p>{{ $t('msg.signInGreeting', { name: userName }) }}</p>
  <div class="mt-5">
    <h2 class="title">サービスID一覧</h2>
    <service-ids :is-admin="true"></service-ids>
  </div>
</div>
</template>
<script>
import ServiceIds from '@/components/organisms/ServiceIds'

export default{
  name: 'AdminTop',

  components: {
    ServiceIds,
  },

  data(){
    return {
    }
  },

  computed: {
    userName () {
      const defName = ''
      if (this.checkEmpty(this.$store.state.auth.user)) return defName
      if (this.checkEmpty(this.$store.state.auth.user.name)) return defName
      return this.$store.state.auth.user.name
    },
  },

  created() {
  },

  methods: {
  },
}
</script>
