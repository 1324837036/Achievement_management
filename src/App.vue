<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      form: {
        scholarName: "",
        orgName: "",
      },
      datas: [],
    };
  },
  components: {},
  methods: {
    getstaff() {
      var url = "/v1/scholars/getScholarByName/?scholarName=";

      url = url + this.form.scholarName + "&orgName=" + this.form.orgName;

      this.$axios
        .get(url)
        .then((response) => {
          this.datas = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log("抱歉，失败啦");
          console.log(error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
  padding: 0;
}
</style>
