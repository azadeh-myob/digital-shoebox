var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$http', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $http){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
 	$scope.menu = [
    {
      link : '',
      title: 'Dashboard',
      icon: 'dashboard'
    },
    {
      link : '',
      title: 'Friends',
      icon: 'group'
    },
    {
      link : '',
      title: 'Messages',
      icon: 'message'
    }
  ];
  $scope.admin = [
    {
      link : '',
      title: 'Trash',
      icon: 'delete'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'settings'
    }
  ];
  $scope.activity = [
      {
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
      },
      {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
      },
      {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
      },
      {
        what: 'Recipe to try',
        who: 'Brian Holt',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
      },
    ];
  $scope.alert = '';

  $scope.activity = [
    {
        blob: {"language":"sr-Cyrl","textAngle":0,"orientation":"Up","regions":[{"boundingBox":"20,14,235,121","lines":[{"boundingBox":"103,14,131,16","words":[{"boundingBox":"103,14,5,16","text":"1"},{"boundingBox":"123,14,50,16","text":"таск"},{"boundingBox":"183,14,51,16","text":"[ЕРЛ"}]},{"boundingBox":"20,54,102,16","words":[{"boundingBox":"20,54,67,16","text":"GILRD%',"},{"boundingBox":"101,54,21,16","text":"СА"}]},{"boundingBox":"173,84,82,16","words":[{"boundingBox":"173,84,48,16","text":"ДБ•.З1"},{"boundingBox":"235,84,20,16","text":"АМ"}]},{"boundingBox":"122,119,71,16","words":[{"boundingBox":"122,119,71,16","text":"ЗЕ1З4ГБ"}]}]},{"boundingBox":"20,159,98,113","lines":[{"boundingBox":"20,159,71,16","words":[{"boundingBox":"20,159,71,16","text":"REGLLAR"}]},{"boundingBox":"20,216,98,16","words":[{"boundingBox":"20,216,38,16","text":"3-Е-"},{"boundingBox":"61,216,57,16","text":"тап:"}]},{"boundingBox":"21,256,56,16","words":[{"boundingBox":"21,256,48,16","text":"ТОП"},{"boundingBox":"74,261,3,11","text":":"}]}]},{"boundingBox":"150,139,153,133","lines":[{"boundingBox":"150,139,153,16","words":[{"boundingBox":"150,139,77,16","text":"GALLCf•E:"},{"boundingBox":"244,139,59,16","text":"12.232"}]},{"boundingBox":"150,159,81,16","words":[{"boundingBox":"150,159,16,16","text":"Е:"},{"boundingBox":"180,159,51,16","text":"2.423"}]},{"boundingBox":"200,216,50,16","words":[{"boundingBox":"200,216,50,16","text":"47.95"}]},{"boundingBox":"200,256,50,16","words":[{"boundingBox":"200,256,50,16","text":"51.55"}]}]},{"boundingBox":"20,306,132,54","lines":[{"boundingBox":"20,306,40,16","words":[{"boundingBox":"20,306,40,16","text":"АИТН"}]},{"boundingBox":"20,344,132,16","words":[{"boundingBox":"20,344,81,16","text":"C:LISTDMER"},{"boundingBox":"112,344,40,16","text":"СЕРУ"}]}]}]}
    }
  ];

  $scope.word = '';
  $scope.result = 'Use the searchbox above to find your documents';

  $scope.searchForWord = function (word2) {
      $scope.loading = true;
    $http({
        method: 'GET',
        url: 'https://digitalshoebox.azurewebsites.net/api/HttpTriggerCSharp?code=fDOINY2wY7/1Pr9qymqWdKwX2YW0A1CNSD0TEddqex4PRRcATuv0ug==&search='+word2,
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.result = JSON.parse(response.data);
        console.log($scope.result.PartitionKey);
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        
        $scope.loading = false;
        $scope.result = "Oh no, something went wrong";
    });
  };

  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});
app.directive('appFilereader', function($q, $http) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {};
                function guid() {
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
                    }
                function uploadToServer(image) {

                    
                    $http({
                        method: 'POST',
                        url: 'https://digitalshoebox.azurewebsites.net/api/imageUploader?code=Hwil/54Lq7E5pe56DoheHuq6pd5IEtdLF3yXycoh9q7Wdk0WNMbh/w==',
                        data:{
                            "Id": guid(),
                            "Image": image,
                            "docType": '2',
                            "UserId": '00000000-0000-0000-0000-000000000000',
                            "uploadstatus": '2',
                            "capturedDateTime": '2017-05-03T08:04:29.699Z'
                        }
                    }).then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        scope.result = response.data;
                        console.log(scope.result);
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        
                        scope.loading = false;
                        scope.result = "We found nothing";
                    });
                }

                element.bind('change', function(e) {
                    var element = e.target;
                    scope.uploaded = false; 
                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (element.multiple) ngModel.$setViewValue(values);
                            else ngModel.$setViewValue(values.length ? values[0] : null);
                            var base64 = ngModel.$modelValue.substr(ngModel.$modelValue.indexOf(',') + 1);
                            uploadToServer(base64);
                            scope.uploaded = true;
                        });

                    function readFile(file) {
                        var deferred = $q.defer();

                        var reader = new FileReader();
                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        };
                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };
                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                }); //change

            } //link
    }; //return
});

app.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});
