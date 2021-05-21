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
      <el-row>
        <el-col :span="3">
          <div class="class7">年度成果报告</div>
        </el-col>
        <el-col :span="4">
          <div class="class8">
            <el-button
              type="primary"
              size="medium"
              @click="dialogVisible = true"
              >创建成果报告</el-button
            >
            <el-dialog
              :visible.sync="dialogVisible"
              custom-class="class86"
              center
              width="604px"
            >
              <div class="class87">
                <img src="/imgs/核对信息、报告.png" />
              </div>
              <div class="class88">创建成果报告</div>

              <el-row>
                <el-col>
                  <div class="class89">
                    <el-select
                      v-model="begin_year"
                      placeholder="请选择开始年份"
                      style="width: 155px"
                    >
                      <el-option
                        v-for="num in 20"
                        :key="num"
                        :label="year_now - num + 1"
                        :value="year_now - num + 1"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col class="class90">
                  <div>至</div>
                </el-col>
                <el-col class="class91">
                  <el-select
                    v-model="end_year"
                    placeholder="请选择结束年份"
                    style="width: 155px"
                  >
                    <el-option
                      v-for="num in 20"
                      :key="num"
                      :label="year_now - num + 1"
                      :value="year_now - num + 1"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="class92">
                <el-button
                  type="primary"
                  @click="add_Achievement_report"
                  v-loading.fullscreen.lock="fullscreenLoading"
                  element-loading-text="正在生成成果报告"
                  >生成成果报告</el-button
                >
              </el-row>
            </el-dialog>
          </div>
        </el-col>
      </el-row>

      <div class="class9">
        <el-row v-for="(report, index) in Achievement_report_now" :key="index">
          <el-col :span="5">
            <el-button
              class="class9_a"
              @click="get_Report_Detail(report.begin_year, report.end_year)"
            >
              {{ report.begin_year }}年1月1日——{{
                report.end_year
              }}年12月31日研究成果统计
            </el-button>
          </el-col>
        </el-row>

        <el-pagination
          v-if="total > 0"
          background
          prev-text="< 上一页"
          next-text="下一页 >"
          layout="prev,pager,next"
          :total="total"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          ref="pageGroup"
        >
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Achievement",
  data() {
    return {
      dialogVisible: false,
      year_now: new Date().getFullYear(),
      begin_year: "",
      end_year: "",
      total: "",
      currentPage: 1,
      PageSize: 10,
      Achievement_report: [],
      Achievement_report_now: [],
      persons: [],
      managerId: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    handleCurrentChange(val) {
      // 改变默认的页数,切换页码时，要获取每页显示的条数
      this.currentPage = val;
      this.Achievement_report_now = this.Achievement_report.slice(
        (val - 1) * this.PageSize,
        val * this.PageSize - 1
      );
    },
    pervious() {
      this.$refs.pageGroup.prev();
    },
    next() {
      this.$refs.pageGroup.next();
    },

    add_Achievement_report: async function () {
      if (this.begin_year == "" || this.end_year == "") {
        await this.$message({
          type: "error",
          message: "请先选择开始年份与结束年份",
          duration: 1000,
        });
        return;
      }
      if (this.begin_year > this.end_year) {
        await this.$message({
          type: "error",
          message: "结束年份不能大于开始年份",
          duration: 1000,
        });
        return;
      }
      this.fullscreenLoading = true;
      var params = new URLSearchParams();
      var url = "http://127.0.0.1:8000/api/add_Achievement_report/";
      var data = {
        begin_year: this.begin_year,
        end_year: this.end_year,
      };
      params.append("data", JSON.stringify(data));
      params.append("managerId", this.managerId);
      var report_id = 0;
      var persons2 = [];
      await this.$axios
        .post(url, params)
        .then((response) => {
          if (response.data.status == 0) {
            this.$message({
              type: "error",
              message: response.data.messages,
              duration: 1000,
            });
          } else if (response.data.status == 1) {
            report_id = response.data.report_id;
          }
        })
        .catch((error) => {
          console.log("抱歉，调用add_Achievement_report失败");
          console.log(error);
        });

      var url = "http://127.0.0.1:8000/api/get_Imported_persons/";
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

      for (var i in persons) {
        var person = persons[i];
        var dic = {};
        dic["id"] = person.id;
        dic["name"] = person.name;
        dic["scholarId"] = person.scholarId;
        dic["email"] = person.email;
        dic["state"] = 0;
        dic["report_id"] = report_id;

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
                if (!data.sciPapar && !data.eiPaper) {
                  count3++;
                }
                totalCount++;
              }
            }
            for (var i in papers2) {
              var data = papers2[i];
              if (data.year >= this.begin_year && data.year <= this.end_year) {
                if (data.sciPapar == 1) {
                  count1++;
                }
                if (data.eiPaper == 1) {
                  count2++;
                }
                if (!data.sciPapar && !data.eiPaper) {
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
                if (data.level == "国家级项目") {
                  count1++;
                } else if (data.level == "省部级项目") {
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
                if (data.level == "国家级项目") {
                  count1++;
                } else if (data.level == "省部级项目") {
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
        persons2.push(dic);
        console.log(dic);
      }

      var url = "http://127.0.0.1:8000/api/add_Achievement_report_detail/";
      var params = new URLSearchParams();
      params.append("data", JSON.stringify(persons2));
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          console.log(response);
          this.$message({
            type: "success",
            message: response.data.messages,
            duration: 1000,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 1000);
        })
        .catch((error) => {
          console.log("抱歉，调用添加年度成功报告详细信息失败");
          console.log(error);
        });
    },

    get_Report_Detail: async function (begin_year, end_year) {
      this.$router.push({
        name: "Result_report_detail",
        query: {
          begin_year: begin_year,
          end_year: end_year,
          managerId: this.managerId,
        },
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
    var url = "http://127.0.0.1:8000/api/get_Achievement_report/";
    this.$axios
      .post(url, params)
      .then((response) => {
        this.Achievement_report = response.data.data;
        this.total = response.data.data.length;
        this.currentPage = 1;
        this.Achievement_report_now = this.Achievement_report;
        this.Achievement_report_now = this.Achievement_report_now.slice(
          0,
          this.PageSize - 1
        );
      })
      .catch((error) => {
        console.log(error);
        console.log("抱歉，调用get_Achievement_report失败");
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