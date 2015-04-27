angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,DataAccess,$state) {

  // Form data for the login modal
 

  // Perform the login action when the user submits the login form
 

})


.controller('PlaylistsCtrl', function($scope) {
  //console.log(LoginCredentials.getAll);
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('LoginCtrl', function($scope,$state,$stateParams,$ionicModal,DataAccess) {
   $scope.loginData = {};
   $scope.registerData = {};
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });
   $scope.closeRegister = function() {
    $scope.modalRegister.hide();
  };
  $scope.register = function() {
    $scope.modalRegister.show();
  };
   $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
     DataAccess.logIn($scope.loginData.username,$scope.loginData.password).success(function(data){
          console.log("login");
          $state.go('app.playlists');
        });
  };
    $scope.doJoin= function() {
    console.log('Doing Join', $scope.registerData);
    DataAccess.signUp($scope.registerData).success(function(data){
          console.log("registerd");
        });
  };
})
.controller('BrowseCtrl',['$scope','DataAccess',function($scope,DataAccess){
    DataAccess.getAll().success(function(data){
        $scope.items=data.results;
         console.log($scope.items);
    });
    $scope.onItemDelete=function(item){
        DataAccess.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item),1);
    }

}]);
