<template>
  <div class="container container--home">
    <div class="col" v-for="(block, index) in this.content" :key="index">
      <div class="row row--full" v-if="block['type']=='list_hero'">
        <v-hero v-if="block['type']=='list_hero'" :hero="block['content']" float="right" classes="full-content">
          <v-list-actions/>
        </v-hero>
      </div>
      <div class="row" v-if="block['type']=='list_card'">
        <v-cards-list :list="block['content']" cardStyle="wide" />
      </div>
      <div class="row" v-if="block['type']=='list_paragraph'">
        <v-paragraph :paragraph="block['content']">
          <div class="content">
            <div class="text">
              <p>To get started on the Janus Indexer platform, you will need to follow some procedures.</p>
              <section>
                <h3>The content to be indexed</h3>
                <p>To upload a content you will need to:</p>
                <ul>
                  <li>Have all your files inside a folder</li>
                  <li>Have an index.html in the root folder</li>
                  <li>Define the tags on your index.html</li>
                  <li>Compress this folder with .zip extension</li>
                </ul>
                <p>So first, let me example a static website that will be indexed, we need to have the files on a folder as the image above:</p>
                <img src="../../static/images/folder-print.png" alt="folder opened" title="folder">
                <p>As we can see we have some files inside a folder and the most important file is the index.html that contains the tags to be referenced on the Janus Search. For the Index.html tags we have three meta types:</p>
                <ul>
                  <li>Title: The title of your website that will appear on the Search result</li>
                  <li>Description:  An brief description of your website</li>
                  <li>Keywords: The words to be referenced on the search</li>
                </ul>
                <p>See an example of index.html on the website we used as template:</p>
                <img src="../../static/images/code.png" alt="enter image description here" width="100%">
                <p>Now that we have our content, we need to compress this folder as a .zip. After that, login with Metamask on our application</p>
              </section>
              <section>
                <h3 id="login-with-metamask">Login with Metamask</h3>
                <p>If you don’t have the metamask installed on your computer, go to this URL and install on your preferred browser</p>
                <p>
                  <a href="https://metamask.io/">https://metamask.io</a>
                </p>
                <p>After install, click on the user button and login with your metamask account. A window will appear to you accept the connection with metamask, please confirm this action so you can use our platform. After this, you are ready to index content on our indexer</p>
              </section>
              <section>
                <h3 id="index-content">Index Content</h3>
                <p>Go to /indexer page and select your compressed folder<br> Click on the index content button and confirm the transaction on this window<br> When you see a green notification you can check your metamask recent transaction to see if there is a success status, if it is, your content can be searched on the Janus Search</p>
              </section>
            </div>
          </div>
        </v-paragraph>
      </div>
    </div>
  </div>
</template>

<script>
import contentService from '../api/contentService'
import Hero from '@/components/Hero'
import ListActions from '@/components/ListActions'
import Paragraph from '@/components/Paragraph'
import CardListBlock from '@/components/CardListBlock'

export default {
  name: 'Home',
  data () {
    return {
      content: [],
      title: 'Janus Indexer'
    }
  },
  components: {
    'v-hero': Hero,
    'v-list-actions': ListActions,
    'v-cards-list': CardListBlock,
    'v-paragraph': Paragraph
  },
  mounted: function () {
    contentService('home').then((response) => {
      this.content = response.data
    })
  }
}
</script>

<style scoped>
</style>
