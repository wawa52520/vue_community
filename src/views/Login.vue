<template>
    <div class="container">
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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 145px">登录</el-button>
                    <el-button @click="resetForm('ruleForm')" style="width:145px;">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            // var img ='https://i.loli.net/2020/03/13/X3Z8ljOwnFG679D.jpg';
            // var img = [{src:'https://i.loli.net/2020/03/13/X3Z8ljOwnFG679D.jpg'},
            //     {src:'https://i.loli.net/2020/03/13/i48IVeN9BvGbcWr.jpg'},
            //     {src:'https://i.loli.net/2020/03/13/sTLJiK57bUvqonh.jpg'}
            // ];
            var sessionName = ''

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
                },
                rules: {
                    user: [
                        {validator: checkUser, trigger: 'blur'}
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const username = this.ruleForm.user
                const password = this.ruleForm.pass
                const that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('submit!');
                        //表单提交的user和pass
                        // console.log(this.ruleForm.user)
                        // console.log(this.ruleForm.pass)
                        this.$axios.get('http://localhost:8181/Login/findByUserAndPassword/' + this.ruleForm.user + '/' + this.ruleForm.pass).then(function (resp) {
                            console.log(resp);
                            // console.log(username)
                            // console.log(password)
                            if (resp.data.length != 0) {
                                alert('登陆成功');
                                sessionStorage.setItem("username", username);
                                that.$router.push('/FindQuestion')
                                // console.log('name:' + resp.data[0].name);
                                // console.log('pass:' + resp.data[0].password);
                            } else {
                                alert('用户名或密码错误！！！')
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