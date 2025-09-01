export const useTvStore = defineStore('tv', () => {
    const tvs = ref<MediaItem[]>([]) // <- use MediaItem type
  
    async function fetchTvs() {
      const config = useRuntimeConfig()
      const apiKey = config.public.TMDB_API_KEY
  
      const { data } = await useFetch<{ results: any[] }>(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
      )
  
      if (data.value?.results) {
        tvs.value = data.value.results.map(tv => ({
            ...tv,
            title: tv.title || tv.name,
        }))
      }
    }
  
    function getTvById(id: number) {
      const tv = tvs.value.find(m => m.id === id)
      if (!tv) throw new Error(`tv ${id} not found`)
      return tv
    }
  
    return {
      tvs,
      fetchTvs,
      getTvById,
    }
  })
  