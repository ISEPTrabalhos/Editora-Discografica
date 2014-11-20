angular
    .module('app')
    .controller('header_controller',['$scope', function($scope) {
        $scope.tag = 0;
        $scope.message = false;

        loadShoppingCart();

        var msg = window.localStorage.getItem("message");
        if(msg != null) {
            $scope.message = msg;
            window.localStorage.removeItem("message");
        };

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
        }

    }]);