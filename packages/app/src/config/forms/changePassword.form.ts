export default {
  title: 'Passwort ändern',
  initval: {},
  schema: [
    {
      name: 'oldPassword',
      type: 'password',
      label: 'Aktuelles Passwort',
      rule: 'required',
      required: true,
    },
    {
      name: 'newPassword',
      type: 'password',
      label: 'Neues Passwort',
      rule: 'required|min:8|has_lower|has_upper|has_digit',
      required: true,
    },
  ],  
};