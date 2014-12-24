usermanagement.directive("loading", [function() {
    return {
	restrict: 'EA',
	replace: true,
	templateUrl: 'js/applications/usermanagement/templates/loading.html',
	scope: {
	    state: "=state"
	},
	link: function(scope, element, attrs) {
	    var options = {
		lines: 11, // The number of lines to draw
		length: 6, // The length of each line
		width: 2, // The line thickness
		radius: 9, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#333', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 46, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: true, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '25%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	    };
	    var spinner = new Spinner(options).spin(element.find("div.spin")[0]);
	}
    };
}]);
