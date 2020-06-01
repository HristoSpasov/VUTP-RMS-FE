export default {
    server: {
      url: process.env.VUE_APP_SERVERURL,
      apis: {
        rooms: '/rooms',
        teachers: '/teachers',
        specialties: '/specialties',
        accounts: '/accounts',
        disciplines: '/disciplines',
        events: '/events'
      }
    }
  }