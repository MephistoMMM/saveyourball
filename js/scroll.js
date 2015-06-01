/**
 * Created by FusGoethe on 15/5/25.
 *
 * @author MephistoPheies
 */

/* deal windows scroll and windows screen change*/


(function(window){

    var Direction = window.Direction,
        TOPMARGIN = Direction.topMargin,
        HEADERCANVASWIDTH = Direction.headerCanvasWidth,
        HEADERCANVASHEIGHT = Direction.headerCanvasHeight,
        SECTION = Direction.section,
        ANIMATIONTIME = Direction.animationtime;


    function DealScroll(){

        //the space between divs
        this.space = TOPMARGIN;
        //get all divs
        this.divs; 
        //向下移动的按钮
        this.buttun;

        //网页屏幕大小
        this.offsetHeight= window.screen.height; 
    }




    /**modify all height of div
     */
    DealScroll.prototype.init= function(){


        //如果没有元素，则直接获取
        this.divs = document.body.querySelectorAll('.screen');
        this.buttun = document.body.querySelector('#goTo');

        //给div设置高
        for(var i=0;i<this.divs.length;i++){
            this.divs[i].style.height = this.offsetHeight + 'px';
            this.divs[i].style.margin = this.space+' 0';
        }


        //给按钮做动画
        this.buttun.querySelector('p').style.left = document.body.offsetWidth /2 +'px';
        this.buttun.addEventListener("mousedown",this.__mouseDown(),false);




        //modify body;
        document.body.style.height= 4* this.offsetHeight +'px';


        



    }








    //goTo按钮点击函数
    DealScroll.prototype.__mouseDown = function(){

        var self = this;

        return function (){

            //移动动画
            __sd(document.body.scrollTop,new Date(),self.offsetHeight);
        
        }
    }

    /*--------------------------------------------------dependence fn----------------------------------------------------------*/

    /** 循环做动画
     *
     * @nstation 当前位置
     * @ntime    当前时间
     */
    function __sd(nstation,ntime,mstation){

        var A = (new Date() - ntime)/ANIMATIONTIME;

        //限定A的范围0~1
        A = A <0? 0: A >1 ? 1:A;
        A = A*A*(3-2*A);

        nstation = A*(mstation-nstation)+ nstation;

        //移动滚轮
        window.scrollTo(0,nstation);

        //结束动画
        if(A >=1 ) return;

        //动画循环
        setTimeout(function(){
            __sd(nstation,ntime,mstation);
        },50);


    }




    /*--------------------------------------------------explore API----------------------------------------------------------*/
    window.DealScroll = new DealScroll();

}(window))
