<template>
  <div class="home">
    SECRET PAGE
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  created() {
    this.$messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        this.getFcmToken();
      })
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
      });
    console.log(this.$notificationGranted, "Notification granted value");
  },
  methods: {
    async logout() {
      Cookies.remove("user");
      await this.$auth.signOut();
      this.$router.push("/");
    },
    async getFcmToken() {
      let currentToken = await this.$messaging.getToken();
      this.sendFcmTokenToBackend(currentToken);
      this.startListeners();
    },
    startListeners() {
      this.startOnMessageListener();
      this.startTokenRefreshListener();
    },
    startOnMessageListener() {
      this.$messaging.onMessage(payload => {
        console.log(payload);
      });
    },
    startTokenRefreshListener() {
      this.$messaging.onTokenRefresh(async () => {
        let currentToken = await this.$messaging.getToken();
        this.sendFcmTokenToBackend(currentToken);
      });
    },
    sendFcmTokenToBackend(token) {
      console.log(token);
      console.log(this.$authUser.id);
      this.$db
        .collection("users")
        .doc(this.$authUser.id)
        .set(
          {
            fcm_token: token
          },
          { merge: true }
        );
    }
  }
};
</script>
