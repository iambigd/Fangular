angular.module('myApp.directives')

//自定密碼規則
.directive('validPassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl, ngModel) {

            var validator = function(value) {
                // console.log('validator: ' + value);
                if (value != '' && typeof(value) != 'undefined') {
                    var re = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
                   if (re.test(value)) {
                        ctrl.$setValidity('validpassword', true);
                        // console.log('pass');
                    } else {

                        ctrl.$setValidity('validpassword', false);

                    }
                    return value;
                }else{
                   ctrl.$setValidity('validpassword', true);
                }
            };

            //驗證規則的順序
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
        }
    };
})

//整數或小數點第一位
.directive('validFloat', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl, ngModel) {

            var validator = function(value) {
                // console.log('validator: ' + value);
                if (value != '' && typeof(value) != 'undefined') {
                    var re = /^-?(?:\d+|\d*\.\d+)$/;
                   if (re.test(value)) {
                        ctrl.$setValidity('validfloat', true);
                        // console.log('pass');
                    } else {
                        ctrl.$setValidity('validfloat', false);
                    }
                    return value;
                }else{
                   ctrl.$setValidity('validfloat', true);
                }
            };

            //驗證規則的順序
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
        }
    };
})


//偵測電話
.directive('validPhone', function() {

    return {
        require: 'ngModel',
        scope: {
            onDetectInvalidText: '&'
        },
        link: function(scope, elm, attrs, ctrl, ngModel) {

            var validator = function(value) {
                // console.log('validator: ' + value);
                if (value != '' && typeof(value) != 'undefined') {



                    var re = /^[\d\-\s\#]{9,20}$/g;

                    if (re.test(value)) {
                        ctrl.$setValidity('validphone', true);
                        // console.log('pass');
                    } else {
                        ctrl.$setValidity('validphone', false);
                    }
                    return value;
                }
            };

            //驗證規則的順序
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
        }
    };
})

//偵測特殊符號(並顯示不合法字元)
.directive('validText', function() {

    return {
        require: 'ngModel',
        scope: {
            onDetectInvalidText: '&'
        },
        link: function(scope, elm, attrs, ctrl, ngModel) {

            var validator = function(value) {
                // console.log('validator: ' + value);
                if (value != '' && typeof(value) != 'undefined') {


                    // var re = /^[a-zA-Z0-9\:\-\~\，\。\！\!\.\,\_\、\『\』\「\」\s\u4e00-\u9fa5]+$/g;
                    // var re = /^[a-zA-Z0-9『』「」；，。＜＞《》～！？※％＆（）〔〕【】．：Ｔ\／－、\/\s\d\!\?\.\u4e00-\u9fa5]+$/g;

                    var re = /^[_a-zA-Z0-9\-『』「」；，。＜＞《》～！？※％＆（）\(\)〔〕【】‧．：Ｔ\／－、\'\/\s\d\!\?\.\u4e00-\u9fa5]+$/g;

                    if (re.test(value)) {
                        ctrl.$setValidity('validtext', true);
                        // console.log('pass');
                    } else {

                        ctrl.$setValidity('validtext', false);
                        // console.log('no pass');

                        var strLen = value.length;
                        var i = 0;
                        var invalidStr = null;
                        for (i = 0; i < strLen; i++) {
                            var currStr = value.substr(i, 1);
                            // $.console("curr str:" + currStr);
                            //不要加global搜尋，會異常
                            var validStr = /^[_a-zA-Z0-9\-『』「」；，。＜＞《》～！？※％＆（）\(\)〔〕【】‧．：Ｔ\／－、\'\/\s\d\!\?\.\u4e00-\u9fa5]+$/.test(currStr);

                            // $.console("curr str is valid:" + validStr);
                            if (!validStr) {
                                // $.console("invalid str:" + currStr);
                                if (invalidStr == null) {
                                    invalidStr = currStr;
                                } else {
                                    if (invalidStr.indexOf(currStr) < 0) {
                                        invalidStr += " " + currStr;
                                    }
                                }
                            }
                        }

                        scope.onDetectInvalidText({
                            invalidText: invalidStr
                        });
                    }
                    return value;
                }
            };

            //驗證規則的順序
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.unshift(validator);
        }
    };
})
;