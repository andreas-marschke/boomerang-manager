usermanagement.controller("usermanagementUserViewController", ["$scope", "$stateParams", "$q", "gettext", "UserService", "api.collection", function($scope, $stateParams, $q, gettext, ApiUser, ApiCollection) {

    $scope.webcollections = [];
    $scope.loading = true;
    $scope.loadingState = "";

    $scope.refresh = function () {
	var collectionPromise = $q.defer();
	var sizesPromise = $q.defer();

	ApiUser.detail({ id: $stateParams.id }, function(userdetail) {
	    $scope.user = userdetail;
	}).$promise.then(function() {
	    ApiUser.collections({ id: $scope.user.id }, function(collections) {
		$scope.webcollections = collections.map(function(collection) { return collection.toJSON(); });
		collectionPromise.resolve();
	    });
	});

	collectionPromise.promise.then(function() {
	    $scope.webcollections.forEach(function(collection, index, array) {
		ApiCollection.sizes({user: $scope.user.id, collection: collection.name }, function(sizes) {
		    $scope.webcollections[index].sizes = sizes.map(function(size) { return size.toJSON(); });
		}, function(error) {
		    console.error(error);
		});

		$scope.loadingState = gettext("Collections: ")  + ( index + 1 ) + "/" + array.length;

		if ((array.length - 1) === index) {
		    sizesPromise.resolve();
		}
	    });
	});

	sizesPromise.promise.then(function() {
	    $scope.loading = false;
	});

    };

    $scope.refresh();
}]);
