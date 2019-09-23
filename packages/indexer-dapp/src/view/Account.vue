<template>
  <div class="container container--account">
    <div class="row row--full">
      <v-hero :hero="hero" float="right" classes="colapsed"></v-hero>
    </div>
    <div class="row" v-if="sites.length > 0">
      <v-indexer-card
        v-for="site in sites"
        :key="site.hash"
        :data="site"
        :title="site.title"
        v-on:handleActionRemove="openModalRemoveSite(site.hash)"
      >
        <template v-slot:footer>
          <v-indexer-modal
            :ref="`modalCard[${site.hash}]`"
            :modalData="site"
            :key="site.hash"
            v-on:handleConfirm="remove(site)"
          />
          <div class="actions-footer">
            <button type="button" class="btn btn--success" @click="save(site)">
              Save Content
            </button>
          </div>
        </template>
      </v-indexer-card>
    </div>
    <div class="row" v-else>
      <h3>You don't have indexed any content yet!</h3>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import IndexerCard from '@/components/IndexerCard'
import IndexerModal from '@/components/IndexerModal'
import { Indexer } from '@4cadia/janus-indexer-core'
import { mapState } from 'vuex'
import LocalStorage from '../utils/localStorage'

function normalizeTags (tags) {
  if (Array.isArray(tags)) {
    return tags
  }

  return tags.split(/\s*,\s*/).filter(s => s.trim() !== '')
}

export default {
  name: 'Home',
  components: {
    'v-hero': Hero,
    'v-indexer-card': IndexerCard,
    'v-indexer-modal': IndexerModal
  },
  data () {
    return {
      hero: {
        title: 'Account'
      },
      sites: [],
      indexer: {
        type: Indexer
      }
    }
  },
  computed: {
    ...mapState({
      instance: state => state.web3.instance()
    })
  },
  mounted () {
    this.connectToContract()
  },
  methods: {
    handleCardAction (action, site) {
      if (action === 'remove') {
        this.remove(site)
      }
    },
    connectToContract () {
      let options = {
        ipfsHost: LocalStorage.getItem('ipfsHost'),
        contractAddress: LocalStorage.getItem('contractAddress'),
        contractAbi: LocalStorage.getItem('contractAbi')
      }

      options = Object.entries(options).reduce(
        (acc, [key, value]) =>
          value ? Object.assign(acc, { [key]: value }) : acc,
        {}
      )

      this.indexer = new Indexer(this.instance.currentProvider, options)

      this.indexer.ListWebsitesByOwner().then(listResult => {
        this.sites = listResult.Result
      })
    },
    openModalRemoveSite (hash) {
      console.log('openModalRemoveSite', { hash })
      let ref = this.$refs['modalCard[' + hash + ']']
      ref[0].openIndexerModal()
    },
    save (site) {
      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      if (this.indexer) {
        site.tags = normalizeTags(site.tags)
        this.indexer.UpdateWebsite(site).then(updateResponse => {
          this.loader.hide()
          this.$notification.success(`Success! Your website has update!`)
        })
      }
    },
    remove (site) {
      let ref = this.$refs['modalCard[' + site.hash + ']']
      ref[0].closeIndexerModal()

      this.loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer
      })

      if (this.indexer) {
        this.indexer.DeleteWebSite(site).then(deleteRsponse => {
          this.sites = this.sites.filter(website => {
            if (JSON.stringify(site) !== JSON.stringify(website)) {
              return website
            }
          })
          this.loader.hide()
          this.$notification.success(`Success! Your website removed!`)
        })
      }
    }
  }
}
</script>

<style>
.actions-footer {
  text-align: right;
}
</style>
