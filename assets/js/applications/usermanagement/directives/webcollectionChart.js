usermanagement.directive("webcollectionChart", ["$window", function($window) {
    return {
	restrict: 'EA',
	replace: true,
	templateUrl: 'js/applications/usermanagement/templates/webcollection-chart.html',
	scope: {
	    sizes: "=sizes",
	    name: "=name"
	},
	link: function(scope, element, attrs) {
	    var elementd3 = $window.d3.select(element[0]);
	    var svg = elementd3.select("svg");
	    var chart = svg
		    .chart("WebcollectionChart", {})
		    .height(300).width(300)
		    .on("change:mode",function() {
			console.log("Events:", arguments);
		    });

	    scope.$watch("sizes", function() {
		if (typeof scope.sizes !== "undefined") {
		    if(scope.sizes.length > 0) {
			chart.draw(scope.sizes);
		    }
		}
	    });
	}
    };
}]);
