<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Client } from '@/types'
import { clientRepo } from '@/repositories'

const props = defineProps<{ id: string }>()

const client = ref<Client | null>(null)
const error = ref(false)

onMounted(async () => {
  try {
    client.value = await clientRepo.get(props.id)
  } catch {
    error.value = true
  }
})

const fullName = computed(() =>
  client.value ? `${client.value.firstName} ${client.value.lastName}` : '',
)
const initials = computed(() =>
  client.value
    ? `${client.value.firstName[0]}${client.value.lastName[0]}`.toUpperCase()
    : '',
)

function painColor(score: number | null) {
  if (score == null) return 'neutral'
  if (score <= 3) return 'success'
  if (score <= 6) return 'warning'
  return 'error'
}
</script>

<template>
  <div class="p-5 space-y-5">
    <div v-if="error">
      <UAlert
        color="error"
        icon="i-lucide-triangle-alert"
        title="Client introuvable"
        :description="`Aucun client avec l'id « ${props.id} ».`"
      />
      <UButton to="/app/clients" variant="link" label="← Retour aux clients" class="mt-4" />
    </div>

    <template v-else-if="client">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div
            class="size-12 rounded-full bg-primary/10 text-primary text-base font-semibold flex items-center justify-center shrink-0"
          >
            {{ initials }}
          </div>
          <div>
            <h2 class="text-xl font-semibold">{{ fullName }}</h2>
            <div class="flex items-center gap-2 mt-1 flex-wrap">
              <UBadge :label="`#${client.id}`" color="neutral" variant="subtle" />
              <UBadge
                v-if="client.gender"
                :label="client.gender"
                color="neutral"
                variant="subtle"
                class="capitalize"
              />
              <UBadge
                :label="`Accueil : ${client.intakeDate}`"
                color="neutral"
                variant="subtle"
              />
              <UBadge
                :label="client.preferredPressure"
                color="primary"
                variant="subtle"
                class="capitalize"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <UButton
            icon="i-lucide-pencil"
            color="neutral"
            variant="outline"
            label="Modifier"
          />
          <UButton
            :to="`/app/clients/${client.id}/files`"
            icon="i-lucide-folder-open"
            color="primary"
            label="Dossiers"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>

      <!-- Flagged notes banner -->
      <UAlert
        v-if="client.notes.some((n) => n.flagged)"
        color="warning"
        icon="i-lucide-flag"
        title="Notes signalées"
        :description="
          client.notes
            .filter((n) => n.flagged)
            .map((n) => n.note)
            .join(' · ')
        "
      />

      <!-- Contact + Emergency -->
      <div class="grid md:grid-cols-2 gap-5">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-user" class="text-primary" />
              <span class="font-medium">Contact</span>
            </div>
          </template>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-muted">Email</dt>
              <dd>{{ client.email }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Téléphone</dt>
              <dd>{{ client.phone }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Contact préféré</dt>
              <dd class="capitalize">{{ client.preferredContact }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Adresse</dt>
              <dd class="text-right">{{ client.address }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-muted">Date de naissance</dt>
              <dd>{{ client.dateOfBirth ?? '—' }}</dd>
            </div>
          </dl>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-phone-call" class="text-primary" />
              <span class="font-medium">Contact d'urgence</span>
            </div>
          </template>
          <div v-if="client.emergencyContact" class="space-y-3 text-sm">
            <dl class="space-y-3">
              <div class="flex justify-between">
                <dt class="text-muted">Nom</dt>
                <dd>{{ client.emergencyContact.name }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted">Lien</dt>
                <dd>{{ client.emergencyContact.relationship }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted">Téléphone</dt>
                <dd>{{ client.emergencyContact.phone }}</dd>
              </div>
            </dl>
          </div>
          <p v-else class="text-sm text-muted italic">Aucun contact d'urgence renseigné.</p>
        </UCard>
      </div>

      <!-- Medical profile -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-heart-pulse" class="text-primary" />
            <span class="font-medium">Profil médical</span>
          </div>
        </template>
        <div class="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Diagnostic principal</dt>
            <dd>{{ client.medicalProfile.primaryDiagnosis ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Code CIM-10</dt>
            <dd>
              <UBadge
                v-if="client.medicalProfile.icd10Code"
                :label="client.medicalProfile.icd10Code"
                color="neutral"
                variant="outline"
              />
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Conditions secondaires</dt>
            <dd>{{ client.medicalProfile.secondaryConditions ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Médicaments</dt>
            <dd>{{ client.medicalProfile.medications ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Allergies</dt>
            <dd>{{ client.medicalProfile.allergies ?? '—' }}</dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Antécédents chirurgicaux</dt>
            <dd>{{ client.medicalProfile.surgicalHistory ?? '—' }}</dd>
          </div>
          <div class="md:col-span-2" v-if="client.medicalProfile.contraindications">
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5 flex items-center gap-1">
              <UIcon name="i-lucide-triangle-alert" class="text-warning size-3.5" />
              Contre-indications
            </dt>
            <dd class="font-medium text-warning">
              {{ client.medicalProfile.contraindications }}
            </dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Douleur de base (0–10)</dt>
            <dd>
              <UBadge
                v-if="client.medicalProfile.painBaseline != null"
                :label="`${client.medicalProfile.painBaseline}/10`"
                :color="painColor(client.medicalProfile.painBaseline)"
                variant="subtle"
              />
              <span v-else>—</span>
            </dd>
          </div>
          <div>
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Objectifs fonctionnels</dt>
            <dd>{{ client.medicalProfile.functionalGoals ?? '—' }}</dd>
          </div>
          <div v-if="client.medicalProfile.physicianNotes" class="md:col-span-2">
            <dt class="text-muted text-xs uppercase tracking-wide mb-0.5">Notes du médecin</dt>
            <dd class="whitespace-pre-wrap">{{ client.medicalProfile.physicianNotes }}</dd>
          </div>
        </div>
      </UCard>

      <!-- Referral + Preferences -->
      <div class="grid md:grid-cols-2 gap-5">
        <UCard v-if="client.referringPhysician || client.referringClinic">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-stethoscope" class="text-primary" />
              <span class="font-medium">Référent</span>
            </div>
          </template>
          <dl class="space-y-3 text-sm">
            <div v-if="client.referringPhysician" class="flex justify-between">
              <dt class="text-muted">Médecin référent</dt>
              <dd>{{ client.referringPhysician }}</dd>
            </div>
            <div v-if="client.referringClinic" class="flex justify-between">
              <dt class="text-muted">Clinique</dt>
              <dd>{{ client.referringClinic }}</dd>
            </div>
          </dl>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-hand-heart" class="text-primary" />
              <span class="font-medium">Préférences</span>
            </div>
          </template>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-muted">Pression préférée</dt>
              <dd>
                <UBadge
                  :label="client.preferredPressure"
                  color="primary"
                  variant="subtle"
                  class="capitalize"
                />
              </dd>
            </div>
          </dl>
        </UCard>
      </div>

      <!-- Internal notes -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-sticky-note" class="text-primary" />
              <span class="font-medium">Notes internes</span>
              <UBadge
                v-if="client.notes.length"
                :label="String(client.notes.length)"
                color="neutral"
                variant="subtle"
              />
            </div>
            <UButton
              icon="i-lucide-plus"
              size="xs"
              color="neutral"
              variant="outline"
              label="Ajouter"
            />
          </div>
        </template>
        <div v-if="client.notes.length === 0" class="text-center py-4">
          <UIcon name="i-lucide-sticky-note" class="size-6 mx-auto mb-1 opacity-30" />
          <p class="text-sm text-muted italic">Aucune note.</p>
        </div>
        <ul v-else class="divide-y divide-default">
          <li
            v-for="note in client.notes"
            :key="note.id"
            class="py-3 first:pt-0 last:pb-0 flex items-start gap-3"
          >
            <UIcon
              v-if="note.flagged"
              name="i-lucide-flag"
              class="text-warning size-4 shrink-0 mt-0.5"
            />
            <UIcon v-else name="i-lucide-message-square" class="text-muted size-4 shrink-0 mt-0.5" />
            <div class="min-w-0 flex-1">
              <p class="text-sm">{{ note.note }}</p>
              <p class="text-xs text-muted mt-1">
                {{ note.author }} · {{ note.createdAt }}
              </p>
            </div>
          </li>
        </ul>
      </UCard>

      <!-- Session history -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-calendar" class="text-primary" />
              <span class="font-medium">Historique des séances</span>
              <UBadge
                v-if="client.sessions.length"
                :label="String(client.sessions.length)"
                color="neutral"
                variant="subtle"
              />
            </div>
            <UButton
              icon="i-lucide-plus"
              size="xs"
              color="neutral"
              variant="outline"
              label="Ajouter"
            />
          </div>
        </template>
        <div v-if="client.sessions.length === 0" class="text-center py-4">
          <UIcon name="i-lucide-calendar" class="size-6 mx-auto mb-1 opacity-30" />
          <p class="text-sm text-muted italic">Aucune séance enregistrée.</p>
        </div>
        <ul v-else class="divide-y divide-default">
          <li
            v-for="session in client.sessions"
            :key="session.date"
            class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div class="flex items-center gap-3">
              <div class="size-8 rounded-lg bg-neutral-100 flex items-center justify-center">
                <UIcon name="i-lucide-activity" class="size-4 text-muted" />
              </div>
              <div>
                <div class="font-medium text-sm">{{ session.type }}</div>
                <div class="text-muted text-xs">
                  {{ session.date }} · {{ session.professional }}
                </div>
              </div>
            </div>
            <UBadge :label="`${session.duration} min`" color="neutral" variant="subtle" />
          </li>
        </ul>
      </UCard>
    </template>
  </div>
</template>
