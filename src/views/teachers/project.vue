<template>
  <el-container>
    <el-main>
      <el-row class="class143">
        <el-col :span="7">
          <a
            href=""
            v-on:click="change_Achievement_acknowlege"
            style="color: #999999"
            >{{ name }}的成果
          </a>
        </el-col>

        <el-col :span="2"> &gt; </el-col>
        <el-col :span="5">
          <a
            href=""
            v-on:click="change_project_management"
            style="color: #999999"
            >成果管理</a
          >
        </el-col>
        <el-col :span="2"> &gt; </el-col>
        <el-col :span="6">
          <a href="" v-on:click="change_project" style="color: #0064f9">{{
            project_name
          }}</a>
        </el-col>
      </el-row>

      <el-button type="primary" class="class106" @click="dialogVisible = true"
        >新增项目</el-button
      >
      <el-dialog
        v-if="flag <= 3"
        :visible.sync="dialogVisible"
        custom-class="class149"
        center
      >
        <a href="" @click="change_Results_search">
          <span>
            <img src="imgs/教师端-项目/弹窗-背景.png" class="class150" />
          </span>
          <span>
            <img src="imgs/教师端-项目/搜索.png" class="class151" />
          </span>
          <span class="class152"> 搜索认领 </span>
          <span class="class153"> 输入关键词，搜索你的科研成果并认领 </span>
        </a>

        <el-upload
          action="http://127.0.0.1:8000/api/save_file/"
          class="upload-demo"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="true"
          :data="getfileData()"
          :on-success="UploadSuccess"
        >
          <span class="class157"> </span>
          <span>
            <img src="imgs/教师端-项目/上传.png" class="class154" />
          </span>
          <span class="class155"> 上传成果模板 </span>
          <span class="class156"> 请先下载当前成果模板，完善信息后上传 </span>
        </el-upload>
      </el-dialog>

      <el-dialog
        v-if="flag > 3"
        :visible.sync="dialogVisible"
        custom-class="class149"
        center
      >
        <el-upload
          v-if="flag > 3"
          action="http://127.0.0.1:8000/api/save_file/"
          class="upload-demo"
          accept=".xlsx"
          :show-file-list="false"
          :auto-upload="true"
          :data="getfileData()"
          :on-success="UploadSuccess"
        >
          <span v-if="flag > 3" class="class157_b"> </span>
          <span v-if="flag > 3">
            <img
              v-if="flag > 3"
              src="imgs/教师端-项目/上传.png"
              class="class154_b"
            />
          </span>
          <span v-if="flag > 3" class="class155_b"> 上传成果模板 </span>
          <span v-if="flag > 3" class="class156_b">
            请先下载当前成果模板，完善信息后上传
          </span>
        </el-upload>
      </el-dialog>

      <el-divider class="class107"></el-divider>

      <div class="class108">全部{{ project_number }}个</div>

      <el-row
        :gutter="20"
        v-for="(project, index) in projects"
        :key="index"
        :style="{ top: 186 + Math.floor(index / 3) * 200 + 'px' }"
        :class="setClass(index)"
      >
        <el-col :span="6">
          <el-col><img src="imgs/下载模板.png" class="class110" /></el-col>
          <el-col>
            <div class="class112">
              {{ project.name }}
            </div>
            <div>
              <span>
                <img class="class111" src="imgs/下载.png" />
              </span>
              <span class="class113">
                <a :href="get_FileByName(project.name)">点击下载</a>
              </span>
            </div>
          </el-col>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "project",
  data() {
    return {
      project_number: "",
      projects: "",
      dialogVisible: false,
      scholarId: "",
      flag: "",
      project_name: "",
      name: "",
    };
  },
  methods: {
    setClass: function (num) {
      if (this.flag != 3) {
        return num % 2 == 0 ? "class109_2" : "class109_a_2";
      } else {
        return num % 3 == 0
          ? "class109"
          : num % 3 == 1
          ? "class109_a"
          : "class109_b";
      }
    },
    getfileData() {
      var data = {
        scholarId: this.scholarId,
        project_name: this.project_name,
      };
      return data;
    },
    UploadSuccess: async function (response) {
      if ((response.state = 1)) {
        this.$message({
          type: "success",
          message: response.message,
        });
      } else {
        this.$message({
          type: "error",
          message: response.message,
        });
      }
      setTimeout(() => {
        this.$router.go(0);
      }, 1000);
    },
    change_Achievement_acknowlege() {
      this.$router.push({
        name: "Achievement_acknowlege",
        query: {
          scholarId: this.scholarId,
        },
      });
      return;
    },
    change_project_management() {
      this.$router.push({
        name: "project_management",
        query: {
          scholarId: this.scholarId,
        },
      });
    },

    change_Results_search() {
      this.$router.push({
        name: "Results_search",
        query: {
          scholarId: this.scholarId,
          flag: this.flag,
        },
      });
    },
    change_project() {
      this.$router.push({
        name: "project",
        query: {
          scholarId: this.scholarId,
          flag: this.flag,
        },
      });
    },
    get_files: async function () {
      var url = "http://127.0.0.1:8000/api/get_files/";
      var params = new URLSearchParams();
      params.append("scholarId", this.scholarId);
      params.append("project_name", this.project_name);
      await this.$axios
        .post(url, params)
        .then((response) => {
          this.name = response.data.data.name;
          this.projects = response.data.files;
        })
        .catch((error) => {
          console.log("抱歉，调用获取已导入成员接口失败");
          console.log(error);
        });
    },
    get_FileByName: function (name) {
      return (
        "http://127.0.0.1:8000/api/get_FileByName?scholarId=" +
        encodeURIComponent(this.scholarId) +
        "&project_name=" +
        encodeURIComponent(this.project_name) +
        "&name=" +
        encodeURIComponent(name)
      );
    },
    delete_FileByName: async function (name) {
      await this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var url = "http://127.0.0.1:8000/api/delete_FileByName";
          this.$axios
            .get(url, {
              params: {
                scholarId: this.scholarId,
                project_name: this.project_name,
                name: name,
              },
            })
            .then((response) => {
              console.log(response);
              if (response.data.state == 1) {
                this.$message({
                  type: "success",
                  message: response.data.message,
                  duration: 600,
                });
              } else {
                this.$message({
                  type: "error",
                  message: response.data.message,
                  duration: 600,
                });
              }
              setTimeout(() => {
                this.$router.go(0);
              }, 600);
            })
            .catch((error) => {
              console.log("抱歉，删除文件接口调用失败啦");
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            duration: 600,
          });
        });
    },
  },
  created() {
    this.scholarId = this.$route.query.scholarId;
    this.project_number = this.$route.query.project_number;
    this.flag = parseInt(this.$route.query.flag);
    switch (this.flag) {
      case 1:
        this.project_name = "论文";
        break;
      case 2:
        this.project_name = "专利";
        break;
      case 3:
        this.project_name = "项目";
        break;
      case 4:
        this.project_name = "软件著作权";
        break;
      case 5:
        this.project_name = "获奖";
        break;
      case 6:
        this.project_name = "学生获奖";
        break;
    }
    this.get_files();
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
  background-color: white;
}
</style>