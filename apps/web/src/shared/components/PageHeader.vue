<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold">
      {{ title }}
    </h1>

    <p v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>
