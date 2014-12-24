
d3.chart("BaseChart").extend("WebcollectionChart", {
    modes: {
	mobile : function() {
	    return Modernizr.mq("only all and (max-width: 480px)");
	},
	tablet: function() {
	    return Modernizr.mq("only all and (min-width: 481px) and (max-width: 768px)");
	},
	web: function() {
	    return Modernizr.mq("only all and (min-width: 769px)");
	}
    },
    initialize: function(options) {
	var chart = this;

	this.scales = {};

	this.color = d3.scale.category10();
	this.pie = d3.layout.pie().value(function(d) { return d.count; }).sort(null);
	this.arc = d3.svg.arc();

	this.GraphLayerBase = this
	    .base
	    .append('g')
	    .classed('graph-layer',true);

	this.layer("pie", this.GraphLayerBase, this.graphLayer);

	chart.on("change:width", this.rescale);
	chart.on("change:height", this.rescale);

	return this;
    },
    rescale: function() {

	this.GraphLayerBase.attr("transform","translate(" + (this.height() / 2 || 150 ) + "," + (this.width() / 2 || 150) + ")");

	this.arc
	    .outerRadius(this.height() / 2 - 30)
	    .innerRadius((this.height() / 2 - 30) / 3);
    },
    transform: function(data) {
	var chart = this;
	if (this.isEmpty(data)) {
	    console.log("Data came back empty setting empty true");
	    this.empty = true;
	} else {
	    console.log("Data came back setting empty false");
	    this.empty = false;
	    chart.data = data;
	}

	return data;
    },
    isEmpty: function(data) {
	return data.filter(function(d) { return d.count !== 0; }).length === 0;
    },
    graphLayer: {
	modes: ["web", "tablet",  "mobile"],
	dataBind: function(data) {
	    var chart = this.chart();

	    chart.rescale();

	    if (chart.empty) {
		return this.selectAll("circle").data([0]);
	    } else {
		chart.color.domain(data.map(function(d) { return d.type; }));
		return this.selectAll("path").data(chart.pie(data));
	    }
	},
	insert: function() {
	    var chart = this.chart();

	    if (chart.empty) {
		this.append("circle").attr({
		    cx: 0,
		    cy: 0,
		    r: chart.height() / 2,
		    fill: "#eee"
		});
		return this.append("text").text("No Data").style({
		    fill: "#333",
		    "font-family": "sans",
		    "font-size": "12px",
		    "text-anchor": "middle"
		});
	    } else {
		return this.append("path").attr("d", chart.pie(chart.arc));
	    }

	},
	events: {
	    enter: function() {}
	}
    }
});
