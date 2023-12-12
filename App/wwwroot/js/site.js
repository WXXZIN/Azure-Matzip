// site.js

(function(locModule, mapModule, polygonsModule, markersModule, listModule) {
    locModule.getLocation(function(address) {
        markersModule.displayMarkers(address);
        markersModule.updateMarkersEvent();
    });

    $.getJSON("[Function App Link]", function (geojson) {
        var data = geojson.features;

        data.forEach(function(val) {
            var coordinates = val.geometry.coordinates[0];
            var name = val.properties.SIG_KOR_NM;

            polygonsModule.displayArea(coordinates, name);
        });
    });

    // 마커와 다각형 이벤트 핸들러 추가
    kakao.maps.event.addListener(mapModule.map, 'zoom_changed', function() {
        markersModule.updateMarkersEvent();
        markersModule.updateOverlaysEvent();
        polygonsModule.updatePolygonsAndEvents();
        listModule.displayMarkerInfo();
    });

    kakao.maps.event.addListener(mapModule.map, 'dragend', function() {
        listModule.displayMarkerInfo();
    });

})(locModule, mapModule, polygonsModule, markersModule, listModule);