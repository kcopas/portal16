'use strict';

var _ = require('lodash');

require('../markdownEditor.directive');

angular
    .module('portal')
    .controller('dataRepositoryUploadCtrl', dataRepositoryUploadCtrl);

/** @ngInject */
function dataRepositoryUploadCtrl(User, $http, Upload, $timeout) {
    var vm = this;
    vm.form = {
        creators: [{}]
    };

    vm.addCreator = function(){
        vm.form.creators.push({});
    };
    vm.removeFromArray = function(item, items){
        _.remove(items, function(n) {
            return n == item;
        });
    };
    //
    //vm.createMetadataAndUpload = function() {
    //    $http.post('/api/datarepo/metadata', {title: 'nmy title', description: 'my long elaborate description'})
    //        .then(function(resData){
    //            var metadata = new Blob([resData], {type: 'text/xml'});
    //            var metadataFile = new File([metadata], "metadata");
    //            upload(metadataFile);
    //        })
    //        .catch(function(err){
    //            console.log(err);
    //        });
    //};

    vm.upload = function() {
        var files = vm.allfiles;
        var fileUrl = ['http://aaa.aa', 'http://bbb.bb'];
        fileUrl = undefined;
        var data_package = vm.form;

        vm.testUpload = Upload.upload({
            //url: 'http://localhost:3002/upload',
            url: 'http://api.gbif-dev.org/v1/data_packages/',
            headers: {'Authorization': 'Bearer ' + User.getAuthToken()}, // only for html5
            data: {data_package: JSON.stringify(data_package), file: files, fileUrl: fileUrl},
            arrayKey: ''
        });

        vm.testUpload.then(function (response) {
            $timeout(function () {
                vm.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            vm.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log(vm.progress);
        });
    };

    //Load the current user and use to prefill the first creator
    var activeUser = User.loadActiveUser();
    if (activeUser) {
        activeUser.then(function(currentUser){
            vm.profile = currentUser.data;
            vm.form.creators[0].name = vm.form.creators[0].name || vm.profile.firstName + ' ' + vm.profile.lastName;
        });
    }
}

module.exports = dataRepositoryUploadCtrl;

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

var testxml = '<resource xmlns="http://datacite.org/schema/kernel-3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://datacite.org/schema/kernel-3 http://schema.datacite.org/meta/kernel-3/metadata.xsd"> <identifier identifierType="DOI">10.5072/D3P26Q35R-Test</identifier> <creators> <creator> <creatorName>Fosmire, Michael</creatorName> </creator> <creator> <creatorName>Wertz, Ruth</creatorName> </creator> <creator> <creatorName>Purzer, Senay</creatorName> </creator> </creators> <titles> <title>Critical Engineering Literacy Test (CELT)</title> </titles> <publisher>Purdue University Research Repository (PURR)</publisher> <publicationYear>2013</publicationYear> <subjects> <subject>Assessment</subject> <subject>Information Literacy</subject> <subject>Engineering</subject> <subject>Undergraduate Students</subject> <subject>CELT</subject> <subject>Purdue University</subject> </subjects> <language>eng</language> <resourceType resourceTypeGeneral="Dataset">Dataset</resourceType> <version>1</version> <descriptions> <description descriptionType="Abstract"> We developed an instrument, Critical Engineering Literacy Test (CELT), which is a multiple choice instrument designed to measure undergraduate students’ scientific and information literacy skills. It requires students to first read a technical memo and, based on the memo’s arguments, answer eight multiple choice and six open-ended response questions. We collected data from 143 first-year engineering students and conducted an item analysis. The KR-20 reliability of the instrument was .39. Item difficulties ranged between .17 to .83. The results indicate low reliability index but acceptable levels of item difficulties and item discrimination indices. Students were most challenged when answering items measuring scientific and mathematical literacy (i.e., identifying incorrect information). </description> </descriptions> </resource>';