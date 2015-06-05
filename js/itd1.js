/**
 * canvas1
 * control
 * @xana 2015/6
 */
 
(function(window){

    var x,y,w,h
    var direction
    var speed = 4
    var slowSpeed = 2
    var slow = true

    //window.onload = start2
    window.addEventListener("load",start2,false);


    function start2() {

        var canvas1 = document.getElementById("canvas1")
        var ctx = canvas1.getContext("2d")

        w = canvas1.width = 300
        h = canvas1.height = 300


        x = Math.round(w/3)
        y = Math.round(h/3)



        setInterval(function(){

            direction = getDiretion()

            if(slow==true){
                updateS(direction)
            } else {
                update(direction)
            }
            //console.log(slow)
            render(ctx)

        }, 20)

    }



    function getDiretion(){

        //change the speed
        if(x == Math.round(w/3) && y == Math.round(h/3)){
            slow = !slow
        }

        if(x==w*2/3 && y>h/3){
            return 0
        }if(y==h*2/3 && x<w*2/3){
            return 1
        }if(x==w/3 && y<=h*2/3){
            return 2
        }if(y==h/3 && x>w/3){
            return 3
        }


    }


    function update(d){

        switch(d){
            case 0: y-=speed;break
            case 1: x+=speed;break
            case 2: y+=speed;break
            case 3: x-=speed;break
        }
    }


    function updateS(d){

        switch(d){
            case 0: y-=slowSpeed;break
            case 1: x+=slowSpeed;break
            case 2: y+=slowSpeed;break
            case 3: x-=slowSpeed;break
        }
    }


    function render(ctx){

        ctx.clearRect(0,0,w,h)

        //your ball
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()

        ctx.strokeStyle = "#000000"

        var shift = slow ? "shitf + " : ""
        var dire
        switch (direction){
            case 0: dire = "W";break
            case 1: dire = "D";break
            case 2: dire = "S";break
            case 3: dire = "A";break
        }

        ctx.font = "20px Arial"
        ctx.fillText(shift, 130, 140)
        ctx.fillText(dire, 150, slow ? 170 : 150)





    }

}(window));

