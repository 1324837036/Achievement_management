<template>
  <div id="logo2">
    <el-container>
      <el-main>
        <div>
          <div class="class138">欢迎登录教师成果管理系统</div>
          <div class="class139">请使用您本人的账号密码登录</div>
          <el-form ref="form" class="class141" :model="form">
            <el-form-item>
              <img src="imgs/教师端-登录/电话.png" class="class141_a" />
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱账号"
                type="telephone"
                class="class141_b"
              ></el-input>
            </el-form-item>
            <el-divider class="class148_a"></el-divider>
            <el-form-item>
              <img src="imgs/教师端-登录/密码.png" class="class141_c" />
              <el-input
                type="password"
                prop="password"
                v-model="form.password"
                placeholder="请输入登录密码"
                class="class141_d"
              >
              </el-input>
            </el-form-item>
            <el-divider class="class148_b"></el-divider>
            <!-- <el-form-item>
            <el-checkbox v-model="form.remember" class="class141_e"
              >记住密码</el-checkbox
            >
          </el-form-item> -->
            <el-form-item>
              <el-button type="primary" class="class142" @click="do_Login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Sign",
  data() {
    return {
      form: {
        email: "",
        password: "",
        remember: "",
      },
      managerId: "",
      Invitees: "",
    };
  },
  methods: {
    do_Login: async function () {
      if (this.form.email == "" || this.form.password == "") {
        this.$message({
          type: "error",
          message: "信息输入不完整，请重新输入",
        });
        return;
      }
      var url = "http://127.0.0.1:8000/api/login/";
      var params = new URLSearchParams();
      params.append("data", JSON.stringify(this.form));
      await this.$axios
        .post(url, params)
        .then((response) => {
          if (response.data.state == 0) {
            this.$message({
              type: "error",
              message: response.data.messages,
            });
          } else {
            this.$message({
              duration: 600,
              type: "success",
              message: response.data.messages,
            });
            if (response.data.person_state == 1) {
              this.$router.push({
                name: "Achievement_acknowlege",
                query: {
                  scholarId: response.data.scholarId,
                },
              });
            } else {
              this.$router.push({
                name: "Achievement_claim",
                query: {
                  scholarId: response.data.scholarId,
                  flag: 1,
                },
              });
            }
          }
        })
        .catch((error) => {
          console.log("抱歉，失败啦");
          console.log(error);
        });
    },
  },
  async created() {
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
          this.Invitees = response.data.data;
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
      .setAttribute("style", "background-color:white");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
</style>