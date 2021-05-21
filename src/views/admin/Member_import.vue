<template>
  <div id="logo">
    <el-container>
      <el-main>
        <h2 class="class83">
          欢迎使用{{ name }}教师绩效考核系统，请先<span>导入成员</span>
        </h2>

        <el-upload
          ref="uploadExcel"
          action="http://127.0.0.1:8000/api/add_Wait_persons/"
          :headers="headers"
          name="file"
          class="upload-demo"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="true"
          :on-success="UploadUrl"
          :data="getfileData()"
        >
          <el-button type="primary" class="class84">导入成员</el-button>
        </el-upload>
        <a :href="'/files/成员信息模板.xlsx'" class="class85">下载导入模板</a>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Member_import",
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      managerId: "",
      name: "",
    };
  },
  methods: {
    getfileData() {
      var data = {
        managerId: this.managerId,
      };
      return data;
    },
    UploadUrl: async function (response) {
      if (response.state == 1) {
        await this.$message({
          type: "success",
          message: response.message,
          duration: 1000,
        });
        var url = "http://127.0.0.1:8000/api/changeManagerState/";
        var params = new URLSearchParams();
        params.append("managerId", this.managerId);
        params.append("state", 1);
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，调用修改管理人员状态接口失败啦");
            console.log(error);
          });
        this.$router.push({
          name: "Import_information_confirm",
          query: {
            managerId: this.managerId,
          },
        });
      } else {
        await this.$message({
          type: "error",
          message: response.message,
          duration: 1000,
        });
      }
    },
  },
  created: async function () {
    this.managerId = this.$route.query.managerId;
    var url = "http://127.0.0.1:8000/api/judgeManageId/";
    var params = new URLSearchParams();
    params.append("managerId", this.managerId);
    await this.$axios
      .post(url, params)
      .then((response) => {
        if (response.data.state == 0) {
          this.$router.push({ name: "error" });
        } else {
          if (response.data.data.state == 1) {
            this.$router.push({
              name: "Import_information_confirm",
              query: {
                managerId: this.managerId,
              },
            });
          } else if (response.data.data.state == 2) {
            this.$router.push({
              name: "Member_management",
              query: {
                managerId: this.managerId,
              },
            });
            console.log(response);
            this.name =
              response.data.data.orgName + response.data.data.department;
          }
        }
      })
      .catch((error) => {
        console.log("抱歉，失败啦");
        console.log(error);
        this.$router.push({ name: "error" });
      });
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "width: 100%; height: 100%; background-color:white"
      );
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
</style>
