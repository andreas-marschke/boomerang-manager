var usermanagement = angular.module("usermanagement", ["ui.bootstrap",
						       "ui.router",
						       "gettext",
						       "ngResource",
						       "checklist-model",
						       "usermanagement.templates"]);

usermanagement.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state("main", {
	url: "/",
	templateUrl: "js/applications/usermanagement/templates/mainview.html",
	controller: "usermanagementMainController"
    }).state("createNewUser", {
	url: "/user/new",
	templateUrl: "js/applications/usermanagement/templates/createuser.html",
	controller: "usermanagementNewUserController"
    }).state("userView", {
	url: "/user/:id",
	templateUrl: "js/applications/usermanagement/templates/userview.html",
	controller: "usermanagementUserViewController"
    });

}]);

usermanagement.run(["gettextCatalog", "$rootScope", function(gettextCatalog, $rootScope) {
    gettextCatalog.currentLanguage = window.navigator.userLanguage || window.navigator.language;

    /* used for "back-button" functionality */
    $rootScope.previousState = {};
    $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
	// store previous state in $rootScope
	$rootScope.previousState.name = fromState.name;
	$rootScope.previousState.params = fromParams;
    });
}]);
