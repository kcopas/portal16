'use strict';

require('./upload/dataRepositoryUpload.ctrl');
require('./about/dataRepositoryAbout.ctrl');
require('./upload/key/dataRepositoryKey.ctrl');
require('./dataPackage.resource');

var _ = require('lodash');

angular
    .module('portal')
    .controller('dataRepositoryCtrl', dataRepositoryCtrl);

/** @ngInject */
function dataRepositoryCtrl(User, $state, DataPackageSearch) {
    var vm = this;
    vm.$state = $state;
    vm.myUploads = false;
    vm.uploads;

    //get user from storage - if the user session has expired the backend will fail
    var user = User.userFromToken();
    vm.username = user ? user.userName : undefined;

    vm.search = function() {
        var apiQuery = {q: vm.q};
        if (vm.myUploads && vm.username) {
            apiQuery.user = vm.username;
        }
        vm.uploads = DataPackageSearch.query(apiQuery, function (res) {
            //console.log(res);
        }, function (err) {
            //console.log(err);
        });
    };
    vm.search();
}

module.exports = dataRepositoryCtrl;