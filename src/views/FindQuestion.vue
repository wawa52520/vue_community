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
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="teacherTag"
                    label="教师标签"
                    width="100">
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
                    <el-button @click="viewQuestion(scope.row)" type="text" icon="el-icon-view" >查看</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit" v-if="UserPower=='管理员'" >修改</el-button>
                    <el-button type="text" size="small" @click="deleteQuestion(scope.row)" icon="el-icon-delete" v-if="UserPower=='管理员'">删除</el-button>
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
            edit(row) {
                this.$router.push({
                    path: '/AdminUpdateQuestion',
                    query: {
                        id: row.id
                    }
                })

                //row.id
            },
            //删除问题按钮方法
            deleteQuestion(row) {
                const that=this;
                this.$confirm('此操作将永久删除该问题, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$axios.delete(apiUrl+'/Question/deleteById/' + row.id).then(function (resp) {
                        if (resp.status == 200) {
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            setInterval('window.location.reload()',1000);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

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
                this.$axios.get(apiUrl+'/Question/findAll/' + (currentPage - 1) + '/10').then(function (resp) {
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
                UserPower:sessionStorage.getItem("power")
            }
        },
        //分页
        created() {
            const that = this;
            this.$axios.get(apiUrl+'/Question/findAll/0/10').then(function (resp) {
                that.tableData = resp.data.content;
                that.pageSize = resp.data.size;
                that.total = resp.data.totalElements;
                console.log(resp.data)
            });
        }
    }
</script>

<style scoped>

</style>