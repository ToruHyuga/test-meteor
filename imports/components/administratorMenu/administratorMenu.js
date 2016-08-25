import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './administratorMenu.html';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
class AdministratorMenuCtrl {
    constructor($scope) {
        $scope.viewModel(this);
        this.hideCompleted = false;
        this.helpers({
            currentUser() {
                return Meteor.user();
            }
        });
    }
}

export default angular.module('administratorMenu', [
        angularMeteor,
        uiRouter
    ])
    .component('administratorMenu', {
        templateUrl: template,
        controller: ['$scope', AdministratorMenuCtrl]
    });