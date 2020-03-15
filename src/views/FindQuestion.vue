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
                    label="操作"
                    width=200>
                <template slot-scope="scope">
                    <el-button @click="viewQuestion(scope.row)" type="text">查看</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="deleteQuestion(scope.row)">删除</el-button>
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
    export default {
        methods: {
            //row 从节点拿到的属性
            edit(row) {
                this.$router.push({
                    path: '/updateQuestion',
                    query: {
                        id: row.id
                    }
                })

                //row.id
            },
            //删除问题按钮方法
            deleteQuestion(row) {
                this.$axios.delete('http://localhost:8181/Question/deleteById/' + row.id).then(function (resp) {
                    if (resp.status == 200) {
                        window.location.reload()
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
                this.$axios.get('http://localhost:8181/Question/findAll/' + (currentPage - 1) + '/10').then(function (resp) {
                    that.tableData = resp.data.content;
                    that.pageSize = resp.data.size;
                    that.total = resp.data.totalElements
                })
            }
        },
        data() {
            return {
                pageSize: '',
                total: '',
                tableData: [{}],
            }
        },
        //分页
        created() {
            const that = this
            this.$axios.get('http://localhost:8181/Question/findAll/0/10').then(function (resp) {
                that.tableData = resp.data.content
                that.pageSize = resp.data.size
                that.total = resp.data.totalElements
            })
        }
    }
</script>

<style scoped>

</style>