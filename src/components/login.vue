<template>

  <div class="loginbody">
    <div class="top">
      <span style="color: #000000 ; font-size: 24px;">智能裁判辅助办案系统--事件挖掘和冲突检测能力测试页</span>
      <div>
        <el-row>
          <!-- <el-button class="xuanfu">默认按钮</el-button> -->
          <el-button class="xuanfu" type="primary" @click="next_page">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-row>
</div>
    </div>
    <div class="bottom">
    <div class="col1">
      <div class="col_head"><p  style="color: #000000 ; font-size: 16px;">卷宗材料输入</p></div>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;">
      <p  style="color: #000000 ; font-size: 16px;">选择案由：</p>
      <el-select  multiple v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;">
      <p  style="color: #000000 ; font-size: 16px;">案件类型：</p>
      <el-select  multiple v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 80%;">
        <p  style="color: #000000 ; font-size: 16px;">caseid:</p>
        <el-input v-model="caseid" placeholder="请输入case id"  size="small"></el-input>
        <!-- <div @click="click_icon"><i class="el-icon-folder-add" ></i></div> -->
      </div>
      <textarea class="input1_col1" placeholder="请输入起诉书/起诉状..." v-model="qsz"> </textarea>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 90%;">
        <!-- <p style="color: #000000 ; font-size: 16px;">起诉状id:</p> -->
        <!-- <el-input v-model="qszid" placeholder="请输入起诉状docId"  size="small"></el-input> -->
        <el-button icon="el-icon-folder-add"  @click="click_iconqsz" size="mini" style="width: 100%;"></el-button>
      </div>
      <textarea class="input1_col2" placeholder="请输入答辩状/辩护词..." v-model="dbz"> </textarea>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 90%;">
        <!-- <p  style="color: #000000 ; font-size: 16px;">答辩状id:</p>
        <el-input v-model="dbzid" placeholder="请输入答辩状docId"  size="small"></el-input> -->
        <el-button icon="el-icon-folder-add"  @click="click_icondbz" size="mini" style="width: 100%;"></el-button>
      </div>
      <textarea class="input1_col3" placeholder="请输入庭审笔录..." v-model="tsbl"> </textarea>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 90%;">
        <!-- <p  style="color: #000000 ; font-size: 16px;">庭审笔录id:</p> -->
        <!-- <el-input v-model="tsblid" placeholder="请输入庭审笔录docId"  size="small"></el-input> -->
        <el-button icon="el-icon-folder-add"  @click="click_icontsbl" size="mini" style="width: 100%;"></el-button>
      </div>
      <textarea class="input1_col4" placeholder="请输入审理报告..." v-model="slbg"> </textarea>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 90%;">
        <!-- <p  style="color: #000000 ; font-size: 16px;">审理报告id:</p> -->
        <!-- <el-input v-model="slbgid" placeholder="请输入审理报告docId"  size="mini"></el-input> -->
        <el-button icon="el-icon-folder-add"  @click="click_iconslbg" size="mini" style="width: 100%;"></el-button>
      </div>
      <div style="display:flex;flex-direction: row;justify-content: left;align-items: center;margin-top: 5px;width: 90%;">
      <el-button type="primary" @click="click_groundtruth" style="width: 100%;">上传ground truth<i class="el-icon-upload el-icon--right"></i></el-button>
      <!-- <el-button type="primary" @click="click_test" style="width: 25%;">Test</el-button> -->
    </div>
    </div>
    <div class="col2">
      <el-button icon="el-icon-search" circle @click="handleClick1" :loading="fullscreenLoading"></el-button>
      <p  style="color: #2C85F8 ; font-size: 16px;">挖掘</p>
    </div>
    <div class="col3">
      <div class="col_head"><p  style="color: #000000 ; font-size: 16px;">事件挖掘结果</p></div>
      <div class="col3_1">
      <el-collapse v-model="activeNames" >
        <el-collapse-item v-for="(item, index) in events" :key="index" :title="item.title" :name="item.name">
        <div v-for="(item2, index2) in item.content" :key="index2" class="event_item2">
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p>
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p>
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;">
            <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p>
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p>
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-button type="primary" @click="click_yuqi1" style="width: 80%;">预期结果对比</el-button>

    </div>
    <div class="col4">
      <el-button icon="el-icon-search" circle @click="handleClick2" :loading="fullscreenLoading2"></el-button>
      <p  style="color: #2C85F8 ; font-size: 16px;">检测</p>
    </div>
    <div class="col5">
      <div class="col_head"><p  style="color: #000000 ; font-size: 16px;">冲突事件识别</p></div>
      <div class="col5_1">
        <el-collapse v-model="activeNames2" >
        <el-collapse-item v-for="(item, index) in events2" :key="index" :title="'事件id：'+item.eventId" :name="item.name">
        <div style="background-color: rgba(128, 128, 128, 0.673);font-size: medium;color: #010101 ; font-size: 14px;" >冲突要素列表</div>
        <div v-for="(item2, index2) in item.conflictDetectionResult" :key="index2" class="event_item" >
          <el-popover
            placement="left"
            width="100%"
            trigger="hover">
            <div style="width:300px;background-color: #fff;height:200px;overflow: auto;text-align: center;">
              <!-- <p style="font-size: medium;">证据</p>
              <div v-for="(evidence, e_i) in item2.evidence" :key="e_i" class="evi">
                <p>uniqEventId : {{evidence.uniqEventId}}</p>
                <p>content :</p>
                <div v-for="(pos,p_i) in evidence.position" :key="p_i" :style="{ backgroundColor: Get_col(pos) }">
                  {{Get_con(pos)}}
                </div>
              </div> -->
              <p style="font-size: medium;">融合建议</p>
              <div style="text-align: left;"><p style="font-size: small;">可信部分:</p></div>
              <div v-for="(evidence, e_i) in item2.believeUniqEventIds" :key="e_i" class="evi">
                <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{evidence.uniqEventId}}</p>
                <p style="color: #010101 ; font-size: 14px;">content : {{ evidence.content }}</p>
              </div>
              <div style="text-align: left;"><p style="font-size: small;">不可信部分:</p></div>
              <div v-for="(evidence, e_i) in item2.notBelieveUniqEventIds" :key="e_i" class="evi">
                <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{evidence.uniqEventId}}</p>
                <p style="color: #010101 ; font-size: 14px;">content : {{ evidence.content }}</p>
              </div>
              
            </div>
          <div slot="reference">
            <p style="color: #010101 ; font-size: 14px;">冲突要素 : {{ item2.type }}</p>
            <p style="color: #010101 ; font-size: 14px;">commonText : {{ item2.commonText == ""?"空": item2.commonText}}</p>
            <p v-for="(xiang,index_x) in mysplit(item2.dispute)" :key="index_x" style="color: #010101 ; font-size: 14px;">冲突项{{index_x}} : {{xiang}}</p>
          </div>
        </el-popover>
        </div>
        
        <!-- <div style="background-color: rgba(255, 0, 0, 0.673);font-size: medium;">事实结果总结</div>
        <div style="padding-left: 3px ;text-align: left;background-color: rgba(255, 0, 0, 0.441);">{{ item.factResult }}</div>   -->
      </el-collapse-item>
      </el-collapse>
      </div>

      <div class="col5_2">

        <!-- <el-button type="primary" plain round @click="handleDia">   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;人工干预&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </el-button> -->
      </div>

    </div>
    <div class="col6">
      <el-button icon="el-icon-search" circle @click="handleClick3" :loading="fullscreenLoading3"></el-button>
      <p style="color: #2C85F8 ; font-size: 16px;">融合</p>
    </div>
    <div class="col7">
      <div class="col_head"><p  style="color: #000000 ; font-size: 16px;">事实重构结果</p></div>
      <div class="col7_1">
        
        <el-collapse v-model="activeNames3"  >
        <el-collapse-item v-for="(item, index) in events3" :key="index" :title="item.title" >
        <div v-for="(item2, index2) in item.content" :key="index2" >
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;" >
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
      </div>
      <div class="col7_2" style="color: #010101 ; font-size: 14px;">
        {{this.display_sum}}
        <!-- <el-collapse v-model="activeNames6"  >
        <el-collapse-item v-for="(item, index) in ronghe" :key="index" :title="'事件id：'+item.eventId" :name="item.name">
          <div style="padding-left: 3px ;text-align: left;background-color: rgba(255, 0, 0, 0.441);">{{ item.factResult }}</div>
        </el-collapse-item>
      </el-collapse> -->
      </div>
    <el-button type="primary" @click="click_yuqi2" style="width: 90%; margin-top:15px ;">预期结果对比</el-button>

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
      <div class="yuqi_left" style="width: 45%;height:90%;overflow: auto;">
        <p>模型输出结果</p>
        <el-collapse v-model="activeNames" >
        <el-collapse-item v-for="(item, index) in events" :key="index" :title="item.title" :name="item.name">
        <div v-for="(item2, index2) in item.content" :key="index2" class="event_item2">
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
      </div>
      
      <div class="yuqi_right" style="width: 45%;height:90%;overflow: auto;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
        <p>模型预期结果</p>
        
        <el-collapse v-model="activeNames" >
        <el-collapse-item v-for="(item, index) in gt.sjwj" :key="index" :title="item.title" :name="item.name">
        <div v-for="(item2, index2) in item.content" :key="index2" class="event_item2">
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            <!-- <p style="color: #010101 ; font-size: 14px;">uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
      </div>
      <!-- <div style="width:auto;padding-left:10px;padding-right:10px;display: flex;flex-direction: column;"> 
        <p>指标</p>
        <p>F1 : {{sjwj_f1}}</p>
        <p>precision : {{sjwj_precision}}</p>
        <p>Recall : {{sjwj_recall}}</p>
      </div> -->
      </div>
    </el-dialog>

    <el-dialog
      title="事实重构预期结果"
      :visible.sync="dialogVisible_yuqi2"
      width="70%"
      :before-close="handleClose_yuqi2">
      <div class="yuqi" style="width: 100%;height:500px; display: flex;flex-direction: row;padding-top: 10px;align-items: space-between;">
      <div class="yuqi_left" style="width: 45%;height:90%;overflow: auto;">
        <p>模型输出结果</p>
        <el-collapse v-model="activeNames3"  >
        <el-collapse-item v-for="(item, index) in events3" :key="index" :title="item.title" >
        <div v-for="(item2, index2) in item.content" :key="index2" >
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;" >
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            <!-- <p>uniqEventId : {{ item2.uniqEventId }}</p> -->
            <p v-for="(item3, index3) in item2.info" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3.type }} : {{ item3.content }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
      </div>
      
      <div class="yuqi_right" style="width: 45%;height:90%;overflow: auto;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
        <p>模型预期结果</p>
        
        <el-collapse v-model="activeNames" >
        <el-collapse-item v-for="(item, index) in gt.sscg" :key="index" :title="item.title" :name="item.name">
        <div v-for="(item2, index2) in item.content" :key="index2" class="event_item2">
          <div v-if="item2.source == '起诉书'" style="background-color: #f00e0a24;">
            
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '答辩书'" style="background-color: #ddf00a24;">
            
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '庭审笔录'" style="background-color: #0ad5f024;">
            
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
          <div v-if="item2.source == '审理报告'" style="background-color: #f00acd24;">
            
            <p v-for="(item3, index3) in Object.keys(item2.info)" :key="index3" style="color: #010101 ; font-size: 14px;">{{ item3 }} : {{ item2.info[item3] }}</p>
          </div>
        </div>
        </el-collapse-item>
      </el-collapse>
      </div>
      <div style="width:auto;padding-left:10px;padding-right:10px;display: flex;flex-direction: column;"> 
        <!-- <p>指标</p>
        <p>F1 : {{sscg_f1}}</p>
        <p>precision : {{sscg_precision}}</p>
        <p>Recall : {{sscg_recall}}</p> -->
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Dia from "./Dia.vue";
import axios from 'axios';
export default {
  // components: { Dia },
  name: "login",
  computed:mapState([
    'token'
  ]),
  data() {
    return {
      sscg_f1:"待计算",
      sscg_precision:"待计算",
      sscg_recall:"待计算",
      sjwj_f1:"待计算",
      sjwj_precision:"待计算",
      sjwj_recall:"待计算",
      gt:{},
      dialogVisible_yuqi1 :false,
      dialogVisible_yuqi2 : false,
      temp : [],
      dialogVisible:false,
      fullscreenLoading: false,
      fullscreenLoading2: false,
      fullscreenLoading3: false,
      caseid:"",
      qszid:"doc1",
      dbzid:"doc2",
      tsblid:"doc3",
      slbgid:"doc4",
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
      options:[{
          value: '危险驾驶罪',
          label: '危险驾驶罪'
        },{
          value: '诈骗罪',
          label: '诈骗罪'
        },{
          value: '保险诈骗罪',
          label: '保险诈骗罪'
        },{
          value: '虚假诉讼罪',
          label: '虚假诉讼罪'
        },{
          value: '洗钱罪',
          label: '洗钱罪'
        },{
          value: '拐卖妇女、儿童罪',
          label: '拐卖妇女、儿童罪'
        },{
          value: '职务侵占罪',
          label: '职务侵占罪'
        },{
          value: '盗窃罪',
          label: '盗窃罪'
        },{
          value: '妨害公务罪',
          label: '妨害公务罪'
        },{
          value: '非法持有毒品罪',
          label: '非法持有毒品罪'
        },{
          value: '非法拘禁罪',
          label: '非法拘禁罪'
        },{
          value: '非法吸收公众存款罪',
          label: '非法吸收公众存款罪'
        },{
          value: '故意伤害罪',
          label: '故意伤害罪'
        },{
          value: '合同诈骗罪',
          label: '合同诈骗罪'
        },{
          value: '集资诈骗罪',
          label: '集资诈骗罪'
        },{
          value: '交通肇事罪',
          label: '交通肇事罪'
        },{
          value: '聚众斗殴罪',
          label: '聚众斗殴罪'
        },{
          value: '强奸罪',
          label: '强奸罪'
        },{
          value: '抢夺罪',
          label: '抢夺罪'
        },{
          value: '抢劫罪',
          label: '抢劫罪'
        },{
          value: '敲诈勒索罪',
          label: '敲诈勒索罪'
        },{
          value: '容留他人吸毒罪',
          label: '容留他人吸毒罪'
        },{
          value: '寻衅滋事罪',
          label: '寻衅滋事罪'
        },{
          value: '健康保险合同纠纷',
          label: '健康保险合同纠纷'
        },{
          value: '网络侵权责任纠纷',
          label: '网络侵权责任纠纷'
        },{
          value: '人身保险合同纠纷',
          label: '人身保险合同纠纷'
        },{
          value: '机动车交通事故责任纠纷',
          label: '机动车交通事故责任纠纷'
        },{
          value: '相邻关系纠纷',
          label: '相邻关系纠纷'
        },{
          value: '保证合同纠纷',
          label: '保证合同纠纷'
        },{
          value: '不当得利纠纷',
          label: '不当得利纠纷'
        },{
          value: '财产损害赔偿纠纷',
          label: '财产损害赔偿纠纷'
        },{
          value: '产品责任纠纷',
          label: '产品责任纠纷'
        },{
          value: '继承纠纷',
          label: '继承纠纷'
        },{
          value: '行政强制措施',
          label: '行政强制措施'},
          {
          value: '妨害公务罪',
          label: '妨害公务罪'},
          {
          value: '政府信息公开',
          label: '政府信息公开'},
        ],
        options2:[{
          value: '民事',
          label: '民事'
        },{
          value: '刑事',
          label: '刑事'
        },{
          value: '行政',
          label: '行政'
        }],
      activeNames : 1,
      activeNames2 : 1,
      activeNames3:1,
      activeNames4:1,
      activeNames5:1,
      activeNames6:1,
      update_info:[],
      fact_sum:'',
      display_sum :'',
    };
  },
  mounted() {
  },
  methods: {
    click_yuqi1(){
      this.dialogVisible_yuqi1 = true;
    },
    click_yuqi2(){
      this.dialogVisible_yuqi2 = true;
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
    },click_iconslbg(){
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
                  that.slbg = fileContent;
              };
              reader.readAsText(file);
              
          }
          document.body.removeChild(fileInput);
      });
    },
    Close_dia(){
      this.dialogVisible = false;
      for(var i=0;i<this.temp.length;i++){
        for(var j=0; j<this.temp[i].conflictDetectionResult.length;j++){
          this.Change_believe(this.temp[i].conflictDetectionResult[j])
        }
      }
      this.events2 = JSON.parse(JSON.stringify(this.temp))
      this.update_info = []
      for(var i=0;i<this.events2.length;i++){
        this.update_info.push({"eventId":this.events2[i].eventId,"factors":[]})
        for(var j=0;j<this.events2[i].conflictDetectionResult.length;j++){
          this.update_info[i]["factors"].push({"type":this.events2[i].conflictDetectionResult[j].type,"content":[]})
          for(var k=0;k<this.events2[i].conflictDetectionResult[j].believeUniqEventIds.length;k++){
            this.update_info[i]["factors"][j].content.push(this.events2[i].conflictDetectionResult[j].believeUniqEventIds[k].content)
          }
        }
      }
      var data = JSON.parse(JSON.stringify(this.save_events))
      data["updatedEventInfo"] = this.update_info
      this.$http.post("/fact_update",data).then((res)=>{
        if(res.data.resCode == 200){
          for(var i=0;i<this.events2.length;i++){
            this.events2[i].eventFactResult=res.data.resData[i].factResult
          }
          // this.fact_sum = res.data.resData
          alert("更新成功")
        }else{
          alert("更新失败，something error");
        }
      }).catch((res)=>{
        alert("something error");
      })
      console.log(this.update_info)
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
      handleClose_yuqi1(done) {
        this.dialogVisible_yuqi1 = false;
      },
      handleClose_yuqi2(done) {
        this.dialogVisible_yuqi2 = false;
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
      var pattern3 = /针对事实的抗辩\n(.*?)\n/;
      var match = str.replace(/\r\n/g, "\n").match(pattern);
      var match2 = str.replace(/\r\n/g, "\n").match(pattern2);
      var match3 = str.replace(/\r\n/g, "\n").match(pattern3);

      if (match && match.length > 1) {
          var result = match[1].trim();
          return result;
      } else if (match2 && match2.length > 1) {
          var result = match2[1].trim();
          return result;
      }else if (match3 && match3.length > 1) {
          var result = match3[1].trim();
          return result;
      }
      else{
          console.log("未找到匹配的内容");
          return str;
      }
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
  //     this.events = [
	// 	{
	// 		"title": "事件 id: 0",
	// 		"name": "0",
	// 		"content": [
	// 			{
	// 				"uniqEventId": "0_0",
	// 				"source": "起诉书",
	// 				"info": [
	// 					{
	// 						"type": "原告",
	// 						"content": "陈伽怡"
	// 					},
	// 					{
	// 						"type": "被告",
	// 						"content": "人寿四川公司"
	// 					},
	// 					{
	// 						"type": "起保时间",
	// 						"content": "2019年1月30日"
	// 					},
	// 					{
	// 						"type": "保险期间",
	// 						"content": "46年"
	// 					},
	// 					{
	// 						"type": "诉讼时间",
	// 						"content": "2019年1月30日"
	// 					},
	// 					{
	// 						"type": "出险地点",
	// 						"content": "成都"
	// 					},
	// 					{
	// 						"type": "就医地点",
	// 						"content": "医院"
	// 					},
	// 					{
	// 						"type": "合同类型",
	// 						"content": "平安福满分两全保险"
	// 					},
	// 					{
	// 						"type": "疾病名称",
	// 						"content": "特定轻度重疾"
	// 					},
	// 					{
	// 						"type": "保险名称",
	// 						"content": "平安福满分两全保险"
	// 					},
	// 					{
	// 						"type": "保险金额",
	// 						"content": "60万元"
	// 					},
	// 					{
	// 						"type": "医疗费",
	// 						"content": "1,680元"
	// 					},
	// 					{
	// 						"type": "总赔偿金额",
	// 						"content": "60万元"
	// 					}
	// 				]
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"title": "事件 id: 1",
	// 		"name": "1",
	// 		"content": [
	// 			{
	// 				"uniqEventId": "1_0",
	// 				"source": "答辩书",
	// 				"info": [
	// 					{
	// 						"type": "原告",
	// 						"content": "吴智迪"
	// 					},
	// 					{
	// 						"type": "被告",
	// 						"content": "人寿四川公司"
	// 					},
	// 					{
	// 						"type": "起保时间",
	// 						"content": "2020年1月2日"
	// 					},
	// 					{
	// 						"type": "保险期间",
	// 						"content": "2020年1月2日"
	// 					},
	// 					{
	// 						"type": "诉讼时间",
	// 						"content": "2020年1月2日"
	// 					},
	// 					{
	// 						"type": "出险地点",
	// 						"content": "核工业四一六医院"
	// 					},
	// 					{
	// 						"type": "就医地点",
	// 						"content": "核工业四一六医院"
	// 					},
	// 					{
	// 						"type": "疾病名称",
	// 						"content": "甲状腺乳头状癌"
	// 					},
	// 					{
	// 						"type": "保单号",
	// 						"content": "P260000017514639、P260000017514508号保险单"
	// 					},
	// 					{
	// 						"type": "保险名称",
	// 						"content": "人寿保险"
	// 					},
	// 					{
	// 						"type": "经济损失费",
	// 						"content": "元"
	// 					},
	// 					{
	// 						"type": "律师费",
	// 						"content": "元"
	// 					},
	// 					{
	// 						"type": "总赔偿金额",
	// 						"content": "元"
	// 					}
	// 				]
	// 			},
	// 			{
	// 				"uniqEventId": "1_1",
	// 				"source": "起诉书",
	// 				"info": [
	// 					{
	// 						"type": "原告",
	// 						"content": "吴智迪"
	// 					},
	// 					{
	// 						"type": "被告",
	// 						"content": "人寿四川公司"
	// 					},
	// 					{
	// 						"type": "起保时间",
	// 						"content": "2019年12月17日至28日"
	// 					},
	// 					{
	// 						"type": "保险期间",
	// 						"content": "2017年至2019年"
	// 					},
	// 					{
	// 						"type": "诉讼时间",
	// 						"content": "2020年1月10日"
	// 					},
	// 					{
	// 						"type": "出险地点",
	// 						"content": "核工业四一六医院"
	// 					},
	// 					{
	// 						"type": "就医地点",
	// 						"content": "核工业四一六医院"
	// 					},
	// 					{
	// 						"type": "合同类型",
	// 						"content": "平安安康住院费用医疗保险(B)"
	// 					},
	// 					{
	// 						"type": "疾病名称",
	// 						"content": "甲状腺肿瘤"
	// 					},
	// 					{
	// 						"type": "保单号",
	// 						"content": "P260000017514639号"
	// 					},
	// 					{
	// 						"type": "保险名称",
	// 						"content": "平安福满分两全保险"
	// 					},
	// 					{
	// 						"type": "保险金额",
	// 						"content": "60万元"
	// 					},
	// 					{
	// 						"type": "经济损失费",
	// 						"content": "31,240.26元"
	// 					},
	// 					{
	// 						"type": "律师费",
	// 						"content": "13,505.4元"
	// 					},
	// 					{
	// 						"type": "总赔偿金额",
	// 						"content": "60万元"
	// 					}
	// 				]
	// 			}
	// 		]
	// 	}
	// ]
      // this.events = [{
      //   title: '事件一 id:1',
      //   name: '1',
      //   content:[
      //     {
      //       uniqEventId:"1",
      //       source:"起诉书",
      //       info:[
      //         {
      //           type:"事件",
      //           content:"盗窃"
      //         },{
      //           type:"价值",
      //           content:"1w"
      //         },{
      //           type:"称述主体",
      //           content:"原告"
      //         }
      //       ]

      //     },{
      //       uniqEventId:"2",
      //       source:"答辩书",
      //       info:[
      //         {
      //           type:"事件",
      //           content:"盗窃"
      //         },{
      //           type:"价值",
      //           content:"5k"
      //         },{
      //           type:"称述主体",
      //           content:"被告"
      //         }
      //       ]

      //     }
      //   ]
      // },{
      //   title: '事件二 id:2',
      //   name: '2',
      //   content:[
      //     {
      //       uniqEventId:"1",
      //       source:"庭审笔录",
      //       info:[
      //         {
      //           type:"事件",
      //           content:"诈骗"
      //         },
      //         {
      //           type:"金额",
      //           content:"10000"
      //         },{
      //           type:"是否自首",
      //           content:"是"
      //         },{
      //           type:"称述主体",
      //           content:"原告"
      //         }
      //       ]
      //     },{
      //       uniqEventId:"2",
      //       source:"审理报告",
      //       info:[
      //         {
      //           type:"行为主体",
      //           content:"王五"
      //         },{
      //           type:"行为客体",
      //           content:"赵六"
      //         },{
      //           type:"称述主体",
      //           content:"被告"
      //         }
      //       ]

      //     }
      //   ]
      // }]
      
    },
    next_page(form){
      this.$router.push('/test');
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
    click_test(form){
      var data=this.gt;
      data['pred_factElement'] = this.events
      data['pred_event'] = this.events3
      this.$http.post("/metrics/single",data).then((res)=>{
        if(res.data.resCode == 200){
          this.sjwj_f1 = res.data.resData['event']['f1'];
          this.sjwj_precision = res.data.resData['event']['precision'];
          this.sjwj_recall = res.data.resData['event']['recall'];
          this.sscg_f1 = res.data.resData['refactor']['f1'];
          this.sscg_precision = res.data.resData['refactor']['precision'];
          this.sscg_recall = res.data.resData['refactor']['recall'];
          alert("f1 ,precison, recall request success!")
        }else{
          alert("更新失败，something error");
        }
      }).catch((res)=>{
        alert("something error");
      })
    },
    click_groundtruth(form){
      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.accept = '.json';
      document.body.appendChild(fileInput);
      fileInput.click();
      var that = this;
      fileInput.addEventListener('change', function() {
          if (fileInput.files.length > 0) {
              var file = fileInput.files[0];
              var reader = new FileReader();
              reader.onload = function(e) {
                  var fileContent = e.target.result;
                  that.gt = JSON.parse(fileContent);
                  console.log(that.gt);
              };
              reader.readAsText(file);
              
          }
          document.body.removeChild(fileInput);
      });
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
  width: 21.5vw;
  height:96vh;
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
  height:84vh;
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
  height: 88vh;
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
  background-color: white;
  width: 21.5vw;
  height:96vh;
  overflow: auto;
  border:solid;
  border-width: 1px;
  border-color: #DEDEDE;
}

.col7_1{
  width: 90%;
  height:60%;
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
font-family: Arial, Helvetica, sans-serif;
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
  height:10%;
  background-color: #f00acd24;
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
  right: 20px; /* 根据需要调整距离右侧的距离 */
  z-index: 1000; /* 确保按钮在页面最上层 */
}
</style>