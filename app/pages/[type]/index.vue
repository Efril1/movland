<script setup lang="ts">
const route = useRoute()

const mediaStore = useMediaStore()

const type = computed(() => {
  const param = route.params.type as string
  return param === 'movies' ? 'movie' : 'tv'
})

const { data: items, pending } = await useAsyncData(
  `medialist-${type.value}`,
  async () => {
    await mediaStore.fetchMedia(type.value)
    return type.value === 'movie' ? mediaStore.movies : mediaStore.tvs
  },
  {
    watch: [type],
  },
)
</script>

<template>
  <div>
    <div v-if="pending" class="text-center font-bold">
      <div
        class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      />
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-2 capitalize">
        {{ type }}
      </h1>
      <div class="grid grid-cols-10 gap-4 overflow-auto">
        <div v-for="item in items" :key="item.id">
          <NuxtLink
            :to="{ name: 'itemid', params: { type: 'series', id: item.id } }"
          >
            <img
              :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
              :alt="item.title"
              class="h-48 w-96 object-contain"
            >
          </NuxtLink>

          <div class="text-center text-sm">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
