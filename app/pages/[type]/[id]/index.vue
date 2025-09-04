<script setup lang="ts">
import MediaDetails from '~/components/mediaDetails.vue'
import Spinner from '~/components/spinner.vue'

definePageMeta({ name: 'itemid' })

const route = useRoute()
const mediaDetailsStore = useMediaDetailsStore()
const type = route.params.type as 'movie' | 'tv'
const id = Number(route.params.id)

const { pending } = await useAsyncData('fetchmediabyid', () => {
  return Promise.all([
    mediaDetailsStore.fetchMediaById(id, type),
  ])
})
</script>

<template>
  <div v-if="pending" class="text-center font-bold">
    <Spinner />
  </div>
  <div v-else class="overflow-auto">
    <div class="relative w-full h-96 overflow-hidden">
      <img :src="`https://image.tmdb.org/t/p/original${mediaDetailsStore.selectedMedia.backdrop_path}`" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-r from-30% to-44% from-black to-transparent" />
      <div class="absolute inset-0 flex items-center p-8">
        <div>
          <div class="w-4/5 text-white">
            <h1 class="text-5xl font-bold mb-4">
              {{ mediaDetailsStore.selectedMedia.title || mediaDetailsStore.selectedMedia.name }}
            </h1>
          </div>
          <div class="hidden sm:block w-2/5 text-white">
            <p class="text-lg line-clamp-3">
              {{ mediaDetailsStore.selectedMedia.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <MediaDetails
      :media="mediaDetailsStore.selectedMedia"
    />
  </div>
</template>
