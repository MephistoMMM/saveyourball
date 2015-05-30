
/** the engine of game
 *  this is the core of this work
 *
 *@author MephistoPheies
 */


//所有点的仓库
var __pointstore = {},
    __canvas={},
    __context={},
    __gamebutton={},
    __isGamePlay = false,                                           //游戏是否进行中
    __isDead = true,                                                //是否已经挂了
    __QUAD ,

    Direction = window.Direction,
    STOPCOLOR = Direction.stopColor,
    STARTCOLOR = Direction.startColor,

    AIMCOLOR = Direction.aimColor,
    SELFCOLOR = Direction.selfColor,
    NPCCOLOR = Direction.npcColor,
    PROTECTCOLOR = Direction.protectColor,
    SELFSIZE = Direction.selfSize,
    NPCNUMBER = Direction.npcNumber,
    NPCMAXSIZE = Direction.npcMaxSize,
    NPCMINSIZE = Direction.npcMinSize,
    SPEED = Direction.speed,
    PROTECTNUM = Direction.protectNum,
    PROTECTSIZE = Direction.protectSize,
    AIMSIZE = Direction.aimSize,

    HEIGHTRATE = Direction.canvasHeightRate,
    WIDTHRATE = Direction.canvasWidthRate;


//安装游戏
function game_setup(){

    __canvas = document.body.querySelector("#game");
    __gamebutton.div = document.body.querySelector("#replay");
    __gamebutton.start = document.body.querySelector("#play");
    __gamebutton.stop = document.body.querySelector("#stop");

    //setup controlor
    __gamebutton.div.addEventListener("mousedown",E_game_control,false);

    //调整canvas大小
    __canvas.style.height =HEIGHTRATE;
    __canvas.style.width = WIDTHRATE;

    //设置绘图环境
    __context = __canvas.getContext("2d");

    __QUAD = new window.QUAD();


    //init button
    __gamebutton.start.style.display="block";
    __gamebutton.start.style.display="none";
    __gamebutton.div.style.background=STARTCOLOR;


}



/**game engine for calculate and draw
 *
 */
function game_engine(){

    __context.clearRect(0,0,__canvas.offsetWidth,__canvas.offsetHeight);
    __QUAD.clear();

    var i =0;

    //close engine while not isGamePlay.
    if(!__isGamePlay) return;

    //run npc point and draw npc point
    for(i=0;i<__pointstore.npc.length;i++){
        __QUAD.insert(__pointstore.npc[i]);
        __pointstore.npc[i].run().draw();
    }

    for(i=0;i<__pointstore.protect.length;i++)
        __QUAD.insert(__pointstore.protect[i]);


    //run and draw self point
    __QUAD.insert(__pointstore.self);
    __pointstore.self.run().draw();

    __QUAD.insert(__pointstore.aim);


    if(                                                                         //判断胜利
        Point.distance(__pointstore.self,__pointstore.aim)
         < __pointstore.self.size /4
         ){
        __isDead=true;
        game_win();
        return false;
    }

    //判断与自己点碰撞得球
    var selfCollidors = __QUAD.retrieve(__pointstore.self);

    for(i=0;i<selfCollidors.length;i++){

        if(__pointstore.self === selfCollidors[i])
            continue;
    
        if(Point.compete(
                    __pointstore.self,
                    selfCollidors[i]
                    )){
            //selfCollidors[i]为npc球
            if(selfCollidors[i].id === 2){                                          //判断失败否
                __isDead = true;
                game_fail();
                return;
            }
        }
    }


    i=0
    while(i < __pointstore.npc.length){                                         //只需要判断会移动得球(npc)
    
        var collidors = __QUAD.retrieve(__pointstore.npc[i]);

        for(var j=0;j<collidors.length;j++){
        
            //已经判断过的球跳过,和该球本身
            if(
                collidors[j].hasJudge ||
                __pointstore.npc[i] === collidors[j]
                ) continue;

            //发生碰撞就改变方向
            if(Point.compete(
                        __pointstore.npc[i],
                        collidors[j]
                        )){
                collidors[j].change();
                __pointstore.npc[i].change();

            }
        }

        __pointstore.npc[i].hasJudge=true;
    }


    setTimeout(game_engine,50);


}


