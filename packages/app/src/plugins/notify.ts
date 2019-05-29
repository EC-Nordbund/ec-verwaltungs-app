import Vue from 'vue';

if (Notification.permission !== 'denied') {
  Notification.requestPermission();
}

Vue.prototype.$notifikation = (title: string, body: string) => {
  return new Notification(title, {body, icon: '/img/ec-logo-512.361ca3c3.png'});
};
