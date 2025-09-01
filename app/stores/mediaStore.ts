export const useMediaStore = defineStore('media', () => {
    const selectedMedia = ref<any>(null)
  
    async function fetchMediaById(id: number) {
      const config = useRuntimeConfig()
      const apiKey = config.public.TMDB_API_KEY
  
      const { data } = await useFetch<any>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      )
  
      if (!data.value) throw new Error(`Media ${id} not found`)
      selectedMedia.value = data.value
    }
  
    return {
      selectedMedia,
      fetchMediaById,
    }
  })
  