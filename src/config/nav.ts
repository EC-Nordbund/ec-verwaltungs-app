/**
 * Linke Navigation Einstellungen
 */
export default [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    route: '/app/',
    userGroups: '*'
  },
  {
    title: 'Personen',
    icon: 'person',
    userGroups: ['admin', 'vorsitzender'],
    items: [
      {
        title: 'Personen',
        icon: 'person',
        route: '/app/personen',
        userGroups: ['admin', 'vorsitzender']
      },
      {
        title: 'Arbeitskreise',
        icon: 'group',
        route: '/app/arbeitskreise',
        userGroups: ['admin', 'vorsitzender']
      }
    ]
  },
  {
    title: 'Veranstaltungen',
    icon: 'event',
    userGroups: [
      'admin',
      'anmeldeverwaltung',
      'kasse',
      'veranstaltungsverwaltung',
      'veranstaltungsleiter'
    ],
    items: [
      {
        title: 'Veranstaltungen',
        icon: 'event',
        route: '/app/veranstaltungen',
        userGroups: [
          'admin',
          'anmeldeverwaltung',
          'kasse',
          'veranstaltungsverwaltung',
          'veranstaltungsleiter'
        ]
      },
      {
        title: 'Veranstaltungsorte',
        icon: 'place',
        route: '/app/vorte',
        userGroups: [
          'admin',
          'anmeldeverwaltung',
          'veranstaltungsverwaltung',
          'veranstaltungsleiter'
        ]
      },
      {
        title: 'Organisationen',
        icon: 'place',
        route: '/app/organisationen',
        userGroups: [
          'admin',
          'anmeldeverwaltung',
          'veranstaltungsverwaltung',
          'veranstaltungsleiter'
        ]
      },
      {
        title: 'Anmeldung',
        icon: 'assignment_ind',
        route: '/app/anmeldungen',
        userGroups: [
          'admin',
          'anmeldeverwaltung',
          'kasse',
          'veranstaltungsverwaltung',
          'veranstaltungsleiter'
        ]
      }
    ]
  },
  {
    title: 'Drucken',
    icon: 'print',
    route: '/app/print',
    userGroups: ['admin', 'anmeldeverwaltung']
  },
  {
    title: 'Administration',
    icon: 'build',
    route: '/app/admin',
    userGroups: ['admin']
  },
  {
    title: 'Profil',
    icon: 'account_box',
    route: '/app/profil',
    userGroups: '*'
  },
  {
    title: 'Hilfe',
    icon: 'help',
    route: '_hilfe',
    userGroups: '*'
  },
  {
    title: 'Impressum',
    icon: 'info',
    route: '/app/impressum',
    userGroups: '*'
  }
]
