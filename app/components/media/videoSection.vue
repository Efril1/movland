<script setup lang="ts">
const props = defineProps<{
  trailer?: {
    key: string
    name: string
    type: string
  }
}>()
</script>

<template>
  <div v-if="trailer" class="p-8">
    <div class="relative w-full aspect-video">
      <iframe
        :src="`https://www.youtube.com/embed/${props.trailer?.key}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="absolute top-0 left-0 w-full h-full rounded-xl"
      />
    </div>
  </div>
</template>
