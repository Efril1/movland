<script setup lang="ts">
import { NuxtLink } from '#components'

interface Props {
  media: Media
  type: MediaType
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center">
    <NuxtLink :to="{ name: 'itemid', params: { type: props.type, id: props.media.id } }">
      <img
        :src="`https://image.tmdb.org/t/p/original${props.media.poster_path}`"
        :alt="props.media.title"
        class="h-[350px] w-[480px] object-contain rounded-lg"
      >
    </NuxtLink>
    <NuxtLink class="text-center text-sm mt-2">
      {{ props.media.title }}
    </NuxtLink>
  </div>
</template>
