// locModule.js

var locModule = (function() {
    var address = '';

    function getLocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude; // 위도
                const lon = position.coords.longitude; // 경도
    
                const geocoder = new kakao.maps.services.Geocoder();
    
                geocoder.coord2Address(lon, lat, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        address = result[0].address.address_name;
                        alert('현재 위치 정보를 갱신하였습니다!');
                        callback(address);
                    } else {
                        alert('위치 정보 처리가 실패했습니다.');
                    }
                });
            }, function(error) {
                // 위치 정보 요청 거부 시 처리
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('위치 정보 제공을 거부하셨습니다. 기본 위치를 사용합니다.');
                        callback('기본 위치'); // 기본 위치를 지정하거나 다른 처리를 할 수 있습니다.
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('위치 정보를 사용할 수 없습니다.');
                        callback('위치 정보 불가'); // 위치 정보가 없는 경우 처리
                        break;
                    case error.TIMEOUT:
                        alert('위치 정보를 얻는 데 시간이 초과되었습니다.');
                        callback('타임아웃'); // 타임아웃 처리
                        break;
                    default:
                        alert('위치 정보 요청 중 오류가 발생했습니다.');
                        callback('오류 발생');
                        break;
                }
            });
        } else {
            alert('현재 브라우저에서는 위치 정보를 사용할 수 없습니다.');
            callback('브라우저 미지원');
        }
    }

    return {
        getLocation: getLocation
    }
})();