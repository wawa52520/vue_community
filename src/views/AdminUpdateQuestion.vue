<template>
    <!--    model对应v-model,rules对应prop-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="问题ID">
            <el-input v-model="ruleForm.id" :disabled="true"></el-input>
        </el-form-item>
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
            </el-select>
        </el-form-item>
        <el-form-item label="老师列表" prop="teacherTag">
            <el-select v-model="ruleForm.teacherTag" placeholder="请选择提问老师">
                <el-option label="张老师" value="张老师"></el-option>
                <el-option label="赵老师" value="赵老师"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
            <!--            roleForm映射ref-->
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <!--            <el-button @click="test()">test</el-button>-->
        </el-form-item>
    </el-form>
</template>
<script>
    import apiUrl from "../httpConfig/api";

    export default {
        data() {
            return {
                ruleForm: {
                    id:'',
                    title: '',
                    tag: '',
                    description: '',
                    teacherTag:''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入问题标题', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
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
            submitForm(formName) {
                const that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(apiUrl+'/Question/update',this.ruleForm).then(function (resp) {
                            if (resp.data == 'success') {
                                that.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                that.$router.push('/FindQuestion')
                            } else {
                                that.$alert('修改失败,请完善问题!')
                                that.$router.push('/FindQuestion')
                            }
                        })

                    } else {
                        that.$message({
                            message: '修改失败！',
                            type: 'error'
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
            //通过route拿参数（id）
            const that = this;
            this.$axios.get(apiUrl+'/Question/findById/'+this.$route.query.id).then(function (resp) {
                that.ruleForm=resp.data;
            })
        }
    }
</script>

<style scoped>

</style>