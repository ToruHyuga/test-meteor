import { Meteor } from 'meteor/meteor';
//export const T = new Mongo.Collection('organizations');
Organizations = new Mongo.Collection('organizations', {idGeneration: 'MONGO'});
Devices = new Mongo.Collection('devices');

Organizations.allow({
    insert: onlyUser,
    update: onlyUser,
    remove: onlyUser
});

Devices.allow({
    insert: onlyUser,
    update: onlyUser,
    remove: onlyUser
});

function onlyUser (userId, doc) {
    // разрешить только если пользователь залогинен
    return !! userId;
}