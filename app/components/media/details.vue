<script setup lang="ts">
const props = defineProps<{
  media: Media
}>()
</script>

<template>
  <div class="flex flex-col md:flex-row gap-11 pt-20 pb-20 px-4 bg-no-repeat bg-center bg-cover">
    <div>
      <img
        :src="`https://image.tmdb.org/t/p/original${props.media.poster_path}`"
        class="rounded-lg w-full max-w-[400px] min-w-[250px] object-cover mx-auto shrink-0"
      >
    </div>

    <div class="flex flex-col gap-4">
      <h1 class="text-5xl font-bold mb-2 capitalize text-center md:text-left">
        {{ props.media.title || props.media.name }}
      </h1>

      <div>
        <p>{{ props.media.overview }}</p>
      </div>

      <div
        v-for="item in [
          { label: 'Aired', value: props.media.release_date || props.media.first_air_date },
          { label: 'Rating', value: props.media.vote_average?.toFixed(1) },
          { label: 'Status', value: props.media.status },
          { label: 'Runtime', value: props.media.runtime },
        ]" :key="item.label" class="flex gap-2"
      >
        <p class="font-bold">
          {{ item.label }}:
        </p>
        <span> {{ item.value }} </span>
      </div>

      <div class="flex items-start gap-2">
        <p class="font-bold">
          Genres:
        </p>
        <div class="flex flex-wrap gap-2 text-primary">
          <p v-for="(genre, index) in props.media.genres ?? []" :key="genre.id">
            {{ genre.name }}<span v-if="index < (props.media.genres?.length ?? 0) - 1" />
          </p>
        </div>
      </div>

      <div class="flex items-start gap-2">
        <p class="font-bold">
          Producers:
        </p>
        <div class="flex flex-wrap gap-2 text-primary">
          <p v-for="(company, index) in props.media.production_companies ?? []" :key="company.id">
            {{ company.name }}<span v-if="index < (props.media.production_companies?.length ?? 0) - 1" />
          </p>
        </div>
      </div>

      <div>
        <p class="font-bold">
          Rating:
        </p>
        <StarRating
          :rating="(props.media.vote_average / 2)"
        />
      </div>
    </div>
  </div>
</template>
