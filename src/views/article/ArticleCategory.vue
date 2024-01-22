<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "categoryAlias": "my",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "categoryAlias": "yl",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "categoryAlias": "js",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
//定义变量，控制标题的展示
const title = ref('');
import { ArticleCategoryListService, articleCategoryAddService, articleCategoryUpdateService,articleCategoryDeleteService } from "@/api/article.js";
//声明一个异步的函数
const articleCategoryList = async () => {
    let result = await ArticleCategoryListService();
    categorys.value = result.data;
}
articleCategoryList();

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

import { ElMessage ,ElMessageBox } from 'element-plus'
//添加类别
const addCategory = async () => {
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.message ? result.message : '添加成功');

    //获取所以文章分类的函数来刷新页面
    articleCategoryList();
    dialogVisible.value = false;
}

//展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑分类';//放到下面的模板(即<template>)里不用value，但script里要
    //数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    categoryModel.value.id = row.id; //扩展id属性,来传递给后台
}

const updateCategory = async () => {
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.message ? result.message : '修改成功');
    articleCategoryList();
    dialogVisible.value = false;
}

const clearDialog = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.categoryAlias = '';
}

const deleteCategory = (row) => {

    ElMessageBox.confirm(
        '是否确认删除',
        '温馨提示',
        {   
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await articleCategoryDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '成功删除',
            })
            articleCategoryList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div>
                    <el-button type="primary" @click="dialogVisible = true; title = '添加分类'">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row);"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px" ref="form">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button
                        @click="dialogVisible = false; clearDialog(); this.$refs['form'].clearValidate();">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory();"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>

<!-- 
    <template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string

}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello'
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.clearValidate()
}

</script>
 -->