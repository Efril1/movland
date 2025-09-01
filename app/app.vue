<script setup lang="ts">
const config = useRuntimeConfig()
console.warn('API Key:', config.public.TMDB_API_KEY)
</script>

<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
