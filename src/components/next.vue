<template>
    <div>
        <p>呈现图</p>
        <hr>

    <div>
        <div ref="radarChart" style="width: 600px; height: 400px;"></div>
    </div>
    <div>

    </div>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="group">
                <ul>
                    <!-- <li v-for="(item, index) in items" :key="index">
                        <span>{{ item.labels }}</span>
                        <br>
                        <input v-model="item.value" type="range" :min="0" :max="10" @input="updateRadarChart" />
                        <button type="button" @click="subtractionvalue(index)">-</button>
                        {{ items.value }}
                        <button type="button" @click="addvalue(index)">+</button>

                        <br>
                    </li> -->
                    <li v-for="(item, idx1) in items" :key="idx1">
                        <span>{{ item.name }}</span>
                        <div v-for="(item1, index) in item.arr" :key="index">
                            <span> {{ item1.label }}</span>
                            <input v-model="item1.value" type="range" :min="0" :max="10" @input="againrender"/>
                            <button type="button" @click="subvalue(item1)">-</button>
                            {{ item1.value }}
                            <button type="button" @click="addvalue(item1)">+</button>
                        </div>
                    <br>
                    </li>
                </ul>
                <div class="tianjia">
                    <button @click="ok">完成</button>
                </div>
            </div>
        </form>
    </div>
    </div>


</template>




<script>
import * as echarts from 'echarts';

