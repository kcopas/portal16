'use strict';

var angular = require('angular'),
    _ = require('lodash');

angular
    .module('portal')
    .controller('userProfileCtrl', userProfileCtrl);

/** @ngInject */
function userProfileCtrl($cookies, User, BUILD_VERSION, LOCALE, regexPatterns, $http, toastService,    $mdConstant) {
    var vm = this;
    vm.disableEditing = false;
    vm.emailPattern = regexPatterns.email;

    vm.getUser = function() {
        var activeUser = User.loadActiveUser();
        vm.profile = {};
        activeUser.then(function (response) {
            vm.profile = response.data;
            vm.original = JSON.parse(JSON.stringify(vm.profile));

            //read flash cookie and remove it
            var profileFlashInfo = $cookies.get('profileFlashInfo') || "{}";
            $cookies.remove('profileFlashInfo', {path: '/'});
            var profileInfo = JSON.parse(profileFlashInfo);
            vm.errorMessage = profileInfo.error;
            vm.provider = profileInfo.authProvider;
        }, function () {
            vm.loadingActiveUserFailed = true;
            //TODO handle errors - log out or inform user that the user cannot be loaded
        });
    };
    vm.getUser();

    //TODO this country selector is useds again and again - it should be refactored to be reusable code
    vm.getSuggestions = function () {
        //get list of countries
        var countryList = $http.get('/api/country/suggest.json?lang=' + LOCALE + '&v=' + BUILD_VERSION);//TODO needs localization of suggestions
        countryList.then(function (response) {
            vm.searchSuggestions = response.data;
        });
    };

    vm.typeaheadSelect = function (item) { //  model, label, event
        if (angular.isUndefined(item) || angular.isUndefined(item.key)) return;
        vm.countryCode = item.key;
    };

    vm.formatTypehead = function(searchSuggestions, isoCode){
        var o = _.find(searchSuggestions, {key:isoCode});
        return (o ? o.title || o.key : isoCode);
    };

    vm.getSuggestions();

    vm.editModeChanged = function(){
        if (!vm.inEditMode) {
            vm.profile = JSON.parse(JSON.stringify(vm.original));
            vm.repeatedPassword = vm.newPassword = vm.oldPassword = undefined;
        }
    };

    vm.updateProfile = function(){
        if (vm.profileForm.$valid) {
            vm.profileFormInvalid = false;
            User.update(vm.profile)
                .then(function(){
                    toastService.info({
                        message: "Your profile has been updated"
                    });
                    vm.original = JSON.parse(JSON.stringify(vm.profile));
                    vm.inEditMode = false;
                    vm.editModeChanged();
                })
                .catch(function(err){
                    if (err.status === 401) {
                        User.logout();
                    } else {
                        toastService.error({
                            message: "We couldn't update your profile at this time. Please tell us if this continues",
                            feedback: true
                        });
                    }
                });
        } else {
            vm.profileFormInvalid = true;
        }
    };

    vm.changePassword = function(){
        var identicalPasswords = vm.repeatedPassword === vm.newPassword;
        if (vm.passwordForm.$valid && identicalPasswords) {
            vm.passwordFormInvalid = false;
            User.changePassword(vm.profile.userName, vm.oldPassword, vm.newPassword)
                .then(function(){
                    toastService.info({
                        message: "Your password have been updated"
                    });
                    vm.original = JSON.parse(JSON.stringify(vm.profile));
                    vm.inEditMode = false;
                    vm.editModeChanged();
                })
                .catch(function(err){
                    if (err.status === 401) {
                        toastService.error({
                            message: "Invalid password - if you have forgotten your password, then log out and use the password reset",
                            feedback: true
                        });
                    } else {
                        toastService.error({
                            message: "We couldn't update your password at this time",
                            feedback: true
                        });
                    }
                });
        } else {
            vm.passwordFormInvalid = true;
        }
    };

    ///TEST
    vm.labels3 = ["Offline", "Online & Stable", "Online but unstable"];
    vm.data3 = [1, 7, 2];

    vm.labels2 = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
    vm.series2 = ['published datasets'];

    vm.data2 = [
        [7, 5, 1, 3, 0, 0, 1, 0, 0]
    ];

    vm.colors0 = ['#ff6347', '#61a861', '#ffc247'];
    vm.colors2 = {
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,0.8)'
    };
    vm.colors1 = [
        {
            backgroundColor: '#A2DED0',
            borderColor: '#A2DED0',
            hoverBackgroundColor: '#A2DED0',
            hoverBorderColor: '#A2DED0'
        },
        {
            backgroundColor: '#65C6BB',
            borderColor: '#65C6BB',
            hoverBackgroundColor: '#65C6BB',
            hoverBorderColor: '#65C6BB'
        },
        {
            backgroundColor: '#1BBC9B',
            borderColor: '#1BBC9B',
            hoverBackgroundColor: '#1BBC9B',
            hoverBorderColor: '#1BBC9B'
        }
    ];
    vm.datasetOverride = [
        {
            borderWidth:0
        }];
    vm.options2 = {
        responsive: true,
        maintainAspectRatio: false,
        scaleGridLineWidth: 1,
        scaleFontSize: 10,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        scaleBeginAtZero: true,
        borderWidth: 0,
        tooltips: {
            yAlign: 'bottom'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero:true
                },
                gridLines: {
                    display: false
                }
            }]
        }
    };

    vm.options3 = {
        responsive: true,
        maintainAspectRatio: false
    };

    vm.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
    vm.recorderNames = ['mhofft','morten høfft', 'mortenhofft', 'mhoefft'];
    //TEST END
}

module.exports = userProfileCtrl;
