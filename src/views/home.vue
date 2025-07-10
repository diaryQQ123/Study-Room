<!-- 注释 -->
<template>
  <div class="content">
    <div>
      <el-row>
        <el-col
          :span="6"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          "
        >
          <el-avatar
            :size="50"
            :src="
              store.state.userBasicData.avatar
                ? store.state.userBasicData.avatar
                : state.circleUrl
            "
          />
          <div style="display: flex; margin: auto; padding: auto">
            <span style="margin-right: 10px">关注数</span>
            <span>粉丝数</span>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="display: flex; flex-direction: column">
            <div style="display: flex">
              <div style="flex: 1">
                昵称:{{ store.state.userBasicData.nickName }}
              </div>
              <div style="width: 200px">
                <div>
                  性别:{{ store.state.userBasicData.sex === 0 ? "男" : "女" }}
                </div>
                <div>年龄:</div>
              </div>
            </div>
            <div style="display: flex">
              <div style="flex: 1">
                <div>个性签名：{{ store.state.userBasicData.idiogragh }}</div>
                <div>励志标语</div>
              </div>
              <div style="width: 200px; margin: auto">
                <el-button type="primary" size="large" @click="editData"
                  >编辑资料</el-button
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        padding-top: 20px;
        height: 150px;
        background: grey;
      "
    >
      <div>
        <p>历史学习时长</p>
        <div><pie /></div>
      </div>
      <div>
        <p>日平均学习时长</p>
        <div><pie /></div>
      </div>
      <div>
        <div style="width: 200px; text-align: center">单次最高学习时长</div>
        <div><bar /></div>
      </div>
      <div>
        <div style="width: 200px; text-align: center">学习积分</div>
        <div><bar /></div>
      </div>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        margin-top: 10px;
        height: 200px;
      "
    >
      <div style="width: 48%; background: yellow">收藏的自习室</div>
      <div style="width: 48%; background: beige">学习历史</div>
    </div>
    <div style="flex: 1; background: gainsboro; margin-top: 20px">
      <div style="height: 100%">
        <!-- 示例：CSS Grid布局 -->
        <div class="seating-map">
          <div
            v-for="(seat, index) in seats"
            :key="seat.id"
            class="seat"
            :data-id="seat.id"
            :data-status="seat.status"
          >
            <i
              :class="[
                'iconfont',
                'icon-seat',
                { reserve: activeIndex === index },
              ]"
              style="font-size: 24px"
              @click="goOrder(index)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding-top: 10px;
        height: 150px;
      "
    >
      <div style="width: 32%; background: paleturquoise">线上自习室</div>
      <div style="width: 32%; background: paleturquoise">线下自习室</div>
      <div style="width: 32%; background: paleturquoise">我的</div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      title="编辑资料"
      width="500"
      center
    >
      <el-form :model="userForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userForm.sex">
            <el-radio :value="0">男</el-radio>
            <el-radio :value="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像" class="uploader">
          <el-upload
            class="avatar-uploader"
            :show-file-list="true"
            :on-change="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            action=""
            :http-request="handleUpload"
          >
            <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number
            v-model="userForm.age"
            :min="1"
            :max="100"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="userForm.idiogragh" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitData"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import pie from "@/components/pie.vue";
import bar from "@/components/bar.vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import axios from "axios";
import { UpdateUserData, showUpdateData } from "@/axios/user";
import { getFan, getAchieve, getFollow } from "@/axios/study";
const getSomeData = () => {
  const id=store.state.userData.id;
  console.log(id)
  if(!id){
    console.log("id不能为空");
    return
  }
  Promise.all([getFollow(id), getFan(id),getAchieve(id)])
    .then(([res1, res2, res3]) => {
      console.log(res1), console.log(res2), console.log(res3);
    })
    .catch((error) => {
      throw new Error({ error: error.message });
    });
};
onMounted(()=>{
  getSomeData()
})
const store = useStore();
const userId = store.state.userData.id;
const userForm = reactive({
  nickName: null,
  sex: null,
  age: 35,
  avatar: null,
  idiogragh: null,
});
const circleUrl = ref(null);
const submitData = async () => {
  console.log(userForm);
  console.log(JSON.stringify(userForm));
  userForm.avatar = circleUrl;
  // axios.put('/api/user/update',userForm)
  await UpdateUserData(userForm).then((res) => {
    if (res.code === 1) {
      showData();
    }
  });
};
const showData = async () => {
  await showUpdateData(userId).then((res) => {
    Object.assign(userForm, res.data);
    store.dispatch("saveUserBasicData", userForm);
    ElMessage.success({
      type: "success",
      message: "修改成功",
    });
    centerDialogVisible.value = false;
  });
};
const editData = () => {
  centerDialogVisible.value = true;
};
const centerDialogVisible = ref(false);
const seats = ref([]);
const activeIndex = ref(0);
const goOrder = (index) => {
  console.log("订阅了");
  activeIndex.value = index;
};
const generateSeats = () => {
  const newSeats = [];
  for (let i = 1; i <= 85; i++) {
    newSeats.push({
      id: i,
      status: "available",
      text: i,
    });
  }
  seats.value = newSeats;
};
onMounted(() => {
  generateSeats();
});
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
// const handleUpload=(params)=>{
//   const file=params.file;
//   const formData=new FormData();

// }

const handleAvatarSuccess = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file.raw);
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`${key}:`, value);
      }
    }
    const token = localStorage.getItem("token");
    const res = await axios
      .post("/api/admin/common/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 让 axios 自动设置 boundary
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res) {
          circleUrl.value = res.data.data;
        }
      });
  } catch (error) {
    console.log("服务器错误");
  }
  userForm.avatar = URL.createObjectURL(file.raw);
  ElMessage.success("头像上传成功");
};
</script>

<style scoped>
@import url("//at.alicdn.com/t/c/font_4967429_12wfbslgebbp.css");
/* .uploader .el-form-item__label-wrap .el-form-item__label{
  line-height: 178px; /* 与上传组件高度一致 
} */
.uploader {
  display: flex;
  align-items: center;
}
::v-deep .uploader .el-form-item__label {
  height: 178px !important;
  line-height: 178px !important;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px solid grey;
  border-radius: 10px;
}

.content {
  padding: 20px;
  height: 120vh !important;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}
.content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/bg.jpg");
  background-position: center;
  z-index: -1;
  background-size: cover;
  opacity: 0.5;
}
.seating-map {
  display: grid;
  margin: 30px;
  grid-template-columns: repeat(17, 80px); /* 10列 */
  gap: 10px;
}
.seat {
  width: 80px;
  height: 80px;
  display: grid; /* 启用Grid布局 */
  place-items: center;
  border-radius: 4px;
  cursor: pointer;
}
.reserve {
  color: aqua;
}
</style>