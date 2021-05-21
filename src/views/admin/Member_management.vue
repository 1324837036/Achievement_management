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
          <!-- <a :href="'/Import_information_confirm?managerId=' + managerId">
            <el-menu-item>
              <img src="imgs/管理中心.png" class="class0_a" />
              <span slot="title"> 成员导入 </span>
            </el-menu-item>
          </a> -->

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
          <el-button type="primary" class="class12" @click="get_total_messages">
            全部教职工（{{ totalNumber }}人)
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-form ref="form" :model="form" class="class13">
            <el-input
              placeholder="请输入成员姓名"
              v-model="form.searchName"
              style="width: 200px"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onSubmit"
              ></el-button>
            </el-input>
          </el-form>
        </el-col>
        <el-col :span="3">
          <div class="class14">
            <a :href="'/Member_add?managerId=' + managerId">
              <el-button type="primary">单个添加成员</el-button>
            </a>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="class14_a">
            <el-button type="primary" @click="change_state"
              >批量添加成员</el-button
            >
            <!-- <a :href="'/Import_information_confirm?managerId=' + managerId">
              <el-button type="primary" @click="change_state"
                >批量添加成员</el-button
              >
            </a> -->
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        border="true"
        header-align="center"
        style="width: 1201px; top: 130px; left: 216px"
        :row-class-name="tableRowClassName"
        :header-cell-style="{ background: '#CEE9FF', color: '#0072DC' }"
      >
        <el-table-column
          label="工号"
          width="163"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!showEdit[scope.$index]"> {{ scope.row.id }}</span>
            <el-input v-if="showEdit[scope.$index]" v-model="scope.row.id">
            </el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="姓名"
          width="155"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!showEdit[scope.$index]"> {{ scope.row.name }}</span>
            <el-input v-if="showEdit[scope.$index]" v-model="scope.row.name">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          width="166"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!showEdit[scope.$index]">
              {{ scope.row.department }}</span
            >
            <el-input
              v-if="showEdit[scope.$index]"
              v-model="scope.row.department"
            >
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="职称"
          width="166"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!showEdit[scope.$index]"> {{ scope.row.title }}</span>
            <el-input
              v-if="showEdit[scope.$index]"
              v-model="scope.row.title"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="电子邮箱"
          width="250"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="!showEdit[scope.$index]"> {{ scope.row.email }}</span>
            <el-input
              v-if="showEdit[scope.$index]"
              v-model="scope.row.email"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          width="300"
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

      <div style="margin-top: 150px">
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
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Member_management",
  data() {
    return {
      input: "",
      tableData: [],
      totalData_keep: [],
      totalNumber: 0,
      showEdit: [],
      showBtn: [],
      form: {
        searchName: "",
      },
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
    UploadUrl: async function (response) {
      if (response.state == 1) {
        await this.$message({
          type: "success",
          message: response.message,
          duration: 1000,
        });
        var url = "http://127.0.0.1:8000/api/changeManagerState/";
        var params = new URLSearchParams();
        params.append("managerId", this.managerId);
        params.append("state", 1);
        await this.$axios
          .post(url, params)
          .then((response) => {})
          .catch((error) => {
            console.log("抱歉，调用修改管理人员状态接口失败啦");
            console.log(error);
          });
        this.$router.push({
          name: "Import_information_confirm",
          query: {
            managerId: this.managerId,
          },
        });
      } else {
        await this.$message({
          type: "error",
          message: response.message,
          duration: 1000,
        });
      }
    },
    change_state: async function () {
      this.$router.push({
        name: "Import_information_confirm",
        query: {
          managerId: this.managerId,
        },
      });
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
          this.$message({
            type: "success",
            message: "删除成功!",
            duration: 600,
          });
          judge = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 600,
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
            console.log(response);
            this.totalNumber = this.totalNumber - 1;
          })
          .catch((error) => {
            console.log("抱歉，失败啦");
            console.log(error);
          });
        this.$router.go(0);
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
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("抱歉，修改成员信息失败啦");
          console.log(error);
        });
    },
    handleCurrentChange: async function (val) {
      this.currentPage = val;
      this.tableData = this.tableData_keep.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
    },
    onSubmit: async function () {
      var params = new URLSearchParams();
      var url = "http://127.0.0.1:8000/api/search_Imported_persons/";
      params.append("managerId", this.managerId);
      params.append("name", this.form.searchName);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.tableData = response.data.data;
          this.totalCount = this.tableData.length;
          this.form.searchName = "";
        })
        .catch((error) => {
          console.log("抱歉，失败啦");
          console.log(error);
        });
    },
    get_total_messages() {
      this.currentPage = 1;
      this.totalCount = this.tableData_keep.length;
      this.tableData = this.tableData_keep.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
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

    await this.$axios
      .post(url, params)
      .then((response) => {
        console.log(response);
        this.tableData_keep = response.data.data;
        this.totalNumber = this.tableData_keep.length;
        this.totalCount = response.data.data.length;
        this.tableData = this.tableData_keep.slice(
          (this.currentPage - 1) * this.PageSize,
          this.currentPage * this.PageSize
        );
      })
      .catch((error) => {
        console.log("抱歉，失败啦");
        console.log(error);
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
body {
  background-color: #e1e4e7;
}
</style>