/**game win
 */
function game_win(){

}

/**game fail
 */
function game_fail(){

}


/**if dead,we need fresh all point
 */
function game_reborn(){

    var height = __canvas.offsetHeight,
        width = __canvas.offsetWidth;

    //产生新的npc点
    function new_npc_points(){

        //clear all firstly
        __pointstore.npc = []

        for(var i=0;i<NPCNUMBER;i++){

        
            var x = Math.random()*width,
                y = Math.random()*height,
                size = Math.random()*(NPCMAXSIZE-NPCMINSIZE)+NPCMINSIZE,
                isThisPoint = true;


            //judge point until find a suitable point
            while(true){
            
                //judge whether need this point
                if( x-size <= 0 || x+size >= width ||
                    y-size <= 0 || y + size >= height )
                    isThisPoint = false;

                //find out
                if(isThisPoint) break;

                x = Math.random()*width;
                y = Math.random()*height;
                size = Math.random()*(NPCMAXSIZE-NPCMINSIZE)+NPCMINSIZE;
            }


            __pointstore.npc.push(new Point(
                        
                        2,
                        x,
                        y,
                        SPEED,
                        Math.random()*2*Math.PI-Math.PI,
                        size

                        ));
            
        }
    }


    //set protect Point
    function set_protect_points(){

        //clear all firstly
        __pointstore.protect = []

        for(var i=0;i<NPCNUMBER;i++){
        
            var x = Math.random()*width,
                y = Math.random()*height,
                size = PROTECTSIZE,
                isThisPoint = true;


            //judge point until find a suitable point
            while(true){
            
                //judge whether need this point
                if( x-size <= 0 || x+size >= width ||
                    y-size <= 0 || y + size >= height )
                    isThisPoint = false;

                //find out
                if(isThisPoint) break;

                x = Math.random()*width;
                y = Math.random()*height;
            }

            __pointstore.protect.push(new Point(
                        
                        3,
                        x,
                        y,
                        0,
                        0,
                        size

                        ));

        }
    }


    
    //set aim
    function set_aim_points(){

        __pointstore.aim = new Point(
                
                1,
                width - AIMSIZE,
                height - AIMSIZE,
                0,
                0,
                AIMSIZE

                );
    }


    //set self Point
    function get_self_points(){
    
        __pointstore.self = new Point(
                
                0,
                PROTECTSIZE,
                PROTECTSIZE,
                0,
                0,
                SELFSIZE
                
                )
    }


    console.log("game_reborn");

    //设置好点
    set_protect_points();
    new_npc_points();
    set_aim_points();
    get_self_points();
    __isDead = false;
    console.log("game_reborn_over");

}



/*---------------------------------------------------EventListern--------------------------------------------------*/




/** game controlor 
 *  it well change the color of div and stop canvas_draw
 */
function E_game_control(){

    //将start按钮改为stop按钮
    function change_start_to_stop(){
        __gamebutton.start.style.display="none";
        __gamebutton.stop.style.display = "block";
        __gamebutton.div.style.background=STOPCOLOR;

    }
    //modify stop button to start button;
    function change_stop_to_start(){
        __gamebutton.start.style.display="block";
        __gamebutton.start.style.display="none";
        __gamebutton.div.style.background=STARTCOLOR;
    
    }

    //add keydown listern
    function add_key_down(){
        window.onkeydown=E_game_keydown;
        window.onkeyup= E_game_keyup;
    }

    //remove keydown listern
    function remove_key_down(){
        window.onkeydown=function(e){return false};
        window.onkeyup = function(e){return false};
    }

    //fresh date for accurate 
    function fresh_date(){
    
        for(var i = 0;i<__pointstore.npc.length;i++)
            __pointstore.npc[i].timeFresh();

        __pointstore.self.timeFresh();
    }

    console.log("downStart");

    __isGamePlay = !__isGamePlay;

    //死了就重生
    if(__isDead)
        game_reborn();


    //当被设为开启状态时，除了换颜色，还需要重启引擎
    if(__isGamePlay){
        console.log("start");
        change_start_to_stop();
        console.log("change_stop_to_start");
        add_key_down();
        console.log("add_key_down");
        fresh_date();
        console.log("fresh_date");
        game_engine();
        console.log("game_setup");

    }else{
        change_stop_to_start();
        remove_key_down();

    }

}


