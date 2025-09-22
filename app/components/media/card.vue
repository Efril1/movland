<script setup lang="ts">
import { UIcon } from '#components'

const props = defineProps<{
  media: Media
}>()
const type = ref<MediaType>()
onMounted(() => {
  type.value = props.media.title ? 'movie' : 'tv'
})
</script>

<template>
  <div class="flex flex-col items-center bg-transparent overflow-hidden">
    <NuxtLink
      :to="{ name: 'itemid', params: { type: props.media.media_type, id: props.media.id } }"
      class="w-full relative overflow-hidden group"
    >
      <img
        :src="props.media?.poster_path ? `https://image.tmdb.org/t/p/original${props.media.poster_path}` : '/fallback.png'"
        :alt="props.media.title"
        class="w-full aspect-[2/3] object-cover transition-transform duration-300 transform group-hover:scale-105"
      >
    </NuxtLink>

    <div class="flex flex-col items-center bg-transparent overflow-hidden w-full max-w-full pt-2">
      <NuxtLink
        :to="{ name: 'itemid', params: { type: props.media.media_type, id: props.media.id } }"
        class="text-center text-sm truncate block max-w-full font-bold hover:text-primary"
      >
        {{ props.media.title ?? props.media.name }}
      </NuxtLink>
    </div>

    <div class="flex flex-row  pointer-events-none mt-2">
      <StarRating
        :rating="(props.media.vote_average / 2)"
        class="pt-1"
      />
      <UIcon name="lucide-dot" class="flex self-center text-gray-400" />
      <span class="text-gray-400 self-center text-sm">
        {{ props.media.media_type === 'movie' ? 'MV' : props.media.media_type === 'tv' ? 'TV' : '' }}
      </span>
    </div>
  </div>
</template>
