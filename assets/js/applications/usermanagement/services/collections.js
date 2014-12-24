usermanagement.factory("api.collection", ["$resource", function($resource) {
    return $resource("", { id: "@user", collection: "@collection"}, {
	sizes: { action: "sizes", url: "/api/user/:user/:collection/sizes",
		 params: { user: "@user", collection: "@collection" }, method: "GET", isArray: true}
    }, {
	stripTrailingSlashes: true
    });
}]);
