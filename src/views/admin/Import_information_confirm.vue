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
    <el-head class="class35">
      <el-row>
        <el-col :span="3">
          <div class="class36">确认导入成员</div>
        </el-col>
        <el-col :span="3">
          <div>
            <img src="imgs/导入.png" class="class37_a" />
            <el-upload
              action="http://127.0.0.1:8000/api/add_Wait_persons/"
              :headers="headers"
              name="file"
              class="upload-demo"
              accept=".xlsx"
              :show-file-list="false"
              :auto-upload="true"
              :on-success="UploadSuccess"
              :data="getfileData()"
            >
              <el-button type="primary" size="mini" class="class37"
                >导入其他文件</el-button
              >
            </el-upload>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="class38">{{ confirm_checked }}个成员已添加</div>
        </el-col>
        <el-col :span="3">
          <div class="class39">{{ wait_to_confirm }}个成员添加待处理</div>
        </el-col>
      </el-row>
    </el-head>

    <el-main
      class="class40"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-text="正在加载数据，请稍后"
    >
      <el-scrollbar style="height: 100%">
        <el-row>
          <el-row>
            <el-col>
              <a
                :href="'/Import_information_confirm?managerId=' + managerId"
                class="class47_b"
              >
                待处理
                <el-badge :value="wait_to_confirm" class="class49"></el-badge>
              </a>
            </el-col>

            <el-col>
              <a
                :href="
                  '/Import_information_confirm_checked?managerId=' + managerId
                "
                class="class48_b"
                >已导入</a
              >
            </el-col>
          </el-row>
        </el-row>

        <el-row
          v-for="(staff, index) in staffs"
          :key="index"
          style="height: 500px; top: 0px"
        >
          <el-table
            :data="staff.messages"
            header-align="center"
            :header-cell-style="{ background: '#CEE9FF', color: '#666666' }"
            :cell-style="{ color: '#0072DC' }"
            class="class46"
          >
            <!-- <el-scrollbar style="height: 100%"> -->
            <el-table-column
              label="工号"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.id }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="部门"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.department }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="姓名"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <i class="el-icon-user"></i>
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column
              label="职称"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.title }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="邮箱"
              width="300"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.email }}</p>
              </template>
            </el-table-column>
            <!-- </el-scrollbar> -->
          </el-table>

          <el-carousel
            type="card"
            arrow="always"
            :loop="false"
            :initial-index="1"
            indicator-position="none"
            :autoplay="false"
            style="position: reletive; top: 180px"
          >
            <el-carousel-item
              v-for="(card, cindex) in staff.staff_suit"
              :key="cindex"
            >
              <el-card body-style="height:248px;width:386px;">
                <el-row>
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
                      @click="add_Imported_person(staff, card, index)"
                      class="class21"
                    >
                      <i class="el-icon-plus class21_a"></i>
                    </el-button>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="2">
                    <img
                      src="/imgs/添加教职工 2/最新论文.png"
                      class="class22"
                    />
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
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </el-row>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev,pager,next"
          :total="totalCount"
          ref="pageGroup"
        >
        </el-pagination>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Import_information_confirm",
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      staffs: [],
      wait_to_confirm: "", //待处理人数
      confirm_checked: "", //已导入人数
      PageSize: 2,
      currentPage: 1,
      totalCount: 1,
      Wait_persons: [],
      test_staffs: [],
      managerId: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    getfileData() {
      var data = {
        managerId: this.managerId,
      };
      return data;
    },
    UploadSuccess: async function () {
      this.fullscreenLoading = true;
      var Wait_persons = [];
      this.test_staffs = [];
      var url = "http://127.0.0.1:8000/api/get_Wait_persons/";
      var params = new URLSearchParams();
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          Wait_persons = response.data.data;
          for (var i = 0; i < Wait_persons.length; i++) {
            var list = [];
            list.push(Wait_persons[i]);
            var dict = {};
            dict["messages"] = list;
            this.test_staffs.push(dict);
          }
          this.confirm_checked = response.data.confirm_checked_num;
        })
        .catch((error) => {
          console.log("抱歉，调用导入待添加成员失败啦！");
          console.log(error);
        });
      for (var i = 0; i < this.test_staffs.length; i++) {
        await this.get_staff_suit(
          this.test_staffs[i].messages[0].name,
          this.test_staffs[i].messages[0].orgName,
          i
        );
        if (this.test_staffs[i]["staff_suit"].length == 0) {
          var list2 = [];
          var dict2 = {
            orgName: this.test_staffs[i].messages[0].orgName,
            avg:
              "http://img01.guokezy.com/avatars/5d2c148d0f94bb3c44fbd602.jpg",
            scholarId: "-1",
            name: this.test_staffs[i].messages[0].name,
            position: this.test_staffs[i].messages[0].title,
            department: this.test_staffs[i].messages[0].department,
            paperCount: 0,
            paperTitle: "",
            projectCount: 0,
            patentCount: 0,
          };
          list2.push(dict2);
          this.test_staffs[i]["staff_suit"] = list2;
        }
      }
      this.staffs = this.test_staffs;
      this.wait_to_confirm = this.staffs.length;
      this.totalCount = this.wait_to_confirm;
      this.staffs = this.staffs.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
      this.$message({
        type: "success",
        message: "成员导入成功",
        duration: 1000,
      });
    },

    get_staff_suit: async function (scholarName, orgName, i) {
      var url = "/aps/scholar/getScholarByInfo";
      var Wait_persons_messages = [];
      await this.$axios
        .get(url, {
          params: {
            name: scholarName,
            orgName: orgName,
          },
        })
        .then((response) => {
          Wait_persons_messages = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉,调用知兔根据学者名与机构名返回对应信息失败啦");
          console.log(error);
        });

      var list2 = [];
      for (var j = 0; j < Wait_persons_messages.length; j++) {
        var dict2 = {};
        dict2["orgName"] = Wait_persons_messages[j].ownName;
        dict2["avg"] = Wait_persons_messages[j].avatar;
        dict2["scholarId"] = Wait_persons_messages[j].id;
        dict2["name"] = Wait_persons_messages[j].name;
        dict2["position"] = Wait_persons_messages[j].title;
        dict2["department"] = Wait_persons_messages[j].department;
        var url = "/apis/v1/scholars/" + dict2["scholarId"];
        await this.$axios
          .get(url)
          .then((response) => {
            dict2["position"] = response.data.data.position;
            dict2["department"] = response.data.data.department;
            dict2["avg"] = response.data.data.avatarSd;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取学者基本信息失败！");
            console.log(error);
            console.log("出错的名字为：" + Wait_persons_messages[j].name);
          });
        var url = "/apis/v1/scholars/" + dict2["scholarId"] + "/papers";
        await this.$axios
          .get(url)
          .then((response) => {
            dict2["paperCount"] = response.data.data.totalElements;
            if (dict2["paperCount"] != 0) {
              dict2["paperTitle"] = response.data.data.content[0].title;
            } else {
              dict2["paperTitle"] = "";
            }
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取论文信息失败！");
            console.log(error);
          });

        var url = "/apis/v1/scholars/" + dict2["scholarId"] + "/projects";
        await this.$axios
          .get(url)
          .then((response) => {
            dict2["projectCount"] = response.data.data.totalElements;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取项目信息失败！");
            console.log(error);
          });

        var url = "/apis/v1/scholars/" + dict2["scholarId"] + "/patents";
        await this.$axios
          .get(url)
          .then((response) => {
            dict2["patentCount"] = response.data.data.totalElements;
          })
          .catch((error) => {
            console.log("抱歉，知兔获取根据学者id获取专利信息失败！");
            console.log(error);
          });

        list2.push(dict2);
      }
      this.test_staffs[i]["staff_suit"] = list2;
    },

    get_staffs: async function (n1, n2) {
      this.staffs = this.test_staffs;
      this.wait_to_confirm = this.staffs.length;
      this.totalCount = this.wait_to_confirm;
      this.staffs = this.staffs.slice((this.currentPage - 1) * n1, n2);
    },

    get_staffs_begin: async function (n1, n2) {
      this.fullscreenLoading = true;
      var Wait_persons = [];
      this.test_staffs = [];
      var url = "http://127.0.0.1:8000/api/get_Wait_persons/";
      var params = new URLSearchParams();
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          Wait_persons = response.data.data;
          this.confirm_checked = response.data.confirm_checked_num;
          for (var i = 0; i < Wait_persons.length; i++) {
            var list = [];
            list.push(Wait_persons[i]);
            var dict = {};
            dict["messages"] = list;
            this.test_staffs.push(dict);
          }
        })
        .catch((error) => {
          console.log("抱歉，调用待添加成员接口失败啦");
          console.log(error);
        });
      for (var i = 0; i < this.test_staffs.length; i++) {
        await this.get_staff_suit(
          this.test_staffs[i].messages[0].name,
          this.test_staffs[i].messages[0].orgName,
          i
        );
        if (this.test_staffs[i]["staff_suit"].length == 0) {
          var list2 = [];
          var dict2 = {
            orgName: this.test_staffs[i].messages[0].orgName,
            avg:
              "http://img01.guokezy.com/avatars/5d2c148d0f94bb3c44fbd602.jpg",
            scholarId: "-1",
            name: this.test_staffs[i].messages[0].name,
            position: this.test_staffs[i].messages[0].title,
            department: this.test_staffs[i].messages[0].department,
            paperCount: 0,
            paperTitle: "",
            projectCount: 0,
            patentCount: 0,
          };
          list2.push(dict2);
          this.test_staffs[i]["staff_suit"] = list2;
        }
      }
      this.staffs = this.test_staffs;
      this.wait_to_confirm = this.staffs.length;
      this.totalCount = this.wait_to_confirm;
      this.staffs = this.staffs.slice((this.currentPage - 1) * n1, n2);
      this.fullscreenLoading = false;
    },

    // 显示第几页,改变默认的页数,切换页码时，要获取每页显示的条数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_staffs(this.PageSize, val * this.PageSize);
    },

    add_Imported_person: async function (staff, card, index) {
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
          id: staff.messages[0].id,
          name: staff.messages[0].name,
          department: staff.messages[0].department,
          email: staff.messages[0].email,
          title: staff.messages[0].title,
          orgName: staff.messages[0].orgName,
          avg: card.avg,
          paperCount: card.paperCount,
          projectCount: card.projectCount,
          patentCount: card.patentCount,
          scholarId: card.scholarId,
          // 以下四个参数待获取
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
            this.confirm_checked = response.data.data;
          })
          .catch((error) => {
            console.log("抱歉，调用添加导入成员接口失败啦");
            console.log(error);
          });

        this.test_staffs.splice(
          index + (this.currentPage - 1) * this.PageSize,
          1
        );
        if (
          index + (this.currentPage - 1) * this.PageSize ==
            this.test_staffs.length &&
          index == 0
        ) {
          this.currentPage--;
        }
        this.staffs = this.test_staffs;
        this.wait_to_confirm = this.staffs.length;
        this.totalCount = this.wait_to_confirm;
        this.staffs = this.staffs.slice(
          (this.currentPage - 1) * this.PageSize,
          this.currentPage * this.PageSize
        );
        // this.confirm_checked++;
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
          }
        }
      })
      .catch((error) => {
        console.log("抱歉，失败啦");
        console.log(error);
        this.$router.push({ name: "error" });
      });
    this.get_staffs_begin(this.PageSize, this.currentPage * this.PageSize);
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
.el-carousel__container {
  width: 55%;
  position: center;
}

.el-carousel__container {
  position: relative;
  height: 300px;
  left: 180px;
}
</style>