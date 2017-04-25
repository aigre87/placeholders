function propertyDetMap(){
    if( $("#propertyDetailMap").length == 0 ){ return false;  }
    var propertyDetailMap,
        latlng = $(".propertyDetailMap-wrapper").attr("data-latlng"),
        point_lon = latlng.split(',')[0].trim(),
        point_lat = latlng.split(',')[1].trim(),
        point_name = $(".propertyDetailMap-wrapper").attr("data-name");
    ymaps.ready(init);
    function init () {
        propertyDetailMap = new ymaps.Map("propertyDetailMap", {
                center: [point_lat, point_lon],
                zoom: 16,
                controls: []
            }/*, {
                searchControlProvider: 'yandex#search'
            }*/);

        /* Custom zoom control buttons*/
        propertyDetailMap.behaviors.disable('scrollZoom');
        // Создадим пользовательский макет ползунка масштаба.
        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>\
                <div id='obgDet-yaPanorama' class='btn'><i class='icon-panorama'></i></div>\
                <div id='obgDet-zoom-in' class='btn'><i class='icon-plus'></i>\
                </div><div id='obgDet-zoom-out' class='btn'><i class='icon-minus'></i></div>\
            </div>", {

            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function () {
                // Вызываем родительский метод build.
                ZoomLayout.superclass.build.call(this);

                // Привязываем функции-обработчики к контексту и сохраняем ссылки
                // на них, чтобы потом отписаться от событий.
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                // Начинаем слушать клики на кнопках макета.
                $('#obgDet-zoom-in').bind('click', this.zoomInCallback);
                $('#obgDet-zoom-out').bind('click', this.zoomOutCallback);
                $('#obgDet-yaPanorama').on('click', function(){
                    $("#propertyDetailPanorama").css({"z-index": 1});
                    $("#propertyDetailMap").css({"z-index": 0});
                    $(".propertyDetailPanorama-back").show();
                });
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#obgDet-zoom-in').unbind('click', this.zoomInCallback);
                $('#obgDet-zoom-out').unbind('click', this.zoomOutCallback);

                // Вызываем родительский метод clear.
                ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function () {
                var map = this.getData().control.getMap();
                // Генерируем событие, в ответ на которое
                // элемент управления изменит коэффициент масштабирования карты.
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() + 1
                });
                if(  map.getZoom() < 15  ){

                }
            },

            zoomOut: function () {
                var map = this.getData().control.getMap();
                this.events.fire('zoomchange', {
                    oldZoom: map.getZoom(),
                    newZoom: map.getZoom() - 1
                });
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout } });
        /*END CUSTOM ZOOM CONTROL BUTTONS*/

        // Создаем геообъект с типом геометрии "Точка".
            myGeoObject = new ymaps.GeoObject({
            });

            propertyDetailMap.geoObjects.add(new ymaps.Placemark([point_lat, point_lon], {
                iconCaption: point_name
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '270'
            }));

        /* add custom zoom buttons*/
        propertyDetailMap.controls.add(zoomControl, {
            float: 'none',
            position: {
                right: 12,
                bottom: 33
            }
        });
        /* add custom zoom buttons END*/

        /*PANORAMS*/
        if (ymaps.panorama.isSupported()) {
            // Ищем панораму в переданной точке.
            console.log(point_lat);
            console.log(point_lon);

            ymaps.panorama.locate([point_lat, point_lon]).done(
                function (panoramas) {
                    // Убеждаемся, что найдена хотя бы одна панорама.
                    if (panoramas.length > 0) {
                        // Создаем плеер с одной из полученных панорам.
                        var player = new ymaps.panorama.Player(
                            'propertyDetailPanorama',
                            // Панорамы в ответе отсортированы по расстоянию
                            // от переданной в panorama.locate точки. Выбираем первую,
                            // она будет ближайшей.
                            panoramas[0],
                            // Зададим направление взгляда, отличное от значения
                            // по умолчанию.
                            { 
                                direction: [100, 20],
                                //zoom: 1,
                                suppressMapOpenBlock: true,
                                controls: ['zoomControl']
                            }
                        );
                    }else{
                        $(".propertyDetailMap-wrapper").addClass("panoramaNotFound");
                    }
                },
                function (error) {
                    // Если что-то пошло не так, сообщим об этом пользователю.
                    alert(error.message);
                }
            );
        }
        /*END PANORAMS*/


        $(window).smartresize(function(){
            propertyDetailMap.container.fitToViewport();
        });
        if (!ymaps.panorama.isSupported()) {
            $("body").addClass("yaMapPanoramaNotSup");
        }
    }/*end init*/


    $("body").on("click", ".propertyDetailMap-wrapper .changeSize", function(){
        if( $(".propertyDetailMap-wrapper").hasClass("full") ){
            $(".changeSize span").text("Развернуть");
            $(".propertyDetailBlock .mainCol>.rc").prepend( $(".propertyDetailMap-wrapper") );
            $(".propertyDetailMap-wrapper").removeClass("full");
        }else{
            $(".changeSize span").text("Свернуть");
            $(".propertyDetailBlock").prepend( $(".propertyDetailMap-wrapper") );
            $(".propertyDetailMap-wrapper").addClass("full");
        }
        propertyDetailMap.container.fitToViewport();
    });
    $('.propertyDetailPanorama-back').on('click', function(){
        $("#propertyDetailPanorama").css({"z-index": 0});
        $("#propertyDetailMap").css({"z-index": 1});
        $(".propertyDetailPanorama-back").hide();
    });
}