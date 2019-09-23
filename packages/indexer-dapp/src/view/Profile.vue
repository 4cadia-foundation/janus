<template>
  <div class="container container--profile">
    <div class="row row--full">
      <v-hero
        :hero="hero"
        float="right"
        classes="colapsed"
      ></v-hero>
    </div>
    <div class ="card-profile">
      <v-card ref="card" cardType="" >
        <template v-slot:header>
          <svg class="icon-account" title="Account" viewBox="0 0 24 24" width="90" height="90" fill="var(--color-gray)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z">
            </path>
          </svg>
        </template>
        <template v-slot:body>
          <ul>
            <li class="data-list" v-for="(item, index) in data" :key="index">
              <p class="overline">{{item.value}}</p>
            </li>
          </ul>
          <v-score-profile :profile-data="data" class="score"></v-score-profile>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoginProfile from '../components/LoginProfile'
import BaseCard from '@/components/BaseCard'
import Hero from '@/components/Hero'

export default {
  name: 'Profile',
  components: {
    'v-score-profile': LoginProfile,
    'v-card': BaseCard,
    'v-hero': Hero
  },
  computed: {
    ...mapState({
      userID: state => state.profile.userID,
      data: state => state.profile.data
    })
  },
  methods: {},
  data () {
    return {
      hero: {
        title: 'Profile'
      }
    }
  }
}
</script>

<style scoped>
  .container--profile {
  }
  .card-profile {
    min-width: 300px;
    min-height: 25vh;
    max-width: 70%;
    margin: 5% auto;
    padding: 1%;
    /* border: dashed 2px var(--color-blue); */
    border-radius: 2%;
    color: var(--color-blue);
  }
  .data-list {
    display: flex;
    justify-content: center;
    padding: 1%;
  }
</style>
