/**
 * Linke Navigation Einstellungen
 */
export default [
  {
    title: 'Statistik',
    action: 'dashboard',
    route: '/app/',
    userGroups: '*'
  },
  {
    title: 'Personen',
    action: 'person',
    userGroups: '*',
    items: [
      {
        title: 'Personen',
        action: 'person',
        route: '/app/personen',
        userGroups: '*'
      },
      {
        title: 'Arbeitskreise',
        action: 'group',
        route: '/app/arbeitskreise',
        userGroups: '*'
      },
      {
        title: 'Verteiler',
        action: 'email',
        route: '/app/verteiler',
        userGroups: '*'
      }
    ]
  },
  {
    title: 'Veranstaltungen',
    action: 'event',
    userGroups: '*',
    items: [
      {
        title: 'Veranstaltungen',
        action: 'event',
        route: '/app/veranstaltungen',
        userGroups: '*'
      },
      {
        title: 'Unterkünfte',
        action: 'home',
        route: '/app/unterkünfte',
        userGroups: '*'
      },
      {
        title: 'Anmeldung',
        action: 'home',
        route: '/app/anmeldung',
        userGroups: '*'
      }
    ]
  },
  {
    title: 'Drucken',
    action: 'print',
    route: '/app/print',
    userGroups: '*'
  },
  {
    title: 'Administration',
    action: 'https',
    route: '/app/admin',
    userGroups: '*'
  },
  {
    title: 'Hilfe',
    action: 'help',
    route: '_hilfe',
    userGroups: '*'
  },
  {
    title: 'Impressum',
    action: 'https',
    route: '/app/impressum',
    userGroups: '*'
  }
]
