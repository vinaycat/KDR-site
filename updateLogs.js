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
    try {
        let pattern = "was painted by";

        let newArrayTest = logs.split("[CHAT]");
        let before = [];
        let after = [];
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
        //returnPages(pages, "List of kills from game: ", message, " Kill Feed ");
        $("#output").html(lastArray)
        $("#killFeed").html(test1)
        if(lastArray[0] == null){
            $("#output").html("Input invalid")
        }
    } catch(err){
        $("#output").html("Error")
    }
}