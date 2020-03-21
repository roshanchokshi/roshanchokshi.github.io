const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);
var width = window.innerWidth * (isMobile ? 0.8 : 0.5),
  height = window.innerHeight * (isMobile ? 0.6 : 0.95),
  projection = d3.geoMercator(),
  path = d3
    .geoPath()
    .projection(projection)
    .pointRadius(2),
  svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height),
  g = svg.append("g"),
  tooltip = d3
    .select("#map")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
function drawMap(t) {
  d3.json(
    "https://raw.githubusercontent.com/roshanchokshi/roshanchokshi.github.io/master/map.json",
    function(e, a) {
      centerZoom(a);
      var s = drawSubUnits(a);
      colorSubunits(s, t);
    }
  );
}
const populateGlobal = async () => {
  const t = await fetch("https://corona.lmao.ninja/all"),
    e = await t.json();
  $("#global_cases").html(e.cases),
    $("#global_deaths").html(e.deaths),
    $("#global_recoveries").html(e.recovered);
};
drawMap(), populateGlobal(), (casesByState = {});
let prevVal = 0,
  apiResp = null;
function prev() {
  populate(++prevVal);
}
function nxt() {
  populate(--prevVal);
}
function populate(t) {
  $("#nxtBtn").attr("disabled", 0 === t),
    $("#prevBtn").attr("disabled", t === apiResp.data.length - 1);
  const e = apiResp.data.slice().reverse()[t],
    {
      total: a,
      discharged: s,
      deaths: n,
      confirmedCasesForeign: o,
      confirmedCasesIndian: i
    } = e.summary;
  $("#total_cases").html(a),
    $("#indian_cases").html(i),
    $("#foreign_cases").html(o),
    $("#death_cases").html(n),
    $("#cure_cases").html(s);
  let r =
    '<h2 style="color:white;">Indian States Stats</h2><table class="myTable">\n                      <thead>\n                     <tr>\n                      <th>State</td>\n                      <th>Cases</td>\n                      <th>Deaths</td>\n                      <th>Cured</td>\n                      </tr>\n                      </thead>\n                      <tbody>\n                      ';
  (casesByState = {}),
    e.regional.forEach(t => {
      const {
        confirmedCasesForeign: e,
        confirmedCasesIndian: a,
        discharged: s,
        deaths: n,
        loc: o
      } = t;
      (casesByState[o] = [a, e, n, s]),
        (r += `<tr><td>${o.replace("Union Territory of ", "")}</td><td>${a +
          e}</td><td>${n}</td><td>${s}</td></tr>`);
    }),
    (r += "</tbody></table>"),
    $("#table").html(r),
    $(".myTable").DataTable({ paging: !1, bFilter: !1, order: [[1, "desc"]] });
  var l = d3
    .scaleLinear()
    .domain([-2, parseInt(27), 45])
    .range(["#ddd", "#0794DB", "#050D7F"]);
  d3.json(
    "https://raw.githubusercontent.com/roshanchokshi/roshanchokshi.github.io/master/map.json",
    function(t, e) {
      g.selectAll(".subunit")
        .data(topojson.feature(e, e.objects.polygons).features)
        .transition()
        .duration(700)
        .style("fill", function(t, e) {
          const a = t.properties.st_nm;
          return a in casesByState
            ? l(casesByState[a][0] + casesByState[a][1])
            : "#ddd";
        });
    }
  );
}
function centerZoom(t) {
  var e = topojson.mesh(t, t.objects.polygons, function(t, e) {
    return t === e;
  });
  projection.scale(1).translate([0, 0]);
  var a = path.bounds(e),
    s =
      1 /
      Math.max(
        (a[1][0] - a[0][0]) / width,
        ((a[1][1] - a[0][1]) / height) * 1.1
      ),
    n = [
      (width - s * (a[1][0] + a[0][0])) / 2,
      0.5 * (height - s * (a[1][1] + a[0][1]))
    ];
  projection.scale(s).translate(n);
  return e;
}
function drawOuterBoundary(t, e) {
  g.append("path")
    .datum(e)
    .attr("d", path)
    .attr("class", "subunit-boundary")
    .attr("fill", "none")
    .attr("stroke", "#3a403d");
}
function drawSubUnits(t) {
  return g
    .selectAll(".subunit")
    .data(topojson.feature(t, t.objects.polygons).features)
    .enter()
    .append("path")
    .attr("class", "subunit")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1px")
    .on("mouseover", function(t) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
    })
    .on("mousemove", function(t) {
      const e = casesByState[t.properties.st_nm];
      tooltip
        .html(
          `\n              <div class="hover_label">\n              <div class="state_label">${
            t.properties.st_nm
          }</div>\n              <div class="cases_label">\n                <div>Cases</div>\n                <div class="vali">${
            e ? e[0] + e[1] : 0
          }</div>\n              </div>\n              <div class="cases_label">\n                <div>Deaths</div>\n                <div class="vali">${
            e ? e[2] : 0
          }</div>\n              </div>\n              <div class="cases_label">\n                <div>Recoveries</div>\n                <div class="vali">${
            e ? e[3] : 0
          }</div>\n              </div>\n               </div>\n              `
        )
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 48 + "px");
    })
    .on("mouseout", function(t) {
      tooltip
        .transition()
        .duration(400)
        .style("opacity", 0);
    });
}
function drawSubUnitLabels(t) {
  g.selectAll(".subunit-label")
    .data(topojson.feature(t, t.objects.polygons).features)
    .enter()
    .append("text")
    .attr("class", "subunit-label")
    .attr("transform", function(t) {
      return "translate(" + path.centroid(t) + ")";
    })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("font-size", ".5em")
    .style("text-shadow", "0px 0px 2px #fff")
    .style("text-transform", "uppercase")
    .text(function(t) {
      return t.properties.st_nm;
    });
}
$.get("https://api.rootnet.in/covid19-in/stats/daily", function(t) {
  (apiResp = t), populate(prevVal);
});
const colorSubunits = (t, e) => {
  d3.scaleOrdinal(d3.schemeCategory20);
  t.style("fill", function(t, e) {
    return "#ddd";
  });
};
