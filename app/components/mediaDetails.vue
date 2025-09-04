<script setup lang="ts">
import bgImage from '~/assets/images/blur-bg.png'

const props = defineProps<{
  media: Media
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row gap-11 pt-20 pb-20 bg-cover bg-no-repeat bg-center" :style="{ backgroundImage: `url(${bgImage})` }">
    <img
      :src="`https://image.tmdb.org/t/p/original${props.media.poster_path}`"
      class="flex rounded-lg w-1/5 h-1/5 object-cover pl-3 mx-auto"
    >

    <div class="flex-col max-w-2xl space-y-6 order-2 md:order-none">
      <h1 class="text-5xl font-bold mb-2 capitalize text-center md:text-left">
        {{ props.media.title || props.media.name }}
      </h1>
      <div class="pt-10 text-center md:text-left">
        <p class="font-bold">
          Overview:
        </p>
        <p>{{ props.media.overview }}</p>
      </div>
    </div>

    <div class="flex-col w-full md:w-auto md:ml-auto mr-3 bg-white/20 p-8 md:p-2 mt-5 md:mt-0 order-3 md:order-none rounded-xl">
      <div class="space-y-6">
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Aired:
          </p>
          <span class="pl-2">{{ props.media.release_date || props.media.first_air_date }}</span>
        </div>
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Rating:
          </p>
          <span class="pl-2">{{ props.media.vote_average?.toFixed(1) }} / 10</span>
        </div>
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Status:
          </p>
          <span class="pl-2">{{ props.media.status }}</span>
        </div>
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Runtime:
          </p>
          <span class="pl-2">{{ props.media.runtime }} min</span>
        </div>
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Genres:
          </p>
          <div class="pl-2 text-right md:text-left">
            <span v-for="(genre, index) in props.media.genres ?? []" :key="genre.id">
              {{ genre.name }}<span v-if="index < (props.media.genres?.length ?? 0) - 1">,&nbsp;</span>
            </span>
          </div>
        </div>
        <div class="flex justify-between md:justify-start">
          <p class="font-bold">
            Producers:
          </p>
          <div class="pl-2 text-right md:text-left">
            <UBadge v-for="(company, index) in props.media.production_companies ?? []" :key="company.id">
              {{ company.name }}<span v-if="index < (props.media.production_companies?.length ?? 0) - 1">, </span>
            </UBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
