<template>
  <el-container>
    <el-main>
      <el-row class="class143">
        <el-col :span="7">
          <a
            href=""
            v-on:click="change_Achievement_acknowlege"
            style="color: #999999"
            >{{ person.name }}的成果
          </a>
        </el-col>

        <el-col :span="2"> &gt; </el-col>
        <el-col :span="5">
          <a href="" v-on:click="change_my_project" style="color: #0064f9"
            >成果管理</a
          >
        </el-col>
      </el-row>

      <el-divider class="class144"> </el-divider>

      <div>
        <span class="class145_a class145" @click="get_into_folder(1)">
          <img class="class146_a" src="imgs/论文.png" />
          <div class="class147_a">论文（{{ person.paperFolderNum }}）</div>
        </span>
        <span class="class145_b class145" @click="get_into_folder(2)">
          <div class="class146_b">
            <img src="imgs/专利.png" />
          </div>
          <div class="class147_b">专利（{{ person.patentFolderNum }}）</div>
        </span>
        <span class="class145_c class145" @click="get_into_folder(3)">
          <div class="class146_c">
            <img src="imgs/项目.png" />
          </div>
          <div class="class147_c">项目（{{ person.projectFolderNum }}）</div>
        </span>
        <span class="class145_d class145" @click="get_into_folder(4)">
          <div class="class146_d">
            <img src="imgs/软件著作权.png" />
          </div>
          <div class="class147_d">
            软件著作权（{{ person.copyrightFolderNum }}）
          </div>
        </span>
        <span class="class145_e class145" @click="get_into_folder(5)">
          <div class="class146_e">
            <img src="imgs/获奖.png" />
          </div>
          <div class="class147_e">获奖（{{ person.awardFolderNum }}）</div>
        </span>
        <span class="class145_f class145" @click="get_into_folder(6)">
          <div class="class146_f">
            <img src="imgs/学生获奖.png" />
          </div>
          <div class="class147_f">
            学生获奖（{{ person.student_awardFolderNum }}）
          </div>
        </span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "project_management",
  data() {
    return {
      person: "",
      scholarId: "",
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
    },
    change_Achievement_acknowlege() {
      this.$router.push({
        name: "Achievement_acknowlege",
        query: {
          scholarId: this.scholarId,
        },
      });
    },
    change_my_project() {
      this.$router.push({
        name: "project_management",
        query: {
          scholarId: this.scholarId,
        },
      });
    },
    get_into_folder: function (flag) {
      var total_number = 0;
      switch (flag) {
        case 1:
          total_number = this.person.paperFolderNum;
          break;
        case 2:
          total_number = this.person.patentFolderNum;
          break;
        case 3:
          total_number = this.person.projectFolderNum;
          break;
        case 4:
          total_number = this.person.copyrightFolderNum;
          break;
        case 5:
          total_number = this.person.awardFolderNum;
          break;
        case 6:
          total_number = this.person.student_awardFolderNum;
          break;
      }
      this.$router.push({
        name: "project",
        query: {
          flag: flag,
          scholarId: this.scholarId,
          project_number: total_number,
        },
      });
    },
  },
  created() {
    this.scholarId = this.$route.query.scholarId;
    console.log(this.scholarId);
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