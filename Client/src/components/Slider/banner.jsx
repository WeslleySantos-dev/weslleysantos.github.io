let count = 1


setInterval(async function () {
    nextbanner();
}, 5000)

function nextbanner() {
    if (document.getElementById("radio1")) {
        if (document.getElementById("radio1").checked) {
            console.log("1");
            console.log({ count });
            console.log("radio1", document.getElementById("radio1").checked);
            count = 2;


        } else if (document.getElementById("radio2").checked) {
            console.log("2");
            console.log({ count });
            count = 3;
        } else if (document.getElementById("radio3").checked) {
            console.log("3");
            console.log({ count });
            count = 4;
        } else if (document.getElementById("radio4").checked) {
            console.log("4");
            console.log({ count });
            count = 1;
        }

        if (count > 4) {
            count = 1;
        }
        document.getElementById("radio" + count).checked = true;


    }


}

