<template>
  <el-container>
    <el-main>
      <!-- <el-row class="class169_f">
        <el-col :span="2">姓名：{{ person2.name }} </el-col>
        <el-col :span="5"> 部门： {{ person2.department }} </el-col>
      </el-row> -->

      <el-row class="class169_a">
        <el-col :span="10">
          <a :href="get_Achievement_acknowlege()" class="class169_b">
            {{ person2.name }}的成果（{{ person.totalFolderNum }}）
          </a></el-col
        ><el-col :span="10">
          <a :href="get_project_management()" class="class169_c">
            <img
              src="imgs/教师端-成果确认/成果管理.png"
              class="class169_d"
            />成果管理
          </a>
        </el-col>
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
            >论文（{{ person.paperFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 1"
            class="class61"
            @click="get_paper"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >论文（{{ person.paperFolderNum }}）</el-button
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
            >专利（{{ person.patentFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 2"
            class="class62"
            @click="get_patent"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >专利（{{ person.patentFolderNum }}）</el-button
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
            >项目（{{ person.projectFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 3"
            class="class63"
            @click="get_project"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >项目（{{ person.projectFolderNum }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 5"
            type="primary"
            class="class64"
            @click="get_award"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >获奖（{{ person.awardFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 5"
            class="class64"
            @click="get_award"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >获奖（{{ person.awardFolderNum }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 6"
            type="primary"
            class="class65"
            @click="get_student_award"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >学生获奖（{{ person.student_awardFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 6"
            class="class65"
            @click="get_student_award"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >学生获奖（{{ person.student_awardFolderNum }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 7"
            type="primary"
            class="class174"
            @click="get_copyright"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >软著（{{ person.copyrightFolderNum }}）</el-button
          >
          <el-button
            v-if="flag != 7"
            class="class174"
            @click="get_copyright"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中"
            >软著（{{ person.copyrightFolderNum }}）</el-button
          >
        </el-col>
      </el-row>

      <el-row class="class176">
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
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="拼命加载中"
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
  name: "Achievement_acknowlege",
  data() {
    return {
      messages: "",
      person: "",
      person2: "",
      scholarId: "",
      flag: "", //1论文,2专利,3项目,4著作,5获奖,6软著
      total_messages: [],
      PageSize: 5,
      currentPage: 1,
      totalCount: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    get_person: async function () {
      var url = "http://127.0.0.1:8000/api/get_FolderNum/";
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
      var url = "http://127.0.0.1:8000/api/get_messageByScholarId/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.person2 = response.data.data;
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
          console.log(response);
          papers = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入论文接口失败");
          console.log(error);
        });
      this.total_messages = [];
      for (var i = 0; i < list_back.length; i++) {
        if (papers.indexOf(list_back[i].id.toString()) != -1) {
          this.total_messages.push(list_back[i]);
        }
      }
      for (var i in papers2) {
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
        if (patents.indexOf(list_back[i].id.toString()) != -1) {
          this.total_messages.push(list_back[i]);
        }
      }
      for (var i in patents2) {
        var data = patents2[i];
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
            var dic = {
              title: data.title,
              date: data.startYear + "年",
              cite_number: "-",
              publication: "-",
              flag_SCI: false,
              flag_EI: false,
              authors: [],
              id: data.id,
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
        if (projects.indexOf(list_back[i].id.toString()) != -1) {
          this.total_messages.push(list_back[i]);
        }
      }
      for (var i in projects2) {
        var data = projects2[i];
        var dic = {
          title: data.title,
          date: data.startYear + "年",
          cite_number: "-",
          publication: "-",
          flag_SCI: false,
          flag_EI: false,
          typeFirst: data["typeFirst"],
          typeSecondary: data["typeSecondary"],
          authors: data.authors.split(","),
        };
        this.total_messages.push(dic);
      }
      this.totalCount = this.total_messages.length;
      this.messages = this.total_messages.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.fullscreenLoading = false;
    },
    // get_work: async function () {
    //   this.fullscreenLoading = true;
    //   if (this.flag != 4) {
    //     this.currentPage = 1;
    //   }
    //   this.flag = 4;
    //   var list_back = [];
    //   this.total_messages = [];
    //   for (var i = 0; i < list_back.length; i++) {
    //     if (projects.indexOf(list_back[i].id.toString()) != -1) {
    //       this.total_messages.push(list_back[i]);
    //     }
    //   }
    //   this.totalCount = this.total_messages.length;
    //   this.messages = this.total_messages.slice(
    //     (this.currentPage - 1) * this.PageSize,
    //     this.currentPage * this.PageSize
    //   );
    //   this.fullscreenLoading = false;
    // },
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
    get_Achievement_acknowlege() {
      return "/Achievement_acknowlege?scholarId=" + this.scholarId;
    },
    get_project_management() {
      return "/project_management?scholarId=" + this.scholarId;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.currentPage = val;
      this.messages = this.total_messages;
      this.messages = this.messages.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
      // switch (this.flag) {
      //   case 1:
      //     this.get_paper();
      //     break;
      //   case 2:
      //     this.get_patent();
      //     break;
      //   case 3:
      //     this.get_project();
      //     break;
      //   case 4:
      //     this.get_copyright();
      //     break;
      //   case 5:
      //     this.get_award();
      //     break;
      //   case 6:
      //     this.get_student_award();
      //     break;
      // }
    },
  },
  created() {
    this.flag = 1;
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