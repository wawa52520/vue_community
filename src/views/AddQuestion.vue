<template>
    <!--    model对应v-model,rules对应prop-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="问题标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="问题标签" prop="tag">
            <el-select v-model="ruleForm.tag" placeholder="请选择问题标签">
                <el-option label="Java" value="Java"></el-option>
                <el-option label="Python" value="Python"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="高数" value="高数"></el-option>
                <el-option label="云计算" value="云计算"></el-option>
                <el-option label="前端" value="前端"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="老师列表" prop="teacherTag">
            <el-select v-model="ruleForm.teacherTag" placeholder="请选择提问老师">
                <el-option label="张老师" value="张老师"></el-option>
                <el-option label="tea" value="tea"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <!--            roleForm映射ref-->
            <el-button type="primary" @click="submitForm('ruleForm')">提问</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>

        </el-form-item>
    </el-form>
</template>
<script>
    import apiUrl from "../httpConfig/api";

    export default {
        data() {
            return {
                ruleForm: {
                    title: '',
                    tag: '',
                    teacherTag:'',
                    description: '',
                    questioner:''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入问题标题', trigger: 'blur'},
                        {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
                    ],
                    tag: [
                        {required: true, message: '请选择问题标签', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请填写问题描述', trigger: 'blur'}
                    ],
                    teacherTag: [
                        {required: true, message: '请选择老师列表', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            // test() {
            //     console.log(this.ruleForm)
            // },

            submitForm(formName) {
                const that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(apiUrl+'/Question/save', this.ruleForm).then(function (resp) {
                            console.log(resp.data)
                            if (resp.data == 'success') {
                                that.$message({
                                    message: '提问成功！',
                                    type: 'success'
                                });
                                that.$router.push('/MyQuestion')
                            } else {
                                that.$alert('提问失败,请完善问题!')
                                that.$router.push('/MyQuestion')
                            }
                        })

                    } else {
                        console.log('提问失败，请重新提问!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
                this.ruleForm.questioner=sessionStorage.getItem('username');
        }
    }
</script>

<style scoped>

</style>