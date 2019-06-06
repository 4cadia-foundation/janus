<template>
  <button type="submit" class="btn btn-primary">
    <svg
      class="icon-search"
      title="Search"
      viewBox="0 0 24 24"
      width="64"
      height="64"
      fill="currentcolor"
    >
      <path
        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ButtonSearch',
  components: {
  },
  props: {
  }
}
</script>
<style scoped>
.btn {
  border-radius: 16px;
  width: 50px;
  height: 100%;
  vertical-align: middle;
  position: absolute;
  right: 0;
  top: 0;
  color: var(--color-gray);
}

.btn:active svg {
  color: var(--color-primary);
}

.icon-search {
  width: 100%;
  height: 100%;
}

.submited .btn {
  right: 10%;
  height: 100%;
  color: white;
}

.submited .btn:active svg {
  color: var(--color-gray-lighter);
}

</style>