/** define the way to deal keydown
 *
 * @params event
 */
function E_game_keydown(e){

}




/** define the way to deal keyup
 *
 * @params event
 */
function E_game_keyup(e){

}

/*-----------------------------------------------------class-----------------------------------------------------*/

/** Points
 */
function Point(id,x,y,v,a,size){

    this.size;
    this.x;
    this.y;
    this.v;
    this.a;                                             //-PI ~ PI,the direction of this Point

    this.id;                                            //the level of the this Point
    this.timeStamp = new Date();
    this.hasJudge = false;                              //set it to true while has judge

}



//tow Points collid 
Point.prototype.change = function(){

    this.a = this.a < 0 
                    ? -( Math.PI + this.a )
                    : ( Maht.PI - this.a);
}



//更新x与y，以及this.timeStamp
Point.prototype.run = function(){

    var date = new Date();

    //碰到墙壁后根据相应得代码改变this
    if(this.x-this.size < 0 || 
            this.x+this.size > __canvas.offsetWidth)
        this.change();

    if(this.y-this.size < 0 || 
            this.y+this.size > __canvas.offsetHeight)
        this.a = -this.a;

    this.x += this.v*(date - this.timeStamp)*Math.cos(this.a);
    this.y += this.v*(date - this.timeStamp)*Math.sin(this.a);

    this.timeStamp =date;
    this.hasJudge =false;

    return this;
}



/** fresh those timeStamp
 */
Point.prototype.timeFresh = function(){

    this.timeStamp = new Date();
}



//画点
Point.prototype.draw =function(){

    //draw Point by its id
    switch(this.id){
    
        //画自己
        case 0: drawEasePoints(SELFCOLOR);
                break;

        //画终点
        case 1: drawEasePoints(AIMCOLOR);
                break;

        //画npc
        case 2: drawEvil();
                break;

        //画保护点·
        case 3: drawEasePoints(PROTECTCOLOR);
                break;
    }


    //draw PROTECT and aimPoint and selfPoint
    function drawEasePoints(color){
    
        __context.save();
        __context.translate(this.x,this.y);

        __context.beginPath();
        __context.arc(0,0,this.size,0,Math.PI*2,true);
        __context.fillStyle = color;
        __context.fill();

        __context.restore
    }


    //draw evil points ,NPC
    function drawEvil(){
    

        var s = this.size;

        __context.save();
        __context.translate(this.x,this.y);

        __context.beginPath();
        __context.arc(0,0,this.size/4,0,Math.PI*2,true);
        __context.closePath();
        __context.fillStyle =NPCCOLOR; 
        __context.fill();

        __context.beginPath();
        __context.strokeStyle = NPCCOLOR;

        var dx = Math.sin(0);
        var dy = Math.cos(0);
        var dig = Math.PI / 7*11;

        for(var i = 0; i<14 ;i ++){

            dx = Math.sin(i*dig);
            dy = Math.cos(i*dig);

            __context.lineTo(dx*s,dy*s);
        }

        __context.closePath();
        __context.stroke();

        __context.restore();

    }
}




/*-----------Class Methon ---------------------*/

/**比较两个球的距离差与半径和
 *
 * @params p1
 * @params p2
 * @return{boolean} true if collid
 */
Point.compete = function(p1,p2){
    
    var distance = (p1.x-p2.x)*(p1.x-p2.x)+
                   (p1.y-p2.y)*(p1.y-p2.y),
        sizeSum = (p1.size + p2.size)*(p1.size + p2.size);

    return sizeSum >= distance;

}


/** 得到圆心距得平方
 */
Point.distance = function(p1,p2){

    return (p1.x-p2.x)*(p1.x-p2.x)+ (p1.y-p2.y)*(p1.y-p2.y);

}


/*--------------------------------------------------------------other----------------------------------------------*/

window.gameSetup = game_setup;
