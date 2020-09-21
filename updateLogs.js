let boolean = false;
// function myFunction(){
//     $('#output').attr("`)
//     $("h1").html("test")
// }
let logs;
$("#submit").click(function () {
    console.log("clicked")
    //var linkText = $("#output").text();

    logs = $("#exampleInputEmail2").val();
    KD(logs);

})

function KD(logs) {
    // try {
    let pattern = "was painted by";

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
    //console.log(KillsOnMap);
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
        const element = bigArray[index];
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
    



    console.log(`Big array: ${bigArray}`);
    let biggerArray = [];

    for (let index = 0; index < bigArray.length; index++) {
        const element1 = bigArray[index];
        let killDeathMap = element1.map(function (bigArray, i) {
            if (i != 0) {
                let deathsMap = 0;
                let killsMap = 0;
                for (let index = 0; index < KillsOnMap.length; index++) {
                    const element = KillsOnMap[index];

                    if (element[1].indexOf(bigArray) != -1 && element[0] === element1[0]) {

                        killsMap++;
                    }
                }
                for (let index = 0; index < DeathsOnMap.length; index++) {
                    const element = DeathsOnMap[index];
                    if (element[1].indexOf(bigArray) != -1 && element[0] === element1[0]) {
                        deathsMap++;
                    }
                }
                let kd = 0;
                if (deathsMap == 0) {
                    kd = killsMap;
                } else {
                    kd = killsMap / deathsMap;
                }
                return [bigArray, kd.toFixed(2), killsMap, deathsMap];
            }
        });
        //console.log(killDeathMap);
        var sortedArrayOfNameKDKillsDeathsMap = killDeathMap.sort(function (a, b) {
            return b[1] - a[1];
        });
        biggerArray.push([element1[0], sortedArrayOfNameKDKillsDeathsMap])
    }
    let newDispaly = "";
    for (let index = 0; index < biggerArray.length; index++) {
        let element = biggerArray[index];
        newDispaly += `<br> <strong>${element[0]}</strong> <br>`
        for (let index = 0; index < listOfMaps.length; index++) {
            const map = listOfMaps[index];
            if(element.indexOf(map) != -1){
                element.splice(element.indexOf(map),1);
            }
        }
        element = element.filter(function(x){
            return !!x;
        });
        for (let index1 = 0; index1 < element.length; index1++) {
            const element1 = element[index1];
          //  console.log(element1);
          
           element1.splice(0,1);
             for (let index = 0; index < element1.length - 1; index++) {
                 const element2 = element1[index];
               console.log(element2);
               newDispaly += `${element2[0]} ${element2[2]}-${element2[3]} [${element2[1]}]<br>`
            }
        }
    }

    $("#mapKillFeed").html(newDispaly);




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
    let lastArray = [];
    for (let index = 0; index < sortedArrayOfNameKDKillsDeaths.length; index++) {
        const element = sortedArrayOfNameKDKillsDeaths[index];
        lastArray[index] = `${element[0]}: ${element[2]}-${element[3]} [${element[1].toFixed(2)}] <br>`
    }
    let test1 = before.map(function (before, i) {
        return `${(i-after.length) * -1}: ${after[i]} was painted by ${before}! <br>`;
    });
    test1.reverse();
    //returnPages(pages, "List of kills from game: ", message, " Kill Feed ");
    $("#output").html(lastArray)
    $("#killFeed").html(test1)
    if (lastArray[0] == null) {
        $("#output").html("Input invalid")
    }
    // } catch (err) {
    //     $("#output").html("Error")
    // }
}