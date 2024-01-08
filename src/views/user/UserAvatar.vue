<script setup>
import { Plus, Upload } from '@element-plus/icons-vue'
import {ref} from 'vue'
import avatar from '@/assets/default.png'
import { ElMessage ,ElMessageBox } from 'element-plus'
import { userAvatarUpdateService} from '@/api/use.js'

import {useUserInfoStroe} from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStroe();

import {useTokenStore} from '@/stores/token.js';
const tokemStore = useTokenStore();

const uploadRef = ref()

//用户头像地址
const imgUrl= ref(userInfoStore.info.userPic)

//头像上传成功的回调
const uploadSucess = async (result)=>{
    imgUrl.value = result.data;

    let res = await userAvatarUpdateService(imgUrl.value);
    ElMessage.success(res.message ? res.message : '添加成功');
    userInfoStore.info.userPic = imgUrl.value;
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>更换头像</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload 
                    ref="uploadRef"
                    class="avatar-uploader" 
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :headers="{'Authorization':tokemStore.token}"
                    :on-success="uploadSucess"
                    >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <img v-else :src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large"  @click="uploadRef.$el.querySelector('input').click()">
                    更改头像
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>