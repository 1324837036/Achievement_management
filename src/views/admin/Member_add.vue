<template>
  <el-container>
    <el-aside width="220px" class="class0">
      <el-scrollbar style="height: 100%">
        <el-menu
          :default-openeds="['1', '2']"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="top: 79px"
        >
          <a :href="'/Member_management?managerId=' + managerId">
            <el-menu-item>
              <img src="imgs/管理中心.png" class="class0_a" />
              <span slot="title"> 成员管理 </span>
            </el-menu-item>
          </a>

          <el-submenu index="1">
            <template slot="title">
              <img src="imgs/文化成果.png" class="class0_a" />
              <span style="color: white"> 成果管理 </span>
            </template>
            <el-menu-item-group>
              <a :href="'/Achievement?managerId=' + managerId">
                <el-menu-item index="2-1" style="font-size: 16px">
                  成果报告
                </el-menu-item>
              </a>
              <a :href="'/Achievement_analysis?managerId=' + managerId">
                <el-menu-item index="2-2" style="font-size: 16px">
                  成果分析
                </el-menu-item>
              </a>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-head class="class1">
        <a
          :href="'/Member_management?managerId=' + managerId"
          class="class4"
          style="text-decoration: none"
        >
          &lt; 返回
        </a>
      </el-head>

      <el-main class="class2">
        <el-row>
          <el-col :span="3">
            <div class="class3">添加成员</div>
          </el-col>
        </el-row>
        <el-divider class="class6"></el-divider>
        <el-form ref="form" :model="form" label-width="80px" class="class5">
          <el-form-item label="姓名：" style="text-align: left; width: 443px">
            <el-input
              v-model="form.name"
              placeholder="输入教职工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门：" style="text-align: left; width: 443px">
            <el-input
              v-model="form.department"
              placeholder="输入教职工部门"
            ></el-input>
          </el-form-item>
          <el-form-item label="工号：" style="text-align: left; width: 443px">
            <el-input v-model="form.id" placeholder="输入教职工工号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" style="text-align: left; width: 443px">
            <el-input
              v-model="form.email"
              placeholder="输入教职工邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="职称：" style="text-align: left">
            <el-select
              v-model="form.title"
              placeholder="请选择职称"
              style="width: 363px"
            >
              <el-scrollbar style="height: 220px">
                <el-option label="院士" value="院士"></el-option>
                <el-option label="教授" value="教授"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="研究员" value="研究员"></el-option>
                <el-option label="副研究员" value="副研究员"></el-option>
              </el-scrollbar>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="get_staff">立即查找</el-button>
          </el-form-item>
        </el-form>

        <el-row v-if="find == true">
          <el-col :span="3">
            <div class="class15">为您找到</div>
          </el-col>
          <el-divider class="class16"></el-divider>
        </el-row>

        <span
          v-for="(card, index) in cards"
          :key="index"
          :style="{ top: 650 + Math.floor(index / 3) * 400 + 'px' }"
          :class="setClass(index)"
        >
          <el-row>
            <!-- 这里一定只能用:src，利用v-bind来显示 -->
            <img class="class18" :src="card.avg" />

            <el-col :span="6">
              <div class="class19">
                {{ card.name }}
              </div>
              <div class="class20">
                {{ card.orgName }} {{ card.department }}
              </div>
              <div class="class20_a">
                {{ card.position }}
              </div>
            </el-col>
            <el-col :span="6">
              <el-button
                type="primary"
                class="class21"
                @click="add_Imported_person(card)"
              >
                <i class="el-icon-plus class21_a"></i>
              </el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="2" class="class22">
              <img src="/imgs/添加教职工 2/最新论文.png" />
            </el-col>
            <el-col :span="5" class="class23">最新论文</el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <div class="class25">
                {{ card.paperTitle }}
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4">
              <div class="class26">
                {{ card.paperCount }}
              </div>
              <div class="class27">发表论文</div>
            </el-col>

            <el-col :span="4">
              <div class="class28">
                {{ card.patentCount }}
              </div>
              <div class="class29">申请专利</div>
            </el-col>

            <el-col :span="4">
              <div class="class30">
                {{ card.projectCount }}
              </div>
              <div class="class31">研究项目</div>
            </el-col>
          </el-row>
        </span>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Member_add",
  data() {
    return {
      form: {
        name: "",
        department: "",
        id: "",
        email: "",
        title: "",
      },
      cards: [],
      img: "",
      find: false,
      managerId: "",
      orgName: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("提交成功");
    },
    setClass(num) {
      return num % 3 == 0
        ? "class17_1"
        : num % 3 == 1
        ? "class17_2"
        : "class17_3";
    },
    get_staff: async function () {
      if (
        this.form.id == "" ||
        this.form.department == "" ||
        this.form.name == "" ||
        this.form.email == "" ||
        this.form.title == ""
      ) {
        this.$message({
          type: "error",
          message: "信息输入不完整，请重新输入",
          duration: 600,
        });
        return;
      }
      var cards2 = [];
      var url = "/aps/scholar/getScholarByInfo";
      await this.$axios({
        method: "get",
        url: url,
        params: {
          name: this.form.name,
          orgName: this.orgName,
        },
      })
        .then((response) => {
          cards2 = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉,调用知兔接口失败啦");
          console.log(error);
        });
      for (var i = 0; i < cards2.length; i++) {
        cards2[i]["scholarId"] = cards2[i].id;
        cards2[i]["id"] = this.form.id;
        cards2[i]["email"] = this.form.email;
        cards2[i]["title"] = cards2[i].title;
        cards2[i]["department"] = cards2[i].department;
        cards2[i]["orgName"] = cards2[i].orgName;
        cards2[i]["avg"] = cards2[i].avatar;
        console.log(cards2[i]["scholarId"]);
        var url = "/apis/v1/scholars/" + cards2[i]["scholarId"];
        await this.$axios
          .get(url)
          .then((response) => {
            cards2[i]["position"] = response.data.data.position;
            cards2[i]["department"] = response.data.data.department;
            cards2[i]["avg"] = response.data.data.avatarSd;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取学者基本信息失败！");
            console.log(error);
          });

        var url = "/apis/v1/scholars/" + cards2[i]["scholarId"] + "/papers";
        await this.$axios
          .get(url)
          .then((response) => {
            cards2[i]["paperCount"] = response.data.data.totalElements;
            if (cards2[i]["paperCount"] != 0) {
              cards2[i]["paperTitle"] = response.data.data.content[0].title;
            } else {
              cards2[i]["paperTitle"] = "";
            }
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取论文信息失败！");
            console.log(error);
          });

        var url = "/apis/v1/scholars/" + cards2[i]["scholarId"] + "/projects";
        await this.$axios
          .get(url)
          .then((response) => {
            cards2[i]["projectCount"] = response.data.data.totalElements;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取项目信息失败！");
            console.log(error);
          });

        var url = "/apis/v1/scholars/" + cards2[i]["scholarId"] + "/patents";
        await this.$axios
          .get(url)
          .then((response) => {
            cards2[i]["patentCount"] = response.data.data.totalElements;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取专利信息失败！");
            console.log(error);
          });
      }
      if (cards2.length == 0) {
        var card = {
          id: this.form.id,
          email: this.form.email,
          title: this.form.title,
          department: this.form.department,
          name: this.form.name,
          orgName: this.orgName,
          avg: "http://img01.guokezy.com/avatars/5d2c148d0f94bb3c44fbd602.jpg",
          paperTitle: "",
          paperCount: 0,
          projectCount: 0,
          patentCount: 0,
          workCount: 0,
          awardCount: 0,
          student_awardCount: 0,
          copyrightCount: 0,
        };
        this.cards.push(card);
      } else {
        this.cards = cards2;
      }
      this.find = true;
    },
    add_Imported_person: async function (card) {
      var judge = false;
      await this.$confirm("确定添加该成员吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!",
            duration: 600,
          });
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
            duration: 600,
          });
        });
      if (judge) {
        var data1 = {
          id: card.id,
          name: card.name,
          department: card.department,
          email: card.email,
          title: card.title,
          orgName: card.orgName,
          avg: card.avg,
          paperCount: card.paperCount,
          projectCount: card.projectCount,
          patentCount: card.patentCount,
          scholarId: card.scholarId,
          awardCount: 0,
          student_awardCount: 0,
          workCount: 0,
          copyrightCount: 0,
        };
        var url = "http://127.0.0.1:8000/api/add_Imported_persons/";
        var params = new URLSearchParams();
        params.append("data", JSON.stringify(data1));
        params.append("managerId", this.managerId);
        await this.$axios({
          method: "post",
          url: url,
          data: params,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("抱歉，调用添加导入成员接口失败啦");
            console.log(error);
          });
        this.$router.go(0);
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
          if (response.data.data.state == 0) {
            this.$router.push({
              name: "Member_import",
              query: {
                managerId: this.managerId,
              },
            });
          } else {
            this.orgName = response.data.data.orgName;
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
      .setAttribute("style", "background-color:#F3F7FD");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style>
.el-aside .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>