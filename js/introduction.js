/**
 * the img of the first page
 *
 * @xana 2015/5/30
 */

(function(window){

	window.addEventListener("load",start0,false)  

	function start0() {


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
                ctx.drawImage(img, 80+20*Math.random(), 20*Math.random(), 600, 388)
            }, 50)

        }



	};
}(window))
