let importedData = JSON.parse(data.replaceAll("'","\"")); //parses incoming data after replacing all single quotes with double ones
let graphPadding = 0.1

var allData = {
    tempArr: [],
    humidArr: [],
    pressArr: [],
    BBCtempArr: [],
    BBChumidArr: [],
    BBCpressArr: []
} //object containing all data for easy access


charts = [];
for (let [key, value] of Object.entries(importedData)){
    //import data from database and add it to the allData array for use later
    let fields = value["fields"];
    let time = Date.parse(fields["timestamp"])
    allData.tempArr.push({ x: time, y: parseFloat(fields["temperature"])})
    allData.humidArr.push({ x: time, y: parseFloat(fields["humidity"])})
    allData.pressArr.push({ x: time, y: parseFloat(fields["pressure"])})
    allData.BBCtempArr.push({ x: time, y: parseFloat(fields["BBCtemperature"])})
    allData.BBChumidArr.push({ x: time, y: parseFloat(fields["BBChumidity"])})
    allData.BBCpressArr.push({ x: time, y: parseFloat(fields["BBCpressure"])})
}

function createChart(fullName, shortenedName, timescale, units){
    //creates a JSCharting chart based on certain parameters.

    let mainArr = allData[shortenedName+"Arr"]
    let BBCArr = allData["BBC"+shortenedName+"Arr"]

    //choose how much data to include
    let sliceLength = timescale=="Daily" ? 60*60*24 : 60*60*24*7
    mainArr = mainArr.slice(Math.max(mainArr.length-Math.floor(sliceLength/frequency), 0))
    BBCArr = BBCArr.slice(Math.max(BBCArr.length-Math.floor(sliceLength/frequency), 0))
    
    //some data parsing
    let mainData = mainArr.map(element => element.y)
    let BBCData = BBCArr.map(element => element.y)
    
    let mainMin = Math.min(...mainData);
    let mainMax = Math.max(...mainData);
    let BBCMin = Math.min(...BBCData);
    let BBCMax = Math.max(...BBCData);
    let totalMin = Math.min(mainMin, BBCMin);
    let totalMax = Math.max(mainMax, BBCMax);

    //create chart
    let newChart= JSC.chart(shortenedName+timescale+"ChartDiv", { 
        debug: true, 
        type: 'line spline', 
        defaultCultureName: "en-GB",
        title_label_text: timescale + " " + fullName,
        legend: {
            position: 'inside top left',
            template: "%icon %name"
        }, 
        yAxis: {
            defaultTick: {
                label: {
                    text: "%value"+units
                }
            },
            shape_opacity: 0.55, 
            defaultPoint_marker_visible: false,
            scale: {
                range: {
                    min: totalMin - graphPadding*Math.abs(mainMax-totalMin),
                    max: totalMax + graphPadding*Math.abs(mainMax-totalMin),
                }
            }
        },
        xAxis: { 
          crosshair_enabled: true, 
          formatString: timescale=="Daily" ? "t" : "d",
          scale: { type: 'time' } 
        }, 
        title_label_text: timescale + " " +fullName + " (" + units + ")" + "\t Indoor Max: " + mainMax + " Indoor Min: " + mainMin, 
        defaultSeries: {
            line_width: 2
        },
        series: [ 
          { 
            name: fullName, 
            points: mainArr 
          }, 
          { 
            name: "BBC "+fullName, 
            points: BBCArr
          }
        ] 
    });
    charts.push(newChart)
}


function setDisplay(shortenedName, BBC, units){
    let divID;
    let data;
    if (BBC) {
        divID = document.getElementById("BBC"+shortenedName+"DisplayDiv");
        let datArr = allData["BBC"+shortenedName+"Arr"]
        data = datArr[datArr.length-1]["y"]
    } else {
        divID = document.getElementById(shortenedName+"DisplayDiv");
        let datArr = allData[shortenedName+"Arr"]
        data = datArr[datArr.length-1]["y"]
    }
    divID.innerHTML = data + units
}

createChart("Temperature", "temp", "Daily", "\u00B0C");
createChart("Humidity", "humid", "Daily", "%");
createChart("Pressure", "press", "Daily", "mBar");
createChart("Temperature", "temp", "Weekly", "\u00B0 C");
createChart("Humidity", "humid", "Weekly", "%");
createChart("Pressure", "press", "Weekly", "mBar");

setDisplay("temp", false, "\u00B0C")
setDisplay("temp", true, "\u00B0C")
setDisplay("humid", false, "%")
setDisplay("press", false, "mBar")

