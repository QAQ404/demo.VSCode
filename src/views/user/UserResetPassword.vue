<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { updatePasswordService } from "@/api/use.js";
import router from '@/router'
import { useTokenStore } from '@/stores/token.js';
const tokemStore = useTokenStore();
import { useUserInfoStroe } from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStroe();

const passwordData = ref({
    old_pwd: "",
    new_pwd: "",
    re_pwd: ""
})

//校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value == '') callback(new Error('请再次输入密码'))
    if (value !== passwordData.value.new_pwd) callback(new Error("两次密码输入不一致"))
    else callback()
}
const rule = {
    old_pwd: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "change" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "blur" },
    ],
    new_pwd: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "change" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "blur" },
    ],
    re_pwd: [
        { validator: checkRePassword, trigger: "blur" }
    ],
}

const updatePassword = () => {
    ElMessageBox.confirm(
        '是否确认修改，修改后需要重新登录',
        '退出登录',
        {
            confirmButtonText: '退出',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            
            let result = await updatePasswordService(passwordData.value);
            //清空pinia和token
            tokemStore.removeToken();
            userInfoStore.removeInfo();

            ElMessage({
                type: 'success',
                message: '修改成功，重新登陆',
            })
            router.push('/');
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消修改',
            })
        })
        
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordData" :rules="rule" label-width="100px" size="large">
                    <el-form-item label="现在密码" prop="old_pwd">
                        <el-input v-model="passwordData.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="new_pwd">
                        <el-input v-model="passwordData.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="再输一次" prop="re_pwd">
                        <el-input v-model="passwordData.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
