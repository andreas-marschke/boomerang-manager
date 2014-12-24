usermanagement.filter("paginationSlice", function() {
    return function(input, start) {
	if (input) {
	    start = +start;
	    return input.slice(start);
	};
	return [];
    };
});

usermanagement.controller("usermanagementMainController",["$scope", "filterFilter", "UserService", function($scope, $filter, ApiUser) {
    $scope.loading=true;
    $scope.users = [];
    $scope.webcollections = [];
    $scope.filtered = [];

    $scope.paginationSize = [{ value: 5, name: 5 },
			     { value: 10, name:10 },
			     { value: 50, name: 50 },
			     { value: 100, name: 100 }];
    $scope.rowsPerPage = $scope.paginationSize[0];
    $scope.page = 1;
    $scope.pages = 5;

    $scope.$watch("search",function(searchObject) {
	$scope.filtered = $filter($scope.webcollections, searchObject);
	$scope.pages = Math.ceil($scope.filtered.length / $scope.rowsPerPage.value);
    },true);

    $scope.$watch("webcollections", function (webcollections) {
	$scope.filtered = $filter(webcollections, $scope.search || {name: "", user: { name: "" }});
	$scope.pages = Math.ceil($scope.filtered.length / $scope.rowsPerPage.value);
    }, true);

    $scope.refresh = function() {
	$scope.loading = true;
	$scope.users = [];
	$scope.webcollections = [];

	ApiUser.list(function(users) {
	    $scope.users = users.map(function(user) {
		return user.toJSON();
	    });
	    $scope.users.forEach(function(user) {
		ApiUser.collections({ id: user.id }, function(collectionResults) {

		    if (collectionResults.length > 0) {
			var mapped = collectionResults.map(function(collection) { return collection.toJSON(); });
			mapped.forEach(function(collection) {
			    collection.user = {
				name: user.name,
				id: user.id
			    };
			    $scope.webcollections.push(collection);
			});
			$scope.loading = false;
		    }
		});
	    });
	});
    };

    if (Modernizr.mq("only all and (max-width: 768px)")) {
	$scope.pager = true;
	$scope.pagination=false;
	$scope.showFilters = false;
	$scope.showPagination = false;
    } else if (Modernizr.mq("only all and (min-width: 768px)")){
	$scope.pager = false;
	$scope.pagination=true;
	$scope.showFilters = true;
	$scope.showPagination = true;
    }

    setTimeout($scope.refresh,0);
}]);
