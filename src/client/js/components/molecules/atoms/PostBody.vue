<template>
  <div
    v-html="body"
    class="post-body"
  >
  </div>
</template>
<script>

export default{
  name: 'PostBody',

  components: {
  },

  props: {
    body: {
      type: String,
      default: '',
    },
    //bodyFormat: {
    //  type: String,
    //  default: 'html',
    //}
  },

  data(){
    return {
    }
  },

  computed: {
  },

  created() {
  },

  methods: {
  },
}
</script>
<style>
.post-body {
  @import "../scss/browser-default.scss";
}
</style>

