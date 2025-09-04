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
  <div v-if="pending" class="text-center font-bold">
    <div
      class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-primary rounded-full"
      role="status"
      aria-label="loading"
    />
  </div>

  <div v-else class="overflow-auto p-3">
    <h1 class="text-2xl font-bold mb-7 capitalize text-lightpink pl-2">
      <div v-if="type === 'tv'">
        tv series
      </div>
      <div v-else>
        {{ type }}
      </div>
    </h1>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <MediaCard
        v-for="item in items"
        :key="item.id"
        :media="item"
        :type="type"
      />
    </div>
  </div>
</template>
