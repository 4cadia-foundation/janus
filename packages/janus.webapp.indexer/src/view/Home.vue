<template>
  <div class="container container--home">
    <div class="wrapper">
      <div class="col full">
        <v-hero :hero="this.content.list_hero[0]" float="right" classes="full-content">
          <v-list-actions/>
        </v-hero>
      </div>
      <div class="col" id="documentation">
        <v-paragraph :paragraph="this.content.list_paragraph[0]">
        </v-paragraph>
      </div>
    </div>
  </div>
</template>

<script>
import homeContent from '../../static/content/home.json'
import Hero from '@/components/Hero'
import ListIcon from '@/components/ListIcon'
import ListActions from '@/components/ListActions'
import Paragraph from '@/components/Paragraph'

export default {
  name: 'Home',
  data () {
    return {
      content: homeContent,
      title: 'Janus Indexer'
    }
  },
  components: {
    'v-hero': Hero,
    'v-list-icon': ListIcon,
    'v-list-actions': ListActions,
    'v-paragraph': Paragraph
  }
}
</script>

<style scoped>
</style>
