<script setup lang="ts">
import { MediaVideoSection } from '#components'
import StarRating from '~/components/starRating.vue'

definePageMeta({ name: 'itemid' })

const route = useRoute()
const mediaDetailsStore = useMediaDetailsStore()
const type = route.params.type as 'movie' | 'tv'
const id = Number(route.params.id)
const videosStore = useVideosStore()

const { pending } = await useAsyncData('fetchmediabyid', () => {
  return Promise.all([
    mediaDetailsStore.fetchMediaById(id, type),
    videosStore.fetchMediaById(id, type),
  ])
})

const results = videosStore.selectedMedia?.results ?? []

let trailer
  = results.find((v: any) => v.type === 'Trailer' && v.official && v.site === 'YouTube')

if (!trailer) {
  trailer = results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
}

if (!trailer) {
  trailer = results.find((v: any) => v.site === 'YouTube')
}
</script>

<template>
  <div v-if="pending" class="text-center font-bold">
    <Spinner />
  </div>
  <div v-else class="overflow-y-auto overflow-x-hidden">
    <div class="hidden sm:block relative w-screen sm:h-[300px] md:h-[400px] lg:h-[580px] overflow-hidden">
      <div class="flex flex-row h-full">
        <div class="w-[40%] bg-black h-full" />
        <img :src="`https://image.tmdb.org/t/p/original${mediaDetailsStore.selectedMedia.backdrop_path}`" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-black from-40% to-transparent" />
      <div class="absolute inset-0 flex items-center p-8">
        <div class="w-full">
          <div class=" text-white">
            <h1 class="text-5xl font-bold mb-4">
              {{ mediaDetailsStore.selectedMedia.title || mediaDetailsStore.selectedMedia.name }}
            </h1>
          </div>
          <StarRating
            :rating="(mediaDetailsStore.selectedMedia.vote_average / 2)"
          />
          <div class="hidden sm:block min-w-7/12 max-w-7/12 text-white">
            <p class="text-lg ">
              {{ mediaDetailsStore.selectedMedia.tagline }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <MediaDetails
      :media="mediaDetailsStore.selectedMedia"
    />
    <MediaVideoSection
      :trailer="trailer"
    />
  </div>
</template>