// 绘制图表
export default {
    data() {
        return {
            newItem: '',
            sjs: [],
            // formError: false,
            items: [],
            // currentItem: {},
            labels: ["青草味", "水果味", "酸味", "烘焙味", "香料味", "坚果/可可味", "甜味", "余味", "香气", "醇厚度", "苦味"]
        };
    },

    methods: {
        // 加减方法
        subvalue(item) {
            console.log('items',this.items,item)
            const newValue = Math.max(item.value - 1, 0);
            console.log(newValue,'newValue')
            item.value = newValue;
            this.againrender();
        },
        addvalue(item) {
            const newValue = Math.min(item.value + 1, 10);
            item.value = newValue;
            this.againrender();
        },
        ok() {
            this.$router.push('/first');
        },
        renderchart(option) {
            this.myChart.setOption(option);  //渲染图表
        },
        againrender() {
            // 通过每项的selected属性来过滤选中的数据
            this.items = this.items.filter(v => v.selected == true)

            // 获取所有列表的所有的口味
            let labels = this.items.map(v => v.arr.map(vv => vv.label)).flat();

            // 对口味同名去重
            labels = Array.from(new Set(labels));

            //let定义的变量可以被修改,可以覆盖,const不可以,不能整体覆盖,可以覆盖其中的值

            // 初始化每个口味结构: 和为0, 平均值为0
            const avgs = labels.reduce((acc, cur) => {   //把多个值聚合为一个值
                acc[cur] = {
                    sum: 0,
                    avg: 0
                }
                return acc;
            }, {})

            // 循环所有选中的列表, 计算每个口味的和
            this.items.forEach(v => {
                v.arr.forEach(vv => {
                    avgs[vv.label].sum += parseInt(vv.value)
                })
            })

            // 对每个口味计算平均值 
            for (let k in avgs) {
                avgs[k].avg = avgs[k].sum / this.items.length
            }


            // 格式化图表需要的数据
            const indicator = Object.keys(avgs).map(v => ({   //.map将一个数组转化为另一个数组
                name: v, max: 10
            }))

            // 格式化图表需要的数据
            const value = indicator.map(v => {
                return avgs[v.name].avg    //avgs[v.name] 动态属性名 v代表数组的每一项
            })


            console.log('labels,', { labels, avgs, indicator })

            // 初始化图表实例对象
            this.myChart = echarts.init(this.$refs.radarChart);

            // 渲染图表
            this.renderchart({
                title: {
                    // text: '拼配图'
                },
                legend: {
                    data: ['效果展示', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    // ['苹果味','草莓味']
                    // indicator: [
                    //     { name: 'Sales', max: 6500 },
                    //     { name: 'Administration', max: 16000 },
                    //     { name: 'Information Technology', max: 30000 },
                    //     { name: 'Customer Support', max: 38000 },
                    //     { name: 'Development', max: 52000 },
                    //     { name: 'Marketing', max: 25000 }
                    // ]
                    indicator
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                // value: [4200, 3000, 20000, 35000, 50000, 18000],
                                value,
                                name: '效果展示'
                            },
                            // {
                            //     value: [5000, 14000, 28000, 26000, 42000, 21000],
                            //     name: 'Actual Spending'
                            // }
                        ]
                    }
                ]
            }


            )
        }
    },
    // 数据列表
    mounted() {
        this.labels = ["青草味", "水果味", "酸味", "烘焙味", "香料味", "坚果/可可味", "甜味", "余味", "香气", "醇厚度", "苦味"];
        //接收列表的数据
        this.items = (JSON.parse(localStorage.getItem('map')) || []);

            // 通过每项的selected属性来过滤选中的数据
            this.items = this.items.filter(v => v.selected == true)

            // 获取所有列表的所有的口味
            let labels = this.items.map(v => v.arr.map(vv => vv.label)).flat();

            // 对口味同名去重
            labels = Array.from(new Set(labels));

            //let定义的变量可以被修改,可以覆盖,const不可以,不能整体覆盖,可以覆盖其中的值

            // 初始化每个口味结构: 和为0, 平均值为0
            const avgs = labels.reduce((acc, cur) => {   //把多个值聚合为一个值
                acc[cur] = {
                    sum: 0,
                    avg: 0
                }
                return acc;
            }, {})

            // 循环所有选中的列表, 计算每个口味的和
            this.items.forEach(v => {
                v.arr.forEach(vv => {
                    avgs[vv.label].sum += parseInt(vv.value)
                })
            })

            // 对每个口味计算平均值 
            for (let k in avgs) {
                avgs[k].avg = avgs[k].sum / this.items.length
            }


            // 格式化图表需要的数据
            const indicator = Object.keys(avgs).map(v => ({   //.map将一个数组转化为另一个数组
                name: v, max: 10
            }))

            // 格式化图表需要的数据
            const value = indicator.map(v => {
                return avgs[v.name].avg    //avgs[v.name] 动态属性名 v代表数组的每一项
            })


            console.log('labels,', { labels, avgs, indicator })

            // 初始化图表实例对象
            this.myChart = echarts.init(this.$refs.radarChart);

            // 渲染图表
            this.renderchart({
                title: {
                    // text: '拼配图'
                },
                legend: {
                    data: ['效果展示', 'Actual Spending']
                },
                radar: {
                    // shape: 'circle',
                    // ['苹果味','草莓味']
                    // indicator: [
                    //     { name: 'Sales', max: 6500 },
                    //     { name: 'Administration', max: 16000 },
                    //     { name: 'Information Technology', max: 30000 },
                    //     { name: 'Customer Support', max: 38000 },
                    //     { name: 'Development', max: 52000 },
                    //     { name: 'Marketing', max: 25000 }
                    // ]
                    indicator
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                // value: [4200, 3000, 20000, 35000, 50000, 18000],
                                value,
                                name: '效果展示'
                            },
                            // {
                            //     value: [5000, 14000, 28000, 26000, 42000, 21000],
                            //     name: 'Actual Spending'
                            // }
                        ]
                    }
                ]
            }


            )
    }

}

</script>

<style scoped>
div.tianjia {
    display: inline;
    float: right;
}

.group {
    background-color: #f8f9fa;
    border-radius: 10px;
}

div p {
    text-align: center;
}

li {
    list-style: none;
    flex-basis: calc(40% - 10px);
    /* 每个 li 占用一半宽度，减去间距 */
    margin-bottom: 10px;
}

ul {
    display: flex;
    /* 使用 Flexbox 布局 */
    flex-wrap: wrap;
    /* 允许内容换行 */
    justify-content: space-between;
    /* 两端对齐 */
}
</style>
