<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { getFormByName } from '@/forms/registry'
import FormRenderer from '@/forms/FormRenderer.vue'
import { useExportPdf } from '@/forms/useExportPdf'

const props = defineProps<{ name: string }>()

const form = computed(() => getFormByName(props.name))
const submittedData = ref<Record<string, unknown> | null>(null)
const mode = ref<'form' | 'report'>('form')

const pdfRef = useTemplateRef<HTMLElement>('pdfRoot')
const { exporting, exportPdf } = useExportPdf()

function onSubmit(data: Record<string, unknown>) {
  submittedData.value = data
  mode.value = 'report'
  console.log('[form submit]', form.value?.name, data)
}

async function handleExport() {
  if (!form.value) return
  await exportPdf(pdfRef.value, form.value.name)
}
</script>

<template>
  <div class="p-6 space-y-6 max-w-4xl">
    <div v-if="!form">
      <UAlert
        color="error"
        icon="i-lucide-triangle-alert"
        title="Formulaire introuvable"
        :description="`Aucun formulaire nommé &quot;${props.name}&quot;.`"
      />
      <UButton to="/app/forms" variant="link" label="← Retour aux formulaires" class="mt-4" />
    </div>

    <template v-else>
      <div class="flex items-start justify-between gap-4">
        <div>
          <UButton
            to="/app/forms"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
            label="Retour aux formulaires"
            :padded="false"
          />
          <h2 class="text-2xl font-semibold mt-2">{{ form.label }}</h2>
          <p v-if="form.description" class="text-muted">{{ form.description }}</p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <UButtonGroup>
            <UButton
              :color="mode === 'form' ? 'primary' : 'neutral'"
              :variant="mode === 'form' ? 'solid' : 'outline'"
              icon="i-lucide-pencil"
              label="Formulaire"
              @click="mode = 'form'"
            />
            <UButton
              :color="mode === 'report' ? 'primary' : 'neutral'"
              :variant="mode === 'report' ? 'solid' : 'outline'"
              icon="i-lucide-file-text"
              label="Rapport"
              @click="mode = 'report'"
            />
          </UButtonGroup>
          <UButton
            icon="i-lucide-download"
            color="primary"
            variant="outline"
            :loading="exporting"
            label="Exporter PDF"
            @click="handleExport"
          />
        </div>
      </div>

      <div ref="pdfRoot" class="bg-white p-6 rounded-lg">
        <div v-if="mode === 'report'" class="mb-6 pb-4 border-b border-slate-200">
          <h1 class="text-2xl font-semibold">{{ form.label }}</h1>
          <p v-if="form.description" class="text-sm text-muted mt-1">{{ form.description }}</p>
        </div>
        <FormRenderer
          :schema="form"
          :initial-data="submittedData ?? undefined"
          :display-mode="mode"
          @submit="onSubmit"
        />
      </div>

      <UCard v-if="submittedData">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="text-primary" />
            <span class="font-medium">Données soumises</span>
          </div>
        </template>
        <pre class="text-xs overflow-auto">{{ JSON.stringify(submittedData, null, 2) }}</pre>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-code" class="text-muted" />
            <span class="font-medium text-sm">FormSchema (UI + DATA)</span>
          </div>
        </template>
        <pre class="text-xs overflow-auto">{{ JSON.stringify(form, null, 2) }}</pre>
      </UCard>
    </template>
  </div>
</template>
