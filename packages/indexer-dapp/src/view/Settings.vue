<template>
  <div class="container container--settings">
    <div class="col" v-for="(block, index) in this.content" :key="index">
      <v-hero v-if="block['type']=='list_hero'" :hero="block['content'][0]" float="right" classes="colapsed"/>
    </div>
    <div class="wrapper form--settings">
      <v-form-settings/>
    </div>
  </div>
</template>

<script>
import FormSettings from '@/components/FormSettings'
import contentService from '../api/contentService'
import Hero from '@/components/Hero'

export default {
  name: 'Settings',
  data () {
    return {
      title: 'Custom Settings',
      content: []
    }
  },
  components: {
    'v-hero': Hero,
    'v-form-settings': FormSettings
  },
  mounted: function () {
    contentService('settings').then((response) => {
      this.content = response.data
    })
  }
}
</script>
