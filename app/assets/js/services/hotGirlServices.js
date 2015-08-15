"use strict";

angular.module('myApp.services')

    .factory('HotGirlService', ['$http', 'avLog', 'ServerConfig',
        function($http, avLog, ServerConfig) {


            var logger = avLog.getLogger('HotGirlService');
            logger.debug('init HotGirlService');

            return {

                getList : function(success,error) {
                    var apiEndpoint = ServerConfig.endpoint + 'api/hotgirl/list';

                    return $http({
                        url: apiEndpoint,
                        method: 'GET',
                        data: ''

                    }).success(function(data, status, headers, config) {

                        logger.debug('suc response of getList');

                        logger.debug(data);

                        success(data, status, headers, config);

                    }).error(function(data, status, headers, config) {
                        logger.error('err response of getList');
                        error(data, status, headers, config)
                    });
                }

            };

        }
    ])
