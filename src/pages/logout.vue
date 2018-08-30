<template >
<div></div>
</template>

<script>
export default {
  methods: {
    logout () {
      var me = this

      if (localStorage.getItem('default_auth_token')) {
        me.$axios.post(process.env.URL_API + `/auth/logout/`).then((response) => {
          localStorage.removeItem('default_auth_token')
        })
          .catch(erro => {
            localStorage.removeItem('default_auth_token')
          })
      }

     
      me.$router.replace({name: `login`})
    }
  },
  mounted () {
    var me = this
    me.logout()
  }
}
</script>

<style>
</style>
