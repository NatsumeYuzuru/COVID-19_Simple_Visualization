// 这里主要实现了地图呈现和当点击地图上省份时浮现悬浮窗口展示当前省份的疫情信息。
// map
function init(){
    // map center
    let center = [12308196.042592192, 2719935.2144997073];

    // get layers
    getBaseLayer();

    // create map object
    map = new ol.Map({
        //add layer
        layers:[vecLayer, vecZjLayer],
        // container
        target: 'map',
        view: new ol.View({
            // projection
            projection: ol.proj.get('EPSG:3857'),
            center: center,
            maxZoom: 16,
            minZoom: 2,
            zoom: 6
        })
    });

    // using geojson to bound the area
    var alayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            projection: 'EPSG:3857',
            url:"../data/china.json",
            format: new ol.format.GeoJSON()
        })
    });

    map.addLayer(alayer);

    // add singleclick
     // get container and other dom object
    let container = document.getElementById('popup');
    var closer = document.getElementById("popup-closer");
    var content = document.getElementById("popup-content");

    // create Overlay object
    let overlay = new ol.Overlay({
        element : container,
        autoPan: true

    });

    // add pop in map
    map.addOverlay(overlay);

    // when close pop
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    // add event
    map.on("singleclick", function(evt) {
        console.log(evt.coordinate);
        let coordinate = ol.proj.transform(
            evt.coordinate,
            "EPSG:3857",
            "EPSG:4326"
        );
        var feature1 = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        var feaName = feature1.get('name');
        var testname = feature1.get('en-name');
        // 点击尺 （这里是尺(米)，并不是经纬度）;
        let hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(evt.coordinate)); // 转换为经纬度显示
        // 注意这里的反引号``不是往常的引号
        $.ajax({
            url:`/getdata/${testname}`,
            type:'get',
            success:function(data){//这里考虑给一个链接转跳到图表的网页
                content.innerHTML=`
                <p>你点击了这里：</p>
                <p> ${feaName} </p>
                <p>当前累积确诊：${data['Confirmed']}</p>
                <p>当前累积死亡：${data['Deaths']}</p>
                <p>当前累计治愈：${data['Recovered']}</p>
                <a href="charts/${testname}">查看疫情变化图</a>
                <p>经纬度：<p><code> ${hdms}  </code> <p>
                <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`;
            }
        });
        overlay.setPosition(evt.coordinate); //把 overlay 显示到指定的 x,y坐标
    });


}

// create layers
function CreteTDTLayer(baseurl) {
    // init
    var layer = new ol.layer.Tile({
        // transp
        opacity: 1,
        // data
        source: new ol.source.XYZ({
            url: baseurl
        })
    })
    //返回layer
    return layer;
}


// load layers
function getBaseLayer(){
    // vector
    vecLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    // image
    imgLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    // ter
    terLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //vector zj
    vecZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //image zj
    imgZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //ter zj
    terZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    // layers list
    LayerArr = [vecLayer, imgLayer, terLayer, vecZjLayer, imgZjLayer, terZjLayer];
}
