
    function timeElapse(){
          var together = new Date();
                    together.setFullYear(2016,00,18);       //时间年月日
                    together.setHours(20);            //小时  
                    together.setMinutes(00);          //分钟
                    together.setSeconds(0);         //秒前一位
                    together.setMilliseconds(2);        //秒第二位
          var current = Date();
          var seconds = (Date.parse(current) - Date.parse(together)) / 1000;
          var days = Math.floor(seconds / (3600 * 24));
          seconds = seconds % (3600 * 24);
          var hours = Math.floor(seconds / 3600);
          if (hours < 10) {
            hours = "0" + hours;
          }
          seconds = seconds % 3600;
          var minutes = Math.floor(seconds / 60);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          seconds = seconds % 60;
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 小时 <span class=\"digit\">" + minutes + "</span> 分钟 <span class=\"digit\">" + seconds + "</span> 秒了！！"; 
          $("#clock").html(result);
          setTimeout(timeElapse,1000);
    }

            var callback = function () {
                    alert('finished or canceled');
                };

            document.addEventListener('deviceready', function () {
                if (device.platform == 'windows') {
                    window.alert = function (msg) {
                        new Windows.UI.Popups.MessageDialog(msg).showAsync();
                    };
                }
            }, false);
            openDraft = function () {
                cordova.plugins.email.open({
                    to: 'wuangyalin@gmail.com',
                    cc: [''],
                    bcc: [''],
                    subject: null,
                    body: getBody(),
                    isHTML: true
                }, callback);
            };


            getBody = function () {
                var body = [
                    '<style>',
                        '.ribbon p {',
                            'color: white;',
                            'font-family: Helvetica;',
                            'font-size: 17px;',
                            'font-weight: bold;',
                            'line-height: 60px;',
                            'text-align: center;',
                            'text-shadow: 0 2px 0 #83ac17;',
                            'width: 100%;',
                        '}',
                        '#ribbon {',
                            'top: 15px;',
                            'position: relative;',
                            'display: block;',
                            'margin: 0 auto;',
                            'height: 60px;',
                            'width: 250px;',
                            'background-color: #a5cc39;',
                        '}',
                        '.ribbon:before, .ribbon:after {',
                            'content: " ";',
                            'height: 0px;',
                            'position: absolute;',
                            'top:10px;',
                            'z-index: -1;',
                            'border-bottom: 30px solid #94bd28;',
                            'border-top: 30px solid #94bd28;',
                        '}',
                        '.ribbon:before {',
                            'border-left: 15px solid transparent;',
                            'border-right: 15px solid #94bd28;',
                            'left:-20px;',
                        '}',
                        '.ribbon:after {',
                            'border-left: 15px solid #94bd28;',
                            'border-right: 15px solid transparent;',
                            'right: -20px;',
                        '}',
                        '.sub-curls {',
                            'position: absolute;',
                            'bottom: -15px;',
                            'height: 15px;',
                            'width: 100%;',
                        '}',
                        '.sub-curls:before {',
                            'content: " ";',
                            'position: absolute;',
                            'left: 0;',
                            'border-left: 10px solid transparent;',
                            'border-top: 10px solid #729b06;',
                        '}',
                        '.sub-curls:after {',
                            'content: " ";',
                            'position: absolute;',
                            'right: 0;',
                            'border-right: 10px solid transparent;',
                            'border-top: 10px solid #729b06;',
                        '}',
                    '</style>',

                    '<div id="ribbon" class="ribbon">',
                        '<p>Simple Ribbon with CSS3</p>',
                        '<div class="sub-curls"></div>',
                    '</div>',
                ];

                return body;
            };