var acc = document.getElementsByClassName("accordion");
var i;
var len = acc.length;
for (i = 0; i < len; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
$(function () {
    $("#propertyValue").maskMoney({ prefix: "£", precision: 0, allowNegative: false });
});

//form value transfer
function handleSubmit() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var contactnumber = document.getElementById("contactnumber").value;
    var email = document.getElementById("email").value;

    sessionStorage.setItem("firstnamevalue", firstname);
    sessionStorage.setItem("lastnamevalue", lastname);
    sessionStorage.setItem("contactnumbervalue", contactnumber);
    sessionStorage.setItem("emailvalue", email);

    return false;
}

// date of birth formet

// var date = document.getElementById("dateofbirth");

// function checkValue(str, max) {
//     if (str.charAt(0) !== "0" || str == "00") {
//         var num = parseInt(str);
//         if (isNaN(num) || num <= 0 || num > max) num = 1;
//         str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? "0" + num : num.toString();
//     }
//     return str;
// }
var cleave = new Cleave("#dateofbirth", {
    date: true,
    delimiter: "/",
    datePattern: ["d", "m", "Y"],
});

date.addEventListener("input", function (e) {
    this.type = "text";
    var input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
        return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + " / " : v;
    });
    this.value = output.join("").substr(0, 14);
});

date.addEventListener("blur", function (e) {
    this.type = "text";
    var input = this.value;
    var values = input.split("/").map(function (v, i) {
        return v.replace(/\D/g, "");
    });
    var output = "";

    if (values.length == 3) {
        var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
        var month = parseInt(values[0]) - 1;
        var day = parseInt(values[1]);
        var d = new Date(year, month, day);
        if (!isNaN(d)) {
            document.getElementById("result").innerText = d.toString();
            var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
            output = dates
                .map(function (v) {
                    v = v.toString();
                    return v.length == 1 ? "0" + v : v;
                })
                .join(" / ");
        }
    }
    this.value = output;
});
var cleave = new Cleave("#dateofbirth", {
    date: true,
    delimiter: "-",
    datePattern: ["d", "m", "Y"],
});
