<template>
  <div class="card">
    <div class="card-header">{{ title }}</div>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title'],
    mounted () {
      console.log('Panel Component mounted.')
    }
  }
</script>
