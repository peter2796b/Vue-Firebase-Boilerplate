<template>
  <div class="home">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  created() {
    let user = Cookies.get("user");
    if (user) {
      user = JSON.parse(user);
      this.redirectBasedOnRole(user.role);
    }
  },
  methods: {
    async register() {
      let res = await this.$auth.createUserWithEmailAndPassword(
        this.email.trim(),
        this.password
      );
      let uid = res.user.uid;
      let user = {
        email: this.email,
        id: uid
      };
      setTimeout(async () => {
        await this.$db
          .collection("users")
          .doc(uid)
          .set(user);
      }, 3000);

      Cookies.set("user", user);
      this.redirectBasedOnRole();
    },
    redirectBasedOnRole() {
      this.$router.push("/secret");
    }
  }
};
</script>
