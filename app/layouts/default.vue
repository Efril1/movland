<template>
  <div class="fixed left-0 top-0 w-screen h-screen flex flex-col overflow-auto">
    <AppHeader />

    <main class="flex flex-col h-full w-full">
      <slot />
    </main>
  </div>
</template>
