<template>
  <el-row :gutter="20">
    <el-col :span="10">
      <h1>目录</h1>
      <br>
      <el-table
          :data="tableData"
          style="width: 100%"
          height="350">
        <el-table-column
            prop="p_id"
            label="章节编号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="p_index"
            label="序号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="p_name"
            label="名称"
            width="300">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="查看课件"
            width="100">
          <template slot-scope="scope">
            <el-button  @click="handleClick(scope.row)" type="info" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="14">
      <div style="overflow: auto;height: 350px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="prePage">上一页</el-button>
          <el-button type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        <div style="marginTop: 10px; color: #409EFF;">{{ pageNum }} / {{ pageTotalNum }}</div>
        <pdf
            :page="pageNum"
            :src="url"
            @progress="loadedRatio = $event"
            @num-pages="pageTotalNum=$event"
        ></pdf>
      </div>
    </el-col>
  </el-row>
</template>


<script>
import pdf from 'vue-pdf'
export default {
  name: 'partList',
  components:{
    pdf
  },
  data() {
    return {
      c_id: null,
      s_id: null,
      tableData: null,
      url:"http://localhost:8181/mooc/file/pdf",
      pageNum: 1,
      pageTotalNum: 1,
      loadedRatio: 0,
    }
  },
  created() {
    this.c_id = this.$route.query.c_id;
    this.s_id = this.$route.query.s_id;
    const _this = this;
    axios.get('http://localhost:8181/mooc/course/getPartList/'+this.c_id).then(resp => {
      _this.tableData = resp.data;
    })
  },
  methods: {
    // 上一页
    prePage() {
      let page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },

    // 下一页
    nextPage() {
      let page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },


    handleClick(row){
      //访问后台的文件系统
      console.log(row.p_id);
      this.url = 'http://localhost:8181/mooc/file/pdf/'+row.p_id;
      this.pageNum = 1;
    }
  }
}
</script>