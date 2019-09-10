<template>
  <div class="container container--account">
    <div class="row row--full">
      <v-hero
        :hero="hero"
        float="right"
        classes="colapsed"
      ></v-hero>
    </div>
    <div class="row">
      <h3>You don't have indexed any content yet!</h3>
    </div>
    <div class="row">
      <v-indexer-card :data="cardData" :title="fileName" v-on:handleAction="handleCardAction">
        <template v-slot:footer>
          <div class="actions-footer">
            <button class="btn btn--success" @click="save()">Save Content</button>
          </div>
        </template>
      </v-indexer-card>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import IndexerCard from '@/components/IndexerCard'

export default {
  name: 'Home',
  data () {
    return {
      hero: {
        title: 'Account'
      },
      cardData: {
        'title': '',
        'description': '',
        'tags': ''
      },
      fileName: 'teste.zip'
    }
  },
  components: {
    'v-hero': Hero,
    'v-indexer-card': IndexerCard
  },
  methods: {
    handleCardAction (action) {
      if (action === 'remove') {
      } else {
        this.cardData = {
          'title': 'This is a Title',
          'description': 'This is a Description',
          'tags': 'Tag1, Tag2, Tag3'
        }
      }
    },
    save () {
      console.log('save')
    }
  }
}
</script>

<style>
.actions-footer {
  text-align: right;
}
</style>
