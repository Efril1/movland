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

  <div v-else class="overflow-auto">
    <USeparator class="mb-5 mt-5">
      <h1 class="text-2xl font-bold capitalize text-lightpink">
        Discover Movies
      </h1>
    </USeparator>

    <div
      class="grid gap-4 justify-center
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6"
    >
      <MediaCard
        v-for="mitem in mediaStore.media.filter(m => m.media_type === 'movie')"
        :key="mitem.id"
        :media="mitem"
      />
    </div>

    <USeparator class="mb-5 mt-5">
      <h1 class="text-2xl font-bold text-lightpink">
        Discover Series
      </h1>
    </USeparator>

    <div
      class="grid gap-4 justify-center
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6"
    >
      <MediaCard
        v-for="titem in mediaStore.media.filter(m => m.media_type === 'tv')"
        :key="titem.id"
        :media="titem"
      />
    </div>
  </div>
</template>
