import {
    Meteor
} from 'meteor/meteor';
import '../imports/api/database.js';

Meteor.publish('organizations', function() {
    return Organizations.find();
});
Meteor.publish('devices', function() {
    return Devices.find();
});
/*
 var map = function() {
 var key = {
 identifier: this.identifier,
 dateEntered: this.dateEntered,

 };
 emit(this._id, key);
 }
 var mapd = function() {
 var key = {
 name: this.name,
 code: this.code
 };

 emit(this.organization, key);
 }

 var reduce = function(previous, current) {
 var out = {
 identifier: '',
 dateEntered: '',
 name: '',
 code: ''
 };
 current.forEach(function(v) {
 if(v.identifier)
 out.identifier = v.identifier;
 if(v.dateEntered)
 out.dateEntered = v.dateEntered;
 if(v.name)
 out.name = v.name;
 });

 return out;
 }

 Devices.mapReduce(map , reduce, {
 //query: {},
 out: "joined",
 //verbose: true
 });

 Organizations.mapReduce(mapd, reduce, {
 //query: {},
 out: "joined",
 //verbose: true
 });
 */

Meteor.methods({
    GetCampuses: function() {
        var campuses = [];
        var cursore = Organizations.find();
        var count;
        cursore.forEach(campus => {
            count = Devices.find({
                organization: campus._id
            }).count();
        var deviceDateEntered = Devices.find({
            organization: campus._id
        }, {
            sort: {
                dateEntered: -1
            },
            limit: 1
        }).fetch();
        if (deviceDateEntered[0]) {
            var lastDate = deviceDateEntered[0].dateEntered;
        }
        var deviceDateEntered =
         Devices.find({
            organization: campus._id
        }, {
            sort: {
                dateEntered: 1
            },
            limit: 1
        }).fetch();
        if(deviceDateEntered[0]) {
            var firstDate = deviceDateEntered[0].dateEntered;
        }
        campuses.push({
            id: campus._id,
            name: campus.name,
            count: count,
            lastDate: lastDate,
            firstDate: firstDate
        });
    });
        return campuses;
    },
    GetOrganization: function(id) {
        var oid = new Meteor.Collection.ObjectID(id);
        var organization = Organizations.findOne(oid);
        if(organization) {
            return {
                name: organization.name,
                code: organization.code,
                date: organization.dateEntered
            };
        }
    },
    GetDevices: function(id) {
        var oid = new Meteor.Collection.ObjectID(id);
        var cursor = Devices.find({organization: oid});
        if(cursor) {
            var devices = [];
            cursor.forEach(item => {
                devices.push(item);
            });
            return devices;
        }
    },
    EditOrganization: function (id, model) {
        var oid = new Meteor.Collection.ObjectID(id);
        Organizations.update({_id : oid},{$set:{ name : model.name, code : model.code, dateModified: new Date() }});
    },

    CreateOrganization: function(model) {
        model.dateEntered = model.dateModified = new Date();
        Organizations.insert(model)
    }
})

Meteor.startup(() => {});


// rm -rf ~/.meteor/package-metadata
// dejawho@lackmail.ru
// dejawho0990