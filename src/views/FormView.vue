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
      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <p v-if="form.description" class="text-muted text-sm">{{ form.description }}</p>

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
        </template>

        <div ref="pdfRoot" class="p-2">
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

        <template v-if="submittedData" #footer>
          <UAlert
            color="success"
            icon="i-lucide-check-circle"
            title="Formulaire soumis"
            description="Les données ont été enregistrées. Consultez le rapport ou exportez en PDF."
          />
        </template>
      </UCard>
    </template>
  </div>
</template>
