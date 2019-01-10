<template>
  <v-app app :dark="dark">
    <ApolloMutation
      :mutation="require('@/graphql/authentication/login.gql')"
      :variables="{
        username,
        password
      }"
      tag="div"
      class="ec_content"
      @done="logedIn"
    >
      <template slot-scope="{ mutate, loading, error }">
        <v-card class="ec_card" width="500px">
          <v-card-title class="justify-space-between">
            <h1 v-font v-primary>Login</h1>
            <img width="80px" src="../../public/ec-logo-512.png" style="margin-right: 15px">
          </v-card-title>
          <v-card-text>
            <v-alert
              type="error"
              :value="error"
              v-if="error"
            >{{ error.graphQLErrors.map(v => v.message).join() }}</v-alert>
            <v-form v-model="valid">
              <v-text-field
                label="Username"
                v-model="username"
                required
                :autofocus="username === ''"
                :rules="getRules('Username')"
                :disabled="loading"
              />
              <v-tooltip :value="caps" :disabled="!caps" bottom color="info">
                <v-text-field
                  slot="activator"
                  label="Passwort"
                  v-model="password"
                  required
                  :autofocus="username !== ''"
                  :color="caps && !error ? 'info' : undefined"
                  :append-outer-icon="caps ? 'keyboard_capslock' : undefined"
                  :append-icon="show_pw ? 'visibility_off' : 'visibility'"
                  @click:append="() => (show_pw = !show_pw)"
                  :type="show_pw ? 'text' : 'password'"
                  @keyup.enter="mutate"
                  :rules="getRules('Passwort')"
                  :disabled="loading"
                />
                <span>Die Feststelltaste ist aktiviert</span>
              </v-tooltip>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn v-accent-bg v-white :disabled="!valid || loading" @click="mutate">LogIn</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </ApolloMutation>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";

@Component({})
export default class loginForm extends Vue {
  username: string = "";
  password: string = "";
  caps: boolean = false;
  show_pw: boolean = false;
  valid: boolean = false;
  dark: boolean = false;

  checkCaps(ev: KeyboardEvent) {
    const s = ev.key;
    if (s.length === 1) {
      this.caps =
        s.toUpperCase() === s && s.toLowerCase() !== s && !ev.shiftKey;
    } else {
      if (s === "CapsLock") {
        this.caps = !this.caps;
      }
    }
  }

  getRules(name: string) {
    return [
      (value: string) =>
        !value ? `Es muss ein ${name} angegeben werden` : true
    ];
  }

  logedIn(res: any) {
    new this.$auth(res.data.login);
    if (this.$route.query.afterLogIn) {
      this.$router.push(this.$route.query.afterLogIn.toString());
    } else {
      this.$router.push("/");
    }
  }

  created() {
    // todo: handle Dark, handle Username
    window.addEventListener("keyup", this.checkCaps);
  }
  destroyed() {
    window.removeEventListener("keyup", this.checkCaps);
  }
}
</script>

<style scoped>
/** Ausrichtung der Card **/
.ec_content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas: ". . ." ". center ." ". . .";
  height: 100%;
  width: 100%;
  grid-gap: 10px;
}
.ec_card {
  grid-area: center;
}
</style>
