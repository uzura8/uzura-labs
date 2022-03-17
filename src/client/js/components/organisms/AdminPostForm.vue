<template>
<div>
  <b-field
    :label="$t('form.Slug')"
    :type="checkEmpty(errors.slug) ? '' : 'is-danger'"
    :message="checkEmpty(errors.slug) ? '' : errors.slug[0]"
  >
    <b-input
      v-model="slug"
      @blur="validate('slug')"
    ></b-input>
  </b-field>


  <b-field
    :label="$t('common.category')"
    :type="checkEmpty(errors.category) ? '' : 'is-danger'"
    :message="checkEmpty(errors.category) ? '' : errors.category[0]"
  >
    <b-select
      v-model="category"
      @input="validate('category')"
      :placeholder="$t('msg.SelectItem', { name:$t('common.category') })"
    >
      <optgroup
        v-for="pcate in categories"
        :key="pcate.slug"
        :label="pcate.label"
      >
        <option
          v-for="cate in pcate.children"
          :key="cate.slug"
          :value="cate.slug"
        >{{ cate.label }}</option>
      </optgroup>
    </b-select>
  </b-field>

  <b-field
    :label="$t('form.title')"
    :type="checkEmpty(errors.title) ? '' : 'is-danger'"
    :message="checkEmpty(errors.title) ? '' : errors.title[0]"
  >
    <b-input
      v-model="title"
      @blur="validate('title')"
    ></b-input>
  </b-field>

  <b-field
    :label="$t('form.body')"
    :type="checkEmpty(errors.body) ? '' : 'is-danger'"
    :message="checkEmpty(errors.body) ? '' : errors.body[0]"
  >
    <b-input
      type="textarea"
      v-model="body"
      @blur="validate('body')"
    ></b-input>
  </b-field>

  <b-field
    :label="$t('common.publishAt')"
    :type="checkEmpty(errors.publishAt) ? '' : 'is-danger'"
    :message="checkEmpty(errors.publishAt) ? '' : errors.publishAt[0]"
  >
    <b-datetimepicker
      v-model="publishAt"
      @blur="validate('publishAt')"
      locale="ja-JP"
      icon-pack="fas"
      icon="calendar-day"
      editable
    >
      <template #left>
        <b-button
          label="Now"
          type="is-primary"
          icon-left="clock"
          icon-pack="fas"
          @click="publishAt = new Date()"
        ></b-button>
      </template>

      <template #right>
        <b-button
          label="Clear"
          type="is-danger"
          icon-left="times"
          icon-pack="fas"
          outlined
          @click="publishAt = null"
        ></b-button>
      </template>
    </b-datetimepicker>
  </b-field>

  <div
    v-if="globalError"
    class="block has-text-danger"
  >{{ globalError }}</div>

  <div class="field">
    <div
      v-if="!isPublished"
      class="control"
    >
      <button
        class="button is-info"
        :disabled="isLoading || hasErrors"
        @click="save(false)"
        v-text="$t('common.saveDraft')"
      ></button>
    </div>

    <div
      v-else
      class="control"
    >
      <button
        class="button is-warning"
        :disabled="isLoading || hasErrors"
        @click="save(false)"
        v-text="$t('common.edit')"
      ></button>
    </div>
  </div>

  <div class="field">
    <div
      v-if="!isPublished"
      class="control"
    >
      <button
        class="button is-warning"
        :disabled="isLoading || hasErrors"
        @click="save(true)"
        v-text="$t('common.publish')"
      ></button>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button
        class="button is-light"
        :disabled="isLoading"
        @click="cancel"
        v-text="$t('common.cancel')"
      ></button>
    </div>
  </div>
</div>
</template>
<script>
import moment from 'moment'
import str from '@/util/str'
import { Admin, Category } from '@/api'

