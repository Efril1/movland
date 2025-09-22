<script setup lang="ts">
const mainContainer = ref<HTMLDivElement | null>(null)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    if (mainContainer.value)
      mainContainer.value.scrollTop = 0
  },
)
</script>

<template>
  <div ref="mainContainer" class="fixed left-0 top-0 w-screen h-screen flex flex-col overflow-auto">
    <div class="flex-grow">
      <AppHeader />

      <main class="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-3 md:px-3 lg:px-8">
        <slot />

        <div class="mt-20 mb-10 flex items-center gap-2 text-4xl font-bold text-lightpink dark:text-lightpink">
          <ULink to="/" class="hover:text-primary">
            MOVLAND
          </ULink>

          <span class="text-gray-400 text-2xl">|</span>

          <UButton
            icon="i-lucide-github"
            color="neutral"
            to="https://github.com/Efril1"
            variant="link"
            class="text-2xl hover:text-primary"
          />
        </div>
      </main>
    </div>
  </div>
</template>
