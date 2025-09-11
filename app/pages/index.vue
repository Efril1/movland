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

  <div v-else class="overflow-auto p-3">
    <USeparator>
      <h1 class="text-2xl font-bold capitalize text-lightpink">
        Discover Movies
      </h1>
    </USeparator>

    <div class="flex flex-wrap gap-4 p-3 justify-center">
      <MediaCard
        v-for="mitem in mediaStore.media.filter(m => m.media_type === 'movie')"
        :key="mitem.id"
        :media="mitem"
      />
    </div>

    <USeparator>
      <h1 class="text-2xl font-bold text-lightpink">
        Discover Series
      </h1>
    </USeparator>

    <div class="flex flex-wrap gap-4 p-3 justify-center">
      <MediaCard
        v-for="titem in mediaStore.media.filter(m => m.media_type === 'tv')"
        :key="titem.id"
        :media="titem"
      />
    </div>
  </div>
</template>
