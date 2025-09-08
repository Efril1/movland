<script setup lang="ts">
interface Props {
  media: Media
}

const props = defineProps<Props>()

const type = ref<MediaType>()
onMounted(() => {
  type.value = props.media.title ? 'movie' : 'tv'
})
</script>

<template>
  <div class="flex flex-col items-center bg-transparent rounded-lg overflow-hidden">
    <NuxtLink :to="{ name: 'itemid', params: { type: props.media.media_type, id: props.media.id } }">
      <img
        :src="props.media?.poster_path ? `https://image.tmdb.org/t/p/original${props.media.poster_path}` : '/fallback.png'"
        :alt="props.media.title"
        class="h-[300px] w-full object-cover"
      >
    </NuxtLink>
    <div>
      <NuxtLink :to="{ name: 'itemid', params: { type: props.media.media_type, id: props.media.id } }" class="p-2 w-full text-center text-sm truncate">
        {{ props.media.title ?? props.media.name }}
      </NuxtLink>
    </div>
  </div>
</template>
