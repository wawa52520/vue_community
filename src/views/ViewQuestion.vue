<template>
    <div>
        <el-container>
            <el-header>{{answerData.title}}</el-header>
            <el-main style="height: 750px">{{answerData.description}}
                <span>回复老师:{{answerData.teacherTag}}</span></el-main>

        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                answerData: {
                    title: '',
                    description: '',
                    answer: '',
                    teacherTag: ''
                }
            }
        },
        created() {
            //通过route拿参数（id）
            const that = this
            this.$axios.get('http://localhost:8181/Question/findById/' + this.$route.query.id).then(function (resp) {
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