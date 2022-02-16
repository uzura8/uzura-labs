<template>
<div>
  <aside
    v-if="serviceId && categories.length > 0"
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
    serviceId() {
      return this.$route.params.serviceId
    },

    currenCategorySlug() {
      return this.$route.params.categorySlug
    },
  },

  async created() {
    await this.fetchCategories()
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
        this.handleApiError(err, this.$t('msg["Failed to get data from server"]'))
      }
    },
  }
}
</script>
