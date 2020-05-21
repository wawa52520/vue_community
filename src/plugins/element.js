import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.use(echarts);
Vue.use(Element);
Vue.prototype.$echarts=echarts;