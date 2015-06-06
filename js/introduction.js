/**
 * the img of the first page
 *
 * @xana 2015/5/30
 */

(function(window){

	window.addEventListener("load",start0,false)  

	function start0() {

        var frame = true;

		img = new Image();
		img.src = "img/mf1.jpg"


		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		canvas.width = 800;
		canvas.height = 400;

        ctx.backgroundColor = "#000"

		ctx.strokeStyle = "#FFFFFF";
		ctx.fillStyle = "#FFFFFF";



        img.onload = function() {
            setInterval(function () {
                ctx.clearRect(0, 0, 800, 400);
                ctx.drawImage(img, frame ? 90 : 110, frame ? 0 : 20, 600, 388)
                frame = !frame
            }, 300)

        }



	};
}(window))
