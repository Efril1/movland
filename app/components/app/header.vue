<script setup lang="ts">
interface NavigationMenuItem {
  label: string
  to: string
  active?: boolean
}

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Movies',
    to: '/movies',
    active: route.path.startsWith('/movies'),
  },
  {
    label: 'Series',
    to: '/series',
    active: route.path.startsWith('/series'),
  },
])
</script>

<template>
  <UHeader
    class="flex top-0 left-0 w-full bg-darkpurple/70 backdrop-blur-md"
  >
    <template #title>
      <ULink
        to="/"
        class="text-2xl font-bold text-lightpink dark:text-lightpink"
      >
        MOVLAND
      </ULink>
    </template>

    <UNavigationMenu :items="items" class="hidden md:flex">
      <template #item="{ item }">
        <ULink
          :to="item.to"
          class="w-full h-full text-lg px-3 hover:text-primary"
          :class="{ 'text-primary font-semibold': item.active }"
        >
          {{ item.label }}
        </ULink>
      </template>
    </UNavigationMenu>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5 lg:hidden"
      />
    </template>

    <template #right>
      <UButton
        icon="i-lucide-github"
        color="neutral"
        to="https://github.com/Efril1"
        variant="ghost"
      />
    </template>
  </UHeader>
</template>
