usermanagement.controller("usermanagementNewUserController", ["$scope", "$log", "UserService", function($scope, $log, Users) {

    $scope.defaults = {
	user: {
	    match: /^[a-z][a-z0-9]{3,12}$/,
	    maxchars: 12,
	    auth: "local"
	},
	collection: {
	    match: /^[a-z][a-z0-9-.]{3,12}$/,
	    maxchars: 12
	},
	locations: {
	    prefix: "http://",
	    shared: false
	},
	types: [ "beacon", "clicks", "resource", "forms", "error" ]
    };
    $scope.auth = {};
    $scope.user = {};
    $scope.webcollection = {
	types: ['beacon'],
	locations: []
    };

   $scope.location = {};

    $scope.refresh = function () {
	Users.authMethods(function(methods) {
	    $scope.auth.methods = methods.map(function(method) { return method.toJSON(); });
	    $scope.auth.method = $scope.auth.methods[0];
	    $scope.user.via = $scope.auth.methods[0].name;
	});

	Users.list(function(users) {
	    $scope.users = users.map(function(user) { return user.toJSON().name; });
	});
    };

    setTimeout($scope.refresh,0);
}]);
