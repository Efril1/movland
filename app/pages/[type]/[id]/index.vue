<script setup lang="ts">
import bgImage from '~/assets/images/blur-bg.png'

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
  <div>
    <div v-if="pending" class="text-center font-bold">
      <div class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading" />
    </div>
    <div v-else class="flex gap-11 pt-20 pb-20 bg-cover bg-no-repeat bg-center" :style="{ backgroundImage: `url(${bgImage})` }">
      <br>
      <img :src="`https://image.tmdb.org/t/p/original${mediaDetailsStore.selectedMedia.poster_path}`" class="flex rounded-lg w-1/5 h-1/5 object-cover">
      <div class="flex-col max-w-2xl space-y-6">
        <h1 class=" text-5xl font-bold mb-2 capitalize">
          {{ mediaDetailsStore.selectedMedia.title || mediaDetailsStore.selectedMedia.name || mediaDetailsStore.selectedMedia.original_name }}
        </h1>
        <div class="pt-10">
          <p class="font-bold">
            Overview:
          </p>
          <p class="">
            {{ mediaDetailsStore.selectedMedia.overview }}
          </p>
        </div>
      </div>
      <div class="flex w-full ml-100 mr-3 -mt-20 -mb-20  bg-white/20 ">
        <div class=" pl-8 mt-15 md-15 flex-col max-w-2xl space-y-6">
          <br>

          <div class="flex">
            <p class="font-bold">
              Aired:
            </p>
            <span class="pl-2"> {{ mediaDetailsStore.selectedMedia.release_date || mediaDetailsStore.selectedMedia.first_air_date }}</span>
          </div>
          <div class="flex">
            <p class="font-bold">
              Rating:
            </p>
            <span class="pl-2"> {{ mediaDetailsStore.selectedMedia.vote_average?.toFixed(1) }} / 10</span>
          </div>

          <div class="flex">
            <p class="font-bold">
              Status:
            </p>
            <span class="pl-2">
              {{ mediaDetailsStore.selectedMedia.status }}
            </span>
          </div>
          <div class="flex">
            <p class="font-bold">
              Runtime:
            </p>
            <span class="pl-2">
              {{ mediaDetailsStore.selectedMedia.runtime }} min
            </span>
          </div>

          <div class="flex">
            <p class="font-bold">
              Genres:
            </p>
            <div class="pl-2">
              <span v-for="(genre, index) in mediaDetailsStore.selectedMedia.genres" :key="genre.id">
                {{ genre.name }}<span v-if="index < mediaDetailsStore.selectedMedia.genres.length - 1">,&nbsp;</span>
              </span>
            </div>
          </div>

          <div class="flex">
            <p class="font-bold">
              Producers:
            </p>
            <div class="pl-2">
              <UBadge v-for="(company, index) in mediaDetailsStore.selectedMedia.production_companies" :key="company.id">
                {{ company.name }}<span v-if="index < mediaDetailsStore.selectedMedia.production_companies.length - 1">, </span>
              </UBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
