<script setup lang="ts">
import { computed } from 'vue'
import clients from '@/data/clients.json'

const props = defineProps<{ id: string }>()

const client = computed(() => clients.find((c) => c.id === props.id))
</script>

<template>
  <div class="p-6 space-y-6">
    <div v-if="!client">
      <UAlert
        color="error"
        icon="i-lucide-triangle-alert"
        title="Client not found"
        :description="`No client with id &quot;${props.id}&quot;.`"
      />
      <UButton to="/app/clients" variant="link" label="← Back to clients" class="mt-4" />
    </div>

    <template v-else>
      <div class="flex items-start justify-between">
        <div>
          <UButton
            to="/app/clients"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
            label="Back to clients"
            :padded="false"
          />
          <h2 class="text-2xl font-semibold mt-2">{{ client.name }}</h2>
          <p class="text-muted">Client #{{ client.id }}</p>
        </div>
        <UButton
          :to="`/app/clients/${client.id}/files`"
          icon="i-lucide-folder-open"
          color="primary"
          size="lg"
          label="View files"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <UCard>
          <template #header>
            <span class="font-medium">Contact</span>
          </template>
          <dl class="space-y-2 text-sm">
            <div>
              <dt class="text-muted">Email</dt>
              <dd>{{ client.email }}</dd>
            </div>
            <div>
              <dt class="text-muted">Phone</dt>
              <dd>{{ client.phone }}</dd>
            </div>
            <div>
              <dt class="text-muted">Address</dt>
              <dd>{{ client.address }}</dd>
            </div>
            <div>
              <dt class="text-muted">Date of birth</dt>
              <dd>{{ client.dateOfBirth }}</dd>
            </div>
          </dl>
        </UCard>

        <UCard>
          <template #header>
            <span class="font-medium">Therapy profile</span>
          </template>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-muted">Preferred pressure</dt>
              <dd>
                <UBadge
                  :label="client.preferredPressure"
                  color="primary"
                  variant="subtle"
                  class="capitalize"
                />
              </dd>
            </div>
            <div>
              <dt class="text-muted">Health notes</dt>
              <dd>{{ client.healthNotes }}</dd>
            </div>
          </dl>
        </UCard>
      </div>

      <UCard>
        <template #header>
          <span class="font-medium">Session history ({{ client.sessions.length }})</span>
        </template>
        <ul class="divide-y divide-default">
          <li
            v-for="session in client.sessions"
            :key="session.date"
            class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <div class="font-medium">{{ session.type }}</div>
              <div class="text-muted text-xs">
                {{ session.date }} · {{ session.duration }} min · with {{ session.therapist }}
              </div>
            </div>
            <UBadge :label="`${session.duration} min`" color="neutral" variant="subtle" />
          </li>
        </ul>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-code" class="text-muted" />
            <span class="font-medium text-sm">Raw JSON</span>
          </div>
        </template>
        <pre class="text-xs overflow-auto">{{ JSON.stringify(client, null, 2) }}</pre>
      </UCard>
    </template>
  </div>
</template>
