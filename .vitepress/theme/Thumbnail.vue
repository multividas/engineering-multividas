<script setup lang="ts">
const props = defineProps<{ src: string }>()
</script>

<template>
  <img width="100%" height="380" :src="props.src" alt="multividas-thumbnail-alt">
</template>
