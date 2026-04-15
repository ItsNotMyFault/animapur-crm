<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import type { FormSchema } from './types'
import FormRenderer from './FormRenderer.vue'
import { useExportPdf } from './useExportPdf'

const props = defineProps<{
  schema: FormSchema | undefined
  payload: Record<string, unknown> | undefined
  label: string
  filename?: string
  recipientEmail?: string
  recipientName?: string
}>()

const open = defineModel<boolean>('open', { default: false })

const pdfRef = useTemplateRef<HTMLElement>('pdfRoot')
const { exporting, exportPdf } = useExportPdf()

const downloadName = computed(() => props.filename ?? props.label ?? 'document')

async function handleExport() {
  await exportPdf(pdfRef.value, downloadName.value)
}

async function handleSendEmail() {
  if (!props.recipientEmail) return

  // Download the PDF first so the user can attach it — mailto: URLs can't
  // carry attachments, so the best UX is: file lands in Downloads, mailto
  // opens with a ready-to-edit body.
  await exportPdf(pdfRef.value, downloadName.value)

  const greeting = props.recipientName ? `Bonjour ${props.recipientName},` : 'Bonjour,'
  const subject = encodeURIComponent(props.label)
  const body = encodeURIComponent(
    [
      greeting,
      '',
      `Veuillez trouver ci-joint le document « ${props.label} ».`,
      '(Le PDF a été téléchargé sur votre poste — merci de le joindre à ce message.)',
      '',
      'Cordialement,',
    ].join('\n'),
  )

  window.location.href = `mailto:${encodeURIComponent(props.recipientEmail)}?subject=${subject}&body=${body}`
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'max-w-4xl' }">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-file-text" class="text-primary" />
        <h3 class="font-semibold">{{ label }}</h3>
      </div>
    </template>

    <template #body>
      <div v-if="!schema || !payload" class="text-center text-muted py-8">
        Aperçu indisponible.
      </div>
      <div v-else ref="pdfRoot" class="bg-white p-6 rounded-lg">
        <div class="mb-6 pb-4 border-b border-slate-200">
          <h1 class="text-2xl font-semibold">{{ label }}</h1>
          <p v-if="schema.description" class="text-sm text-muted mt-1">
            {{ schema.description }}
          </p>
        </div>
        <FormRenderer :schema="schema" :initial-data="payload" display-mode="report" />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton color="neutral" variant="ghost" label="Fermer" @click="open = false" />
        <UButton
          color="neutral"
          variant="outline"
          icon="i-lucide-mail"
          :loading="exporting"
          label="Envoyer au client"
          :disabled="!schema || !payload || !recipientEmail"
          @click="handleSendEmail"
        />
        <UButton
          color="primary"
          icon="i-lucide-download"
          :loading="exporting"
          label="Exporter PDF"
          :disabled="!schema || !payload"
          @click="handleExport"
        />
      </div>
    </template>
  </UModal>
</template>
