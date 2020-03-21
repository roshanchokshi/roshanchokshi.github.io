$(document).ready(function() {
  $.getJSON("https://api.rootnet.in/covid19-in/stats/latest", null, function(
    data
  ) {
    Obj = data.data.summary;
    mainObj = data.data.regional.sort(function(a, b) {
      return (
        b.confirmedCasesIndian +
        b.confirmedCasesForeign -
        (a.confirmedCasesIndian + a.confirmedCasesForeign)
      );
    });
    var k = "<tbody>";
    for (i = 0; i < mainObj.length; i++) {
      k += "<tr>";
      k += "<td>" + mainObj[i].loc + "</td>";
      k +=
        "<td>" +
        (mainObj[i].confirmedCasesIndian + mainObj[i].confirmedCasesForeign) +
        "</td>";
      k += "<td>" + ((mainObj[i].confirmedCasesIndian + mainObj[i].confirmedCasesForeign) - mainObj[i].deaths - mainObj[i].discharged) + "</td>";
      k += "<td>" + mainObj[i].deaths + "</td>";
      k += "<td>" + mainObj[i].discharged + "</td>";
      k += "</tr>";
    }
    k += "</tbody> ";
    document.getElementById("tableData").innerHTML = k;
    var j = "<tbody>";
    j += "<tr>";
    j += "<td>" + Obj.total + "</td>";
    j += "<td>" + (Obj.total - Obj.deaths - Obj.discharged) + "</td>";
    j += "<td>" + Obj.confirmedCasesIndian + "</td>";
    j += "</tr>";
    j += "</tbody>";
    document.getElementById("india-data1").innerHTML = j;
    var j = "<tbody>";
    j += "<tr>";
    j += "<td>" + Obj.confirmedCasesForeign + "</td>";
    j += "<td>" + Obj.deaths + "</td>";
    j += "<td>" + Obj.discharged + "</td>";
    j += "</tr>";
    j += "</tbody>";
    document.getElementById("india-data2").innerHTML = j;
  });
});

$(document).ready(function() {
  $.getJSON("https://api.rootnet.in/covid19-in/stats/latest", null, function(
    data
  ) {
    Obj = data.data.summary;
    mainObj = data.data.regional.sort(function(a, b) {
      return (
        b.confirmedCasesIndian +
        b.confirmedCasesForeign -
        (a.confirmedCasesIndian + a.confirmedCasesForeign)
      );
    });
    var loca = [];
    var cases = [];
    var curedcases = [];
    for (var i = 0; i < mainObj.length - 9; i++) {
      loca.push(mainObj[i].loc);
      cases.push(
        mainObj[i].confirmedCasesIndian + mainObj[i].confirmedCasesForeign
      );
      curedcases.push(mainObj[i].discharged);
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
            fill: false
          },
          {
            label: "Cured",
            fill: false,
            backgroundColor: "#fff",
            borderColor: "red",
            data: curedcases
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: "States"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "No. of people"
              }
            }
          ]
        }
      }
    });
  });
});

$(document).ready(function() {
  $.getJSON(
    "https://newsapi.org/v2/everything?q=coronavirus%20AND%20%22corona%20virus%22%20AND%20%22COVID-19%22&apiKey=6f105da0c6c94d63a15d10df7f17efdf",
    null,
    function(data) {
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
        card_title.innerHTML = data.articles[i].title.substr(0, 40) + "...";
        card_title.setAttribute("classs", "card-title");
        var card_desc = document.createElement("p");
        card_desc.innerHTML =
          data.articles[i].description.substr(0, 150) + "....";
        card_desc.setAttribute("class", "card-text");
        var news_img = document.createElement("img");
        news_img.setAttribute("src", data.articles[i].urlToImage);
        news_img.setAttribute("class", "card-img-top");
        var btntoart = document.createElement("a");
        btntoart.setAttribute("class", "btn btn-main");
        btntoart.style.color = "#fff";
        btntoart.style.background = "#000";
        btntoart.setAttribute("href", data.articles[i].url);
        btntoart.innerHTML = "Read More";
        var card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");
        card_body.appendChild(card_title);
        card_body.appendChild(card_desc);
        card_body.appendChild(btntoart);
        card.appendChild(news_img);
        card.appendChild(card_body);
        li.appendChild(card);
        newcol.appendChild(li);
      }
    }
  );
});
