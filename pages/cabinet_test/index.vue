<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin() {
      try {
        const params = new URLSearchParams()
      params.append("username", this.login.username)
      params.append("password", this.login.password)
        let response = await this.$auth.loginWith('local', { data: params })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
