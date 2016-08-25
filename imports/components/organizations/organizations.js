import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './organizations.html';
import smartTabel from 'angular-smart-table';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
var self;
class OrganizationsCtrl {
    constructor($scope, $http) {
        $scope.viewModel(this);
        self = this;
        self.organizations = [];
        this.hideCompleted = false;
        this.helpers({
            currentUser() {
                return Meteor.user();
            },
            loadOrganizations() {
                Meteor.call("GetCampuses", function(error, data) {
                    if(data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.$apply(function () {
                                self.organizations.push(data[i]);
                            });
                        }
                    }
                });
            }
        });
    }
}

export default angular.module('organizations', [
        angularMeteor,
        'ngAnimate',
        smartTabel,
        uiRouter
    ])
    .component('organizations', {
        templateUrl: template,
        controller: ['$scope', '$http', OrganizationsCtrl]
    })
    .config(config);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/campuses');
}