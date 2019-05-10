<template>
  <div class="result">
    <h2>{{ searchValue }}</h2>
    <ul class="list list-results">
      <v-item-result v-for="(item, index) in searchResult" :key="index" :item="item"></v-item-result>
    </ul>
  </div>
</template>

<script>
import ItemResult from "@/components/ItemResult";
import { mapState, mapGetters, mapActions } from "vuex";
import Web3IndexerService from "janus-searchengine";
import Web3Config from "../utils/Web3Config.json";

export default {
  name: "SearchResult",
  components: {
    "v-item-result": ItemResult
  },
  computed: {
    ...mapState({
      searchResult: state => state.search.result,
      searchValue: state => state.search.value
    }),
    ...mapGetters("validation", ["getExceptionByType"]),
    ...mapGetters("search", ["getSearchValue", "getResults"]),
    ...mapActions("search", ["getResults"]),
    resultIsEmpty: function(value) {
      return this.searchResult === [];
    },
    hasExceptions: function() {
      return this.exceptions.length > 0;
    },
    hasEmptyReturn: function() {
      return this.getExceptionByType("Empty Return");
    }
  },
  data() {
    return {
      exceptions: []
    };
  },
  methods: {
    async getSearchResult() {
      let indexerService = new Web3IndexerService(Web3Config);
      let result = await indexerService.ListByTags(
        "0x5b4381941250afa470732a64f6cd215f903ceaf3",
        0,
        ["tag1"]
      );
      console.log(result);
      return indexerService;
    },
    validate: function(e) {
      if (this.isEmpty(this.searchResult)) {
        this.exceptions.push(this.resultIsEmpty);
      }
    }
  },
  mounted() {
    this.getSearchResult();
  }
};
</script>
<style scoped>
.list-results {
  padding: 0%;
}
</style>
