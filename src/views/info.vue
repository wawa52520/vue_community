<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
            <el-input
                    placeholder="请输入内容"
                    v-model="input"
                    :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password
                      placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password
                      placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import apiUrl from "../httpConfig/api";

    export default {
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                input: sessionStorage.username,
                id: sessionStorage.id,
                ruleForm: {
                    password: '',
                    checkPass: '',
                    id: ''
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                const that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(apiUrl + '/Login/updatePasswordById', this.ruleForm).then(function (resp) {
                            if (resp.data == 'success') {
                                that.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                setInterval('window.location.reload()',1000);

                            }else {
                                that.$message({
                                    message: '修改失败！',
                                    type: 'error'
                                });
                            }
                        })

                    } else {
                        that.$message({
                            message: '修改失败！',
                            type: 'error'
                        });
                        console.log('error submit!!');
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            //从sessionStorage获取用户的Id
            this.ruleForm.id = parseInt(sessionStorage.getItem("id"));

        }
    }
</script>

<style scoped>

</style>