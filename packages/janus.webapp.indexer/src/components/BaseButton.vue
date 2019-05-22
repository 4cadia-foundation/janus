<template>
  <button type="submit" class="btn btn-primary">
    {{buttonName}}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  components: {},
  methods: {
  },
  props: {
    buttonName: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log(this.buttonName)
  }
}
</script>

<style scoped>
.btn {
  position: relative;
  transition: all 0.15s ease 0s;
  text-align: left;
  color: rgb(255, 255, 255);
  background: #4E3FCE;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 32px;
  padding-right: 32px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  height: 30px;
  min-width: 50px;
  margin: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  border-radius: 4px;
}
.btn--alert {
  background: #DC2C10;
}
.btn--success {
  background: #28C081;
}
</style>
