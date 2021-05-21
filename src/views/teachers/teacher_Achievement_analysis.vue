<template>
  <el-container>
    <el-main>
      <span class="class158"></span>
      <span class="class159"> {{ begin_year }}-{{ end_year }}年成果数量 </span>
      <!-- <span class="class160"> 全部成果数量 </span> -->
      <el-divider class="class161"></el-divider>

      <span class="class162"> </span>
      <span class="class163">
        {{ begin_year }}年1月1日至{{ end_year }}年12月31日共找到成果数量【{{
          total_number
        }}】
      </span>
      <span class="class164"> 成果数量将决定年终考核，如成果数量不足请 </span>
      <span class="class164_a">
        <a
          :href="
            '/Invitation?scholarId=' + scholarId + '&managerId=' + managerId
          "
          >添加</a
        >
      </span>

      <el-button
        v-if="person.state == 0"
        type="primary"
        size="mini"
        class="class166"
        @click="change_state"
        >确认我的成果数据</el-button
      >

      <el-button
        v-if="person.state == 1"
        type="primary"
        size="mini"
        class="class165"
        @click="change_state"
        disabled
        >已确认</el-button
      >

      <el-row class="class167">
        <el-col :span="5">
          <el-button
            v-if="flag == 1"
            class="class61"
            @click="get_paper()"
            type="primary"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >论文（{{ person.paperCount }}）</el-button
          >
          <el-button
            v-if="flag != 1"
            class="class61"
            @click="get_paper()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >论文（{{ person.paperCount }}）</el-button
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
            >专利（{{ person.patentCount }}）</el-button
          >
          <el-button
            class="class62"
            @click="get_patent()"
            v-if="flag != 2"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >专利（{{ person.patentCount }}）</el-button
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
            >项目（{{ person.projectCount }}）</el-button
          >
          <el-button
            class="class63"
            @click="get_project()"
            v-if="flag != 3"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >项目（{{ person.projectCount }}）</el-button
          >
        </el-col>
        <el-col :span="5">
          <el-button
            v-if="flag == 4"
            class="class64"
            type="primary"
            @click="get_work()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >软件著作权（{{ person.software_copyrightCount }}）</el-button
          >
          <el-button
            v-if="flag != 4"
            class="class64"
            @click="get_copyright()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >软件著作权（{{ person.software_copyrightCount }}）</el-button
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
            >获奖（{{ person.awardCount }}）</el-button
          >
          <el-button
            v-if="flag != 5"
            class="class65"
            @click="get_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >获奖（{{ person.awardCount }}）</el-button
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
            >学生获奖（{{ person.student_awardCount }}）</el-button
          >
          <el-button
            v-if="flag != 6"
            class="class65_a"
            @click="get_student_award()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载数据，请稍后"
            >学生获奖（{{ person.student_awardCount }}）</el-button
          >
        </el-col>
      </el-row>

      <el-row class="class168">
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
  name: "teacher_Achievement_analysis",
  data() {
    return {
      begin_year: "",
      end_year: "",
      scholarId: "",
      messages: "",
      person: {},
      person2: "",
      total_number: "",
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
    change_Invitation() {
      this.$router.push({
        name: "Invitation",
        query: {
          scholarId: this.scholarId,
          managerId: this.managerId,
        },
      });
    },
    get_person: async function () {
      var url =
        "http://127.0.0.1:8000/api/get_AchievementReportDetailByScholarId/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      params.append("begin_year", this.begin_year);
      params.append("end_year", this.end_year);
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.person = response.data.data;
          this.total_number =
            this.person.paperCount +
            this.person.patentCount +
            this.person.projectCount +
            this.person.software_copyrightCount +
            this.person.awardCount +
            this.person.student_awardCount;
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
            if (this.begin_year <= data.year && this.end_year >= data.year) {
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
        var data = papers2[i];
        if (this.begin_year <= data["year"] && this.end_year >= data["year"]) {
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
            if (this.begin_year <= year && this.end_year >= year) {
              var dic = {
                title: data["title"],
                date: year + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
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
          this.begin_year <= data["applicationDate"] &&
          this.end_year >= data["applicationDate"]
        ) {
          var dic = {
            title: data["title"],
            date: data["applicationDate"] + "年",
            cite_number: "-",
            publication: "-",
            flag_SCI: false,
            flag_EI: false,
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
            if (
              this.begin_year <= data.startYear &&
              data.startYear <= this.end_year
            ) {
              var dic = {
                title: data.title,
                date: data.startYear + "年",
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
        if (
          this.begin_year <= data.startYear &&
          data.startYear <= this.end_year
        ) {
          var dic = {
            title: data.title,
            date: data.startYear + "年",
            cite_number: "-",
            publication: "-",
            flag_SCI: false,
            flag_EI: false,
            authors: data.authors.split(","),
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
            if (
              this.begin_year <= data.getTime &&
              this.end_year >= data.getTime
            ) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
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
            if (
              this.begin_year <= data.getTime &&
              this.end_year >= data.getTime
            ) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
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
            if (
              this.begin_year <= data.getTime &&
              this.end_year >= data.getTime
            ) {
              var dic = {
                title: data.title,
                date: data.getTime + "年",
                cite_number: "-",
                publication: "-",
                flag_SCI: false,
                flag_EI: false,
                authors: [],
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.messages = this.total_messages;
      this.messages = this.messages.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
    },
    change_state: async function () {
      var url =
        "http://127.0.0.1:8000/api/change_AchievementReportDetailStateByScholarId/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      params.append("begin_year", this.begin_year);
      params.append("end_year", this.end_year);
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.person = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用改变成员状态接口失败");
          console.log(error);
        });
    },
  },
  created() {
    this.scholarId = this.$route.query.scholarId;
    this.managerId = this.$route.query.managerId;
    this.begin_year = this.$route.query.begin_year;
    this.end_year = this.$route.query.end_year;
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
</style>