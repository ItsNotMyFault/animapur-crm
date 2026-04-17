<script setup lang="ts">
import { formRegistry } from '@/forms/registry'
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="grid md:grid-cols-2 gap-4">
      <UCard v-for="form in formRegistry" :key="form.name">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                :name="form.audience === 'client' ? 'i-lucide-user' : 'i-lucide-briefcase'"
                class="text-primary"
              />
              <h3 class="font-semibold">{{ form.label }}</h3>
            </div>
            <UBadge
              :label="form.audience"
              :color="form.audience === 'client' ? 'primary' : 'neutral'"
              variant="subtle"
            />
          </div>
        </template>

        <p class="text-sm text-muted mb-3">{{ form.description }}</p>
        <div class="text-xs text-muted mb-4">
          {{ Object.keys(form.dataSchema.properties).length }} champ(s)
        </div>

        <template #footer>
          <UButton
            :to="`/app/forms/${form.name}`"
            color="primary"
            variant="outline"
            trailing-icon="i-lucide-arrow-right"
            label="Ouvrir le formulaire"
            block
          />
        </template>
      </UCard>
    </div>
  </div>
</template>
