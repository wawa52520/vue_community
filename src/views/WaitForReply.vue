<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="title"
                    label="标题"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="创建日期"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="questioner"
                    label="提问者"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="replied"
                    label="是否回复"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width=200>
                <template slot-scope="scope">
                    <el-button @click="viewQuestion(scope.row)" type="text" icon="el-icon-view">查看</el-button>
                    <el-button @click="replyQuestion(scope.row)" type="text" icon="el-icon-edit">回复</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page"
        >
        </el-pagination>
    </div>
</template>
<script>
    import apiUrl from "../httpConfig/api";

    export default {
        methods: {
            //row 从节点拿到的属性
            replyQuestion(row) {
                console.log(row);
                this.$router.push({
                    path: '/ReplyQuestion',
                    query: {
                        id: row.id
                    }
                })
            }
            ,
            viewQuestion(row) {
                this.$router.push({
                    path: '/ViewQuestion',
                    query: {
                        id: row.id
                    }
                })
            }
            ,
            page(currentPage) {
                const that = this
                this.$axios.get(apiUrl+'/Question/teacherAnswer/' + sessionStorage.getItem('username') + '/否/' + (currentPage - 1) + '/5').then(function (resp) {
                    that.tableData = resp.data.content;
                    that.pageSize = resp.data.size;
                    that.total = resp.data.totalElements;
                })
            }
        },
        data() {
            return {
                pageSize: '',
                total: '',
                tableData: [{}],
                UserPower: sessionStorage.getItem("power")
            }
        },
        //分页
        created() {
            const that = this;
            this.$axios.get(apiUrl+'/Question/teacherAnswer/' + sessionStorage.getItem('username') + '/否/0/5').then(function (resp) {
                console.log(resp);
                that.tableData = resp.data.content;
                that.pageSize = resp.data.size;
                that.total = resp.data.totalElements;
            });
        }
    }
</script>

<style scoped>

</style>