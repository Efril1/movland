<script setup lang="ts">
const mediaStore = useMediaStore()

const { pending } = await useAsyncData('fetchmedia', () => {
  return Promise.all([
    mediaStore.fetchMedia('tv'),
    mediaStore.fetchMedia('movie'),
  ])
})
</script>

<template>
  <div v-if="pending" class="text-center font-bold">
    <Spinner />
  </div>

  <div v-else>
    <MediaHorizontalScroll
      id="movies"
      title="Trending Movies"
      :media="mediaStore.media.filter(m => m.media_type === 'movie')"
    />

    <MediaHorizontalScroll
      id="series"
      title="Trending Series"
      :media="mediaStore.media.filter(m => m.media_type === 'tv')"
    />
  </div>
</template>
