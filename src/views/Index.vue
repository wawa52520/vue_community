<template>
    <div style="position: absolute;width: 100%;height: 100%">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['0','1']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">
                        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                      :class="$route.path==item2.path?'is-active':''" v-show="item2.power.includes(UserPower)">{{item2.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <span>欢迎您，{{username}}</span>
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="exit">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username:'',
                UserPower:sessionStorage.getItem('power')
            }
        },
        methods:{
            exit() {
                const that= this
                this.$confirm('将退出该系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$router.push('/Login')
                    sessionStorage.clear()
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        }
        ,
        created() {
           this.username= sessionStorage.getItem('username');
        }
    }
</script>

<style scoped>

</style>