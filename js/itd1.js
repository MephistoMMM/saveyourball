/**
 * canvas1
 * control
 * @xana 2015/6
 */
 
(function(window){

    var x,y,w,h
    var direction
    var speed = 2

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

            update(direction)
            render(ctx)

        }, 20)

    }



    function getDiretion(){

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


    function render(ctx){

        ctx.clearRect(0,0,w,h)

        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.arc(w-x, h-y, 15, 0,Math.PI*2)
        ctx.closePath()
        ctx.fill()


    }

}(window));

