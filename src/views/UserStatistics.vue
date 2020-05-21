<template>
    <div class="hello">
        <div id="myChart" :style="{width: '800px', height: '800px'}" style="float: left"></div>
        <div id="userCount" style="width: 800px;height: 800px;float: left"></div>
    </div>
</template>

<script>

    import apiUrl from "../httpConfig/api";

    export default {
        data() {
            return {
                xAxis: {
                    data: [],
                    axisLabel: {
                        interval: 0
                    }
                },
                series: {
                    name: '次数',
                    type: 'bar',
                    data: []
                },
                UserXAxis: {
                    data: [],
                    axisLabel: {
                        interval: 0
                    }
                },
                UserSeries: {
                    name: '次数',
                    type: 'bar',
                    data: []
                }
            }
        },

        methods: {
            drawLine() {
                const that = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    color:['#4ad2ff'],
                    title: {text: '提问标签排行榜（前三）'},
                    tooltip: {},
                    legend: {
                        data: ['次数']
                    },
                    xAxis: that.xAxis,

                    yAxis: {},
                    series: that.series
                });
            },
            drawUserCount() {
                const that = this;
                // 基于准备好的dom，初始化echarts实例
                let userCount = this.$echarts.init(document.getElementById('userCount'))
                // 绘制图表
                userCount.setOption({
                    color:['#ff4d44'],
                    title: {text: '用户提问排行榜（前三）'},
                    tooltip: {},
                    legend: {
                        data: ['次数']
                    },
                    xAxis: that.UserXAxis,

                    yAxis: {},
                    series: that.UserSeries
                });
            }
        },
        mounted() {
            // this.drawLine();
        },
        created() {
            const that = this;
            this.$axios.get(apiUrl + "/Question/tagCount").then(function (resp) {
                for (var i = 0; i < resp.data.length; i++) {
                    that.xAxis.data.push(Object.values(resp.data[i])[1]);
                    that.series.data.push(Object.values(resp.data[i])[0]);
                }
                that.drawLine();

            }),
            this.$axios.get(apiUrl + "/Question/userCount").then(function (resp) {
                console.log(resp);
                for (var i = 0; i < resp.data.length; i++) {
                    that.UserXAxis.data.push(Object.values(resp.data[i])[0]);
                    that.UserSeries.data.push(Object.values(resp.data[i])[1]);
                }
                that.drawUserCount();
            })
        }

    }
</script>


<style scoped>

</style>