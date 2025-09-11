<template>
  <div class="fixed left-0 top-0 w-screen h-screen flex flex-col overflow-auto">
    <AppHeader />

    <main class="min-h-screen flex flex-col items-center">
      <slot />
    </main>
  </div>
</template>
