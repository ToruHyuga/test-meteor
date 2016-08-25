import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './organizationView.html';
import smartTabel from 'angular-smart-table';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
var self;
class OrganizationViewCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this);
        this.id = $stateParams.id;
        self = this;
        this.organization = {};
        this.devices = [];
        this.hideCompleted = false;
        this.helpers({
            currentUser() {
                return Meteor.user();
            },
            loadOrganization() {
                Meteor.call("GetOrganization", self.id, function(error, data) {
                    $scope.$apply(function () {
                        self.organization = data;
                    });
                });
            },
            loadDevices() {
                Meteor.call("GetDevices",self.id, function(error, data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        $scope.$apply(function () {
                            self.devices.push(data[i]);
                        });
                    }
                });
            }
        });
    }
}

export default angular.module('organizationView', [
    angularMeteor,
    'ngAnimate',
    smartTabel,
    uiRouter
])
    .component('organizationView', {
        templateUrl: template,
        controller: ['$scope', '$stateParams', OrganizationViewCtrl]
    })
    .config(config);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/campus/:id');
}