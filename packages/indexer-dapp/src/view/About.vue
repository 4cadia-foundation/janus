<template>
  <div class="container container--about">
    <div class="col" v-for="(block, index) in this.content" :key="index">
      <div class="row row--full" v-if="block['type']=='list_hero'">
        <v-hero :hero="block['content']" float="right" classes="">
        </v-hero>
      </div>
      <div class="row" v-if="block['type']=='list_paragraph'">
        <v-paragraph :paragraph="block['content']"/>
      </div>
      <div class="row" v-if="block['type']=='list_card'">
        <v-cards-list :list="block['content']" cardStyle="wide" />
      </div>
    </div>
  </div>
</template>

<script>
import contentService from '../api/contentService'
import Hero from '@/components/Hero'
import Paragraph from '@/components/Paragraph'
import CardListBlock from '@/components/CardListBlock'

export default {
  name: 'About',
  data () {
    return {
      content: []
    }
  },
  components: {
    'v-hero': Hero,
    'v-cards-list': CardListBlock,
    'v-paragraph': Paragraph
  },
  mounted: function () {
    contentService('about').then((response) => {
      this.content = response.data
    })
  }
}
</script>

<style>
</style>
