<style>
  .uploader-file-status{
    display: none;
  }

  .uploader-file-actions{
    display: none;
  }
</style>
<template>
  <div class="loginbody">
    <el-row>
          <!-- <el-button class="xuanfu">默认按钮</el-button> -->
          <el-button class="xuanfu" type="primary" @click="next_page"><i class="el-icon-arrow-left el-icon--left"></i>上一页</el-button>
        </el-row>
    <div class="top">
      <span style="color: #000000 ; font-size: 24px;">智能裁判辅助办案系统——事件挖掘和事实重构能力测试页</span>
      <p style="margin-top:1.5rem">针对全案由案情复杂、多源卷宗存在冲突的问题，本项目创新提出面向多源卷宗材料的事件挖掘与事实甄别双向驱动的全过程事实重构方法，通过大小模型协同、通用信息抽取、提示学习、对比学习和法律知识驱动等技术，缓解全案由案情复杂带来的泛化困难问题和由法律领域特殊性导致的要素抽取挑战，突破解决面向多源法律卷宗材料中的事件挖掘、要素冲突检测与融合，实现法律事件挖掘模型、法律事实重构模型和法律事实重构服务。</p>
    </div>
    <div class="bottom">
    <div class="col1">
      <div class="col_head"><p style="color: #000000 ; font-size: 16px;">测试环境数据</p></div>

      <div class="row" style="margin-top: 2rem; margin-bottom: 1rem">
        <!-- <el-button type="primary" round @click="click_jsonl">全量测试</el-button> -->
        <!-- <el-button type="primary" style="margin-left: 2rem" round @click="click_folder">抽样测试</el-button> -->
      </div>

        <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
        <div style="width:30%"><p  style="color: #000000 ; font-size: 16px;">采样个数:</p></div>
        <el-input-number v-model="cygs" placeholder="请输入case id"  size="small" controls-position="right"></el-input-number>
        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>
      <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
        <div style="width:30%"><p  style="color: #000000 ; font-size: 16px;">随机数种子:</p></div>
        <el-input-number v-model="sjszz" placeholder="请输入case id"  size="small" controls-position="right" ></el-input-number>

        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>
      <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
        <div style="width:30%"><p  style="color: #000000 ; font-size: 16px;">测试轮数:</p></div>
        <el-input-number v-model="csls" placeholder="请输入case id"  size="small" controls-position="right"></el-input-number>

        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>

      <div style="width:90%; display:contents" v-show="activeFormat == 'folder'">
        <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
          <div style="width:30%"><p style="color: #000000 ; font-size: 16px;">测试区间:</p></div>
          <div style="width:60%"><el-slider v-model="sample_range" range show-stops :max="sample_range_limit[1]" :min="sample_range_limit[0]"></el-slider></div>

          <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
        </div>

        <uploader style="width:100%" ref="uploader" :autoStart="false">
          <uploader-unsupport></uploader-unsupport>
          <div id="uploader-btn" style="display:none">
            <uploader-btn :directory="true" ref="inputer"></uploader-btn>
          </div>
          <el-button type="primary" style="width: 90%; margin-top: 5px" @click="uploadFolder()">上传文件夹<i class="el-icon-upload el-icon--right"></i></el-button>
          <div style="width: 90%; padding-left: 5%; padding-right:5%; margin-top: 0.5rem">
            <uploader-list></uploader-list>
          </div>
        </uploader>

        <el-button type="primary" @click="tjcs_folder" style="width: 90%; margin-top: 0.5rem">提交测试</el-button>
      </div>

      <div style="width:100%; display:contents" v-show="activeFormat == 'jsonl'">
      <!-- <textarea class="input1_col4" placeholder="请输入JSONL格式数据..." v-model="slbg" :disabled="true"> </textarea> -->
      <el-button type="primary" @click="tjcs" style="width: 90%;margin-top:10px">提交测试</el-button>
      </div>

      <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
        <div style="width:30%"><p  style="color: #000000 ; font-size: 16px;">选择轮次:</p></div>
        <el-input-number v-model="xzlc" placeholder="请输入case id"  size="small" controls-position="right"></el-input-number>
        <el-button type="primary" @click="Search" style="width: 20%;margin-left: 10px;" size="small">查询</el-button>
        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>

      <div class="col_head" style="padding-top: 10px"><p style="color: #000000; font-size: 16px;">全部查询轮次平均结果</p></div>
      <el-row :gutter="150">
        <el-col :span="12">
          <div style="padding-top: 10px;"><p>事件挖掘结果</p></div>
          <div style="padding-top: 10px">F1-score: {{tjjg_average.event.f1}}</div>
          <div style="padding-top: 5px">precision: {{tjjg_average.event.precision}}</div>
          <div style="padding-top: 5px">recall: {{tjjg_average.event.recall}}</div>
        </el-col>
        <el-col :span="12">
          <div style="padding-top: 10px;"><p>事件重构结果</p></div>
          <div style="padding-top: 10px">F1-score: {{tjjg_average.refactor.f1}}</div>
          <div style="padding-top: 5px">precision: {{tjjg_average.refactor.precision}}</div>
          <div style="padding-top: 5px">recall: {{tjjg_average.refactor.recall}}</div>
        </el-col>
      </el-row>
    </div>
   
    <div class="col7">
      <div class="col_head"><p  style="color: #000000 ; font-size: 16px;">测试结果展示</p></div>
      
      <div style="display:flex;flex-direction: row;margin-top: 5px;width: 90%;height:10%;justify-content: flex-start;align-items: center;">
        <div style="width:30%"><p  style="color: #000000 ; font-size: 16px;">测试进度:</p></div>
        <div style="width:80%"><el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress></div>

        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>

      <div class="row" style="margin-top: 1rem; margin-bottom: 0.5rem">
        <el-button type="primary" round @click="click_cause">分案由统计</el-button><el-button type="primary" style="margin-left: 2rem" round @click="click_sample">分样本统计</el-button>
      </div>
      <div class="col7_1">
        <div class="col7_1_1">

          <div class="col7_1_1_1">
            <p>事件挖掘结果</p>
          </div>
          <div class="col7_1_1_2">
            <div class="col7_1_1_2_1">
              <p>测试结果:</p>
              <p style="margin-top:10px">F1-score : {{sjwj_F1}}</p>
              <p style="margin-top:10px">Precision : {{ sjwj_Precision }}</p>
              <p style="margin-top:10px">Recall : {{ sjwj_recall }}</p>
              <p style="margin-top:10px">注:课题最终评测关心F1指标</p>
            </div>
            <div class="col7_1_1_2_2" v-show="activeMetric == 'cause'">
              <el-table
                :data="tableData_sjwj"
                style="width: 100%">
                <el-table-column
                  prop="casecause"
                  label="案由"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="f1"
                  label="F1"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="precision"
                  label="Precision"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="recall"
                  label="Recall"
                  >
                </el-table-column>
              </el-table>
            </div>
            <div class="col7_1_1_2_2" v-show="activeMetric == 'sample'">
              <el-table
                :data="tableData_sjwj_sample"
                @row-click="open_sjwj_detail"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="编号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="casecause"
                  label="案由"
                  width="190">
                </el-table-column>
                <el-table-column
                  prop="f1"
                  label="F1"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="precision"
                  label="Precision"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="recall"
                  label="Recall"
                  >
                </el-table-column>
              </el-table>
            </div>

          </div>
        
        </div>
        <div class="col7_1_1">
        <div id="tb1" style="width: 95%;height: 400px; min-height:250px" > </div>
        <p>由于空间和效率限制，最多只显示前10个样本，如果需要请看分样本统计</p>
        </div>
        <div class="col7_1_1">
          <div class="col7_1_1_1">
            <p>事实重构结果</p>
          </div>
          <div class="col7_1_1_2">
            <div class="col7_1_1_2_1">
              <p>测试结果：</p>
              <p style="margin-top:10px">F1-score : {{ctjc_F1}}</p>
              <p style="margin-top:10px">Precision : {{ ctjc_Precision }}</p>
              <p style="margin-top:10px">Recall : {{ ctjc_recall }}</p>
              <p style="margin-top:10px">注:课题最终评测关心F1指标</p>

            </div>
            <div class="col7_1_1_2_2" v-show="activeMetric == 'cause'">
              <el-table
                :data="tableData_ctjc"
                style="width: 100%">
                <el-table-column
                  prop="casecause"
                  label="案由"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="f1"
                  label="F1"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="precision"
                  label="Precision"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="recall"
                  label="Recall"
                  >
                </el-table-column>
              </el-table>
            </div>
            <div class="col7_1_1_2_2" v-show="activeMetric == 'sample'">
              <el-table
                :data="tableData_ctjc_sample"
                @row-click="open_ctjc_detail"
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="编号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="casecause"
                  label="案由"
                  width="190">
                </el-table-column>
                <el-table-column
                  prop="f1"
                  label="F1"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="precision"
                  label="Precision"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="recall"
                  label="Recall"
                  >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="col7_1_1">
        <div id="tb2" style="width: 95%;height: 400px;min-height:250px" > </div>
        <p>由于空间和效率限制，最多只显示前10个样本，如果需要请看分样本统计</p>

        </div>
        <div id="ec1" style="width: 100%;height: 400px;" > </div>
        <div id="ec2" style="width: 100%;height: 400px;" > </div>
       
      </div>
      <!-- <div class="col7_2" style="color: #010101 ; font-size: 14px;">
        {{this.display_sum}}

      </div> -->
    </div>
  </div>
    <!-- 下面是弹窗代码 -->
    <!-- <Dia ref="dia" @flesh="reload" /> -->
    <el-dialog
      title="人工干预融合"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="dia">
        <el-collapse v-model="activeNames4"  >
        <el-collapse-item v-for="(item, index) in temp" :key="index" :title="'事件id：'+item.eventId" :name="item.name">
        <!-- <div style="background-color: rgba(128, 128, 128, 0.673);font-size: medium;">冲突要素列表</div> -->
        <div v-for="(item2, index2) in item.conflictDetectionResult" :key="index2" class="event_itemdia" >
        <div style="text-align: left;"><p style="font-size: large;">要素类型 : {{item2.type}}</p></div>
        <div style="text-align: left;"><p style="font-size: large;">备选结果 </p></div>
        <el-radio-group v-model="item2.doubtUniqEventIds[0]">
          <el-radio  v-for="city in add_events(item2.believeUniqEventIds,item2.notBelieveUniqEventIds)" :label="city.content" :key="city.uniqEventId">{{city.content}}</el-radio>
        </el-radio-group>
        <!-- <el-checkbox-group
          v-model="item2.doubtUniqEventIds"
          :min="1"
          :max="1"
          >
          <el-checkbox v-for="city in add_events(item2.believeUniqEventIds,item2.notBelieveUniqEventIds)" :label="city.content" :key="city.uniqEventId" >{{city.content}}</el-checkbox>
        </el-checkbox-group> -->
        </div>
        
        <div style="background-color: rgba(255, 0, 0, 0.673);font-size: medium;">事件事实结果总结</div>
        <div style="padding-left: 3px ;text-align: left;background-color: rgba(255, 0, 0, 0.441);">{{ item.eventFactResult }}</div> 
      </el-collapse-item>
      </el-collapse>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button @click="Close_dia">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="事件挖掘预期结果"
      :visible.sync="dialogVisible_yuqi1"
      width="70%"
      :before-close="handleClose_yuqi1">
      <div class="yuqi" style="width: 100%;height:500px; display: flex;flex-direction: row;padding-top: 10px;align-items: space-between;">
      <div class="yuqi_left" style="width: 45%;height:90%;">
        <p>模型输出结果</p>
        <div style="height:100%;overflow: auto;">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item, index) in sample.doc" :key="index" :title="item.source" :name="item.source">
            <div v-for="(item2, index2) in item.predict" :key="index2" class="event_item2">
              <p v-for="key in Object.keys(item2)" :key="key" style="color: #010101 ; font-size: 14px;">
                {{ key }} : {{ item2[key] }}
              </p>
            </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      
      <div class="yuqi_right" style="width: 45%;height:90%;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
        <p>模型预期结果</p>
        <div style="height:100%;overflow: auto;">
          <el-collapse v-model="activeNames2">
            <el-collapse-item v-for="(item, index) in sample.doc" :key="index" :title="item.source" :name="item.source">
            <div v-for="(item2, index2) in item.label" :key="index2" class="event_item2">
              <p v-for="key in Object.keys(item2)" :key="key" style="color: #010101 ; font-size: 14px;">
                {{ key }} : {{ item2[key] }}
              </p>            
            </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      </div>
    </el-dialog>

    <el-dialog
      title="事实重构预期结果"
      :visible.sync="dialogVisible_yuqi2"
      width="70%"
      :before-close="handleClose_yuqi2">
      <div class="yuqi" style="width: 100%;height:500px; display: flex;flex-direction: row;padding-top: 10px;align-items: space-between;">
      <div class="yuqi_left" style="width: 45%;height:90%;">
        <div style="height:100%;overflow: auto;">
          <el-collapse v-model="activeNames3">
          <el-collapse-item title="模型输出结果" name="模型输出结果">
          <div v-for="(item2, index2) in sample.factElement" :key="index2" class="event_item2">
              <p v-for="key in Object.keys(item2)" :key="key" style="color: #010101 ; font-size: 14px;">
                {{ key }} : {{ item2[key] }}
              </p>
          </div>
          </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      
      <div class="yuqi_right" style="width: 45%;height:90%;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
        <div style="height:100%;overflow: auto;">
          <el-collapse v-model="activeNames4">
          <el-collapse-item title="模型预期结果" name="模型预期结果">
          <div v-for="(item2, index2) in sample.pred_factElement" :key="index2" class="event_item2">
              <p v-for="key in Object.keys(item2)" :key="key" style="color: #010101 ; font-size: 14px;">
                {{ key }} : {{ item2[key] }}
              </p>
          </div>
          </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import Dia from "./Dia.vue";
