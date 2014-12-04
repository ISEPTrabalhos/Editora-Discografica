angular
    .module('app')
    .controller('header_controller',['$scope', '$location', function($scope, $location) {
        $scope.tag = 0;

        loadShoppingCart();

        $scope.setActive = function(elem) {
            $scope.tag = elem;
        };

        $scope.isActive = function(elem) {
            return $scope.tag === elem;
        };

        $scope.isLoggedin = function() {
            return (window.localStorage.getItem("userid") != null);
        }

        $scope.logout = function() {
            window.localStorage.removeItem("message");
            window.localStorage.removeItem("userid");
            $location.path('/');
            $location.replace();
            showMessage("See you next time.");
        }

        $scope.isAdmin = function() {
            return (window.localStorage.getItem("userid") == 0);
        }
    }]);