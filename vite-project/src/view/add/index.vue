<template>
  <div class="add">
    <el-card class="add-container">
      <el-form
        :model="goodForm"
        :rules="rules"
        label-width="100px"
        ref="goodRef"
        class="goodForm"
      >
        <el-form-item required label="商品分类">
          <el-cascader
            :placeholder="state.defaultCase"
            style="width: 300px"
            :props="state.category"
            @change="handleChangeCate"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input
            style="width: 300px"
            placeholder="请输入商品名称"
            v-model="goodForm.goodsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input
            style="width: 300px"
            type="textarea"
            placeholder="请输入商品简介(100字)"
            v-model="goodForm.goodsIntro"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input
            style="width: 300px"
            min="0"
            type="number"
            placeholder="请输入商品价格"
            v-model="goodForm.originalPrice"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input
            style="width: 300px"
            min="0"
            type="number"
            placeholder="请输入商品售价"
            v-model="goodForm.sellingPrice"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input
            style="width: 300px"
            min="0"
            type="number"
            placeholder="请输入商品库存"
            v-model="goodForm.stockNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-input
            style="width: 300px"
            placeholder="请输入商品小标签"
            v-model="goodForm.tag"
          ></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="goodForm.goodsSellStatus">
            <el-radio label="0">上架</el-radio>
            <el-radio label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品主图" prop="goodsCoverImg">
          <el-upload
            class="avatar-uploader"
            accept="jpg,jpeg,png"
            :action="state.uploadImgServer"
            :show-file-list="false"
            :headers="{token: state.token}"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
            :on-error="handleError"
          >
            <img
              class="avatar"
              style="width: 100px; height: 100px; border: 1px solid #e9e9e9"
              v-if="goodForm.goodsCoverImg"
              :src="goodForm.goodsCoverImg"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情内容">
          <div ref="editor"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{
            state.id ? "立即修改" : "立即创建"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {
  reactive,
  onMounted,
  onBeforeUnmount,
  ref,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";
import WangEditor from "wangeditor";
import { Plus } from "@element-plus/icons-vue";
import { localGet, uploadImgServer, uploadImgsServer } from "@/utils";

// 获取当前组件的实例、上下文来操作router和vuex
const { proxy } = getCurrentInstance();
const goodRef = ref(null);
const editor = ref(null);
const route = useRoute();
const router = useRouter();
const { id } = route.query;

const state = reactive({
    uploadImgServer,
  token: localGet("token") || "",
  id: id,
  defaultCase: "",
  categoryId: "",
  category: {
    lazy: true,
    lazyLoad(node, resolve) {
      const { level = 0, value } = node;
      axios
        .get("/categories", {
          params: {
            pageNumber: 1,
            pageSize: 1000,
            categoryLevel: level + 1,
            parentId: value || 0,
          },
        })
        .then((res) => {
          const list = res.list;
          const nodes = list.map((item) => ({
            value: item.categoryId,
            label: item.categoryName,
            leaf: level > 1,
          }));
          resolve(nodes);
        });
    },
  },
});
const goodForm = reactive({
  goodsName: "",
  goodsIntro: "",
  originalPrice: "",
  sellingPrice: "",
  stockNum: "",
  goodsSellStatus: "0",
  goodsCoverImg: "",
  tag: "",
});
const rules = reactive({
  goodsName: [
    { required: "true", message: "请填写商品名称", trigger: ["change"] },
  ],
  originalPrice: [
    { required: "true", message: "请填写商品价格", trigger: ["change"] },
  ],
  sellingPrice: [
    { required: "true", message: "请填写商品售价", trigger: ["change"] },
  ],
  stockNum: [
    { required: "true", message: "请填写商品库存", trigger: ["change"] },
  ],
  goodsCoverImg: [
    { required: "true", message: "请上传主图", trigger: ["change"] },
  ],
});

const handleChangeCate = (val) => {
  state.categoryId = val[2] || "";
};

const handleBeforeUpload = (file) => {
  const sufix = file.name.split('.')[1] || ''
  if(!['jpg', 'jpeg', 'png'].includes(sufix)) {
      ElMessage.error('请上传 jpg、jpeg、png 格式的图片')
      return false;
  }
};

const handleUrlSuccess = (val) => {
  goodForm.value.goodsCoverImg = val.data || "";
  console.log(goodForm.value.goodsCoverImg, '获取到的图片');
};

const handleError = (err) => {
  console.log(err, "为啥什么二百都不地方");
};

let instance;
onMounted(() => {
  instance = new WangEditor(editor.value);
  instance.config.showLinkImg = false;
  instance.config.showLinkImgAlt = false;
  instance.config.showLinkImgHref = false;
  instance.config.uploadImgMaxSize = 2 * 1024 * 1024;
  instance.config.uploadFileName = "file";
  instance.config.uploadImgHeaders = {
    token: state.token,
  };
  // 图片返回格式不同，需要自定义返回格式
  instance.config.uploadImgHooks = {
    // 图片上传并返回了结果，想要自己把图片插入到编辑器中
    // 例如服务器返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
    customInsert: function (insertImgFn, result) {
      // result 即为服务端返回的接口
      // insertImgFn 可把图片插入到编辑器，传入图片 src，执行函数即可
      if (result.data && result.data.length) {
        result.data.forEach((item) => insertImgFn(item));
      }
    },
  };
  instance.config.uploadImgServer = uploadImgsServer;
  Object.assign(instance.config, {
    onchange() {
      console.log("change");
    },
  });
  instance.create();
  if (id) {
    axios.get(`/goods/${id}`).then((res) => {
      const { goods, firstCategory, secondCategory, thirdCategory } = res;
      goodForm.value = {
        goodsName: goods.goodsName,
        goodsIntro: goods.goodsIntro,
        originalPrice: goods.originalPrice,
        sellingPrice: goods.sellingPrice,
        stockNum: goods.stockNum,
        goodsSellStatus: String(goods.goodsSellStatus),
        goodsCoverImg: goods.goodsCoverImg,
        tag: goods.tag,
        categoryId: goods.goodsCategoryId,
      };
      console.log(goodForm, 'goodForm')
      state.categoryId = goods.goodsCategoryId;
      state.defaultCase = `${firstCategory.categoryName}/${secondCategory.categoryName}/${thirdCategory.categoryName}`;
      if (instance) {
        // 初始化商品详情 html
        instance.txt.html(goods.goodsDetailContent);
      }
    });
  }
});

const submitAdd = () => {
    console.log('咋没反应', goodRef.value.validate);
  goodRef.value.validate((valid) => {
    if (valid) {
      let httpOption = axios.post;
      let params = {
        goodsName: goodForm.goodsName,
        goodsIntro: goodForm.goodsIntro,
        originalPrice: goodForm.originalPrice,
        sellingPrice: goodForm.sellingPrice,
        stockNum: goodForm.stockNum,
        goodsSellStatus: goodForm.goodsSellStatus,
        goodsCoverImg: goodForm.goodsCoverImg,
        tag: goodForm.tag,
        goodsCategoryId: state.categoryId,
        goodsDetailContent: instance.txt.html(),
      };
      if (params.goodsName.length > 128) {
        ElMessage.error("商品名称不能超过128个字符");
        return;
      }
      if (params.goodsIntro.length > 200) {
        ElMessage.error("商品简介不能超过200个字符");
        return;
      }
      if (params.tag.length > 16) {
        ElMessage.error("商品标签不能超过16个字符");
        return;
      }
      console.log("参数通过", params);
      if(id) {
          params.goodsId = id
        //   修改商品使用 put 方法
        httpOption = axios.put
      }
      httpOption('/goods', params).then(() => {
          ElMessage.success(id ? '修改成功' : '添加成功')
          router.push({path: '/good'})
      })
    }
  });
};

onBeforeUnmount(() => {
  instance.destroy();
  instance = null;
});
</script>
<style lang="scss" scoped>
.add {
  display: flex;
  .add-container {
    flex: 1;
    height: 100%;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 64px;
    height: 100%;
    border: 1px solid #e9e9e9;
    text-align: center;
    padding: 32px 17px;
  }
}
</style>
