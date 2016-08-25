/* Import modules */
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import smartTabel from 'angular-smart-table';
import organizationView from '../imports/components/organizationView/organizationView';
import organizationEdit from '../imports/components/organizationEdit/organizationEdit';
import organizationCreate from '../imports/components/organizationCreate/organizationCreate';
import '../imports/api/database';
import administratorMenu from '../imports/components/administratorMenu/administratorMenu';
import organizations from '../imports/components/organizations/organizations';

/* Inport CSS */
import 'bootstrap/dist/css/bootstrap.css';
import './css/animate.min.css';
import './css/light-bootstrap-dashboard.css';

/* Import JS*/
import '../imports/startup/accounts-config.js';
import './js/tether.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './js/bootstrap-checkbox-radio-switch.js';
import './js/chartist.min.js';
import './js/bootstrap-notify.js';
import './js/light-bootstrap-dashboard.js';
import '../imports/api/database'
Meteor.subscribe('organizations');
Meteor.subscribe('devices');
angular.module('dejawho', [
        angularMeteor,
        organizationView.name,
        organizationEdit.name,
        administratorMenu.name,
        organizations.name,
        organizationCreate.name,
        'accounts.ui',
        'ngAnimate',
        smartTabel,
        uiRouter
    ])
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('home', {
            url: '/',
            template: '<home></home>'
        })
        .state('organizations', {
            url: '/campuses',
            template: '<organizations></organizations>'
        })
        .state('campus', {
            url: '/campus/:id',
            template: '<organization-view></organization-view>'
        })
        .state('campusEdit', {
            url: '/campus/:id/edit',
            template: '<organization-edit></organization-edit>'
        })
        .state('campusAdd', {
            url: '/add',
            template: '<organization-create></organization-create>'
        });
}