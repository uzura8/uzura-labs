<template>
  <div>
    <div
      v-if="format === 'mathjax'"
    >
      <vue-mathjax :formula="bodyText"></vue-mathjax>
    </div>
    <div
      v-else
      v-html="bodyHtml"
      class="post-body"
    >
  </div>
  </div>
</template>
<script>
import { VueMathjax } from 'vue-mathjax'

export default{
  name: 'PostBody',

  components: {
    'vue-mathjax': VueMathjax,
  },

  props: {
    bodyText: {
      type: String,
      default: '',
    },
    bodyHtml: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: 'html',
    }
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

