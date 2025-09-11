export const useMediaStore = defineStore('mediaDiscover', () => {
  const media = ref<Media[]>([])

  async function fetchMedia(mediaType: MediaType) {
    const config = useRuntimeConfig()
    const apiKey = config.public.TMDB_API_KEY

    const { data } = await useFetch<{ results: any[] }>(
      `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${apiKey}&language=en-US&page=1`,
    )

    if (data.value?.results) {
      const normalized = data.value.results.map(item => ({
        ...item,
        media_type: mediaType,
      }))

      media.value = [
        ...media.value.filter(m => m.media_type !== mediaType),
        ...normalized,
      ]
    }
  }

  function getMediaById(id: string | number) {
    const found = media.value.find(m => String(m.id) === String(id))
    if (!found)
      throw new Error(`Media ${id} not found`)
    return found
  }

  return {
    media,
    fetchMedia,
    getMediaById,
  }
})
