<template>
  <div class="home">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button @click="login">Login</button>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "Home",
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
    async login() {
      let res = await this.$auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      let uid = res.user.uid;
      let user = await this.$db
        .collection("users")
        .doc(uid)
        .get();
      Cookies.set("user", user.data());
      console.log(user);

      this.redirectBasedOnRole();
    },
    redirectBasedOnRole() {
      this.$router.push("/secret");
    }
  }
};
</script>
