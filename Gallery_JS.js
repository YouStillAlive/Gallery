"use strict";
$(document).ready(function () {
    let imgArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];
    let isPlay = false;
    let idTimer;

    $(function main() {
        changeBackground(imgArr[0]);

        for (let i = 0; i < imgArr.length; i++) {
            let img = document.createElement("img");
            img.name = imgArr[i];
            img.id = "0";
            $(".pointers").append(img);
            i == 0 ? img.src = "icons/" + "pointer.png" : img.src = "icons/" + "clear_point.png";
        }
        document.images[0].id = "1";
    });

    $(".pointers").click(function (event) {
        if (event.target.src.slice(event.target.src.length - 15) !== "clear_point.png") {
            return;
        }
        $("#1")[0].id = "0";
        changeBackground(event.target.name);
        clearPoints();
        event.target.src = "icons/" + "pointer.png";
        event.target.id = "1";
    });

    $(".bigCat").click(function () {
        $(this).css({
            width: "100vw",
            height: "100vh"
        });
    });

    function changeBackground(image) {
        $(".bigCat").css({
            "background": "no-repeat url(\"images/" + image + "\")"
        });
    }

    $("#first").click(() => { choosePic(0); });

    $("#last").click(() => { choosePic(imgArr.length - 1) });

    $("#before").click(function () {
        let point = document.getElementById("1");
        if (imgArr.indexOf(point.name) > 0) {
            changePic(imgArr.indexOf(point.name) - 1);
            point.previousElementSibling.id = "1";
            point.id = "0";
        }
    });

    $("#next").click(function () {
        let point = document.getElementById("1");
        if (imgArr.indexOf(point.name) < imgArr.length - 1) {
            changePic(imgArr.indexOf(point.name) + 1);
            point.nextElementSibling.id = "1";
            point.id = "0";
        }
    });

    $("#play").click(function () {
        if (document.images[imgArr.length + 2].src.slice(document.images[imgArr.length + 2].src.length - 8) === "Play.png") {
            document.images[imgArr.length + 2].src = "icons/" + "Pause.png";
            isPlay = true;
            slideShow();
            idTimer = setInterval(slideShow, 1000);
        }
        else {
            isPlay = false;
            document.images[imgArr.length + 2].src = "icons/" + "Play.png";
        }
    });

    function choosePic(index) {
        changeBackground(imgArr[index]);
        clearPoints();
        document.getElementById("1").id = "0";
        document.images[index].id = "1";
        document.images[index].src = "icons/" + "pointer.png";
    }

    function changePic(i) {
        let index;
        changeBackground(imgArr[index = i]);
        clearPoints();
        document.images[index].src = "icons/" + "pointer.png";
    }

    function clearPoints() {
        for (let i = 0; i < document.images.length; i++) {
            if (document.images[i].src.slice(document.images[i].src.length - 11) === "pointer.png")
                document.images[i].src = "icons/" + "clear_point.png";
        }
    }

    $(".bigCat").click(function () {
        $(this).css({
            height: "80%",
            width: "100%"
        });
        if (!isPlay)
            $.fancybox.open({
                src: "images/" + document.getElementById("1").name,
                protect: true
            });
    });

    function slideShow() {
        let currentItem = imgArr.indexOf($("#1")[0].name.slice($("#1")[0].name.length - ($("#1")[0].name.length - 1 - parseInt($("#1")[0].name.lastIndexOf("/")))));
        if (isPlay && currentItem < imgArr.length - 1 && currentItem !== -1) {
            $(".bigCat").fadeOut("slow", function () { $("#next").click() });
            $(".bigCat").fadeIn("slow");
        }
        else {
            clearInterval(idTimer);

            document.images[imgArr.length + 2].src = "icons/" + "Play.png";

        }
    }
});