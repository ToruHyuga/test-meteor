import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './organizationEdit.html';
import smartTabel from 'angular-smart-table';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
var self;
var scope;
class OrganizationEditCtrl {
    constructor($scope, $stateParams) {
        $scope.viewModel(this);
        self = this;
        scope = $scope;
        this.id = $stateParams.id;
        $scope.organization = {};
        this.hideCompleted = false;
        this.helpers({
            currentUser() {
                return Meteor.user();
            },
            loadOrganization() {
                Meteor.call("GetOrganization", self.id, function(error, data) {
                    $scope.$apply(function () {
                        console.log(data);
                        scope.organization = data;
                    });
                });
            }
        });
    }
    save() {
        Meteor.call("EditOrganization", self.id, scope.organization, function(error, data) {});
    }
}

export default angular.module('organizationEdit', [
    angularMeteor,
    'ngAnimate',
    smartTabel,
    uiRouter
])
    .component('organizationEdit', {
        templateUrl: template,
        controller: ['$scope', '$stateParams', OrganizationEditCtrl]
    })
    .config(config);

function config($locationProvider, $urlRouterProvider) {
    'ngInject';
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/campuses/:id/edit');
}