<template>
  <div class="card--indexer">
    <v-card ref="card" cardType="full" >
      <template v-slot:header>
        <div class="title">
          <h3 class="name">{{ title }}</h3>
        </div>
        <slot name="header"></slot>
      </template>

      <template v-slot:body>
        <div class="actions">
          <button v-on:click="handleAction('edit')" :class="`btn btn--clear btn--edit btn--icon`">
            <span class="icon" />
          </button>
          <button v-on:click="handleAction('remove')" :class="`btn btn--clear btn--remove btn--icon`">
            <span class="icon" />
          </button>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </template>

      <template v-slot:footer>
        <form :class="`card-form ${showContent ? 'open' : ''}`" v-on:submit.prevent>
          <div class="form_field">
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="text"
              inputName="title"
              inputLabel="Title: "
              class="label--dark"
              v-model="data.title"
              :required="true"
              :alphaNumeric="true"
              ref="titleInput"
            />
          </div>
          <div class="form_field">
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="text"
              inputName="description"
              inputLabel="Description: "
              class="label--dark"
              v-model="data.description"
              :required="true"
              :alphaNumeric="true"
              ref="descriptionInput"
            />
          </div>
          <div class="form_field">
            <v-input
              placeholderTxt="eg.: QmYbs8fHzYaXufL5gMyWB1XgnvbLRSqv9bb58LJHX3ziVv"
              inputType="textarea"
              inputName="tags"
              inputLabel="Tags: "
              class="label--dark"
              v-model="data.tags"
              :required="true"
              :alphaNumeric="true"
              ref="tagsInput"
            />
          </div>
          <slot name="footer"></slot>
        </form>
      </template>
    </v-card>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import Input from '@/components/Input'

export default {
  name: 'IndexerCard',
  data () {
    return {
      showContent: false
    }
  },
  props: {
    title: {
      type: String
    },
    data: {
      type: Object
    }
  },
  components: {
    'v-card': BaseCard,
    'v-input': Input
  },
  methods: {
    handleAction (action) {
      // this.$emit('handleAction', action, this.data)
      if (action === 'edit') {
        this.showContent = !this.showContent
      } else {
        this.$emit('handleActionRemove')
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.btn--icon {
  width: 50px;
  height: 50px;
  display: inline-block;
  border: 2px solid;
  margin-left: 20px;
}
.btn--icon .icon {
  mask-repeat: no-repeat;
  mask-size: 80%;
  mask-position: center;
  display: block;
  width: 100%;
  height: 100%;
}
.btn--remove {
  border-color: var(--color-red);
}
.btn--remove .icon {
  background: var(--color-red);
  mask-image: url("../assets/images/icon-remove.svg");
}
.btn--edit {
  border-color: var(--color-primary);
}
.btn--edit .icon {
  background: var(--color-primary);
  mask-image: url("../assets/images/icon-edit.svg");
}
.card--indexer {
  margin: 30px auto;
}
.card-form {
  max-height: 0;
  transition: max-height 0.2s ease-out;
  overflow: hidden;
}
.card-form.open {
  max-height: 1024px;
  transition: max-height 0.25s ease-in;
}
</style>
