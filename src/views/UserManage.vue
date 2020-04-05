<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="gmt_create"
                    label="创建时间"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="gmt_modified"
                    label="上次修改时间"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="power"
                    label="权限"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    width=200>
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">修改</el-button>
                    <el-button type="text" size="small" @click="deleteQuestion(scope.row)" icon="el-icon-delete">删除</el-button>
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
                    path: '/EditUser',
                    query: {
                        id: row.id
                    }
                })

                //row.id
            },
            //删除用户按钮方法
            deleteQuestion(row) {
                const that=this;
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$axios.delete(apiUrl+'/Login/deleteByUserId/' + row.id).then(function (resp) {
                    if (resp.data=='success'){
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
            page(currentPage) {
                const that = this;
                this.$axios.get(apiUrl+'/Login/findAllUser/' + (currentPage - 1) + '/10').then(function (resp) {
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
            this.$axios.get(apiUrl+'/Login/findAllUser/0/10').then(function (resp) {
                that.tableData = resp.data.content;
                that.pageSize = resp.data.size;
                that.total = resp.data.totalElements;
            });
        }
    }
</script>

<style scoped>

</style>