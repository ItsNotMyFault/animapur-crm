import type { FormSchema } from '../types'

// Session note form — modelled after the paper form used in the clinic:
// Séance N°, Date, Durée, Techniques utilisées, Zones traitées prioritairement,
// Réaction du client, Évolution depuis la dernière séance, Détails,
// Observations particulières, Recommandations, Notes complémentaires.
export const sessionNoteForm: FormSchema = {
  context: 'massotherapy',
  name: 'session-note',
  label: 'Note de séance',
  description: 'Fiche de suivi remplie par le thérapeute après chaque séance.',
  audience: 'employee',

  dataSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    required: ['sessionNumber', 'date', 'duration', 'clientReaction', 'evolution'],
    properties: {
      sessionNumber: {
        type: 'integer',
        title: 'Séance N°',
        minimum: 1,
      },
      date: {
        type: 'string',
        title: 'Date',
        format: 'date',
      },
      duration: {
        type: 'integer',
        title: 'Durée (minutes)',
        minimum: 15,
        maximum: 240,
      },
      techniques: {
        type: 'array',
        title: 'Techniques utilisées',
        items: { type: 'string' },
      },
      treatedZones: {
        type: 'string',
        title: 'Zones traitées prioritairement',
        description: 'Lister les zones principales travaillées pendant la séance.',
      },
      clientReaction: {
        type: 'string',
        title: 'Réaction du client',
        enum: ['Détendu', 'Résistant', 'Coopérant', 'Agité'],
      },
      evolution: {
        type: 'string',
        title: 'Évolution depuis la dernière séance',
        enum: ['Amélioration', 'Stable', 'Dégradation'],
      },
      evolutionDetails: {
        type: 'string',
        title: 'Détails',
      },
      observations: {
        type: 'string',
        title: 'Observations particulières',
      },
      recommendations: {
        type: 'string',
        title: 'Recommandations',
      },
      additionalNotes: {
        type: 'string',
        title: 'Notes complémentaires',
      },
      therapistName: {
        type: 'string',
        title: 'Masso/kinésithérapeute',
      },
    },
  },

  ui: {
    builderType: 'form',
    component: 'form.layout.root',
    children: [
      {
        id: 'sec-session',
        component: 'layout.section',
        props: { label: 'Séance' },
        children: [
          {
            id: 'grid-session',
            component: 'layout.grid',
            props: { cols: 3 },
            children: [
              {
                id: 'f-session-number',
                component: 'form.input.number',
                field: { path: 'sessionNumber' },
                props: { placeholder: 'N°' },
              },
              {
                id: 'f-date',
                component: 'form.input.date',
                field: { path: 'date' },
              },
              {
                id: 'f-duration',
                component: 'form.input.number',
                field: { path: 'duration' },
                props: { placeholder: '60' },
              },
            ],
          },
        ],
      },
      {
        id: 'sec-course',
        component: 'layout.section',
        props: { label: 'Déroulement' },
        children: [
          {
            id: 'body-diagram',
            component: 'content.image',
            props: {
              src: '/pictures/body-diagram.svg',
              alt: 'Schéma corporel — marquer les zones traitées',
              maxWidth: '320px',
              fit: 'contain',
              caption: 'Référence anatomique',
            },
          },
          {
            id: 'f-techniques',
            component: 'form.input.checkbox-group',
            field: { path: 'techniques' },
            props: {
              options: [
                { label: 'Suédois', value: 'swedish' },
                { label: 'Profond', value: 'deep' },
                { label: 'Relaxation', value: 'relax' },
                { label: 'Sportif', value: 'sports' },
                { label: 'Prénatal', value: 'prenatal' },
                { label: 'Aromathérapie', value: 'aroma' },
              ],
            },
          },
          {
            id: 'f-zones',
            component: 'form.input.textarea',
            field: { path: 'treatedZones' },
            props: { rows: 3, placeholder: 'Ex. dos, épaules, nuque...' },
          },
          {
            id: 'f-reaction',
            component: 'form.input.radio-group',
            field: { path: 'clientReaction' },
          },
        ],
      },
      {
        id: 'sec-evolution',
        component: 'layout.section',
        props: { label: 'Évolution depuis la dernière séance' },
        children: [
          {
            id: 'f-evolution',
            component: 'form.input.radio-group',
            field: { path: 'evolution' },
          },
          {
            id: 'f-evolution-details',
            component: 'form.input.textarea',
            field: { path: 'evolutionDetails' },
            props: { rows: 3 },
          },
        ],
      },
      {
        id: 'sec-followup',
        component: 'layout.section',
        props: { label: 'Suivi' },
        children: [
          {
            id: 'f-observations',
            component: 'form.input.textarea',
            field: { path: 'observations' },
            props: { rows: 3 },
          },
          {
            id: 'f-recommendations',
            component: 'form.input.textarea',
            field: { path: 'recommendations' },
            props: { rows: 3 },
          },
          {
            id: 'f-additional-notes',
            component: 'form.input.textarea',
            field: { path: 'additionalNotes' },
            props: { rows: 3 },
          },
          {
            id: 'f-therapist',
            component: 'form.input.text',
            field: { path: 'therapistName' },
            props: { placeholder: 'Nom du praticien' },
          },
        ],
      },
      {
        id: 'submit',
        component: 'form.button.submit',
        props: { label: 'Enregistrer la séance' },
      },
    ],
  },
}
