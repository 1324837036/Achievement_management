<template>
  <div id="app">
    <el-row v-for="(data, index) in getstaff" :key="index">
      <el-col :span="4">
        {{ data.name }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: this.getstaff,
    };
  },
  methods: {
    getstaff() {
      var url = "/v1/scholars/getScholarByName?scholarName=";

      url = url + "王德庆" + "&orgName=" + "北京航空航天大学";

      let datas = [];
      this.$axios
        .get(url)
        .then((response) => {
          datas = response.data.data.contend;
          console.log(response);
          return datas;
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
</style>