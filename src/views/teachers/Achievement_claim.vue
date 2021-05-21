<template>
  <el-container>
    <el-main>
      <el-row class="class169_a">
        <el-col :span="5" class="class169_b2">
          {{ person.name }}的全部待认领成果（{{ person.total_number }}）
        </el-col>

        <el-button
          type="primary"
          class="class169_e"
          @click="change_Achievement_acknowlege"
        >
          成果查看
        </el-button>
      </el-row>

      <el-row class="class172">
        <el-col :span="5">
          <el-button
            v-if="flag == 1"
            type="primary"
            class="class61"
            @click="get_paper"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >论文（{{ person.paperCount_unchecked }}）</el-button
          >
          <el-button
            v-if="flag != 1"
            class="class61"
            @click="get_paper"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >论文（{{ person.paperCount_unchecked }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 2"
            type="primary"
            class="class62"
            @click="get_patent"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >专利（{{ person.patentCount_unchecked }}）</el-button
          >
          <el-button
            v-if="flag != 2"
            class="class62"
            @click="get_patent"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >专利（{{ person.patentCount_unchecked }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 3"
            type="primary"
            class="class63"
            @click="get_project"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >项目（{{ person.projectCount_unchecked }}）</el-button
          >
          <el-button
            v-if="flag != 3"
            class="class63"
            @click="get_project"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >项目（{{ person.projectCount_unchecked }}）</el-button
          >
        </el-col>
      </el-row>

      <el-row class="class176">
        <el-checkbox-group v-model="checkList">
          <el-row
            v-for="(message, index) in messages"
            :key="index"
            style="
              height: 146px;
              background: #ffffff;
              border: 1px solid #eeeeee;
            "
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
                作品名称： 《{{ message.title }}》
              </el-col>
              <el-col :span="4" class="class69_a">
                <el-checkbox
                  :label="message.id"
                  :key="message.id"
                  @change="getCheckList()"
                  >{{ "" }}</el-checkbox
                >
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
        </el-checkbox-group>

        <el-button
          type="primary"
          @click="addProjectAll"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="正在处理请求，请不要关闭页面"
          >一键认领所有{{ project_name }}成果</el-button
        >
        <el-button
          type="primary"
          @click="addProject"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="正在处理请求，请不要关闭页面"
          >认领已选择{{ project_name }}成果</el-button
        >
        <el-pagination
          @current-change="handleCurrentChange"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="正在处理请求，请不要关闭页面"
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
  name: "Achievement_claim",
  data() {
    return {
      messages: "",
      total_messages: [],
      person: "",
      achievementCount: "",
      scholarId: "",
      flag: "", //1论文,2专利,3项目,4著作,5获奖,6软著
      project_name: "",
      PageSize: 5,
      currentPage: 1,
      totalCount: "",
      checkList: [],
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
          this.person = response.data.data;
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
      this.project_name = "论文";
      var list_back = [];
      var url = "http://127.0.0.1:8000/api/get_All_Papers/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_papers", this.person.paperCount);
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          for (var i in data2) {
            var data = data2[i];
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
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口论文数目失败");
        });
      var url = "http://127.0.0.1:8000/api/get_Paper/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      var papers = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          papers = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入论文接口失败");
          console.log(error);
        });
      this.total_messages = [];
      for (var i = 0; i < list_back.length; i++) {
        if (papers.indexOf(list_back[i].id.toString()) == -1) {
          this.total_messages.push(list_back[i]);
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
      this.project_name = "专利";
      var list_back = [];
      var url = "http://127.0.0.1:8000/api/get_All_Patents/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_patents", this.person.patentCount);
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          for (var i in data2) {
            var data = data2[i];
            var year = new Date(
              data.applicationDate.split("T")[0]
            ).getFullYear();
            var dic = {
              title: data["title"],
              date: year + "年",
              cite_number: "-",
              publication: "-",
              flag_SCI: false,
              flag_EI: false,
              id: data["id"],
              patentType: data["patentType"],
              legalStatus: data["legalStatus"],
            };
            dic["authors"] = data["inventorName"].split(",");
            list_back.push(dic);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口专利数目失败");
        });
      var url = "http://127.0.0.1:8000/api/get_Patent/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      var patents = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          patents = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入专利接口失败");
          console.log(error);
        });
      this.total_messages = [];
      for (var i = 0; i < list_back.length; i++) {
        if (patents.indexOf(list_back[i].id.toString()) == -1) {
          this.total_messages.push(list_back[i]);
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
      this.project_name = "项目";
      var list_back = [];
      var url = "http://127.0.0.1:8000/api/get_All_Projects/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId.toString());
      params.append("total_projects", this.person.projectCount);
      await this.$axios
        .post(url, params)
        .then((response) => {
          var data2 = response.data.data;
          for (var i in data2) {
            var data = data2[i];
            var dic = {
              title: data.title,
              date: data.startYear + "年",
              cite_number: "-",
              publication: "-",
              flag_SCI: false,
              flag_EI: false,
              authors: [],
              id: data["id"],
              typeFirst: data["typeFirst"],
              typeSecondary: data["typeSecondary"],
            };
            list_back.push(dic);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("调用访问知兔接口项目数目失败");
        });
      var url = "http://127.0.0.1:8000/api/get_Project/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      var projects = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          projects = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入专利接口失败");
          console.log(error);
        });
      this.total_messages = [];
      for (var i = 0; i < list_back.length; i++) {
        if (projects.indexOf(list_back[i].id.toString()) == -1) {
          this.total_messages.push(list_back[i]);
        }
      }
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    get_Achievement_acknowlege() {
      return "/Achievement_acknowlege?scholarId=" + this.scholarId;
    },
    handleCurrentChange: async function (val) {
      this.currentPage = val;
      this.messages = this.total_messages;
      this.messages = this.messages.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
      // switch (this.flag) {
      //   case 1:
      //     await this.get_paper();
      //     break;
      //   case 2:
      //     await this.get_patent();
      //     break;
      //   case 3:
      //     await this.get_project();
      //     break;
      // }
    },
    getCheckList() {},
    addProject: async function () {
      var judge = false;
      await this.$confirm("是否认领这些成果", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
        this.fullscreenLoading = true;
        var url;
        var params = new URLSearchParams();
        params.append("scholarId", this.scholarId);
        switch (this.flag) {
          case 1:
            url = "http://127.0.0.1:8000/api/add_Paper_management/";
            params.append("paperIds", JSON.stringify(this.checkList));
            break;
          case 2:
            url = "http://127.0.0.1:8000/api/add_Patent_management/";
            params.append("patentIds", JSON.stringify(this.checkList));
            break;
          case 3:
            url = "http://127.0.0.1:8000/api/add_Project_management/";
            params.append("projectIds", JSON.stringify(this.checkList));
            break;
        }
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，调用获取已导入成员接口失败");
            console.log(error);
          });
        this.$message({
          type: "success",
          message: "成果认领完成",
          duration: 600,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
      }
    },
    addProjectAll: async function () {
      var judge = false;
      await this.$confirm("是否一键认领全部成果", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
            duration: 1000,
          });
        });
      if (judge) {
        this.fullscreenLoading = true;
        var url;
        var params = new URLSearchParams();
        var projectIds = [];
        for (var i = 0; i < this.total_messages.length; i++) {
          projectIds.push(this.total_messages[i].id);
        }
        console.log(projectIds);
        params.append("scholarId", this.scholarId);
        switch (this.flag) {
          case 1:
            url = "http://127.0.0.1:8000/api/add_Paper_management/";
            params.append("paperIds", JSON.stringify(projectIds));
            break;
          case 2:
            url = "http://127.0.0.1:8000/api/add_Patent_management/";
            params.append("patentIds", JSON.stringify(projectIds));
            break;
          case 3:
            url = "http://127.0.0.1:8000/api/add_Project_management/";
            params.append("projectIds", JSON.stringify(projectIds));
            break;
        }
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，调用获取已导入成员接口失败");
            console.log(error);
          });
        this.$message({
          type: "success",
          message: "成果认领完成",
          duration: 1000,
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 1000);
      }
    },
    change_Achievement_acknowlege() {
      this.$confirm(
        "请确认认领完毕所有成果, 此操作将永久关闭此页面，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          var url = "http://127.0.0.1:8000/api/change_Person_State/";
          var params = new URLSearchParams();
          params.append("scholarId", this.scholarId.toString());
          this.$axios
            .post(url, params)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              console.log("调用更改用户状态接口失败");
            });
          this.$router.push({
            name: "Achievement_acknowlege",
            query: {
              scholarId: this.scholarId,
            },
          });
          this.$message({
            type: "success",
            message: "进入成功",
            duration: 1000,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
            duration: 1000,
          });
        });
    },
  },
  created() {
    this.flag = this.$route.query.flag;
    this.scholarId = this.$route.query.scholarId;
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
a {
  text-decoration: none;
  text-decoration-color: #0070e3;
}
</style>