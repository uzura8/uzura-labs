<template>
<div>
  <aside
    v-if="serviceId && categories"
    class="menu"
  >
    <p class="menu-label">{{ $t('common.categories') }}</p>
    <ul class="menu-list">
      <category-menu-item
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :active-category-slug="currenCategorySlug"
      ></category-menu-item>
    </ul>
  </aside>
</div>
</template>
<script>
import { Category } from '@/api'
import CategoryMenuItem from '@/components/organisms/CategoryMenuItem'

export default {
  name: 'EbSideNavMenu',

  components: {
    CategoryMenuItem,
  },

  props: {
  },

  data() {
    return {
      categories: [],
    }
  },

  computed: {
    currenCategorySlug() {
      return this.$route.params.categorySlug
    },
  },

  watch: {
    async serviceId(val, oldVal) {
      await this.fetchCategories()
    },
  },

  created() {
  },

  methods: {
    async fetchCategories() {
      if (!this.serviceId) return
      this.$store.dispatch('setLoading', true)
      try {
        const params = { withChildren: 1 }
        const res = await Category.get(this.serviceId, 'root', params)
        this.categories = ('children' in res && res.children) ? res.children : []
        this.$store.dispatch('setLoading', false)
      } catch (err) {
        this.$store.dispatch('setLoading', false)
        if (err.response.status === 404) {
          return
        }
        this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
      }
    },
  }
}
</script>
