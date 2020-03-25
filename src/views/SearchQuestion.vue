<template>
    <div>
        <el-input
                placeholder="请输入内容"
                v-model="input"
                clearable
                style="float: left;width: 500px;"
        >
        </el-input>
        <el-button type="primary" icon="el-icon-search" plain @click="searchQuestion">搜索</el-button>

        <el-table
                :data="tableData"
                border
                style="width: 100%"
        >
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
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page"
                hide-on-single-page="true"
        >
        </el-pagination>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: '',
                tableData: [{}],

            }
        },
        methods: {
            searchQuestion() {
                const that = this;
                if (this.input.length == 0 || this.input.trim() == '') {
                    this.$message({
                        message: '还没输入内容哦！',
                        type: 'warning'
                    });
                } else {
                    console.log(this.input);
                    this.$axios.get('http://localhost:8181/Question/searchQuestion/' + this.input + '/0/10').then(function (resp) {
                        console.log(resp);
                        that.tableData = resp.data.content;
                        that.pageSize = resp.data.size;
                        that.total = resp.data.totalElements;
                    })

                }

            },
            page(currentPage) {
                const that = this;
                this.$axios.get('http://localhost:8181/Question/searchQuestion/' + this.input + '/' + (currentPage - 1) + '/10').then(function (resp) {
                    that.tableData = resp.data.content;
                    that.pageSize = resp.data.size;
                    that.total = resp.data.totalElements;
                })
            },
            viewQuestion(row) {
                this.$router.push({
                    path: '/ViewQuestion',
                    query: {
                        id: row.id
                    }
                })
            }
        },
        created() {
            const that = this;
            that.tableData = null;

        }
    }
</script>

<style scoped>

</style>