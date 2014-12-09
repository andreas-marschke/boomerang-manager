var usermanagement = angular.module("usermanagement", ["ui.bootstrap", "ui.router", "gettext", "ngResource"]);

try {
    usermanagement.$inject("usermanagement.templates");
} catch(ex) {

}

usermanagement.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state("main", {
	url: "/",
	templateUrl: "js/applications/usermanagement/templates/main.html",
	controller: "usermanagementController"
    });

}]);

usermanagement.run(["gettext", function(gettextCatalog) {
    gettextCatalog.currentLanguage = window.navigator.userLanguage || window.navigator.language;
}]);
