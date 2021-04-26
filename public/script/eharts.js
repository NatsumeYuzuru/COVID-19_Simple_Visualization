
//这里我会要求返回省的en-name，将数据保存在一个id为data的div中，此div不显示。
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
        text: '新冠疫情病例变化图',
        subtitle:'数据来自Bing开源项目'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['累计确诊', '累计治愈', '累计死亡']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {onZero: false},
        data: data['x_out'].map(function (str) {
        str = str.replace('T', '\n');
        str = str.replace('Z', '')
        return str.replace(':00.000', '');
    })
    },
    yAxis: [
        {
            name: '累计确诊/治愈(人)',
            type: 'value',

        },
        {
            name: '累计死亡(人)',
            type: 'value',
    
        }
    ],
    series: [
        {
            name: '累计确诊',
            type: 'line',
            data: data['y1_out']
        },
        {
            name: '累计治愈',
            type: 'line',
            data: data['y2_out']
        },
        {
            name: '累计死亡',
            type: 'line',
            yAxisIndex:1,
            data: data['y3_out']
        }
    ]
}
myecharts.setOption(option);
    }
});