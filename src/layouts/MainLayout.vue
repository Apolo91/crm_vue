<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>
      <Navbar v-on:click="isOpen = !isOpen"/>
      <Sidebar v-model="isOpen" :key="locale"/>
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view/>
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large teal lighten-2" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "../components/app/Navbar";
  import Sidebar from "../components/app/Sidebar";
  import messages from "../utils/messages";

  export default {
    data: () => ({
      isOpen: true,
      loading: true
    }),
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch("fetchInfo");
      }
      this.loading = false;
    },
    computed: {
      error() {
        return this.$store.getters.error;
      },
      locale(){
        return this.$store.getters.info.locale
      }
    },
    watch: {
      // locale(){
      //
      // },


      error(fbError) {
        this.$error(messages[fbError.code] || "Что-то пошло не так");
        console.log(fbError);
      }
    },
    components: {
      Navbar,
      Sidebar
    }
  };
</script>
