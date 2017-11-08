'use strict';

angular
    .module('portal')
    .controller('dataRepositoryKeyCtrl', dataRepositoryKeyCtrl);

/** @ngInject */
function dataRepositoryKeyCtrl($stateParams, DataPackage, ResourceSearch) {
    var vm = this;
    vm.doi = $stateParams.key;
    vm.citations = ResourceSearch.query({q: '"' + vm.doi + '"', limit: 0});

    DataPackage.get({doi: vm.doi}, function(data){
        vm.upload = data;
    }, function(err){
        console.log(err);
    });
    console.log(vm.doi);

    vm.guessFileName = function(pathName){
        return pathName.split('/').pop();
    };
}

module.exports = dataRepositoryKeyCtrl;
