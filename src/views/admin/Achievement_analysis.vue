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

    <el-main class="class11">
      <el-divider class="class93"></el-divider>
      <img src="imgs/成果分析.png" class="class94" />
      <div class="class95">成果分析</div>

      <el-row>
        <el-col span="4" class="class96">
          <el-select
            v-model="year_select"
            placeholder="请选择年份"
            @change="get_year()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在生成成果报告"
          >
            <el-option
              v-for="num in 20"
              :label="year_now - num + 1"
              :value="year_now - num + 1"
              :key="num"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="5" class="class96_a">
          <el-checkbox-group
            v-model="checklist"
            @change="get_checklist()"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在生成成果报告"
          >
            <el-checkbox label="SCI 论文"></el-checkbox>
            <el-checkbox label="EI 论文"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="class97">
          <el-select
            v-model="achievement_category"
            placeholder="请选择成果类别"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载信息，请稍等"
            @change="get_achievement_category()"
          >
            <el-option
              v-for="achievement_category in achievement_categorys"
              :label="achievement_category.key"
              :value="achievement_category.value"
              :key="achievement_category.key"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <div class="class98">数量≥</div>
        </el-col>
        <el-col :span="4" class="class99">
          <el-select
            v-model="number"
            placeholder="请选择成果数量"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在加载信息，请稍等"
            @change="get_achievement_category()"
          >
            <el-option
              v-for="num in 20"
              :label="num - 1"
              :value="num - 1"
              :key="num"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <div class="class100">共找到{{ find_perosn_number }}人</div>
        </el-col>
        <el-col :span="6">
          <div class="class102">
            <el-button type="primary" @click="get_Excel()"
              >导出Excel文件</el-button
            >
          </div>
        </el-col>
      </el-row>

      <div class="class101">
        <el-table
          :data="tableData"
          border="true"
          header-align="center"
          :row-class-name="tableRowClassName"
          :header-cell-style="{ background: '#CEE9FF', color: '#0072DC' }"
          style="width: 100%"
        >
          <el-table-column
            label="姓名"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <router-link
                :to="{
                  path: '/Achievement_list',
                  query: {
                    scholarId: scope.row.scholarId,
                    managerId: managerId,
                  },
                }"
                style="color: #009cff"
                >{{ scope.row.name }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column
            label="论文"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.paperCount }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="项目"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.projectCount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="专利"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.patentCount }}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="著作"
            width="146"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.workCount }}</p>
            </template>
          </el-table-column> -->
          <el-table-column
            label="获奖"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.awardCount }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="软件著作权"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.software_copyrightCount }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="学生获奖"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.student_awardCount }}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="总数"
            width="180"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p>{{ scope.row.total }}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="状态"
            width="160"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <p v-if="scope.row.state === '未确认'" style="color: red">
                {{ scope.row.state }}
              </p>
              <p v-else style="color: black">{{ scope.row.state }}</p>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Achievement_analysis",
  data() {
    return {
      checklist: [],
      year_now: new Date().getFullYear(),
      year_select: "",
      flag_EI: false,
      flag_SCI: false,
      achievement_categorys: [
        {
          key: "论文",
          value: "paper",
        },
        {
          key: "项目",
          value: "project",
        },
        {
          key: "专利",
          value: "patent",
        },
        {
          key: "著作",
          value: "work",
        },
        {
          key: "获奖",
          value: "award",
        },
        {
          key: "软件著作权",
          value: "software_copyright",
        },
        {
          key: "学生获奖",
          value: "student_award",
        },
        {
          key: "总数",
          value: "total",
        },
      ],
      achievement_category: "",
      find_perosn_number: 0,
      number: 0,
      tableData: [],
      managerId: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    get_year: async function () {
      console.log(this.year_select);
      this.get_Achievement();
    },
    get_checklist: async function () {
      this.flag_SCI = false;
      this.flag_EI = false;
      for (var i = 0; i < this.checklist.length; i++) {
        if (this.checklist[i] == "EI 论文") {
          this.flag_EI = true;
        }
        if (this.checklist[i] == "SCI 论文") {
          this.flag_SCI = true;
        }
      }
      console.log(this.checklist);
      console.log("flag_EI:" + this.flag_EI);
      console.log("flag_SCI:" + this.flag_SCI);
      this.get_Achievement();
    },
    get_achievement_category: async function () {
      console.log(this.achievement_category);
      console.log(this.number);
      this.get_Achievement();
    },
    get_Achievement: async function () {
      this.fullscreenLoading = true;
      var url = "http://127.0.0.1:8000/api/get_Imported_persons/";
      var params = new URLSearchParams();
      params.append("managerId", this.managerId);
      var persons = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          persons = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入成员信息失败");
          console.log(error);
        });

      var persons2 = [];
      for (var i in persons) {
        var person = persons[i];
        var dic = {};
        dic["id"] = person.id;
        dic["name"] = person.name;
        dic["scholarId"] = person.scholarId;
        dic["email"] = person.email;
        dic["state"] = "未确认";

        var url2 = "http://127.0.0.1:8000/api/get_All_Projects/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        params.append("total_projects", person.projectCount);
        await this.$axios
          .post(url2, params)
          .then((response) => {
            var data2 = response.data.data;
            var projects2 = response.data.data2;
            var count = 0;
            for (var i in data2) {
              var data = data2[i];
              if (this.year_select == "") {
                count++;
              } else if (data.startYear == this.year_select) {
                count++;
              }
            }
            for (var i in projects2) {
              var data = projects2[i];
              if (this.year_select == "") {
                count++;
              } else if (data.startYear == this.year_select) {
                count++;
              }
            }
            dic["projectCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口项目数目失败");
          });

        var url2 = "http://127.0.0.1:8000/api/get_All_Patents/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        params.append("total_patents", person.patentCount);
        await this.$axios
          .post(url2, params)
          .then((response) => {
            var data2 = response.data.data;
            var patents2 = response.data.data2;
            var count = 0;
            for (var i in data2) {
              var data = data2[i];
              var year = new Date(
                data.applicationDate.split("T")[0]
              ).getFullYear();
              if (this.year_select == "") {
                count++;
              } else if (year == this.year_select) {
                count++;
              }
            }
            for (var i in patents2) {
              var data = patents2[i];
              if (
                this.year_select == "" ||
                this.year_select == data["applicationDate"]
              ) {
                count++;
              }
            }
            dic["patentCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口专利数目失败");
          });

        var url2 = "http://127.0.0.1:8000/api/get_All_Papers/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        params.append("total_papers", person.paperCount);
        await this.$axios
          .post(url2, params)
          .then((response) => {
            var data2 = response.data.data;
            var papers2 = response.data.data2;
            var count = 0;
            for (var i in data2) {
              var data = data2[i];
              if (this.flag_EI && !this.flag_SCI) {
                if (this.year_select == "" && data.eiPaper) {
                  count++;
                } else if (data.year == this.year_select && data.eiPaper) {
                  count++;
                }
              } else if (!this.flag_EI && this.flag_SCI) {
                if (this.year_select == "" && data.sciPaper) {
                  count++;
                } else if (data.year == this.year_select && data.sciPaper) {
                  count++;
                }
              } else if (this.flag_EI && this.flag_SCI) {
                if (this.year_select == "" && data.eiPaper && data.sciPaper) {
                  count++;
                } else if (
                  data.year == this.year_select &&
                  data.sciPaper &&
                  data.eiPaper
                ) {
                  count++;
                }
              } else {
                if (this.year_select == "") {
                  count++;
                } else if (data.year == this.year_select) {
                  count++;
                }
              }
            }
            for (var i in papers2) {
              var data = papers2[i];
              if (this.flag_EI && !this.flag_SCI) {
                if (this.year_select == "" && data.eiPaper) {
                  count++;
                } else if (data.year == this.year_select && data.eiPaper) {
                  count++;
                }
              } else if (!this.flag_EI && this.flag_SCI) {
                if (this.year_select == "" && data.sciPaper) {
                  count++;
                } else if (data.year == this.year_select && data.sciPaper) {
                  count++;
                }
              } else if (this.flag_EI && this.flag_SCI) {
                if (this.year_select == "" && data.eiPaper && data.sciPaper) {
                  count++;
                } else if (
                  data.year == this.year_select &&
                  data.sciPaper &&
                  data.eiPaper
                ) {
                  count++;
                }
              } else {
                if (this.year_select == "") {
                  count++;
                } else if (data.year == this.year_select) {
                  count++;
                }
              }
            }
            dic["paperCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口论文数目失败");
          });

        var url = "http://127.0.0.1:8000/api/get_All_SoftwareCopyright/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        await this.$axios
          .post(url, params)
          .then((response) => {
            var data2 = response.data.data;
            var count = 0;
            for (var i in data2) {
              var data = data2[i];
              if (this.year_select == "" || this.year_select == data.getTime) {
                count++;
              }
            }
            dic["software_copyrightCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口项目数目失败");
          });

        var url = "http://127.0.0.1:8000/api/get_All_Award/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        await this.$axios
          .post(url, params)
          .then((response) => {
            var data2 = response.data.data;
            var count = 0;
            console.log(response);
            for (var i in data2) {
              var data = data2[i];
              if (this.year_select == "" || this.year_select == data.getTime) {
                count++;
              }
            }
            dic["awardCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口项目数目失败");
          });

        var url = "http://127.0.0.1:8000/api/get_All_StudentAward/";
        var params = new URLSearchParams();
        params.append("scholarId", person.scholarId);
        await this.$axios
          .post(url, params)
          .then((response) => {
            var data2 = response.data.data;
            var count = 0;
            for (var i in data2) {
              var data = data2[i];
              if (this.year_select == "" || this.year_select == data.getTime) {
                count++;
              }
            }
            dic["student_awardCount"] = count;
          })
          .catch((error) => {
            console.log(error);
            console.log("调用访问知兔接口项目数目失败");
          });
        dic["workCount"] = 0;
        dic["total"] =
          dic["workCount"] +
          dic["paperCount"] +
          dic["patentCount"] +
          dic["projectCount"] +
          dic["awardCount"] +
          dic["software_copyrightCount"] +
          dic["student_awardCount"];
        if (this.achievement_category == "") {
          persons2.push(dic);
        } else if (dic[this.achievement_category + "Count"] >= this.number) {
          persons2.push(dic);
        }
      }
      this.tableData = persons2;
      this.find_perosn_number = persons2.length;
      this.fullscreenLoading = false;
    },
    get_Excel: async function () {
      var params = new URLSearchParams();
      var url = "http://127.0.0.1:8000/api/get_Excel/";
      params.append("data", JSON.stringify(this.tableData));
      this.$axios
        .post(url, params, {
          responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          const link = document.createElement("a");
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", "导出文件表");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log("抱歉，调用导出文件表失败");
          console.log(error);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "success-row";
      }
      return "";
    },
    tableheaderRowClassName({ row, rowIndex }) {
      return "header-row";
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
    await this.get_Achievement();
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