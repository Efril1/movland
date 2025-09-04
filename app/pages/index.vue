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
    <div
      class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-primary rounded-full"
      role="status"
      aria-label="loading"
    />
  </div>

  <div v-else class="overflow-auto">
    <h1 class="text-2xl font-bold mb-2 m-5 text-lightpink">
      Discover Movies
    </h1>
    <div
      class="grid gap-4 overflow-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-3"
    >
      <MediaCard
        v-for="mitem in mediaStore.movies"
        :key="mitem.id"
        :media="mitem"
        type="movie"
      />
    </div>

    <h1 class="text-2xl font-bold mb-2 mt-6 m-5 text-lightpink">
      Discover Series
    </h1>
    <div
      class="grid gap-4 overflow-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-3"
    >
      <MediaCard
        v-for="titem in mediaStore.tvs"
        :key="titem.id"
        :media="titem"
        type="tv"
      />
    </div>
  </div>
</template>
