'use strict';
var angular = require('angular'),
    SimpleMDE = require('simplemde'),
    _ = require('lodash');

console.log('markdownEditor file');
angular
    .module('portal')
    .directive('markdownEditor', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                console.log('markdownEditor link');
                var simplemde = new SimpleMDE({ element: element[0] });
            }
        };
    });
