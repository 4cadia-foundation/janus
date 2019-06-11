<template>
  <div class="container container--about">
    <div class="col" v-for="(block, index) in this.content" :key="index">
      <v-hero v-if="block['type']=='list_hero'" :hero="block['content'][0]" float="right" classes="gray"/>
      <v-list-icon v-if="block['type']=='list_icon'" :list="block['content'][0]"/>
      <v-paragraph v-if="block['type']=='list_paragraph'" :paragraph="block['content'][0]"/>
    </div>
  </div>
</template>

<script>
import aboutContent from '../../static/content/about.json'
import Hero from '@/components/Hero'
import ListIcon from '@/components/ListIcon'
import Paragraph from '@/components/Paragraph'

export default {
  name: 'About',
  data () {
    return {
      content: aboutContent
    }
  },
  components: {
    'v-hero': Hero,
    'v-list-icon': ListIcon,
    'v-paragraph': Paragraph
  },
  mounted: function () {
  }
}
</script>

<style>
</style>
