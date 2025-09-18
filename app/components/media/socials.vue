<script setup lang="ts">
const props = defineProps<{
  externalids: ExternalIds
  media: Media
}>()

const socialsConfig: {
  key: keyof ExternalIds
  icon: string
  base?: string
}[] = [
  { key: 'imdb_id', icon: 'lucide-film', base: 'https://www.imdb.com/title/' },
  { key: 'facebook_id', icon: 'lucide-facebook', base: 'https://facebook.com/' },
  { key: 'instagram_id', icon: 'lucide-instagram', base: 'https://instagram.com/' },
  { key: 'twitter_id', icon: 'mingcute:social-x-line', base: 'https://x.com/' },
]

const availableSocials = computed(() =>
  socialsConfig.filter(s => props.externalids?.[s.key]),
)
</script>

<template>
  <UButton
    v-if="props.media?.homepage"
    key="homepage"
    icon="lucide-link"
    color="neutral"
    variant="ghost"
    class="max-w-full"
    :to="props.media.homepage"
    target="_blank"
  />
  <UButton
    v-for="social in availableSocials"
    :key="social.key"
    :icon="social.icon"
    color="neutral"
    variant="ghost"
    class="max-w-full"
    :to="social.base ? social.base + props.externalids[social.key] : props.externalids[social.key]"
    target="_blank"
  />
</template>
