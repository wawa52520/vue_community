<template>
    <div class="container">
        <h1 style="margin-left:40%;color: white;">面向高校师生的课后答疑系统</h1>
        <div class="box">
            <h1>登录</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户名" prop="user" style="width: 400px;" class="user">
                    <el-input type="input" v-model="ruleForm.user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" style="width: 400px;" class="pwd">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录方式" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="学生"></el-radio>
                        <el-radio label="教师"></el-radio>
                        <el-radio label="管理员"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 145px">登录</el-button>
                    <el-button @click="register" style="width:145px;">注册</el-button>
                    <!--                    <el-button @click="testBtn" style="width:145px;">测试</el-button>-->
                </el-form-item>
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

            var checkUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.user !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            }
            return {
                ruleForm: {
                    user: '',
                    pass: '',
                    type: '',
                },
                rules: {
                    user: [
                        {validator: checkUser, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择登录方式', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const username = this.ruleForm.user;
                const password = this.ruleForm.pass;
                const that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        this.$axios.get('http://localhost:8181/Login/findByUserAndPassword/' + this.ruleForm.user + '/' + this.ruleForm.pass + '/' + this.ruleForm.type).then(function (resp) {
                            if (resp.data.length != 0 && that.ruleForm.type == '学生') {
                                that.$message({
                                    type: 'success',
                                    message: '登陆成功!'
                                });
                                sessionStorage.setItem("username", username);
                                sessionStorage.setItem("id", resp.data[0].id);
                                sessionStorage.setItem("power", resp.data[0].power);
                                that.$router.push('/FindQuestion');
                            } else if (resp.data.length != 0 && that.ruleForm.type == '教师') {
                                that.$message({
                                    type: 'success',
                                    message: '登陆成功!'
                                });
                                sessionStorage.setItem("username", username);
                                sessionStorage.setItem("id", resp.data[0].id);
                                sessionStorage.setItem("power", resp.data[0].power);
                                that.$router.push('/FindQuestion');
                            } else if (resp.data.length != 0 && that.ruleForm.type == '管理员') {
                                that.$message({
                                    type: 'success',
                                    message: '登陆成功!'
                                });
                                sessionStorage.setItem("username", username);
                                sessionStorage.setItem("id", resp.data[0].id);
                                sessionStorage.setItem("power", resp.data[0].power);
                                that.$router.push('/FindQuestion');
                            } else {
                                that.$message({
                                    type: 'error',
                                    message: '登陆失败,请检查用户名密码或登录方式!'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            register() {
                this.$router.push("/register")
            },
            testBtn() {
                console.log(this.ruleForm);
            }
        },

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
        background-image: url("../assets/1.jpg");
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