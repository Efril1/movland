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

  <div v-else>
    <h1 class="relative text-2xl font-bold mb-2">
      Movies
    </h1>
    <div class="grid grid-cols-10 gap-4 overflow-auto">
      <div v-for="mitem in mediaStore.movies" :key="mitem.id">
        <NuxtLink
          :to="{ name: 'itemid', params: { type: 'movie', id: mitem.id } }"
        >
          <img
            :src="`https://image.tmdb.org/t/p/original${mitem.poster_path}`"
            :alt="mitem.title"
            class="h-48 w-96 object-contain"
          >
        </NuxtLink>

        <div class="text-center text-sm">
          {{ mitem.title }}
        </div>
      </div>
    </div>

    <h1 class="text-2xl font-bold mb-2">
      Series
    </h1>
    <div class="grid grid-cols-10 gap-4 overflow-auto">
      <div v-for="titem in mediaStore.tvs" :key="titem.id">
        <NuxtLink
          :to="{ name: 'itemid', params: { type: 'tv', id: titem.id } }"
        >
          <img
            :src="`https://image.tmdb.org/t/p/original${titem.poster_path}`"
            :alt="titem.title"
            class="h-48 w-96 object-contain"
          >
        </NuxtLink>
        <div class="text-center text-sm">
          {{ titem.title }}
        </div>
      </div>
    </div>
  </div>
</template>
