import type { FormSchema } from '../types'

// Minimal intake form — used to demonstrate that the same architecture works
// for any form, not just the session note. It's the client-facing counterpart.
export const clientIntakeForm: FormSchema = {
  context: 'massotherapy',
  name: 'client-intake',
  label: 'Fiche d\u2019accueil client',
  description: 'Remplie par le client avant la première séance.',
  audience: 'client',

  dataSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['fullName', 'email', 'dateOfBirth'],
    properties: {
      fullName: { type: 'string', title: 'Nom complet', minLength: 2 },
      email: { type: 'string', title: 'Email', format: 'email' },
      phone: { type: 'string', title: 'Téléphone' },
      dateOfBirth: { type: 'string', title: 'Date de naissance', format: 'date' },
      address: { type: 'string', title: 'Adresse' },
      conditions: {
        type: 'string',
        title: 'Conditions médicales actuelles',
        description: 'Blessures, opérations récentes, douleurs chroniques...',
      },
      pressurePreference: {
        type: 'string',
        title: 'Pression préférée',
        enum: ['light', 'medium', 'firm'],
      },
      consent: {
        type: 'boolean',
        title: 'Je consens à recevoir un massage thérapeutique',
      },
    },
  },

  ui: {
    builderType: 'form',
    component: 'form.layout.root',
    children: [
      {
        id: 'sec-contact',
        component: 'layout.section',
        props: { label: 'Coordonnées' },
        children: [
          {
            id: 'grid-contact',
            component: 'layout.grid',
            props: { cols: 2 },
            children: [
              { id: 'f-name', component: 'form.input.text', field: { path: 'fullName' } },
              { id: 'f-email', component: 'form.input.text', field: { path: 'email' } },
              { id: 'f-phone', component: 'form.input.text', field: { path: 'phone' } },
              { id: 'f-dob', component: 'form.input.date', field: { path: 'dateOfBirth' } },
            ],
          },
          {
            id: 'f-address',
            component: 'form.input.text',
            field: { path: 'address' },
          },
        ],
      },
      {
        id: 'sec-health',
        component: 'layout.section',
        props: { label: 'Santé' },
        children: [
          {
            id: 'f-conditions',
            component: 'form.input.textarea',
            field: { path: 'conditions' },
            props: { rows: 4 },
          },
          {
            id: 'f-pressure',
            component: 'form.input.select',
            field: { path: 'pressurePreference' },
            props: {
              options: [
                { label: 'Légère', value: 'light' },
                { label: 'Moyenne', value: 'medium' },
                { label: 'Ferme', value: 'firm' },
              ],
            },
          },
        ],
      },
      {
        id: 'sec-consent',
        component: 'layout.section',
        props: { label: 'Consentement' },
        children: [
          {
            id: 'f-consent',
            component: 'form.input.checkbox',
            field: { path: 'consent' },
            props: { label: 'Je consens à recevoir un massage thérapeutique' },
          },
        ],
      },
      {
        id: 'submit',
        component: 'form.button.submit',
        props: { label: 'Envoyer' },
      },
    ],
  },
}
