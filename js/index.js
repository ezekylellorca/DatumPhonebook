var myApp = angular.module('myApp', ['ngRoute'])

//ng-route config
.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: 'contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/add', {
      templateUrl: 'contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: 'contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({redirectTo: '/home'});
})

// controllers
.controller('navCtrl', function ($scope) {
  $scope.nav = {
    navItems: ['home', 'add', ''],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

.controller('homeCtrl', function ($scope, ContactService){
  $scope.contacts = ContactService.getContacts();

  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $scope.contacts.splice(index, 1);
    $scope.removed = 'Contact successfully removed.';
  };

})

.controller('contactInfoCtrl', function ($scope, $routeParams){
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index];
})

.controller('addContactCtrl', function ($scope, $location) {
  //needed to show the correct button on the contact form
  $scope.path = $location.path();

  $scope.addContact = function () {
    var contact = $scope.currentContact;
    contact.id = $scope.contacts.length;
    $scope.contacts.push(contact);
  };

})

.controller('editContactCtrl', function ($scope, $routeParams){
  $scope.index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[$scope.index];
})

// directives
.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'contact.html'
  }
})

// services
.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function () {
    return contactList;
  }

  // contact list, usually would be a separate database just for sample
  var contactList = [
    {id: 0, name: 'Ezekyle Llorca',  phone: '+639173191720',  notes: 'Get your shit together'},
    {id: 1, name: 'Davis Co',  phone: '+60193133915',  notes: 'All is well'},
    {id: 2, name: 'Bilal',  phone: '123-456-7890',  notes: 'Winter is coming.'},
    {id: 3, name: 'Ambiga Sreenevasan',  phone: '123-456-7890',  notes: 'ex-president of the Malaysian Bar Council and active activist'},
    {id: 4, name: 'Charles Hector',  phone: '123-456-7890',  notes: 'Malaysian human rights advocate and activist'},
    {id: 5, name: 'Cathryn Lee ',  phone: '123-456-7890',  notes: 'The Goddess'},
    {id: 6, name: 'Angie Ng  ',  phone: '123-456-7890',  notes: 'Priestess of the moon'},

  ];
  
  return factory;
}]);