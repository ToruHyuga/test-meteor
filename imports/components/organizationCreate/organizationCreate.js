import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './organizationCreate.html';
import smartTabel from 'angular-smart-table';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
var self;
var scope;
class OrganizationCreateCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        self = this;
        scope = $scope;
        $scope.organization = {};
        this.hideCompleted = false;
        this.helpers({
            currentUser() {
                return Meteor.user();
            }
        });
    }
    create() {
        Meteor.call("CreateOrganization",scope.organization, function(error, data) {});
    }
}

export default angular.module('organizationCreate', [
    angularMeteor,
    'ngAnimate',
    smartTabel,
    uiRouter
])
    .component('organizationCreate', {
        templateUrl: template,
        controller: ['$scope', OrganizationCreateCtrl]
    })
    .config(config);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/add');
}