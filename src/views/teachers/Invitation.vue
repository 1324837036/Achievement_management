<template>
  <el-container>
    <el-main>
      <img src="imgs/注册.png" class="class117" />
      <div class="class114">一键同步科研成果</div>
      <div class="class115">一快捷搜索专利项目</div>
      <div class="class116">最好用的成果管理神器</div>
      <span class="class118"
        >{{ Invitees.orgName }} - {{ Invitees.department }}</span
      >
      <span class="class119"> 科研助手{{ Invitees.manageName }}</span>
      <div class="class120">
        邀请你使用<span style="color: #068ffa"
          >{{ Invitees.orgName }}{{ Invitees.department }}教师成果管理系统</span
        >
      </div>
      <div class="class121">
        <img :src="Inviter.avatarSd" class="class122" />

        <div class="class123">{{ Inviter.name }}</div>
        <div class="class124">{{ Inviter.orgName }}</div>
        <div>
          <span class="class125">
            {{ Inviter.paperCount }}
          </span>
          <span class="class126">
            {{ Inviter.patentCount }}
          </span>
          <span class="class127">
            {{ Inviter.projectCount }}
          </span>
        </div>
        <div>
          <span class="class128"> 发表论文 </span>
          <span class="class129"> 申请专利 </span>
          <span class="class130"> 研究项目 </span>
        </div>

        <div class="class131">
          <a style="color: blue" href="/Sign">登录</a
          ><span style="color: #666666">即可查看并确认本人成果</span>
        </div>
      </div>
      <el-form ref="form" :model="form" label-width="100px" class="class132">
        <el-form-item label="邮箱:">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱账号"
            type="email"
            class="class133"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="密码:">
          <el-input
            v-model="form.password"
            placeholder="请输入登录密码"
            type="password"
            class="class133"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码：">
          <el-input
            v-model="form.confirm_password"
            placeholder="请确认登录密码"
            type="password"
            class="class133"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()" class="class134"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Invitation",
  data() {
    return {
      // 邀请人
      Invitees: "",
      Inviter: "",
      form: {
        scholarId: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      managerId: "",
    };
  },
  methods: {
    get_Basic_message: async function (scholarId) {
      var url = "http://127.0.0.1:8000/api/get_messageByScholarId/";
      var params = new URLSearchParams();
      params.append("scholarId", this.form.scholarId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          console.log(response);
          this.form.email = response.data.data.email;
        })
        .catch((error) => {
          console.log("抱歉，获取邮箱失败啦");
          console.log(error);
        });

      var url = "/apis/v1/scholars/" + scholarId;
      var dic = {};
      await this.$axios
        .get(url)
        .then((response) => {
          dic = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      var url2 = url + "/papers";
      await this.$axios
        .get(url2)
        .then((response) => {
          dic.paperCount = response.data.data.totalElements;
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      var url3 = url + "/projects";
      await this.$axios
        .get(url3)
        .then((response) => {
          dic.projectCount = response.data.data.totalElements;
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      var url4 = url + "/patents";
      await this.$axios
        .get(url4)
        .then((response) => {
          dic.patentCount = response.data.data.totalElements;
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      this.Inviter = dic;
    },
    onSubmit: async function () {
      if (
        this.form.email == "" ||
        this.form.password == "" ||
        this.form.confirm_password == ""
      ) {
        this.$message({
          type: "error",
          message: "信息输入不完整，请重新输入",
        });
        return;
      }
      var url = "http://127.0.0.1:8000/api/add_Admin_messages/";
      var params = new URLSearchParams();
      params.append("data", JSON.stringify(this.form));
      params.append("managerId", this.managerId);
      this.$axios
        .post(url, params)
        .then((response) => {
          if (response.data.state == 0) {
            this.$message({
              type: "error",
              message: response.data.messages,
              duration: 1000,
            });
          } else {
            this.$message({
              type: "success",
              message: response.data.messages,
              duration: 1000,
            });
            this.$router.push({
              name: "Sign",
            });
          }
        })
        .catch((error) => {
          console.log("抱歉，调用注册成员信息失败");
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
    this.form.scholarId = this.$route.query.scholarId;
    this.get_Basic_message(this.form.scholarId);
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