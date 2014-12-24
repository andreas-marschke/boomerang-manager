usermanagement.factory("UserService", ["$resource", function($resource){
    return $resource("", {},{
	    list: { url: "/api/users", action: "list", method: "GET", params: {}, isArray: true },
	    detail: { url: "/api/user/:id", action: "detail", method: "GET", params: {}, isArray: false },
	    create: { url: "/api/user/create", action: "create", method: "POST", isArray: false },
	    remove: { url: "/api/user/remove", action: "remove", method: "POST", isArray: false },
	    collections: { url: "/api/user/:id/collections", action: "collections", method: "GET", isArray: true },
	    authMethods: { url: "/api/auth/methods/active", action: "authMethods", method: "GET", isArray: true }
	}, { stripTrailingSlashes: true });
}]);
