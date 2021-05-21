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

    <el-main class="class40">
      <el-scrollbar style="height: 100%">
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

          <el-col class="class43">
            <el-button type="primary" @click="send_emails()"
              >发送成员注册邮件</el-button
            >
          </el-col>
        </el-row>

        <el-table
          :data="tableData"
          header-align="center"
          class="class45"
          :header-cell-style="{ background: '#CEE9FF', color: '#0072DC' }"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="工号"
            width="160"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]"> {{ scope.row.id }}</span>
              <el-input
                v-if="showEdit[scope.$index]"
                v-model="scope.row.id"
                :disabled="true"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label=" 部门"
            width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.department
              }}</span>
              <el-input
                v-if="showEdit[scope.$index]"
                v-model="scope.row.department"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{ scope.row.name }}</span>
              <el-input
                v-if="showEdit[scope.$index]"
                v-model="scope.row.name"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="职称"
            width="120"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{ scope.row.title }}</span>
              <el-input
                v-if="showEdit[scope.$index]"
                v-model="scope.row.title"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            width="250"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{ scope.row.email }}</span>
              <el-input
                v-if="showEdit[scope.$index]"
                v-model="scope.row.email"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column
            label="论文数"
            width="70"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.paperCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.paperCount"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column
            label="项目数"
            width="70"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.projectCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.projectCount"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column
            label="专利数"
            width="70"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.patentCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.patentCount"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="软件著作权数"
            width="140"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.copyrightCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.copyrightCount"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column
            label="获奖数"
            width="70"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.awardCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.awardCount"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column
            label="学生获奖数"
            width="100"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!showEdit[scope.$index]">{{
                scope.row.student_awardCount
              }}</span>
              <el-input
                type="text"
                v-if="showEdit[scope.$index]"
                v-model="scope.row.student_awardCount"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)"
                v-if="showBtn[scope.$index]"
              >
                保存
              </el-button>
              <el-button
                size="mini"
                @click="handleCancel(scope.$index, scope.row)"
                v-if="showBtn[scope.$index]"
              >
                取消
              </el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                v-if="!showBtn[scope.$index]"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
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
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Import_information_confirm_checked",
  data() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      tableData: [],
      tableData_keep: [],
      showEdit: [],
      showBtn: [],
      wait_to_confirm: "", //待处理人数
      confirm_checked: "", //已导入人数
      managerId: "",
      PageSize: 10,
      currentPage: 1,
      totalCount: "",
    };
  },
  methods: {
    getfileData() {
      var data = {
        managerId: this.managerId,
      };
      return data;
    },
    handleCurrentChange: async function (val) {
      this.currentPage = val;
      this.tableData = this.tableData_keep.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
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
    handleDelete: async function (index, row) {
      var judge = false;
      await this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1),
            this.$message({
              type: "success",
              message: "删除成功!",
              duration: 1000,
            });
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 1000,
          });
        });
      if (judge) {
        var params = new URLSearchParams();
        var url = "http://127.0.0.1:8000/api/remove_Imported_persons/";
        params.append("id", row.id);
        params.append("managerId", this.managerId);
        await this.$axios
          .post(url, params)
          .then((response) => {
            this.confirm_checked = this.confirm_checked - 1;
          })
          .catch((error) => {
            console.log("抱歉，调用删除已导入成员接口失败");
            console.log(error);
          });
      }
    },
    handleEdit(index, row) {
      this.$set(this.showEdit, index, true);
      this.$set(this.showBtn, index, true);
    },
    handleCancel(index, row) {
      this.$set(this.showEdit, index, false);
      this.$set(this.showBtn, index, false);
    },
    handleUpdate: async function (index, row) {
      this.$set(this.showEdit, index, false);
      this.$set(this.showBtn, index, false);
      var params = new URLSearchParams();
      var url = "http://127.0.0.1:8000/api/change_Imported_persons/";
      params.append("data", JSON.stringify(row));
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {})
        .catch((error) => {
          console.log("抱歉，调用修改导入成员结果信息失败");
          console.log(error);
        });
    },
    UploadSuccess: async function () {
      var url = "http://127.0.0.1:8000/api/get_Wait_persons/";
      var params = new URLSearchParams();
      params.append("managerId", this.managerId);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.wait_to_confirm += response.data.data.length;
        })
        .catch((error) => {
          console.log("抱歉，调用获取待添加成员接口失败");
          console.log(error);
        });
    },
    send_emails: async function () {
      var judge = false;
      await this.$confirm(
        "此操作将为所有已导入成员发送邮件，并清空待导入成员表，同时跳转进入成果管理页面, 是否继续?",
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
        this.$router.push({
          name: "Member_management",
          query: {
            managerId: this.managerId,
          },
        });
        var url = "http://127.0.0.1:8000/api/changeManagerState/";
        var params = new URLSearchParams();
        params.append("managerId", this.managerId);
        params.append("state", 2);
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，调用修改管理人员状态接口失败啦");
            console.log(error);
          });
        var url = "http://127.0.0.1:8000/api/send_emails/";
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，邮件接口调用失败啦");
            console.log(error);
          });
      }
    },
  },
  created: async function () {
    this.currentPage = 1;
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

    var url = "http://127.0.0.1:8000/api/get_Imported_persons/";
    params.append("managerId", this.managerId);
    await this.$axios
      .post(url, params)
      .then((response) => {
        this.wait_to_confirm = response.data.wait_to_confirm_num;
        this.tableData_keep = response.data.data;
        this.totalCount = this.tableData_keep.length;
        this.tableData = this.tableData_keep.slice(
          (this.currentPage - 1) * this.PageSize,
          this.currentPage * this.PageSize
        );
        this.confirm_checked = response.data.data.length;
      })
      .catch((error) => {
        console.log("抱歉，调用获取已导入成员接口失败");
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