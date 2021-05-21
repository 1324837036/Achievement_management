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

    <el-main class="class2_b">
      <a
        :href="'/Achievement_analysis?managerId=' + managerId"
        class="class4_b"
        style="text-decoration: none"
        >&lt; 返回</a
      >
      <el-row>
        <el-col :span="3">
          <img :src="person2.avg" class="class55" />
        </el-col>
        <el-col :span="3">
          <div class="class56">
            {{ person2.name }}
          </div>
        </el-col>
        <el-col :span="5">
          <div class="class57">
            {{ person2.title }}
          </div>
        </el-col>
      </el-row>

      <el-divider class="class58"></el-divider>

      <el-row>
        <el-col :span="5" class="class59"> 全部成果数量 </el-col>
      </el-row>

      <el-row class="class60">
        <el-col :span="5">
          <el-button
            v-if="flag == 1"
            class="class61"
            @click="get_paper()"
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >论文（{{ person2.paperCount2 }}）</el-button
          >
          <el-button
            v-if="flag != 1"
            class="class61"
            @click="get_paper()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >论文（{{ person2.paperCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 2"
            type="primary"
            class="class62"
            @click="get_patent()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >专利（{{ person2.patentCount2 }}）</el-button
          >
          <el-button
            class="class62"
            @click="get_patent()"
            v-if="flag != 2"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >专利（{{ person2.patentCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            class="class63"
            @click="get_project()"
            type="primary"
            v-if="flag == 3"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >项目（{{ person2.projectCount2 }}）</el-button
          >
          <el-button
            class="class63"
            @click="get_project()"
            v-if="flag != 3"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >项目（{{ person2.projectCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 4"
            class="class64"
            type="primary"
            @click="get_copyright()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >软件著作权（{{ person2.copyrightCount2 }}）</el-button
          >
          <el-button
            v-if="flag != 4"
            class="class64"
            @click="get_copyright()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >软件著作权（{{ person2.copyrightCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 5"
            type="primary"
            class="class65"
            @click="get_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >获奖（{{ person2.awardCount2 }}）</el-button
          >
          <el-button
            v-if="flag != 5"
            class="class65"
            @click="get_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >获奖（{{ person2.awardCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 6"
            type="primary"
            class="class65_a"
            @click="get_student_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >学生获奖（{{ person2.student_awardCount2 }}）</el-button
          >
          <el-button
            v-if="flag != 6"
            class="class65_a"
            @click="get_student_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >学生获奖（{{ person2.student_awardCount2 }}）</el-button
          >
        </el-col>
        <el-col :span="5" class="class66">
          <el-select
            v-model="year_select"
            placeholder="请选择年份"
            @change="get_year()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
          >
            <el-option
              v-for="num in 20"
              :label="year_now - num + 1"
              :value="year_now - num + 1"
              :key="num"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="class66_a">
        <el-row
          v-for="(message, index) in messages"
          :key="index"
          style="height: 146px; background: #ffffff; border: 1px solid #eeeeee"
        >
          <el-row>
            <el-col :span="4">
              <el-tag v-if="message.flag_SCI" effect="dark" class="class68_a"
                >SCI</el-tag
              >
              <el-tag
                v-if="message.flag_EI"
                effect="dark"
                type="success"
                class="class68_b"
                >EI</el-tag
              >
            </el-col>
            <el-col :span="3" class="class69">
              {{ message.title }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="class70">
              发布日期：{{ message.date }}
            </el-col>
            <el-col v-if="flag == 1" :span="4" class="class71">
              引用量：{{ message.cite_number }}
            </el-col>
            <el-col v-if="flag == 2" :span="4" class="class71_a">
              专利类型：{{ message.patentType }}
            </el-col>
            <el-col v-if="flag == 3" :span="5" class="class71_a">
              项目级别：{{ message.typeFirst }}
            </el-col>
            <el-col v-if="flag == 4" :span="5" class="class71_a">
              著作权类型：{{ message.type }}
            </el-col>
            <el-col v-if="flag == 5" :span="5" class="class71_a">
              获奖级别：{{ message.level }}
            </el-col>
            <el-col v-if="flag == 6" :span="5" class="class71_a">
              获奖级别：{{ message.level }}
            </el-col>

            <el-col v-if="flag == 1" :span="4" class="class72">
              出版社：{{ message.publication }}
            </el-col>
            <el-col v-if="flag == 2" :span="4" class="class72">
              审核状态：{{ message.legalStatus }}
            </el-col>
            <el-col v-if="flag == 3" :span="4" class="class72">
              项目二级级别：{{ message.typeSecondary }}
            </el-col>
            <el-col v-if="flag == 4" :span="4" class="class72">
              证书号：{{ message.certificateId }}
            </el-col>
            <el-col v-if="flag == 5" :span="4" class="class72">
              获奖名次：{{ message.rank }}
            </el-col>
            <el-col v-if="flag == 6" :span="4" class="class72">
              获奖名次：{{ message.rank }}
            </el-col>

            <el-col :span="5" class="class73"> 作者： </el-col>

            <div class="class75_a">
              <span v-for="(author, index) in message.authors" :key="index">
                <el-col :span="4" v-if="index < 6">
                  <div class="class75">
                    {{ author }}
                  </div>
                </el-col>
              </span>
            </div>
          </el-row>
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
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Achievement_list",
  data() {
    return {
      year_now: new Date().getFullYear(),
      year_select: "",
      messages: "",
      person: "",
      person2: "",
      scholarId: "",
      flag: "", //1论文,2专利,3项目,4著作,5获奖,6软著
      total_messages: [],
      PageSize: 5,
      currentPage: 1,
      totalCount: "",
      managerId: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    get_person: async function () {
      var url = "http://127.0.0.1:8000/api/get_messageByScholarId/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.person2 = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入成员接口失败");
          console.log(error);
        });
      await this.get_paper();
    },
    get_paper: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 1) {
        this.currentPage = 1;
      }
      this.flag = 1;
      var list_back = [];
      var url = "http://127.0.0.1:8000/api/get_All_Papers/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_papers", this.person2.paperCount);
      var papers2 = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          papers2 = response.data.data2;
          for (var i in data2) {
            var data = data2[i];
            if (this.year_select == "" || data["year"] == this.year_select) {
              var dic = {
                title: data["title"],
                date: data["year"] + "年",
                cite_number: data["citationNum"],
                publication: data["venue"],
                flag_SCI: data["sciPaper"],
                flag_EI: data["eiPaper"],
                id: data["id"],
              };
              var authors = [];
              for (var i in data["authors"]) {
                authors.push(data["authors"][i]["name"]);
              }
              dic["authors"] = authors;
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口论文数目失败");
        });
      this.total_messages = list_back;
      for (var i in papers2) {
        if (this.year_select == "" || data["year"] == this.year_select) {
          var data = papers2[i];
          var dic = {
            title: data["title"],
            date: data["year"] + "年",
            cite_number: data["citationNum"],
            publication: data["venue"],
            flag_SCI: data["sciPaper"],
            flag_EI: data["eiPaper"],
          };
          var authors = data["authors"].split(" ");
          dic["authors"] = authors;
          this.total_messages.push(dic);
        }
      }
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_patent: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 2) {
        this.currentPage = 1;
      }
      this.flag = 2;
      var list_back = [];
      var patents2 = [];
      var url = "http://127.0.0.1:8000/api/get_All_Patents/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_patents", this.person2.patentCount);
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          patents2 = response.data.data2;
          for (var i in data2) {
            var data = data2[i];
            var year = new Date(
              data.applicationDate.split("T")[0]
            ).getFullYear();
            if (this.year_select == "" || this.year_select == year) {
              var dic = {
                title: data["title"],
                date: year + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                patentType: data["patentType"],
                legalStatus: data["legalStatus"],
                id: data["id"],
              };
              dic["authors"] = data["inventorName"].split(",");
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口专利数目失败");
        });

      this.total_messages = list_back;
      for (var i in patents2) {
        var data = patents2[i];
        if (
          this.year_select == "" ||
          this.year_select == data["applicationDate"]
        ) {
          var dic = {
            title: data["title"],
            date: data["applicationDate"] + "年",
            cite_number: "-",
            publication: "-",
            flag_SCI: false,
            flag_EI: false,
            patentType: data["patentType"],
            legalStatus: data["legalStatus"],
          };
          dic["authors"] = data["inventorName"].split(",");
          this.total_messages.push(dic);
        }
      }
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_project: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 3) {
        this.currentPage = 1;
      }
      this.flag = 3;
      var list_back = [];
      var projects2 = [];
      var url = "http://127.0.0.1:8000/api/get_All_Projects/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_projects", this.person2.projectCount);

      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          projects2 = response.data.data2;
          for (var i in data2) {
            var data = data2[i];
            if (this.year_select == "" || this.year_select == data.startYear) {
              var dic = {
                title: data.title,
                date: data.startYear + "年",
                typeFirst: data["typeFirst"],
                typeSecondary: data["typeSecondary"],
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
                id: data.id,
              };
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      this.total_messages = list_back;
      for (var i in projects2) {
        var data = projects2[i];
        if (this.year_select == "" || this.year_select == data.startYear) {
          var dic = {
            title: data.title,
            date: data.startYear + "年",
            cite_number: "-",
            publication: "-",
            flag_SCI: false,
            flag_EI: false,
            authors: data.authors.split(","),
            typeFirst: data["typeFirst"],
            typeSecondary: data["typeSecondary"],
          };
          this.total_messages.push(dic);
        }
      }
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_copyright: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 4) {
        this.currentPage = 1;
      }
      this.flag = 4;
      var list_back = [];
      this.total_messages = [];
      var url = "http://127.0.0.1:8000/api/get_All_SoftwareCopyright/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          console.log(response.data.data);
          for (var i in data2) {
            var data = data2[i];
            if (this.year_select == "" || this.year_select == data.getTime) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
                type: data.type,
                certificateId: data.certificateId,
              };
              dic["authors"] = data.authors.split(",");
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      this.total_messages = list_back;
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_award: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 5) {
        this.currentPage = 1;
      }
      this.flag = 5;
      var list_back = [];
      this.total_messages = [];
      var url = "http://127.0.0.1:8000/api/get_All_Award/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          for (var i in data2) {
            var data = data2[i];
            if (this.year_select == "" || this.year_select == data.getTime) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
                rank: data.rank,
                level: data.level,
              };
              dic["authors"] = data.authors.split(",");
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      this.total_messages = list_back;
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_student_award: async function () {
      this.fullscreenLoading = true;
      if (this.flag != 6) {
        this.currentPage = 1;
      }
      this.flag = 6;
      var list_back = [];
      this.total_messages = [];
      var url = "http://127.0.0.1:8000/api/get_All_StudentAward/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          for (var i in data2) {
            var data = data2[i];
            if (this.year_select == "" || this.year_select == data.getTime) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
                level: data.level,
                rank: data.rank,
              };
              dic["authors"] = data.authors.split(",");
              list_back.push(dic);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      this.total_messages = list_back;
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },

    get_year: async function () {
      this.currentPage = 1;
      switch (this.flag) {
        case 1:
          this.get_paper();
          break;
        case 2:
          this.get_patent();
          break;
        case 3:
          this.get_project();
          break;
        case 4:
          this.get_copyright();
          break;
        case 5:
          this.get_award();
          break;
        case 6:
          this.get_student_award();
          break;
      }
    },
    handleCurrentChange: async function (val) {
      this.currentPage = val;
      this.messages = this.total_messages;
      this.messages = this.messages.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
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
    this.scholarId = this.$route.query.scholarId;
    this.flag = 1;
    this.get_person();
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>