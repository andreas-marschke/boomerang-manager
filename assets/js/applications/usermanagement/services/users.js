usermanagement.factory("api.users", ["$resource", "$http", function($resource, $http){
    return {
	list: function(success, error) {
	    var promise = $http.get("/api/users/list");
	    if (typeof success === "function") {
		promise.success(success);
	    }
	    if (typeof error === "function") {
		promise.error(error);
	    }
	    return promise;
	},
	collections: function(user, success, error) {
	    var promise = $http.get("/api/users/collections");
	    if (typeof success === "function") {
		promise.success(success);
	    }
	    if (typeof error === "function") {
		promise.error(error);
	    }
	    return promise;
	}
    };
}]);
