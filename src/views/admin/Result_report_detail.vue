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
      <el-head class="class1_a">
        <a
          :href="'/Achievement?managerId=' + managerId"
          class="class4"
          style="text-decoration: none"
          >&lt; 返回</a
        >
      </el-head>

      <el-main class="class2_a">
        <el-row>
          <el-col :span="6">
            <div class="class32">
              {{ begin_year }}年1月1日——{{ end_year }}年12月31日成果报告（共{{
                total_person
              }}人）
            </div>
          </el-col>
          <el-col :span="5">
            <div class="class33">
              <el-button type="primary" @click="send_Achivement_emails()"
                >群发确认邮件</el-button
              >
            </div>
          </el-col>
          <el-col :span="5">
            <div class="class33_a">
              <el-button type="primary" @click="get_Excel2()"
                >导出Excel文件</el-button
              >
            </div>
          </el-col>
        </el-row>

        <div class="class34">
          <el-table
            :data="tableData"
            header-align="center"
            :row-class-name="tableRowClassName"
            :header-cell-style="{ background: '#CEE9FF', color: '#0072DC' }"
          >
            <el-table-column
              label="姓名"
              width="85"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="SCI论文"
              width="75"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.paperSciCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="EI论文"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.paperEiCount }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="其他论文"
              width="50"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.paperOtherCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="论文总数"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.paperCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="国家级项目"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.projectNationCount
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="省部级项目"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.projectProvinceCount
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="其他项目"
              width="50"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.projectOtherCount
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="项目总数"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.projectCount
                }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="专利"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.patentCount }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="著作"
              width="127"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.workCount }}</p>
              </template>
            </el-table-column> -->

            <el-table-column
              label="国家级获奖"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.awardNationCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="省部级获奖"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.awardProvinceCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="其他获奖"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.awardOtherCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="获奖总数"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.awardCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="软件著作权"
              width="75"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.software_copyrightCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="国家级学生获奖"
              width="80"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.student_awardNationCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="省部级学生获奖"
              width="80"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.student_awardProvinceCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="其他学生获奖"
              width="75"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.student_awardOtherCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="学生获奖总数"
              width="80"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.student_awardCount }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="成果总数"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.total }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="70"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <p v-if="scope.row.state === '未确认'" style="color: red">
                  {{ scope.row.state }}
                </p>
                <p v-else style="color: black">{{ scope.row.state }}</p>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              header-align="center"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="send_Achivement_email_Single(scope.row)"
                  type="primary"
                >
                  发送确认邮件
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Result_report_detail",
  data() {
    return {
      tableData: [],
      total_person: "",
      begin_year: "",
      end_year: "",
      managerId: "",
    };
  },
  methods: {
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
    send_Achivement_email_Single: async function (row) {
      var judge = false;
      await this.$confirm(
        "此操作将更新该成员成果报告信息，并将该成员状态变为未确认，并为其发送成果确认邮件，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "发送邮件成功!",
            duration: 1000,
          });
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送邮件",
            duration: 1000,
          });
        });
      if (judge) {
        await this.change_message_Single(row);
        this.$router.go(0);
      }
    },
    send_Achivement_emails: async function () {
      var judge = false;
      await this.$confirm(
        "此操作将更新成果报告信息，并将所有成员状态变为未确认，并为每位成员发送邮件，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "群发邮件成功!",
            duration: 1000,
          });
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消群发邮件",
            duration: 1000,
          });
        });
      if (judge) {
        var params = new URLSearchParams();
        var data = {
          begin_year: this.begin_year,
          end_year: this.end_year,
        };
        params.append("data", JSON.stringify(data));
        params.append("managerId", this.managerId);
        var persons;
        var url = "http://127.0.0.1:8000/api/get_ScholarsByYear/";
        await this.$axios
          .post(url, params)
          .then((response) => {
            persons = response.data.data;
          })
          .catch((error) => {
            console.log("抱歉，邮件接口调用失败啦");
            console.log(error);
          });
        for (var i in persons) {
          await this.change_message_Single(persons[i]);
        }
        this.$router.go(0);
      }
    },
    change_message_Single: async function (row) {
      var scholarId = row.scholarId;
      var url = "http://127.0.0.1:8000/api/get_messageByScholarId/";
      var person;
      var params = new URLSearchParams();
      params.append("scholarId", scholarId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          person = response.data.data;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入成员接口失败");
          console.log(error);
        });
      var dic = {};
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
          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          for (var i in data2) {
            var data = data2[i];
            if (
              data.startYear >= this.begin_year &&
              data.endYear <= this.end_year
            ) {
              if (data.typeFirst == "国家级项目") {
                count1++;
              } else if (data.typeFirst == "省部级项目") {
                count2++;
              } else {
                count3++;
              }
              count++;
            }
          }
          for (var i in projects2) {
            var data = projects2[i];
            if (
              data.startYear >= this.begin_year &&
              data.endYear <= this.end_year
            ) {
              if (data.typeFirst == "国家级项目") {
                count1++;
              } else if (data.typeFirst == "省部级项目") {
                count2++;
              } else {
                count3++;
              }
              count++;
            }
          }
          dic["projectNationCount"] = count1;
          dic["projectProvinceCount"] = count2;
          dic["projectOtherCount"] = count3;
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
            if (year >= this.begin_year && year <= this.end_year) {
              count++;
            }
          }
          for (var i in patents2) {
            var data = patents2[i];
            year = data["applicationDate"];
            if (year >= this.begin_year && year <= this.end_year) {
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
          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          var totalCount = 0;
          for (var i in data2) {
            var data = data2[i];
            if (data.year >= this.begin_year && data.year <= this.end_year) {
              if (data.sciPaper) {
                count1++;
              }
              if (data.eiPaper) {
                count2++;
              }
              if (!data.sciPaper && !data.eiPaper) {
                count3++;
              }
              totalCount++;
            }
          }
          for (var i in papers2) {
            var data = papers2[i];
            if (data.year >= this.begin_year && data.year <= this.end_year) {
              if (data.sciPaper) {
                count1++;
              }
              if (data.eiPaper) {
                count2++;
              }
              if (!data.sciPaper && !data.eiPaper) {
                count3++;
              }
              totalCount++;
            }
          }
          dic["paperCount"] = totalCount;
          dic["paperSciCount"] = count1;
          dic["paperEiCount"] = count2;
          dic["paperOtherCount"] = count3;
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
            if (
              data.getTime >= this.begin_year &&
              data.getTime <= this.end_year
            ) {
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
          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          for (var i in data2) {
            var data = data2[i];
            if (
              data.getTime >= this.begin_year &&
              data.getTime <= this.end_year
            ) {
              if (data.level == "国家级获奖") {
                count1++;
              } else if (data.level == "省部级获奖") {
                count2++;
              } else {
                count3++;
              }
              count++;
            }
          }
          dic["awardNationCount"] = count1;
          dic["awardProvinceCount"] = count2;
          dic["awardOtherCount"] = count3;
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
          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          for (var i in data2) {
            var data = data2[i];
            if (
              data.getTime >= this.begin_year &&
              data.getTime <= this.end_year
            ) {
              if (data.level == "国家级获奖") {
                count1++;
              } else if (data.level == "省部级获奖") {
                count2++;
              } else {
                count3++;
              }
              count++;
            }
          }
          dic["student_awardCount"] = count;
          dic["student_awardNationCount"] = count1;
          dic["student_awardProvinceCount"] = count2;
          dic["student_awardOtherCount"] = count3;
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

      var url = "http://127.0.0.1:8000/api/send_Achivement_email_Single/";
      var params = new URLSearchParams();
      var data = {
        name: row.name,
        email: row.email,
        scholarId: row.scholarId,
        begin_year: this.begin_year,
        end_year: this.end_year,
        message: dic,
        managerId: this.managerId,
      };
      params.append("data", JSON.stringify(data));
      await this.$axios
        .post(url, params)
        .then((response) => {})
        .catch((error) => {
          console.log("抱歉，单独调用邮件接口调用失败啦");
          console.log(error);
        });
    },
    get_Excel2: async function () {
      var params = new URLSearchParams();
      var url = "http://127.0.0.1:8000/api/get_Excel2/";
      var title =
        this.begin_year.toString() +
        "年1月1日" +
        "————" +
        this.end_year.toString() +
        "年12月31日" +
        "导出文件表";
      params.append("data", JSON.stringify(this.tableData));
      params.append("title", title);
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
          link.setAttribute(
            "download",
            this.begin_year.toString() +
              "年1月1日" +
              "———" +
              this.end_year.toString() +
              "年12月31日" +
              "导出文件表"
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.log("抱歉，调用导出文件表失败");
          console.log(error);
        });
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
    this.begin_year = this.$route.query.begin_year;
    this.end_year = this.$route.query.end_year;
    var url = "http://127.0.0.1:8000/api/get_Achievement_report_detail";
    this.$axios
      .get(url, {
        params: {
          begin_year: this.begin_year,
          end_year: this.end_year,
          managerId: this.managerId,
        },
      })
      .then((response) => {
        this.tableData = response.data.data;
        this.total_person = this.tableData.length;
      })
      .catch((error) => {
        console.log("抱歉，获取年度成果报告详情接口调用失败啦");
        console.log(error);
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
</style>