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
        class="h-[300px] w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
      >
    </NuxtLink>
    <div class="flex flex-row gap-3 pointer-none">
      <StarRating
        :rating="(props.media.vote_average / 2)"
        class="pt-1"
      />
      <UIcon name="lucide-dot" class="flex self-center text-gray-400 " />
      <span class="text-gray-400 self-center text-sm ">{{ props.media.release_date?.slice(0, 4) }}</span>
    </div>
    <div class="flex flex-col items-center bg-transparent overflow-hidden w-full max-w-[200px]">
      <NuxtLink
        :to="{ name: 'itemid', params: { type: props.media.media_type, id: props.media.id } }"
        class=" text-center text-sm truncate block max-w-full font-bold hover:text-primary"
      >
        {{ props.media.title ?? props.media.name }}
      </NuxtLink>
    </div>
  </div>
</template>
