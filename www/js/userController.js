angular.module('clinkApp')
  .controller('UserController', UserController); 

  function UserController($http, $auth, $rootScope, $ionicPopup, $timeout, $state) {

        var vm = this;

        vm.users;
        vm.error;
        vm.success;

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            // http://todoauth.local.192.168.43.180.xip.io:8000/v1/authenticate
            $http.get('http://api.clinkexchange.com/v1/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
            });
        }
        
        // We would normally put the logout method in the same
        // spot as the login method, ideally extracted out into
        // a service. For this simpler example we'll leave it here
        vm.logout = function() {

            $auth.logout().then(function() {

                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;
            });
        }

        //register users
        vm.register = function() {
            

            $http.post('http://api.clinkexchange.com/v1/register?name=' + vm.name + '&email=' + vm.email + '&password=' + vm.password)
            .success(function(success) {

                // An alert dialog, pass error text on template
                var alertPopup = $ionicPopup.alert({
                 title: 'Success',
                 template: 'Registration successful, you can now login.', 
                 okText: 'Login',
                 okType: 'button-royal'
                });
                alertPopup.then(function(res) {
                   $state.go('login');
                 });

            }).error(function(error) {
                vm.error = error;

                // An alert dialog, pass error text on template
                var alertPopup = $ionicPopup.alert({
                 title: 'Error',
                 template: 'Registration Failed.',
                 okText: 'Login',
                 okType: 'button-royal'
                });

            });

            
            

        }

    }