export default{
  name: 'AdminPostForm',

  components: {
  },

  props: {
    post: {
      type: Object,
      default: null,
    },
  },

  data(){
    return {
      slug: '',
      category: '',
      title: '',
      body: '',
      publishAt: null,
      categories: [],
      fieldKeys: ['slug', 'category', 'title', 'body', 'publishAt'],
    }
  },

  computed: {
    isEdit() {
      return this.post != null
    },

    isPublished() {
      if (this.isEdit === false) return false
      return this.post.postStatus === 'publish'
    },

    updatedValues () {
      if (!this.isEdit) return {}

      let isUpdated = false
      let values = {}
      for (let i = 0, n = this.fieldKeys.length; i < n; i++) {
        let key = this.fieldKeys[i]
        if (this.post[key] != this[key]) {
          values[key] = this[key]
          isUpdated = true
        }
      }
      if (!isUpdated) return null
      return values
    },

    isPostBtnDisabled() {
      if (this.hasErrors) return true
      if (this.body.length == 0) return true
      return false
    },

    isUpdated() {
      if (!this.isEdit) return true
      return !this.checkEmpty(this.updatedValues)
    },

    isEmptyAllFields() {
      if (!this.checkEmpty(this.slug)) return false
      if (!this.checkEmpty(this.category)) return false
      if (!this.checkEmpty(this.title)) return false
      if (!this.checkEmpty(this.body)) return false
      if (!this.checkEmpty(this.publishAt)) return false
      return true
    },

    hasErrors() {
      if (this.globalError) return true

      let hasError = false
      Object.keys(this.errors).map(field => {
        if (this.errors[field].length > 0) hasError = true
      })
      return hasError
    },
  },

  async created() {
    this.setPost()
    await this.setCategories()
  },

  methods: {
    setPost() {
      if (!this.isEdit) return

      this.slug = this.post.slug != null ? String(this.post.slug) : ''
      this.category = this.post.category.slug != null ? String(this.post.category.slug) : ''
      this.title = this.post.title != null ? String(this.post.title) : ''
      this.body = this.post.body != null ? String(this.post.body) : ''
      this.publishAt = this.post.publishAt ? moment(this.post.publishAt).toDate() : null
    },

    async setCategories() {
      const res = await Category.get(this.serviceId)
      if (res.length > 0) {
        this.categories = res[0].children
      }
    },

    resetInputs() {
      this.slug = ''
      this.category = ''
      this.title = ''
      this.body = ''
      this.publishAt = null
    },

    async save(forcePublish = false) {
      this.validateAll()
      if (this.hasErrors) return

      try {
        let vals = {}
        vals.slug = this.slug
        vals.category = this.category
        vals.title = this.title
        vals.body = this.body
        if (this.publishAt) {
          const publishAtStr = moment.utc(this.publishAt).format('YYYY-MM-DDTHH:mm:ssZ')
          vals.publishAt = publishAtStr
        }
        if (forcePublish) {
          vals.status = 'publish'
        } else {
          if (this.isEdit === false) vals.status = 'unpublish'
        }
        this.$store.dispatch('setLoading', true)
        let res
        if (this.isEdit) {
          res = await Admin.editPost(this.serviceId, this.post.postId, vals, this.adminUserToken)
        } else {
          res = await Admin.createPost(this.serviceId, vals, this.adminUserToken)
          this.$store.dispatch('resetAdminPostsPager', false)
        }
        this.$store.dispatch('setLoading', false)
        this.$emit('posted', res)
        this.resetInputs()
        this.$router.push(`/admin/posts/${this.serviceId}/${res.postId}`)
      } catch (err) {
        console.log(err);//!!!!!!
        this.$store.dispatch('setLoading', false)
        if (this.checkResponseHasErrorMessage(err, true)) {
          this.setErrors(err.response.data.errors)
        }
        const msgKey = this.isEdit ? 'Edit failed' : 'Create failed'
        this.handleApiError(err, this.$t(`msg["${msgKey}"]`))
      }
    },

    async checkSlugExists(slug) {
      try {
        this.$store.dispatch('setLoading', true)
        await Admin.headPostBySlug(this.serviceId, slug, this.adminUserToken)
        this.$store.dispatch('setLoading', false)
        return true
      } catch (err) {
        this.$store.dispatch('setLoading', false)
        if (err.response == null || err.response.status !== 404) {
          this.handleApiError(err)
        }
        return false
      }
    },

    cancel() {
      this.resetInputs()
      this.$router.push(`/admin/posts/${this.serviceId}`)
    },

    validateAll() {
      this.fieldKeys.map(field => {
        this.validate(field)
      })
      if (this.hasErrors) {
        this.globalError = this.$t("msg['Correct inputs with error']")
      } else if (this.isEmptyAllFields) {
        this.globalError = this.$t("msg['Input required']")
      }
    },

    validate(field) {
      const key = 'validate' + str.capitalize(field)
      this[key]()
    },

    async validateSlug() {
      this.initError('slug')
      if (this.slug === null) this.slug = ''
      this.slug = this.slug.trim()
      if (this.checkEmpty(this.slug)) {
        this.errors.slug.push(this.$t('msg["Input required"]'))
      } else if (str.checkSlug(this.slug) === false) {
        this.errors.slug.push(this.$t('msg.InvalidInput'))
      } else if (this.isEdit === false || this.slug !== this.post.slug) {
        const isExists = await this.checkSlugExists(this.slug)
        if (isExists) {
          this.errors.slug.push(this.$t('msg["Already in use"]'))
        }
      }
    },

    async validateCategory() {
      this.initError('category')
      if (this.category === null) this.category = ''
      this.category = this.category.trim()
      if (this.checkEmpty(this.category)) {
        this.errors.category.push(this.$t('msg["Input required"]'))
      } else if (str.checkSlug(this.category) === false) {
        this.errors.category.push(this.$t('msg.InvalidInput'))
      }
    },

    validateTitle() {
      this.initError('title')
      if (this.title === null) this.title = ''
      this.title = this.title.trim()
      if (this.checkEmpty(this.title)) this.errors.title.push(this.$t('msg["Input required"]'))
    },

    validateBody() {
      this.initError('body')
      if (this.body === null) this.body = ''
      this.body = this.body.trimEnd()
      if (this.checkEmpty(this.body)) this.errors.body.push(this.$t('msg["Input required"]'))
    },

    validatePublishAt() {
      this.initError('publishAt')
    },
  },
}
</script>

