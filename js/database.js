$(document).ready(function () {
  $.getJSON(
    "https://api.covid19india.org/state_district_wise.json",
    null,
    function (data2) {
      mainObj2 = data2;
    }
  );
  $.getJSON(
    "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
    null,
    function (data) {
      mainObj = data.data.statewise.sort(function (a, b) {
        return b.confirmed - a.confirmed;
      });
      var k = "<tbody>";
      idelta = 0;
      for (i = 0; i < mainObj.length; i++) {
        try {
          state = mainObj[i].state;
          distdata = mainObj2[state]["districtData"];
          var dict = []; // create an empty array
          jQuery.each(distdata, function (i, val) {
            dict.push({
              district: i,
              confirmed: val.confirmed,
              delta: val.delta.confirmed,
            });
          });
          dict.sort(function (a, b) {
            return b.confirmed - a.confirmed;
          });
          sdelta = 0;
          jQuery.each(dict, function (i, val) {
            sdelta += val.delta;
          });
          idelta += sdelta;
          if (sdelta == 0) {
            sdelta = "";
          } else {
            sdelta += "↑";
          }
          k += "<tr class='breakrow'>";
          k += "<td>" + state + "</td>";
          k +=
            "<td>" +
            mainObj[i].confirmed +
            "<p class='delta'>&nbsp;&nbsp;" +
            sdelta +
            "</p></td>";
          k += "<td>" + mainObj[i].active + "</td>";
          k += "<td>" + mainObj[i].deaths + "</td>";
          k += "<td>" + mainObj[i].recovered + "</td>";
          k += "</tr>";

          k += "<tr class='datarow'>";
          k += "<th style='padding:0px 0px 0px 5px; margin:0px;'>District</th>";
          k += "<th style='padding:0px; margin:0px;'>Cases</th>";
          k += "</tr>";

          jQuery.each(dict, function (i, val) {
            if (val.delta == 0) {
              val.delta = "";
            } else {
              val.delta += "↑";
            }
            k += "<tr class='datarow'>";
            k +=
              "<td style='padding:0px 0px 0px 5px; margin:0px;'>" +
              val.district +
              "</td>";
            k +=
              "<td style='padding:0px; margin:0px;'>" +
              val.confirmed +
              "<p class='delta'>&nbsp;&nbsp;" +
              val.delta +
              "</p></td>";
            k += "</tr>";
          });
        } catch {
          break;
        }
      }
      k += "</tbody> ";

      document.getElementById("tableData").innerHTML = k;
    }
  );

  function getByIndex(obj, index) {
    return obj[Object.keys(obj)[index]];
  }

  $.getJSON(
    "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
    null,
    function (data) {
      resp = data.data.total;
      if (idelta == 0) {
        sdelta = "";
      } else {
        idelta += "↑";
      }
      var j = "<tbody>";
      j += "<tr>";
      j +=
        "<td>" +
        resp.confirmed +
        "<p class='idelta'>&nbsp;&nbsp;" +
        idelta +
        "</p></td>";
      j += "<td>" + resp.active + "</td>";
      j += "<td>" + resp.deaths + "</td>";
      j += "<td>" + resp.recovered + "</td>";
      j += "</tr>";
      j += "</tbody>";
      // j += "<p>" + resp2.total + "</p>";
      document.getElementById("india-data").innerHTML = j;
      console.log(idelta);
    }
  );
});
$(document).ready(function () {
  $.getJSON(
    "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise",
    null,
    function (data) {
      Obj = data.data.statewise;
      mainObj = data.data.statewise.sort(function (a, b) {
        return b.confirmed - a.confirmed;
      });
      var loca = [];
      var cases = [];
      var curedcases = [];
      for (var i = 0; i < mainObj.length - 9; i++) {
        loca.push(mainObj[i].state);
        cases.push(mainObj[i].confirmed);
        curedcases.push(mainObj[i].recovered);
      }

      var ctx = document.getElementById("canvas").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: loca,
          datasets: [
            {
              label: "Infected",
              data: cases,
              backgroundColor: "white",
              borderColor: "blue",
              fill: false,
            },
            {
              label: "Cured",
              fill: false,
              backgroundColor: "#fff",
              borderColor: "red",
              data: curedcases,
            },
          ],
        },
        options: {
          legend: {
            display: true,
          },
          responsive: true,
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: "States",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "No. of people",
                },
              },
            ],
          },
        },
      });
    }
  );
});

$(document).ready(function () {
  $.getJSON("https://cryptic-ravine-96718.herokuapp.com/", null, function (
    data
  ) {
    var news = document.getElementById("news");
    var newcol = document.createElement("ul");
    newcol.setAttribute("class", "list-inline");
    news.appendChild(newcol);
    for (var i = 0; i < 8; i++) {
      var li = document.createElement("li");
      li.setAttribute("class", "list-inline-item");
      var card = document.createElement("div");
      card.setAttribute("class", "card");
      card.style.width = "15rem";
      card.style.marginRight = "1rem";
      card.style.marginBottom = "2rem";
      // card.style.border="2px solid black";
      card.style.boxShadow = "none";
      var card_title = document.createElement("h5");
      card_title.innerHTML = data.news[i].title;
      card_title.setAttribute("classs", "card-title");
      var news_img = document.createElement("img");
      news_img.setAttribute("src", data.news[i].img);
      news_img.setAttribute("class", "card-img-top");
      var btntoart = document.createElement("a");
      btntoart.setAttribute("class", "btn btn-main");
      btntoart.style.color = "#fff";
      btntoart.style.background = "#000";
      btntoart.setAttribute("href", data.news[i].link);
      btntoart.innerHTML = "Read More";
      var card_body = document.createElement("div");
      card_body.setAttribute("class", "card-body");
      card_body.appendChild(card_title);
      card_body.appendChild(btntoart);
      card.appendChild(news_img);
      card.appendChild(card_body);
      li.appendChild(card);
      newcol.appendChild(li);
    }
  });
});

let resp = null;
let resp2 = null;

$(document).ready(function () {
  $("#btn-graph").on("click", function () {
    var graph = document.getElementById("graph-data");
    var map = document.getElementById("map-data");
    graph.style.display = "block";
    map.style.display = "none";
  });

  $("#btn-map").on("click", function () {
    var graph = document.getElementById("graph-data");
    var map = document.getElementById("map-data");
    graph.style.display = "none";
    map.style.display = "block";
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}
