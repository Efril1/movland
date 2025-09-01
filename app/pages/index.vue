<script setup lang="ts">
const movieStore = useMovieStore()
const tvStore = useTvStore()

const isLoading = ref(true)
const Mitems = ref<MediaItem[]>([])
const Titems = ref<MediaItem[]>([])

async function initialize() {
  try {
    await movieStore.fetchMovies()
    Mitems.value = movieStore.movies
    await tvStore.fetchTvs()
    Titems.value = tvStore.tvs
  }
  catch (error) {
    console.error('Failed to fetch:', error)
  }
  finally {
    isLoading.value = false
  }
}
initialize()
</script>

<template>
  <div v-if="isLoading" class="text-center font-bold">
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
      <div v-for="mitem in Mitems" :key="mitem.id">
        <NuxtLink
          :to="{ name: 'itemid', params: { type: 'series', id: mitem.id } }"
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
      <div v-for="titem in Titems" :key="titem.id">
        <NuxtLink
          :to="{ name: 'itemid', params: { type: 'series', id: titem.id } }"
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
