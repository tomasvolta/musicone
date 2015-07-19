angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,DataAccess,$state) {

  // Form data for the login modal
  $scope.logout = function(){
    $scope.go('login');
    console.log("click");
  };

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
  $scope.buttonPlay = "Play";
  var is_playing = false;
    SC.initialize({
      client_id: "9eb9bf68a9df94ee4d926736ff47a147",
      redirect_uri: "http://example.com/callback.html",
    });
       SC.stream("/tracks/"+$stateParams.playlistId+"", function(sound){

      
     
      
      function playButton(){
      if(is_playing ==false){
        sound.play();
          $scope.buttonPlay = "Stop";
        is_playing= true;
      }else if (is_playing==true) {
        sound.stop();
          $scope.buttonPlay = "Play";
        is_playing=false;
      };
      }

      $scope.playButton = playButton;
    });
})
.controller('LoginCtrl', function($scope,$state,$stateParams,$ionicModal,$ionicPopup,$ionicSideMenuDelegate,$ionicLoading,DataAccess) {
    $ionicSideMenuDelegate.canDragContent(false)
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
        })
     .error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
     title: 'Notification',
     template: 'Incorrect username & password'
   });
  });
    
  };
    $scope.doJoin= function() {

    $ionicLoading.show({
      template: 'Loading...'
    });

    console.log('Doing Join', $scope.registerData);
    DataAccess.signUp($scope.registerData).success(function(data){
          console.log("registerd");
          $state.go("app.search");
             $ionicLoading.hide();
        })
      .error(function(data, status, headers, config) {
    var alertPopup = $ionicPopup.alert({
     title: 'Notification',
     template: 'Registration Failed'
   });
       $ionicLoading.hide();
  });
  };
})
.controller('SearchlistCtrl', function($scope, $stateParams,$http,$state,DataMusicone,$ionicScrollDelegate) {
   var promises= DataMusicone.getTrack();
   promises.then(function(result){
    $scope.song = result;
   })

    $scope.scrollTop = function() {
        $ionicScrollDelegate.resize();  
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
