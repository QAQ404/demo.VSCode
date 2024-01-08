<script setup>
import { ref } from 'vue'

const registerData2 = ref({
    password2: "",
/*     new_pwd: "",
    re_pwd: "" */
})
const registerData = ref({
    password: "",
    // rePassword: ""
})
//校验密码的函数
/* const checkRePassword = (rule, value, callback) => {
    if (value == '') callback(new Error('请再次输入密码'))
    if (value !== registerData.value.password) callback(new Error("两次密码输入不一致"))
    else callback()
} */
//定义表单校验规则
const rules = {
   /*  username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 5, max: 16, message: "长度必须为5-16位", trigger: "change" },
        { min: 5, max: 16, message: "长度必须为5-16位", trigger: "blur" }
    ], */
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "change" },
        { pattern: "^\\S{5,16}$", message: "长度必须为5-16位", trigger: "blur" },
    ],
    /* rePassword: [
        // { required: true, message: "必须输入", trigger: "blur" },
        { validator: checkRePassword, trigger: "blur" }
    ] */
}

/* const changePassword = () => {
    console.log(passwordData.value.new_pwd);
} */

</script>
<template>
    <el-row>
        <el-col :span="12">
            <el-form :model="registerData2" :rules="rules">
                <el-form-item  prop="password">
                    <el-input v-model="registerData2.password2"></el-input>
                </el-form-item>
                <!-- <el-form-item  prop="password">
                    <el-input v-model="passwordData.new_pwd"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="请再次输入" prop="password">
                    <el-input v-model="passwordData.re_pwd"></el-input>
                </el-form-item> -->
                <!-- <el-form-item>
                    <el-button type="primary" @click="changePassword">修改密码</el-button>
                </el-form-item> -->
            </el-form>
            -------------------------------------------------------------------------
            <el-form :model="registerData" :rules="rules">
                <el-form-item prop="password">
                    <el-input  v-model="registerData.password"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="rePassword">
                    <el-input  v-model="registerData.rePassword"></el-input>
                </el-form-item> -->
            </el-form>
        </el-col>
    </el-row>
</template>
