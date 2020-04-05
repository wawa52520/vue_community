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
        <el-form-item label="权限">
            <el-select v-model="ruleForm.power" placeholder="请选择用户权限">
                <el-option label="学生" value="学生"></el-option>
                <el-option label="教师" value="教师"></el-option>
                <el-option label="管理员" value="管理员"></el-option>
            </el-select>
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
                input: '',
                ruleForm: {
                    password: '',
                    checkPass: '',
                    id: '',
                    power: '',
                    name: '',
                    gmt_create: '',
                    gmt_modified: ''
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
                        this.$axios.post(apiUrl + '/Login/UpdateUser', this.ruleForm).then(function (resp) {
                            if (resp.data == "success") {
                                that.$router.push('/UserManage');
                                that.$message({
                                    type: 'success',
                                    message: '修改成功！'
                                });
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '修改失败！'
                                });
                            }
                        })
                    } else {
                        that.$message({
                            type: 'error',
                            message: '修改失败！'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            //从sessionStorage获取用户的Id
            const that = this;
            that.$axios.get(apiUrl + '/Login/findByUserId/' + this.$route.query.id).then(function (resp) {
                that.input = resp.data.name;
                that.ruleForm.password = resp.data.password;
                that.ruleForm.power = resp.data.power;
                that.ruleForm.id = resp.data.id;
                that.ruleForm.gmt_create = resp.data.gmt_create;
                console.log(resp);
                that.ruleForm.checkPass = that.ruleForm.password;
                that.ruleForm.gmt_modified = resp.data.gmt_modified;
                that.ruleForm.name = resp.data.name;
            })
        }
    }
</script>

<style scoped>

</style>