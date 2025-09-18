<script setup lang="ts">
const route = useRoute()

const mediaStore = useMediaStore()

const type = computed<MediaType>(() => {
  const param = route.params.type as string
  return param === 'movies' ? 'movie' : 'tv'
})

const { data: items, pending } = await useAsyncData(
  `medialist-${type.value}`,
  async () => {
    await mediaStore.fetchMedia(type.value)
    return mediaStore.media.filter(m => m.media_type === type.value)
  },
  {
    watch: [type],
  },
)
</script>

<template>
  <div v-if="pending" class="text-center font-bold">
    <Spinner />
  </div>

  <div v-else class="overflow-auto p-3">
    <USeparator>
      <span class="text-2xl font-bold  capitalize text-lightpink pl-2">
        {{ type === 'movie' ? 'movies' : 'tv series' }}
      </span>
    </USeparator>
    <div
      class="grid gap-4 p-3 justify-center
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6"
    >
      <MediaCard
        v-for="item in items"
        :key="item.id"
        :media="item"
      />
    </div>
  </div>
</template>
