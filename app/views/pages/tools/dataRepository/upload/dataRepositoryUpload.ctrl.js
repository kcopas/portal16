'use strict';

var _ = require('lodash');

require('../markdownEditor.directive');

angular
    .module('portal')
    .controller('dataRepositoryUploadCtrl', dataRepositoryUploadCtrl);

/** @ngInject */
function dataRepositoryUploadCtrl(User, Upload, $timeout) {
    var vm = this;
    vm.config = {license: ['CC0_1_0', 'CC_BY_4_0', 'CC_BY_NC_4_0']};
    vm.form = {
        creators: [{}],
        license: vm.config.license[0]
    };
    vm.fileUrls = [{}];

    vm.addItemToArray = function (items) {
        items.push({});
    };
    vm.removeFromArray = function (item, items) {
        _.remove(items, function (n) {
            return n == item;
        });
    };

    vm.updateDescription = function(description){
        vm.form.description = description;
    };

    vm.countNonEmptyItems = function (items) {
        return _.filter(items, function(e){
            return e.val;
        }).length;
    };

    vm.upload = function () {
        var data_package = vm.form;
        var fileUrls = _.map(vm.fileUrls, function(e){
            return e.val;
        });
        vm.uploadProcess = Upload.upload({
            url: 'http://localhost:3002/upload',
            //url: 'http://api.gbif-dev.org/v1/data_packages/',
            headers: {'Authorization': 'Bearer ' + User.getAuthToken()}, // only for html5
            data: {data_package: JSON.stringify(data_package), file: vm.files, fileUrl: fileUrls},
            arrayKey: ''
        });

        vm.uploadProcess.then(function (response) {
            $timeout(function () {
                vm.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    //Load the current user and use to prefill the first creator
    var activeUser = User.loadActiveUser();
    if (activeUser) {
        activeUser.then(function (currentUser) {
            vm.profile = currentUser.data;
            vm.form.creators[0].name = vm.form.creators[0].name || vm.profile.firstName + ' ' + vm.profile.lastName;
        });
    }
}

module.exports = dataRepositoryUploadCtrl;