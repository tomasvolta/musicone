/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('starter.services',[]).factory('DataAccess',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/User',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        signUp: function(data) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/users', {'username': data.username, 'password': data.password,'name':data.name,'email':data.email}, config);
        },
        logIn: function(username, password) {
            var config = {
             headers: {
               'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
               'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
             },
             params: { 
                username: username ,
                password: password
              }
            }
            return $http.get('https://api.parse.com/1/login', config);
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/Todo/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/Todo',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Todo/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Todo/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '3U6bAsxJmBtH76IwbCDHfdzqzZEd6ttWO9lAzWT0',
    REST_API_KEY:'dFAuE3px7jvhHQIweM64g8OcSi3i1A49LsGe5Vvk'
})
.factory('DataMusicone', function($http) {
    var data = [];
    return {
        getTrack: function(){
            return $http.get('http://api.soundcloud.com/resolve.json?url=https://soundcloud.com/user887792035/sets/musicone&client_id=9eb9bf68a9df94ee4d926736ff47a147').then(function(resp) {
             data= resp.data.tracks;
            return resp.data.tracks;
            }, function(err) {});
        },
        setTrack:function(indata){
           data = indata;
        }
    }
});