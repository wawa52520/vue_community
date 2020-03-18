<template>
    <div class="container">
        <div class="box">
            <h1>注册</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户名" prop="name" style="width: 400px;" class="user">
                    <el-input type="input" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"
                              style="width: 300px" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"
                              style="width: 300px" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 145px">注册</el-button>
                    <el-button @click="resetForm('ruleForm')" style="width:145px;">重置</el-button>
                </el-form-item>
                <el-link type="info" style="float: right" href="/">已有账号，直接登陆></el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
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

            var checkUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.name !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            }
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    checkPass: '',
                },
                rules: {
                    name: [
                        {validator: checkUser, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.$axios.post('http://localhost:8181/Login/register',this.ruleForm).then(function (resp) {
                            console.log(resp);
                            if (resp.data=='success'){
                                alert('注册成功!');
                                that.$router.push("/Login");
                                that.$message({
                                    type: 'success',
                                    message: '注册成功!开始登陆吧！'
                                });
                            }else {
                                that.$message({
                                    type: 'error',
                                    message: '注册失败!该用户名已存在！',
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    body {
        margin: 0;
        padding: 0;
        background-color: #42b983;
    }

    .container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow-y: auto;
        background-image: url("../assets/2.jpg");
    }

    .box {
        width: 500px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: rgba(0, 0, 0, .8);
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, .5);
        border-radius: 10px;
        padding: 40px;
        padding-left: 20px;
    }

    .box h1 {
        text-align: center;
        padding: 0;
        color: white;

    }

    .user {
        background: transparent;
    }
</style>