
//这里我会要求返回省的en-name，将数据保存在一个id为data的div中，此div不给显示。
var data = document.getElementById('data');
var get_loc = data.getAttribute("value");
var loc = `${get_loc}`;

$.ajax({
    url:`/chartsData/${loc}`,
    type:'get',
    success:function(data){
var myecharts=echarts.init(document.getElementById("main"));
var option = {
title: {
text: '累计治愈、累计确诊、累计死亡变化图',
subtext: '数据来自微软Bing/Covid 项目',
left: 'center',
align: 'right'
},
grid: {
bottom: 80
},
toolbox: {
feature: {
    dataZoom: {
        yAxisIndex: 'none'
    },
    restore: {},
    saveAsImage: {}
}
},
tooltip: {
trigger: 'axis',
axisPointer: {
    type: 'cross',
    animation: false,
    label: {
        backgroundColor: '#505765'
    }
}
},
legend: {
data: ['累计确诊', '累计治愈','累计死亡'],
left: 10
},
dataZoom: [
{
    show: true,
    realtime: true,
    start: 65,
    end: 85
},
{
    type: 'inside',
    realtime: true,
    start: 65,
    end: 85
}
],
xAxis: [
{
    type: 'category',
    boundaryGap: false,
    axisLine: {onZero: false},
    data: data['x_out'].map(function (str) {
        str = str.replace('T', '\n');
        str = str.replace('Z', '')
        return str.replace(':00.000', '');
    })
}
],
yAxis: [
{
    name: '累计确诊/治愈人数(人)',
    type: 'value',
    
}
],
series: [
{
    name: '累计确诊',
    type: 'line',
    areaStyle: {},
    lineStyle: {
        width: 1
    },
    emphasis: {
        focus: 'series'
    },
    data: data['y1_out']
},
{
    name: '累计治愈',
    type: 'line',
    yAxisIndex: 0,
    areaStyle: {},
    lineStyle: {
        width: 1
    },
    emphasis: {
        focus: 'series'
    },
    data: data['y2_out']
},
{
    name: '累计死亡',
    type: 'line',
    yAxisIndex: 0,
    areaStyle: {},
    lineStyle: {
        width: 1
    },
    emphasis: {
        focus: 'series'
    },
    data: data['y3_out']
}
]
};
myecharts.setOption(option);
    }
});