<script setup lang="ts">
import MediaDetails from '~/components/mediaDetails.vue'

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
    <MediaDetails
      :media="mediaDetailsStore.selectedMedia"
    />
  </div>
</template>
