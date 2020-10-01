let logs;
//var $ = require('jquery');

let lastArray = [];
let test1;
let displayArray = [];


function between(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let mapImages = []
for (let index = 0; index < maps.length; index++) {
    const element = maps[index];
    mapImages[index] = element.image;
}
// $(".view").animate({width:'toggle'}, function () {
//     $(this).css({
//         "background": "url(" + mapImage + ") no-repeat fixed left ",
//         "background-size": "cover"
//     });
//     $(this).fadeIn("fast");
// });

// $(this).css({
//     "background": "url(" + mapImage + ") no-repeat fixed left ",
//     "background-size": "cover"
// });
// let backgroundImage = '<div class="view1" ' +
// 'style="background-image: url("'+ mapImage +'");  background-repeat: no-repeat; background-size: cover; background-position: center center; background-attachment: fixed;">' +
// '</div>';
  // if ($(".view1") != null) {
    //     $(".view1").remove()
    // }
    // let $view1 = $('.view1');
    // $view1.css({
    //     "background-image": "url(" + mapImage + ")",
    //     "background-repeat": "no-repeat",
    //     "background-size": "cover",
    //     "background-position": "center",
    //     "background-attachment": "fixed",
    //     "display": "none"
    // })
    // console.log($view1);
    // $(".view").fadeOut("slow")
    // $(".view1").fadeIn("slow")
let previousMap;
function image1Fade(nextMap){
    $('.view').fadeOut('slow', function(){
        $(this).css({
            "background-image": "url(" + nextMap + ")",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
            "background-attachment": "fixed"})
    });
    $('.view1').fadeIn('slow');
}
function image2Fade(mapImage){
    $('.view1').fadeOut('slow', function(){
        $(this).css({
            "background-image": "url(" + mapImage + ")",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
            "background-attachment": "fixed"})
    });
    $('.view').fadeIn('slow');
}
window.setInterval(function () {
    let mapImage = mapImages[between(0, mapImages.length - 1)];
    let nextMap = mapImages[between(0, mapImages.length - 1)];

    while (previousMap == mapImage && mapImage === nextMap) {
        mapImage = mapImages[between(0, mapImages.length - 1)];
    }
    previousMap = mapImage
    image1Fade(nextMap);
    setTimeout(image2Fade(mapImage), 100);
}, 5000);

$("#submit").click(function () {


    //console.log("clicked")
    //var linkText = $("#output").text();
    logs = $("#exampleInputEmail2").val();

    let mapKillFeedP = $("#mapKillFeed").val();
    if (mapKillFeedP != null) {
        $("#mapKillFeed").html(" ");
    }
    let pasteBinString = KD(logs);

    // $(".view").change(function(){
    //     let image = $(".view")
    //     image.fadeOut('fast', function () {
    //         image.css({background: "url(" + mapImage + ") no-repeat fixed left ", "background-size": "cover"});
    //         image.fadeIn('fast');
    //     });
    // })

    const http = new XMLHttpRequest();
    // http.open("GET", "http://localhost:5000");
    // http.onreadystatechange = () =>{
    //     if(http.readyState == 4){
    //         alert(http.responseText);
    //     }
    // }
    // http.send();

    http.open("POST", "http://localhost:5000");
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    http.onreadystatechange = () => {
        if (http.readyState == 4) {
            $("#exporter").attr("href", http.responseText)
        }
    }
    http.send(`vinay=${pasteBinString}`);
})

function KD(logs) {
    let newDispaly = "";
    // try {
    let pattern = "was painted by";
    let arrayOfMapsColours = [];
    let newArrayTest = logs.split("[CHAT]");
    let before = [];
    let after = [];
    let mapPattern = " Map - "
    let beforeMap = [];
    let mapNames = [];
    let listOfMaps = [];
    for (let index = 0; index < maps.length; index++) {
        const element = maps[index];
        mapNames[index] = element.name;
    }
    let KillsOnMap = [];
    let DeathsOnMap = [];
    let indexOfMaps = [];
    for (let index = 0; index < newArrayTest.length; index++) {
        const element = newArrayTest[index];
        if (element.indexOf(mapPattern) >= 0) {

            let currentMap = (element.substr(element.indexOf(mapPattern) + mapPattern.length, element.length).split("\n")[0]);
            //console.log(currentMap)
            for (let i = 0; i < mapNames.length; i++) {
                if (currentMap.includes(mapNames[i])) {
                    indexOfMaps.push(index);
                    listOfMaps.push(mapNames[i]);

                }
            }

        }
    }


    // console.log(indexOfMaps);
    for (let index = 0; index < newArrayTest.length; index++) {
        const element = newArrayTest[index];

        for (let index1 = 0; index1 < indexOfMaps.length - 1; index1++) {
            const element1 = indexOfMaps[index1];
            const element2 = indexOfMaps[index1 + 1];
            if (index > element1 && index < element2) {
                if (element.indexOf(pattern) >= 0) {
                    KillsOnMap.push([listOfMaps[index1], element.substr(element.indexOf(pattern) + pattern.length, element.length).split(" ")[1].split("\n")[0]]);
                    DeathsOnMap.push([listOfMaps[index1], element.substr(0, element.indexOf(pattern)).split(" ")[1]]);
                }
            }
        }
    }

    for (let index = 0; index < KillsOnMap.length; index++) {
        const element = KillsOnMap[index][1];
        KillsOnMap[index][1] = element.substr(0, element.length - 1)
    }
    //console.log(KillsOnMap)
    //make an array each index will be a map, then add the K/D fore ach person to that array if the map name is equal. 
    //Really big array, containing a map, and a person. But the map and person should only occur once in the array. So just seeing who played on what map.
    let namesMap = [];
    for (let index1 = 0; index1 < KillsOnMap.length; index1++) {
        const elementKills = KillsOnMap[index1];
        for (let index = 0; index < listOfMaps.length; index++) {
            const elementMap = listOfMaps[index];
            if (elementKills[0] === elementMap) {
                //console.log(elementKills[1]);
                let person = [];

                let isNameOnListMap = false;

                for (let i = 0; i < namesMap.length; i++) {
                    const element1 = namesMap[i][1];
                    if (element1 == elementKills[1] && namesMap[i][0] === elementKills[0]) {
                        isNameOnListMap = true;
                    }
                }
                if (!isNameOnListMap) {
                    person = [elementKills[0], elementKills[1]];
                }

                isNameOnListMap = false;

                for (let i = 0; i < namesMap.length; i++) {
                    const element1 = namesMap[i][1];
                    if (element1 == DeathsOnMap[index1][1] && namesMap[i][0] === DeathsOnMap[index1][0]) {
                        isNameOnListMap = true;
                    }
                }
                if (!isNameOnListMap) {
                    person = [elementKills[0], DeathsOnMap[index1][1]];
                }

                if (person[0] != null) {
                    namesMap.push(person);
                }
            }
        }
    }
    //  console.log(namesMap)
    let bigArray = [];
    for (let index1 = 0; index1 < namesMap.length; index1++) {
        const element = namesMap[index1];
        let names = [];
        for (let index = 0; index < namesMap.length; index++) {
            const element1 = namesMap[index];


            if (element1[0] === element[0]) {
                names.push(element1[1])
            }
        }


        bigArray.push([element[0], `${names}`]);


    }

    function removeDuplicates(array) {
        let x = {};
        array.forEach(function (i) {
            if (!x[i]) {
                x[i] = true
            }
        })
        return Object.keys(x)
    };
    bigArray = removeDuplicates(bigArray);

    Array.from(new Set(bigArray));
    let displayString = "";
    for (let index = 0; index < bigArray.length; index++) {
        bigArray[index] = bigArray[index].split(",");
    }
    for (let index = 0; index < bigArray.length; index++) {
        const element = bigArray[index];
        displayString += `<strong>${element[0]}</strong> <br>`
        for (let index1 = 1; index1 < element.length; index1++) {
            const element1 = element[index1];
            displayString += `${element1} <br>`
        }
    }
    // console.log(bigArray)




    let biggerArray = [];

    // console.log(KillsOnMap)
    // console.log(bigArray[5])
    for (let index = 0; index < bigArray.length; index++) { //big array [["map", player, player etc.], ["map", player, player etc.]] KillsOnMap ["Map", player]
        const element1 = bigArray[index];
        let killDeathMap = [];
        for (let i = 1; i < element1.length; i++) {

            const element2 = element1[i];

            //console.log(element1)

            //console.log(element2)
            let deathsMap = 0;
            let killsMap = 0;
            for (let index = 0; index < KillsOnMap.length; index++) {
                const element = KillsOnMap[index];

                if (element[1] === element2 && element[0] === element1[0]) {

                    killsMap++;
                }
            }
            for (let index = 0; index < DeathsOnMap.length; index++) {
                const element = DeathsOnMap[index];
                if (element[1] === element2 && element[0] === element1[0]) {
                    deathsMap++;
                }
            }
            let kd = 0;
            if (deathsMap == 0) {
                kd = killsMap;
            } else {
                kd = killsMap / deathsMap;
            }
            killDeathMap.push([element2, kd.toFixed(2), killsMap, deathsMap]);
        }
        //console.log(killDeathMap)
        var sortedArrayOfNameKDKillsDeathsMap = killDeathMap.sort(function (a, b) {
            return b[1] - a[1];
        });
        biggerArray.push([element1[0], sortedArrayOfNameKDKillsDeathsMap])
    }

    //  console.log(biggerArray[0][1])
    // console.log(biggerArray)

    for (let index = 0; index < biggerArray.length; index++) {
        newDispaly = "";
        let element = biggerArray[index];
        let colour = "";
        for (let index = 0; index < maps.length; index++) {
            const element1 = maps[index];
            if (element[0] === element1.name) {
                colour = element1.colour;
            }
        }
        newDispaly += `<br> <strong>${element[0]}</strong> <br>`
        for (let index = 0; index < listOfMaps.length; index++) {
            const map = listOfMaps[index];
            if (element.indexOf(map) != -1) {
                element.splice(element.indexOf(map), 1);
            }
        }
        // element = element.filter(function (x) {
        //     return !!x;
        // });
        for (let index1 = 0; index1 < element.length; index1++) {
            const element1 = element[index1];
            //  console.log(element1);

            //element1.splice(0, 1);
            for (let index = 0; index < element1.length; index++) {
                const element2 = element1[index];
                //  console.log(element2);
                newDispaly += `${element2[0]} ${element2[2]}-${element2[3]} [${element2[1]}]<br>`
            }
        }
        displayArray.push(newDispaly);
        $("#mapKillFeed").append(`<p class="${colour}" ${newDispaly} `);
        $(`.${colour}`).css({
            'border': `5px solid ${colour}`
        });

    }
    // console.log(colourOfMaps);
    //loop over map, check the colour with maps variable. Create a new pargraph tag, and give it the corresponding colour in the loop.

    // $("#mapKillFeed").html(newDispaly);




    //console.log(sortedArrayOfNameKDKillsDeathsMap)
    // KillsOnMap.push(element.substr(element.indexOf(pattern) + pattern.length, element.length).split(" ")[1].split("\n")[0]);
    // DeathsOnMap.push(element.substr(0, element.indexOf(pattern)).split(" ")[1]);
    // console.log(KillsonMap);
    // console.log(DeathsOnMap)
    for (let index = 0; index < newArrayTest.length; index++) {
        const element = newArrayTest[index];
        if (element.indexOf(pattern) >= 0) {
            before.push(element.substr(element.indexOf(pattern) + pattern.length, element.length).split(" ")[1].split("\n")[0]);
            after.push(element.substr(0, element.indexOf(pattern)).split(" ")[1]);
        }
    }
    for (let index = 0; index < before.length; index++) {
        const element = before[index];
        before[index] = element.substr(0, element.length - 1)
    }
    let names = [];
    let kills = 0;
    let deaths = 0;
    let isNameOnList = false;
    for (let index = 0; index < before.length; index++) {
        const element = before[index];
        for (let i = 0; i < names.length; i++) {
            const element1 = names[i];
            if (element1 == element) {
                isNameOnList = true;
            }
        }
        if (!isNameOnList) {
            names.push(element);
        } else {
            isNameOnList = false;
        }
    }
    isNameOnList = false;
    for (let index = 0; index < before.length; index++) {
        const element = after[index];
        for (let i = 0; i < names.length; i++) {
            const element1 = names[i];
            if (element1 == element) {
                isNameOnList = true;
            }
        }
        if (!isNameOnList) {
            names.push(element);
        } else {
            isNameOnList = false;
        }
    }
    let killDeath = names.map(function (name, i) {
        deaths = 0;
        kills = 0;
        for (let index = 0; index < before.length; index++) {
            const element = before[index];
            if (element === name) {
                kills++;
            }
        }
        for (let index = 0; index < after.length; index++) {
            const element = after[index];
            if (element === name) {
                deaths++;
            }
        }
        let kd = 0;
        if (deaths == 0) {
            kd = kills;
        } else {
            kd = kills / deaths;
        }
        return [name, kd, kills, deaths];
    });
    var sortedArrayOfNameKDKillsDeaths = killDeath.sort(function (a, b) {
        return b[1] - a[1];
    });

    for (let index = 0; index < sortedArrayOfNameKDKillsDeaths.length; index++) {
        const element = sortedArrayOfNameKDKillsDeaths[index];
        lastArray[index] = `${element[0]}: ${element[2]}-${element[3]} [${element[1].toFixed(2)}] <br>`
    }
    test1 = before.map(function (before, i) {
        return `${(i-after.length) * -1}: ${after[i]} was painted by ${before}! <br>`;
    });
    test1.reverse();
    //returnPages(pages, "List of kills from game: ", message, " Kill Feed ");
    $("#output").html(lastArray)
    $("#killFeed").html(test1)
    if (lastArray[0] == null) {
        $("#output").html("Input invalid")
    }






    let pastebinVariable = `Kill feed: \r ${lastArray} \r MapKillFeed: \r ${displayArray} \r Full kill feed: ${test1}`
    return pastebinVariable;
    //let footer = `Extra statistics provided by Vinay, want to get them for yourself? Visist kd`
    // pastebin = new PastebinAPI('RYdwev9iGvA-N-m6xtm6s7UtiCMiaE9u');
    // pastebin
    //     .createPaste("Test from pastebin-js", "pastebin-js")
    //     .then(function (data) {
    //         // paste succesfully created, data contains the id
    //         console.log(data);
    //     })
    //     .fail(function (err) {
    //         // Something went wrong
    //         console.log(err);
    //     })
    // pastebin
    //     .getPaste('ADqWAjX5')
    //     .then(function (data) {
    //         // data contains the raw paste
    //         console.log(data);
    //     })
    //     .fail(function (err) {
    //         // Something went wrong
    //         console.log(err);
    //     })
    // pastebin

    //     .createPaste({
    //         text: "This is a private paste",
    //         title: "Private",
    //         format: null,
    //         privacy: 2,
    //         expiration: '10M'
    //     })

    //     .then(function (data) {
    //         // paste succesfully created, data contains the id
    //         console.log(data);
    //     })
    //     .fail(function (err) {
    //         // Something went wrong
    //         console.log(err);
    //     })
    // var request = new XMLHttpRequest();

    // request.open("POST", "https://pastebin.com/api/api_post.php", true);

    // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // request.send("RYdwev9iGvA-N-m6xtm6s7UtiCMiaE9u&api_option=paste&api_paste_private=1&api_paste_name=KD&api_paste_expire_date=10M&api_paste_format=javascript&api_paste_code=pastebinVariable");

    // console.log(test);
    // } catch (err) {
    //     $("#output").html("Error")
    // }
}