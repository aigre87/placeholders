function contactsMap(){
    var $page = $("#contactsMapPage");
    if( $page.length == 0 ){return false}
    var myContactsMap;
    ymaps.ready(init);
    function init(){
        myContactsMap = new ymaps.Map('contactsMap', {
            center: [55.768598, 37.586919],
            zoom: 16,
            controls: []
        });
        /* Custom zoom control buttons*/
        myContactsMap.behaviors.disable('scrollZoom');
        // Создадим пользовательский макет ползунка масштаба.
        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>\
                <div id='yaPanorama' class='btn'><i class='icon-panorama'></i></div>\
                <div id='zoom-in' class='btn'><i class='icon-plus'></i>\
                </div><div id='zoom-out' class='btn'><i class='icon-minus'></i></div>\
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
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
                $('#yaPanorama').on('click', function(){
                    $(".contactsMapPanorama-wrapper").css({"z-index": 1});
                    $("#contactsMap").css({"z-index": 0});
                });
            },

            clear: function () {
                // Снимаем обработчики кликов.
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

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

        /*лайаут балуна*/
        var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="parkingBallon">\
                    <div class="baloonContent">$[[options.contentLayout]]</div>\
                    <div class="closeBut"></div>\
                    <div class="bottomHelper"><div class="arrow"></div><div class="circle"></div></div>\
                </div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.parkingBallon', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.closeBut')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.closeBut')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.bottomHelper')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.bottomHelper')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.bottomHelper')[0];
                }
            }),

    // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="name">$[properties.balloonName]</div>\
                        <div class="time">$[properties.balloonTime]</div>\
                        <div class="options">$[properties.balloonOptions]</div>'
        );

        /*КОНЕЦ ЛАЙАУТ БАЛУНА*/
        /*парковки*/



        myParkingPinCollection = new ymaps.GeoObjectCollection();
        var parkingPins = {
            "1": {
                "coordinates" : [55.768151, 37.588764],
                "name"        : "Парковка №3203 (120)",
                "time"        : "Круглосуточная",
                "options"     : "•  60 руб./час<br />•  10 мест (2 для инвалидов)"
            },
            "2": {
                "coordinates" : [55.768707, 37.589923],
                "name"        : "Парковка №3203 (120)",
                "time"        : "Круглосуточная",
                "options"     : "•  60 руб./час<br />•  10 мест (2 для инвалидов)"
            }
        };

        for(var el in parkingPins) {
            var myPlacemark = new ymaps.Placemark([ parkingPins[el]['coordinates'][0] , parkingPins[el]['coordinates'][1] ], { // Создаем метку с такими координатами и суем в переменную
                    balloonName: parkingPins[el]['name'],
                    balloonTime: parkingPins[el]['time'],
                    balloonOptions: parkingPins[el]['options']
                }, {
                iconLayout: 'default#image',
                iconImageHref: '/cwrussia-theme/images/yaMap-parking.png?v2', // картинка иконки
                iconImageSize: [26, 32], // размер иконки
                iconImageOffset: [-13, -32], // позиция иконки

                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0
                // Не скрываем иконку при открытом балуне.
                // hideIconOnBalloonOpen: false,
                // И дополнительно смещаем балун, для открытия над иконкой.
                // balloonOffset: [3, -40]
            });
            /* Добавляем */
            myParkingPinCollection.add(myPlacemark);
        }
        /*PANORAMS*/
        if (ymaps.panorama.isSupported()) {
            // Ищем панораму в переданной точке.
            ymaps.panorama.locate([55.768738, 37.589728]).done(
                function (panoramas) {
                    // Убеждаемся, что найдена хотя бы одна панорама.
                    if (panoramas.length > 0) {
                        // Создаем плеер с одной из полученных панорам.
                        var player = new ymaps.panorama.Player(
                                'contactsMapPanorama',
                                // Панорамы в ответе отсортированы по расстоянию
                                // от переданной в panorama.locate точки. Выбираем первую,
                                // она будет ближайшей.
                                panoramas[0],
                                // Зададим направление взгляда, отличное от значения
                                // по умолчанию.
                                { 
                                    direction: [115, 20],
                                    //zoom: 1,
                                    suppressMapOpenBlock: true,
                                    controls: ['zoomControl']
                                }
                            );

                    }
                },
                function (error) {
                    // Если что-то пошло не так, сообщим об этом пользователю.
                    alert(error.message);
                }
            );
        }
        /*END PANORAMS*/
        $("body").on("click", ".ballon .closeBut", function(){
            myContactsMap.balloon.close();
        });
        
        /* Фикс кривого выравнивания кастомных балунов */
        myContactsMap.geoObjects.events.add([
            'balloonopen'
        ], function (e) {
            var geoObject = e.get('target');
            myContactsMap.panTo(geoObject.geometry.getCoordinates(), {
                delay: 0
            });
            //$(".ballon").css({ "margin-top" : -$(".ballon").outerHeight()/2 });
        });
        $(window).on('resize', function() {
            setTimeout(function(){
                myContactsMap.container.fitToViewport();
            }, 500);
            
        });

        /*основной пин*/
        var main = new ymaps.Placemark([55.768488, 37.590474], {
            hasBalloon: false,
            //balloonContent: 'цвет <strong>голубой</strong>',
            iconCaption: 'Дукат плейс III'
          }, {
              preset: 'islands#blueCircleDotIconWithCaption',
              //iconCaptionMaxWidth: '200'
          });

        /*Линия*/
        // Создаем ломаную линию.
        var polyline = new ymaps.Polyline([
            [55.769411, 37.596591], [55.768976, 37.595819], [55.769623, 37.594714], [55.769164, 37.593737], [55.770040, 37.592246], [55.768716, 37.589832]
        ], {
            hintContent: "Путь от метро"
        }, {
            draggable: false,
            strokeColor: '#e4002b',
            strokeWidth: 4,
            opacity: 0.6,
            // Первой цифрой задаем длину штриха. Второй цифрой задаем длину разрыва.
            strokeStyle: '1 0'
        });

        // Устанавливаем карте границы линии.
        //myContactsMap.setBounds(polyline.geometry.getBounds());

        // добавляем обьекты на карту
        myContactsMap.geoObjects
            .add(myParkingPinCollection)
            .add(polyline)
            .add(main);

        /* add custom zoom buttons*/
        myContactsMap.controls.add(zoomControl, {
            float: 'none',
            position: {
                right: 16,
                bottom: 44
            }
        });
        /**/
        myContactsMap.events.add('boundschange', function (e) {
            if ( (e.get('newZoom') != e.get('oldZoom')) && e.get('newZoom') < 16  ){
                myParkingPinCollection.options.set('visible', false);
            }else if( (e.get('newZoom') != e.get('oldZoom')) && e.get('newZoom') >= 16 ){
                myParkingPinCollection.options.set('visible', true);
            }
            main.options.set('visible', true);
        });
        $(window).smartresize(function(){
            myContactsMap.container.fitToViewport();
        });
        if (!ymaps.panorama.isSupported()) {
            $("body").addClass("yaMapPanoramaNotSup");
        }
    }/*END INIT*/

    var $panel = $("#contactsMapPage .sidePanel"),
        $panelIW = $("#contactsMapPage .sidePanel>.iw"),
        $panelButton = $panel.find(".switchButton");

    function setPanelMaxH(){
        $panel.add($panelIW).css({"max-height": "", "height": "" });
        var panelOffsetBottom = 45,
            pageH = $page.outerHeight(),
            panelOffsetTop = parseInt( $panel.css("top") ),
            panelH = $panel.outerHeight();
        if( panelH + panelOffsetTop + panelOffsetBottom > pageH ){
            $panel.add($panelIW).css({"max-height": pageH-panelOffsetBottom-panelOffsetTop, "height": pageH-panelOffsetBottom-panelOffsetTop });
            //$panelIW.css({"overflow-y": "scroll"});
        }else{

        }
    }
    setPanelMaxH();
    $(window).smartresize(function(){
        setPanelMaxH();
    });

    function sidePanelSlide(){
        TweenMax.set($panel, { x : 0 });
        $panelButton.on("click", function(){
            if( $panel.hasClass("slideLeft") ){
                TweenMax.to($panel, .25, { x : 0 })
                $panel.removeClass("slideLeft");
            }else{
                TweenMax.to($panel, .25, { x : -480 })
                $panel.addClass("slideLeft");
            }
        });

        var panelX;
        var IWW, margin;
        var mc = new Hammer( $panel[0] , {
          domEvents: true
        });

        var maxX = 0,
            minX = -480,
            delta,
            speed,
            dir;

        mc.on( "panstart", function( e ) {
            panelX = parseInt($panel[0]._gsTransform.x.toFixed(0));
        });

        mc.on( "pan", function( e ) {
            //console.log("pan");
            delta = panelX + e.deltaX;
            speed = e.overallVelocityX;
            if( e.direction == 4 ){
                dir = "right";
            }else if( e.direction == 2 ){ 
                dir = "left";
            }

            if ( delta > minX && delta < maxX ) {
                TweenMax.to($panel, 0.1, { x : delta });
            }else if( delta >= maxX ){
                TweenMax.to($panel, 0.1, { x : maxX });
                $panel.removeClass("slideLeft");
            }else if( delta <= minX ){
                TweenMax.to($panel, 0.1, { x : minX });
                $panel.addClass("slideLeft");
            }
        });
        mc.on( "panend", function( e ) {
            // console.log("panend");
            // console.log(delta);
            // console.log(speed);
            if ( delta > minX && delta < maxX ) {
                if( speed > 1.2 || speed < -1.2 ){
                    if( dir == "right" ){
                        TweenMax.to($panel, .2, { x : maxX });
                        $panel.removeClass("slideLeft");
                    }else{
                        TweenMax.to($panel, .2, { x : minX });
                        $panel.addClass("slideLeft");
                    }                    
                }else{
                    if( delta > minX/2 ){
                        TweenMax.to($panel, .2, { x : maxX });
                        $panel.removeClass("slideLeft");
                    }else{
                        TweenMax.to($panel, .2, { x : minX });
                        $panel.addClass("slideLeft");
                    }
                }
            }
        });
    }
    sidePanelSlide();

    $(".mapLink").on("click", function(){
        var $this = $(this);
        globalPopup($this, $("#contactsMapPage"), "fullScreenPopup yaMap",
            function(){
                myContactsMap.container.fitToViewport();
                setPanelMaxH();
                $panelIW.addClass("scrollbar-cwrussia");
                $panelIW.scrollbar();
            }
        );
    });
    $('.contactsMapPanorama-back').on('click', function(){
        $("#contactsMapPanorama").css({"z-index": 0});
        $("#contactsMap").css({"z-index": 1});
    });
};