<template xmlns="http://www.w3.org/1999/html">
    <div>
        <el-container>
            <el-header>问题标题：{{answerData.title}}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;提问者：{{answerData.questioner}}
            </el-header>
            <el-main style="height: 750px;text-align: left" >
                <span>问题描述：</span>
                <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="请输入内容"
                        v-model=answerData.description
                        readonly=true
                >
                </el-input>
                <span>老师回复：</span>
                <el-input
                        type="textarea"
                        :rows="8"
                        placeholder="等待教师回复..."
                        v-model=answerData.answer
                        readonly=true
                >
                </el-input>
            </el-main>

        </el-container>
    </div>
</template>

<script>
    import apiUrl from "../httpConfig/api";

    export default {
        data() {
            return {
                answerData: {
                    title: '',
                    description: '',
                    answer: '',
                    teacherTag: '',
                    questioner:'',
                }
            }
        },
        created() {
            //通过route拿参数（id）
            const that = this;
            this.$axios.get(apiUrl+'/Question/findById/' + this.$route.query.id).then(function (resp) {
                that.answerData = resp.data
            })
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>