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
    userGroups: '*',
    items: [
      {
        title: 'Personen',
        icon: 'person',
        route: '/app/personen',
        userGroups: '*'
      },
      {
        title: 'Arbeitskreise',
        icon: 'group',
        route: '/app/arbeitskreise',
        userGroups: '*'
      },
      {
        title: 'Verteiler',
        icon: 'email',
        route: '/app/verteiler',
        userGroups: '*'
      }
    ]
  },
  {
    title: 'Veranstaltungen',
    icon: 'event',
    userGroups: '*',
    items: [
      {
        title: 'Veranstaltungen',
        icon: 'event',
        route: '/app/veranstaltungen',
        userGroups: '*'
      },
      {
        title: 'Unterkünfte',
        icon: 'place',
        route: '/app/unterkünfte',
        userGroups: '*'
      },
      {
        title: 'Anmeldung',
        icon: 'assignment_ind',
        route: '/app/anmeldungen',
        userGroups: '*'
      }
    ]
  },
  {
    title: 'Drucken',
    icon: 'print',
    route: '/app/print',
    userGroups: '*'
  },
  {
    title: 'Administration',
    icon: 'build',
    route: '/app/admin',
    userGroups: '*'
  },
  {
    title: 'Profil',
    icon: 'build',
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