import axios from 'axios';
import * as echarts from 'echarts';
// import 'echarts/lib/chart/bar' // 引入柱状图
// import 'echarts/lib/chart/line' // 引入折线图
// // ... 引入其他需要的图表类型
// import 'echarts/lib/component/title'
export default {
  // components: { Dia },
  name: "login",
  computed:mapState([
    'token'
  ]),
  data() {
    return {
      tjjg_average: {"event": {"precision": "", "recall": "", "f1": ""}, "refactor": {"precision": "", "recall": "", "f1": ""}},
      ids: [],
      activeFormat: "jsonl",
      activeMetric: "sample",
      sample_range: [0, 0],
      sample_range_limit: [0, 0],
      sample: {},
      dialogVisible_yuqi1 :false,
      dialogVisible_yuqi2 :false,
      tableData_sjwj:[],
      tableData_ctjc:[],
      tableData_sjwj_sample:[],
      tableData_ctjc_sample:[],
      sjwj_F1:"",
      sjwj_Precision:"",
      sjwj_recall:"",
      ctjc_F1:"",
      ctjc_Precision:"",
      ctjc_recall:"",
      percentage :"",
      xzlc:"",
      tjjg:[],
      cygs:1000,
      sjszz:10,
      csls:5,
      temp : [],
      dialogVisible:false,
      fullscreenLoading: false,
      fullscreenLoading2: false,
      fullscreenLoading3: false,
      caseid:"",
      qszid:"",
      dbzid:"",
      tsblid:"",
      slbgid:"",
      shuchu1:"",
      shuchu2:"",
      events:[],
      events2:[],
      events3:[],
      events4:[],
      save_events:[],
      ronghe :[],
      dbz:"",
      qsz:"",
      tsbl:"",
      slbg:"",
      value:[],
      percentage :0,
      xzlc:0,
      tjjg:[],
      temp : [],
      dialogVisible:false,
      fullscreenLoading: false,
      fullscreenLoading2: false,
      fullscreenLoading3: false,
      caseid:"",
      qszid:"",
      dbzid:"",
      tsblid:"",
      slbgid:"",
      shuchu1:"",
      shuchu2:"",
      events:[],
      events2:[],
      events3:[],
      events4:[],
      save_events:[],
      ronghe :[],
      dbz:"",
      qsz:"",
      tsbl:"",
      slbg:"",
      value:[],
      value2:[],
      activeNames : 1,
      activeNames2 : 1,
      activeNames3:1,
      activeNames4:1,
      activeNames5:1,
      activeNames6:1,
      update_info:[],
      fact_sum:'',
      display_sum :'',
      tableData: [{
            案由: '2016-05-02',
            F1: '王小虎',
            Precision: '上海市普陀区金沙江路 1518 弄',
            Recall: '上海市普陀区金沙江路 1518 弄'
          }]
    };
  },
  mounted() {
    // this.setDocumentTitle('新的标题');
    this.$nextTick(() => {
      const uploader = this.$refs.uploader.uploader
      var that = this

      uploader.on('filesAdded', function (rootFile) {
        var filelist = uploader.fileList
        var ids = new Set();

        function replaceLast(str, search) {
          var index = str.lastIndexOf(search);
          if (index === -1) {
            return str;
          }
          return str.substring(0, index) + str.substring(index + search.length);
        }

        function searchFolder(folder) {
          for (let file in folder.fileList) {
            if (folder.fileList[file].isFolder) {
              searchFolder(folder.fileList[file])
            } else {
              var name = folder.fileList[file].file.name;
              var path = folder.fileList[file].file.webkitRelativePath;
              
              path = replaceLast(path, name);

              var match = [...path.matchAll(/(\d+)\//g)];
              if (match.length > 0) {
                var id = match[match.length - 1][1]
                ids.add(id);
              }
            }
          }
        }

        for (let folder in filelist) {
          searchFolder(filelist[folder])
        }

        that.ids = [...ids];
        that.sample_range_limit = [Math.min.apply(Math, that.ids), Math.max.apply(Math, that.ids)];
        that.sample_range = that.sample_range_limit
      })
    })
  },
  methods: {
    open_sjwj_detail(row) {
      this.$http.post("/sample", {
        "id": row.id,
      }).then((res)=>{
        if (res.data.resCode != 200){
          alert("错误代码："+res.data.resCode+",错误信息："+res.data.resData)
        }else{
          this.sample = res.data.resData;
          this.dialogVisible_yuqi1 = true;
        }
      }).catch((res)=>{
        console.log(res)
        alert("something error");
      })
    },
    open_ctjc_detail(row) {
      this.$http.post("/sample", {
        "id": row.id,
      }).then((res)=>{
        if (res.data.resCode != 200){
          alert("错误代码："+res.data.resCode+",错误信息："+res.data.resData)
        }else{
          this.sample = res.data.resData;
          this.dialogVisible_yuqi2 = true;
        }
      }).catch((res)=>{
        console.log(res)
        alert("something error");
      })
    },
    uploadFolder(){
      document.querySelector("#uploader-btn > label > input").click();
    },
    tjcs_folder(){
      const uploader = this.$refs.uploader.uploader

      this.percentage = 0
      if (this.ids.length == 0){
        alert("请上传测试数据");
        return;
      }

      var ids = []
      for (let i in this.ids) {
        if (this.ids[i] >= this.sample_range[0] && this.ids[i] <= this.sample_range[1]) {
          ids.push(this.ids[i]);
        }
      }

      if (ids.length == 0) {
        alert("区间内无样本");
        return;
      }
      this.percentage = 10
      
      var interval = this.simulateProgress()
      this.$http.post("/metrics", {
        "seed":this.sjszz,
        "n":this.csls,
        "number":this.cygs,
        "ids": ids
      }).then((res)=>{
        if (res.data.resCode != 200){
          alert("错误代码："+res.data.resCode+",错误信息："+res.data.resData)
          clearInterval(interval);
          this.percentage = 0;
        }else{
          this.tjjg = res.data.resData;
          clearInterval(interval);
          this.percentage = 100;
        }
        
      }).catch((res)=>{
        console.log(res)
        alert("something error");
        clearInterval(interval);
        this.percentage = 0;
      })

    },
    click_iconqsz(){
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.accept = '.txt';
      document.body.appendChild(fileInput);
      fileInput.click();
      var that = this;
      fileInput.addEventListener('change', function() {
          if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              var reader = new FileReader();
              reader.onload = function(e) {
                  var fileContent = e.target.result;
                  that.qsz = fileContent;
              };
              reader.readAsText(file);
              
          }
          document.body.removeChild(fileInput);
      });
    },
    click_icondbz(){
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.accept = '.txt';
      document.body.appendChild(fileInput);
      fileInput.click();
      var that = this;
      fileInput.addEventListener('change', function() {
          if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              var reader = new FileReader();
              reader.onload = function(e) {
                  var fileContent = e.target.result;
                  that.dbz = fileContent;
              };
              reader.readAsText(file);
              
          }
          document.body.removeChild(fileInput);
      });
    },
    click_icontsbl(){
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.accept = '.txt';
      document.body.appendChild(fileInput);
      fileInput.click();
      var that = this;
      fileInput.addEventListener('change', function() {
          if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              var reader = new FileReader();
              reader.onload = function(e) {
                  var fileContent = e.target.result;
                  that.tsbl = fileContent;
              };
              reader.readAsText(file);
              
          }
          document.body.removeChild(fileInput);
      });
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    rand(m, n)  {
      return Math.ceil(Math.random() * (n-m+1) + m-1)
    },
    simulateProgress() {

  const interval = setInterval(() => {
    if (this.percentage >= 100) {
      clearInterval(interval);
    } else {
      var randnum = Math.floor(Math.random() * 5);
      if (randnum + this.percentage <= 99){
        this.percentage += randnum
      }else{
        this.percentage = 99
      }
    }
    }, 1500); // 每秒更新进度
    return interval
  },
    tjcs(){
      this.percentage = 0
      var data = {
        "seed":this.sjszz,
        "n":this.csls,
        "number":this.cygs
      }
      
      this.percentage = 10
      
      var interval = this.simulateProgress()
      this.$http.post("/metrics",data).then((res)=>{
        
        if (res.data.resCode != 200){
          alert("错误代码："+res.data.resCode+",错误信息："+res.data.resData)
          clearInterval(interval);
          this.percentage = 0;
        }else{
          this.tjjg = res.data.resData.content;
          this.tjjg_average = res.data.resData.average;
          clearInterval(interval);
          this.percentage = 100;
        }
        
      }).catch((res)=>{
        alert("something error");
        clearInterval(interval);
        this.percentage = 0;
      })
    },
    handleDia(){
      this.dialogVisible = true;
      this.temp = JSON.parse(JSON.stringify(this.events2))
    },
    Change_believe(item){
      var temp =  JSON.parse(JSON.stringify(item.believeUniqEventIds));
      temp = temp.concat(JSON.parse(JSON.stringify(item.notBelieveUniqEventIds)));
      item.believeUniqEventIds=[]
      item.notBelieveUniqEventIds = []
      for(var i of temp){
        if (item.doubtUniqEventIds.indexOf(i.content) != -1){
          item.believeUniqEventIds.push(i);
        }else{
          item.notBelieveUniqEventIds.push(i);
        }
      }
    },
    add_events(a,b){
      var ret = JSON.parse(JSON.stringify(a));
      ret = ret.concat(JSON.parse(JSON.stringify(b)));
      // ret = ret.concat(JSON.parse(JSON.stringify(c)));
      ret.sort(function(a,b){
        return a.uniqEventId.localeCompare(b.uniqEventId)
      })
      return ret;
    },
    handleClose(done) {
        this.$confirm('确认不保存直接关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    openDia(){
      this.$refs.dia.open();
    },
    Get_col(position){
      if (position.docId == this.qszid){
        return "#f00e0a24";
      }else if(position.docId == this.dbzid){
        return "#ddf00a24";
      }else if(position.docId == this.tsblid){
        return "#0ad5f024";
      }else if(position.docId == this.slbgid){
        return "#f00acd24";
      }
      return "black";
    },
    Get_con(position){
      var ret="";
      if (position.docId == this.qszid){
          ret += this.qsz.slice(position.start, position.end)
      }else if(position.docId == this.dbzid){
        ret += this.dbz.slice(position.start, position.end)
      }else if(position.docId == this.tsblid){
        ret += this.tsbl.slice(position.start, position.end)
      }else if(position.docId == this.slbgid){
        ret += this.slbg.slice(position.start, position.end)
      }
      return ret;
    },
    mysplit(mystring){
      return mystring.split("\n");
    },
    rex_match(str){
      var pattern = /事实与理由:(.*?)\n/;
      var pattern2 = /经事实认定:(.*?)\n/;
      var match = str.replace(/\r\n/g, "\n").match(pattern);
      var match2 = str.replace(/\r\n/g, "\n").match(pattern2);

      if (match && match.length > 1) {
          var result = match[1].trim();
          return result;
      } else if (match2 && match2.length > 1) {
          var result = match2[1].trim();
          return result;
      }
      else{
          console.log("未找到匹配的内容");
          return str;
      }
    },
    click_jsonl(){
      this.activeFormat="jsonl"
    },
    click_folder(){
      this.activeFormat="folder"
    },
    click_cause(){
      this.activeMetric="cause"
    },
    click_sample(){
      this.activeMetric="sample"
    },
    next_page(page){
      window.open('#/login', '_blank');
    },
    handleClick1(form){
      // alert("抽取事件发送请求")
      this.fullscreenLoading = true;
      var post_body = {}
      post_body["commons"] = []
      if (this.qsz != ""){
        post_body.commons.push({
          "wsnr":this.rex_match(this.qsz),
          "casecause":this.value,
          "wslx":"起诉书",
          "wsfd":[],
          "dsrxx": [],
          "caseid":this.caseid,
          "docId":this.qszid
        })
      }
      if (this.dbz != ""){
        post_body.commons.push({
          "wsnr":this.rex_match(this.dbz),
          "casecause":this.value,
          "wslx":"答辩书",
          "wsfd":[],
          "dsrxx": [],
          "caseid":this.caseid,
          "docId":this.dbzid
        })
      }
      if (this.tsbl != ""){
        post_body.commons.push({
          "wsnr":this.rex_match(this.tsbl),
          "casecause":this.value,
          "wslx":"庭审笔录",
          "wsfd":[],
          "dsrxx": [],
          "caseid":this.caseid,
          "docId":this.tsblid
        })
      }
      if (this.slbg != ""){
        post_body.commons.push({
          "wsnr":this.rex_match(this.slbg),
          "casecause":this.value,
          "wslx":"审理报告",
          "wsfd":[],
          "dsrxx": [],
          "caseid":this.caseid,
          "docId":this.slbgid
        })
      }
      this.$http.post('/sjcq/web',post_body,{
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        }).then((res)=> {
         console.log(res);
         if(res.data.resCode==200){
          this.events = res.data.resData;
          this.save_events = res.data.resData2;
          
          alert("事件抽取成功")
        }else{
          alert("错误代码："+res.data.resCode+",错误信息："+res.data.resData);
        }
        this.fullscreenLoading = false;
        }).catch((err)=> {
          alert("事件抽取失败,something error");
          this.fullscreenLoading = false;
          });

      
    },
    handleClick2(form){
      this.fullscreenLoading2 = true;
    //   var data = {
    // "resCode": 200,
    // "resData":this.save_events
    //   }
    this.$http.post("/factor_detect",this.save_events)
      .then((res)=>{
        console.log(res);
        if(res.data.resCode == 200){
          this.events2 =res.data.resData.detectionResult
          this.fact_sum = res.data.resData.factResult
          alert(this.fact_sum)
          for(var shijian=0; shijian<this.events2.length;shijian++){
            for(var unique=0;unique<this.events2[shijian].conflictDetectionResult.length;unique++){
              this.events2[shijian].conflictDetectionResult[unique].notBelieveUniqEventIds.push(...this.events2[shijian].conflictDetectionResult[unique].doubtUniqEventIds)
              this.events2[shijian].conflictDetectionResult[unique].doubtUniqEventIds = []
              for(var item of this.events2[shijian].conflictDetectionResult[unique].believeUniqEventIds){
                this.events2[shijian].conflictDetectionResult[unique].doubtUniqEventIds.push(item.content);
              }              
            }
          }
        alert("success!")
        }else{
          //alert("something error");
        }
      this.fullscreenLoading2 = false;
      })
      .catch((res)=>{console.log(res);
        this.fullscreenLoading2 = false;
        // alert("something error");
      
      });
    },
    Is_in_unbelieve(uid,info,lookup){
      for(var eve of lookup){
        for(var con of eve.conflictDetectionResult){
          for(var notbe of con.notBelieveUniqEventIds){
            if(uid == notbe.uniqEventId && info.content==notbe.content){
              return true;
            }
          }
        }
      }
      return false;
    },
    Is_in_before(item,i,j,k){
        for(var unique=0;unique<=j;unique++){
          for(var info=0;info<this.events[i].content[unique].info.length;info++){
            if(j==unique&&k==info){
              return false
            }
            if(item.content == this.events[i].content[unique].info[info].content && 
                item.type == this.events[i].content[unique].info[info].type
            ){
              return true;
            }
          }
        }
    },
    handleClick3(form){
      this.shuchu1 = "事实重构结果  ";
      this.shuchu2 = "这是一段文本描述";
      this.display_sum = this.fact_sum;
      this.ronghe = JSON.parse(JSON.stringify(this.events2));
      this.events3 = JSON.parse(JSON.stringify(this.events));
      var temp = []
      for(var shijian=0; shijian<this.events.length;shijian++){
        for(var unique=0;unique<this.events[shijian].content.length;unique++){
          for(var info=0;info<this.events[shijian].content[unique].info.length;info++){
            console.log(this.events[shijian].content[unique].info[info])
            if(this.Is_in_unbelieve(this.events[shijian].content[unique].uniqEventId,this.events[shijian].content[unique].info[info],this.events2)
              || this.Is_in_before(this.events[shijian].content[unique].info[info],shijian,unique,info)
            ){
              this.events3[shijian].content[unique].info=this.events3[shijian].content[unique].info.filter(item => item.type !== this.events[shijian].content[unique].info[info].type 
              && item.content !== this.events[shijian].content[unique].info[info].content )
            }else{
              // console.log(this.events[shijian].content[unique].info[info])
              continue;
            }
          } 
        }
      }
      this.fullscreenLoading3 = false;
      
      alert("事件融合成功")
    },
    bingtu1(formdata,sample){
      var chartDom = document.getElementById('ec1');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
      title: {
        text: '测试样本分案由比例',
        
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: []
      },
      series: [
        {
          name: '案由类型',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: formdata,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
};
      option && myChart.setOption(option);
      var chartDom = document.getElementById('tb1');
      var myChart = echarts.init(chartDom);
      var option;
      var data_name = ['1','2','3','4','5','6','7','8','9','10']
      var data_list = [];
      if (sample.length >=10){
        sample = sample.slice(0,10)
        
      }else{
        data_name = data_name.slice(0,sample.length)
      }
      for(var i=0;i<sample.length;i++){
        data_list.push(sample[i]['f1'])
      }
      option = {
        xAxis: {
          type: 'category',
          data: data_name
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data_list,
            type: 'bar'
          }
        ]
      };

      option && myChart.setOption(option);

    },
    bingtu2(formdata,sample){
      var chartDom = document.getElementById('ec2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '测试样本输入来源比例',
          left: 'center'
        },
tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
        legend: {
          orient: 'vertical',
          left: 'left'
        },

        series: [
          {
            name: '案件类型',
            type: 'pie',
            radius: '50%',
            data:formdata,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
      var chartDom = document.getElementById('tb2');
      var myChart = echarts.init(chartDom);
      var option;
      var data_name = ['1','2','3','4','5','6','7','8','9','10']
      var data_list = [];
      if (sample.length >=10){
        sample = sample.slice(0,10)
        
      }else{
        data_name = data_name.slice(0,sample.length)
      }
      for(var i=0;i<sample.length;i++){
        data_list.push(sample[i]['f1'])
      }
      option = {
        xAxis: {
          type: 'category',
          data: data_name
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data_list,
            type: 'bar'
          }
        ]
      };

      option && myChart.setOption(option);
    },
    Search(){
      if (this.tjjg.length == 0){
        alert("没有查询到结果")
        return;
      }else if (this.tjjg.length <= this.xzlc){
        alert("查询结果不足"+this.xzlc+"条，请重新查询")
        return;
      }else{
        var one_item = this.tjjg[this.xzlc]
        this.sjwj_F1 = one_item['event']['overall']['f1']
        this.sjwj_Precision = one_item['event']['overall']['precision']
        this.sjwj_recall = one_item['event']['overall']['recall']
        this.ctjc_F1 = one_item['refactor']['overall']['f1']
        this.ctjc_Precision = one_item['refactor']['overall']['precision']
        this.ctjc_recall = one_item['refactor']['overall']['recall']
        this.tableData_sjwj = one_item['event']['causes']
        this.tableData_ctjc = one_item['refactor']['causes']
        this.tableData_sjwj_sample = one_item['event']['details']
        this.tableData_ctjc_sample = one_item['refactor']['details']
        var list1 = []
        
        for (var key in one_item["counter_casecause"]){
          list1.push({'name':key,'value':one_item["counter_casecause"][key]})
        }
        var list2 = []
        
        for (var key in one_item["counter_source"]){
          list2.push({'name':key,'value':one_item["counter_source"][key]})
        }
        this.bingtu1(list1,this.tableData_sjwj_sample)
        
        this.bingtu2(list2,this.tableData_ctjc_sample)
      }

    }
  },
};
</script>


<style scoped>
.loginbody {
  width: 98vw;
  height: 105vh;
  background-color: #EFF4FF;
  background-size: 100vw 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 1vw;
  padding-right: 1vw;
}
.bottom{
  display: flex;
  flex-direction: row;
  height: 96vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-right: 1vw;
}
.col1{
  background-color: white;
  width: 35vw;
  height:90vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;

  /* background:rgba(255, 255, 255, 0.8) */

}

.col2{
  width: 4vw;
  height:96vh;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.col3{
  background-color: white;
  width: 21.5vw;
  height:96vh;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;

}
.col3_1{
  background-color: white;
  width: 20vw;
  height:90vh;
  padding-top: 10px;
  margin-left: 10px;
  overflow:auto
}
.col4{
  width: 4vw;
  height:96vh;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.col5{
  background-color: white;
  width: 21.5vw;
  height:96vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
  
}
.evi{
  width: 100%;
  border-bottom: solid black;
  border-width: 1px;
  text-align: left;
}
.dia{
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 50vh;
  overflow: auto;
}
.col5_1{
  background-color: rgb(255, 255, 255);
  width: 20vw;
  height: 90vh;
  overflow: auto;
  margin-top: 10px;

}
.col5_2{
  margin-top:2px ;
}
.col6{
  width: 4vw;
  height:96vh;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.col7{
  margin-left:5vw; 
  background-color: white;
  width: 55vw;
  height:90vh;
  overflow: auto;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}

.col7_1{
  width: 90%;
  height:70%;
  margin-left: 5%;
  margin-top: 2%;

  
  border: solid;
  border-color: #e3e0e0;
  border-width: 1px;
  overflow: auto;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}

.col7_2{
  width: 90%;
  height:20%;
  margin-left: 5%;
  margin-top: 5%;

  border: solid;
  border-color: #e3e0e0;
  border-width: 1px;
  overflow: auto;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}
.col_head{
margin-top: 5px;border-bottom: solid;width: 95%;border-color: gray;border-width: 1px;
font-size: large;
font-family: Arial, Helvetica, sans-serif;height:30px;
}
.input1_col1{
  width: 90%;
  height:10%;
  background-color: #f00e0a24;
  margin-top: 1%;
  font-size:14px;
  color:#010101;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
  

}
.input1_col2{
  width: 90%;
  height:10%;
  background-color: #ddf00a24;
  margin-top: 1%;
  font-size:14px;
  color:#010101;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}
.input1_col3{
  width: 90%;
  height:10%;
  background-color: #0ad5f024;
  margin-top: 1%;
  font-size:14px;
  color:#010101;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}
.input1_col4{
  width: 90%;
  height:40%;
  margin-top: 1%;
  font-size:14px;
  color:#010101;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}
.event_item2{
  width: 100%;
  /* border: solid; */
  /* border-color: gray; */
  /* border-width: 2px; */
  border-top:1px solid gray;
  border-bottom: 1px solid gray;
}
.event_itemdia{
  width: 100%;
  /* border: solid; */
  /* border-color: gray; */
  /* border-width: 2px; */
  border-top:1px solid gray;
  border-bottom: 1px solid gray;
  padding-left: 30px;
  text-align: left;
}
.event_item{
  width: 100%;
  /* border: solid; */
  /* border-color: gray; */
  /* border-width: 2px; */
  border-top:1px solid gray;
  border-bottom: 1px solid gray;
  padding-left: 30px;
  text-align: left;
}
.event_item:hover{
  width: 100%;
  /* border: solid; */
  /* border-color: gray; */
  /* border-width: 2px; */
  border-top:1px solid gray;
  border-bottom: 1px solid gray;
  padding-left: 30px;
  text-align: left;
  background-color: rgba(128, 128, 128, 0.422);
}
.xuanfu{
  position: fixed;
  top: 10px; /* 根据需要调整距离底部的距离 */
  left: 20px; /* 根据需要调整距离右侧的距离 */
  z-index: 1000; /* 确保按钮在页面最上层 */
}
.col7_1_1{
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-bottom: solid 1px #e3e0e0;
}
.zonglunshupingjun{
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  background-color: #ffffff;
  border-top: solid 1px black;
  border-bottom: solid 1px #e3e0e0;
}
.col7_1_1_1{
  height: 20%;
  width: 100%;
  background-color: #ffffff;
  justify-content: center;
  align-content: center;
  border-bottom: solid 1px #e3e0e0;
}
.col7_1_1_2{
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border-right: solid 1px #e3e0e0;
}
.col7_1_1_2_1{
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  height: 100%;
  width: 30%;
  border-right: solid 1px #e3e0e0;
  display: flex;
  flex-direction: column;    /* 垂直方向排列 */
  /* justify-content: space-between;  */
  align-items: flex-start;   /* 水平方向左对齐 */
}
.col7_1_1_2_2{
  height: 100%;
  width: 70%;
  background-color: #ffffff;
  overflow:auto;
}
</style>
