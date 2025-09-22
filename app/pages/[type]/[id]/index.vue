<script setup lang="ts">
import { MediaCast, MediaKeywords, MediaSocials, MediaVideoSection } from '#components'
import StarRating from '~/components/starRating.vue'

definePageMeta({ name: 'itemid' })

const route = useRoute()
const mediaDetailsStore = useMediaDetailsStore()
const type = route.params.type as 'movie' | 'tv'
const id = Number(route.params.id)
const videosStore = useVideosStore()
const creditsStore = useCreditsStore()
const externalIdsStore = useExternalIdsStore()
const keywordsStore = useKeywordsStore()

const tabItems = [{
  label: 'Video',
  slot: 'video',
}, {
  label: 'Poster',
  slot: 'poster',
}]

const { pending } = await useAsyncData('fetchmediabyid', () => {
  return Promise.all([
    mediaDetailsStore.fetchMediaById(id, type),
    videosStore.fetchMediaById(id, type),
    creditsStore.fetchMediaById(id, type),
    externalIdsStore.fetchMediaById(id, type),
    keywordsStore.fetchMediaById(id, type),
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
  <div v-else class=" overflow-x-hidden">
    <div class="hidden sm:block absolute left-0 right-0 w-screen sm:h-[300px] md:h-[400px] lg:h-[580px] overflow-hidden">
      <div class="flex flex-row h-full">
        <div class="w-[40%] bg-black h-full" />
        <img :src="`https://image.tmdb.org/t/p/original${mediaDetailsStore.selectedMedia.backdrop_path}`" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-black from-40% to-transparent" />
      <div class="absolute inset-0 flex items-center p-8">
        <div class="w-full max-w-7xl flex-grow  px-3 sm:px-0 md:px-0 lg:px-1">
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

    <div class="flex sm:flex-row sm:pt-[300px] md:pt-[400px] lg:pt-[580px]">
      <div class="md:w-9/10">
        <MediaDetails
          :media="mediaDetailsStore.selectedMedia"
        />
      </div>

      <div class="hidden md:flex md:flex-col md:mt-20 md:mx-auto md:space-y-5">
        <span class="font-bold ">Socials:</span>

        <div>
          <MediaSocials
            :externalids="externalIdsStore.selectedMedia"
            :media="mediaDetailsStore.selectedMedia"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Keywords:</span>
          <MediaKeywords :keywords="keywordsStore.selectedMedia" />
        </div>
      </div>
    </div>
    <div class="md:hidden relative flex-col space-y-5">
      <div class="flex flex-row gap-2 overflow-x-auto no-scrollbar pr-10">
        <MediaKeywords :keywords="keywordsStore.selectedMedia" />
      </div>
    </div>

    <UTabs :items="tabItems" variant="link" :ui="{ trigger: 'grow' }" class="w-4/5 gap-4 mx-auto">
      <template #video>
        <MediaVideoSection
          :trailer="trailer"
        />
      </template>
      <template #poster>
        <img :src="`https://image.tmdb.org/t/p/original${mediaDetailsStore.selectedMedia.poster_path}`" class="w-100 h-150 mx-auto">
      </template>
    </UTabs>

    <div v-if="creditsStore.selectedMedia" class="flex justify-center items-center mx-auto pt-8">
      <span class="font-bold ">Cast</span>
    </div>

    <div v-if="creditsStore.selectedMedia" class="flex flex-col gap-2 overflow-x-auto no-scrollbar pr-10 pt-8">
      <MediaCast :media="creditsStore.selectedMedia" />
    </div>

    <div class="md:hidden flex justify-center items-center mx-auto pt-6 pb-6">
      <span class="font-bold ">Socials</span>
    </div>
    <div class="md:hidden flex w-full justify-center gap-4">
      <MediaSocials :externalids="externalIdsStore.selectedMedia" :media="mediaDetailsStore.selectedMedia" />
    </div>
  </div>
</template>
