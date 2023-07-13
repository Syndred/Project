<template>
      <!-- 简历分析页面 -->
      <el-row  justify="center" style="margin-top: 6vh">
        <el-col :span="10">
          <!-- 简历分析卡片 -->
          <el-card class="analyse">
            <!-- 返回图标 -->
            <el-row>
              <el-col style="margin-bottom: 10px">
                <el-icon :size="40" color="#9aa7b1" style="cursor: pointer;">
                  <Back @click="backHome" />
                </el-icon>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <!-- 头像和小标签 -->
              <el-col :span="5">
                <div class="headSculpture">
                  <img src="@/assets/head.png" alt="" />
                </div>
              </el-col>
              <el-col :span="17">
                <el-row style="margin: 1.3rem 0;">
                  <el-col>
                    <span class="name"> 大哥大 </span>
                    <span class="name"> | </span>
                    <span class="job">软件工程师</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-tag class="mx-1" type="danger" effect="plain">
                      男
                    </el-tag>
                    <el-tag class="mx-1" type="danger" effect="plain">
                      19岁
                    </el-tag>
                    <el-tag class="mx-1" effect="plain"> 本科 </el-tag>
                    <el-tag class="mx-1" type="warning" effect="plain">
                      广东技术大学
                    </el-tag>
                    <el-tag class="mx-1" type="success" effect="plain">
                      1年工作经验
                    </el-tag>
                    <!-- <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
                  {{ item.label }}
                </el-tag> -->
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-divider />
            <!-- 专业技能标题 -->
            <el-row>
              <el-col>
                <span class="header"> 专业技能 </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <ul>
                  <li>能吃</li>
                  <li>能睡</li>
                  <li>能打豆豆</li>
                </ul>
              </el-col>
              <el-col :span="12">
                <ul>
                  <li>能吃</li>
                  <li>能睡</li>
                  <li>能打豆豆</li>
                </ul>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span class="header"> 个人经历 </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <ul>
                  <li>上过荣耀王者</li>
                  <li>一区宗师</li>
                  <li>天人前一百</li>
                </ul>
              </el-col>
              </el-row>
          </el-card>
        </el-col>
      </el-row>
</template>

<script>
import { ref, reactive, onMounted, } from "vue";
import { reqFindSum, reqAnalysis } from "@/api"

export default {
    setup() {
        reqAnalysis()
            .then((res) => {
                console.log(res.data)
            })
        return 
    },

}

</script>

<style  scoped>

</style>