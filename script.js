
const params = new URLSearchParams(window.location.search);
var id = params.get("id") || "UCX6OQ3DkcsbYNE6H8uQQuVA";
var url = `https://ests.sctools.org/api/get/`; 

const chart = new Highcharts.chart({
	chart: {
		renderTo: "chart",
		type: "line",
		zoomType: "x",
		backgroundColor: "transparent",
		plotBorderColor: "transparent",
		height: "-11px",
		animation: false,
		style: {
			fontFamily: "Roboto",
		},
	},
	title: {
		text: "",
	},
	xAxis: {
		type: "datetime",
		tickPixelInterval: 500,
		labels: {
			style: {
				color: "#AAAAAA",
			},
		},
		gridLineColor: "#9E9E9E",
		lineColor: "#9E9E9E",
		minorGridLineColor: "#858585",
		tickColor: "#858585",
		title: {
			style: {
				color: "#858585",
			},
		},
	},
	yAxis: {
		title: {
			text: "",
		},
		labels: {
			style: {
				color: "#AAAAAA",
			},
			formatter: function() {
				function abbreviate(count, withAbbr = true, decimals = 2) {
					if (String(count)[0] === "0") {
						if (count === 0) return "0";
						else return count.toFixed(decimals);
					}

					let neg = false;
					if (String(count)[0] == "-") {
						neg = true;
						count = ~Number(count) + 1;
					}

					const COUNT_ABBRS = ["", "K", "M", "B"];
					const i =
						count === 0 ? count : Math.floor(Math.log(count) / Math.log(1000));
					let result = parseFloat(
						(count / Math.pow(1000, i)).toFixed(decimals)
					).toString();
					if (withAbbr) result += `${COUNT_ABBRS[i]}`;
					if (neg) result = `-${result}`;
					return result;
				}

				return abbreviate(this.value);
			},
		},
		gridLineColor: "#3D3D3D",
		lineColor: "#3D3D3D",
		minorGridLineColor: "#3D3D3D",
		tickColor: "#3D3D3D",
		opposite: true,
	},
	credits: {
		enabled: false,
	},
	tooltip: {
		shared: true,
		formatter: function() {
			// @ts-ignore
			var index = this.points[0].series.xData.indexOf(this.x);
			// @ts-ignore
			var lastY = this.points[0].series.yData[index - 1];
			// @ts-ignore
			var dif = this.y - lastY;
			var r =
				// @ts-ignore
				Highcharts.dateFormat("%A %b %e, %H:%M:%S", new Date(this.x)) +
				'<br><span style="color:black">\u25CF </span>' +
				// @ts-ignore
				this.points[0].series.name +
				": <b>" +
				// @ts-ignore
				Highcharts.numberFormat(this.y, 0);
			if (dif < 0) {
				r +=
					'<span style="color:#ff0000;font-weight:bold;"> (' +
					Highcharts.numberFormat(dif, 0) +
					")</span>";
			}
			if (dif > 0) {
				r +=
					'<span style="color:#00bb00;font-weight:bold;"> (+' +
					Highcharts.numberFormat(dif, 0) +
					")</span>";
			}
			return r;
		},
	},
	series: [
		{
			showInLegend: false,
			name: "",
			marker: { enabled: false },
			color: "#3FABCD",
			lineColor: "#3FABCD",
			lineWidth: 2,
		},
	],
});

function getdata(a) {
	fetch(url + a)
		.then((res) => res.json())
		.then((data) => {
document.getElementById('c').innerHTML = data.stats.estCount;	
			document.getElementById("avatar").src = data.info.avatar;
			document.getElementById("title").textContent = data.info.name;
			if (chart.series[0].points.length >= 3600)
				chart.series[0].data[0].remove();
			chart.series[0].addPoint([Date.now(), data.items[0].stats.estCount]);
		});
}

setTimeout(() => {
	getdata(id);
}, 100);

setTimeout(() => {
	getdata(id);
}, 500);
setInterval(() => {
	getdata(id);
}, 2000);

function search() {
	const prompt = window.prompt("Enter channel name, ID, or URL.");
	if (prompt)
		fetch(
			`https://mixerno.space/api/youtube-channel-counter/search/${id}`
			 
		)
			.then((res) => res.json())
			.then((data) => {
				window.location.href = "?id=" + data[0].id;
			});
}
