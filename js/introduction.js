/**
 * the img of the first page
 *
 * @xana 2015/5/30
 */

(function(window){

	window.addEventListener("load",start0,false)  

	function start0() {

		img = new Image();
		img.src = "img/1.png"


		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		canvas.width = 800;
		canvas.height = 400;

		ctx.strokeStyle = "#FFFFFF";
		ctx.fillStyle = "#FFFFFF";

		ctx.rect(0,0,800,400);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(100,100);
		ctx.stroke();
		ctx.closePath();

		img.onload = function(){ctx.drawImage(img,100,0,600,388)}

	};
}(window))
