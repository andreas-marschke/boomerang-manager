usermanagement.controller("usermanagementController",["$scope", "api.users", function($scope, ApiUsers) {
    $scope.users = [];

    ApiUsers.list(function(users) {
	$scope.users = users;
    });
}]);
