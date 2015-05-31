/** the direction centrol of this code
 *
 * @author MephistoPheies
 */


window.Direction = {

    topMargin:'0',                         //上下边框
    section : 4,


    npcMaxSize : 35,                        //npc最大大小
    npcMinSize : 5,                         //npc最小大小
    npcNumber: 40,                          //npc求的
    selfSize : 10,                          //自机大小                      
    aimSize : 20,                           //终点大小
    protectSize: 20,                        //保护层大小
    protectNum:3,                           //保护层数量
    speed : 100/1000,                             //球的速度
    aimColor:"rgba(10,232,243,0.5)",         //目标颜色
    npcColor:["gold","red","cornflowerblue","purple","greenyellow"],                      //npc颜色
    selfColor:"#bbffbb",                   //自己颜色
    protectColor:"rgba(255,255,5,0.6)",   //保护区颜色

    quadObjects:5,                          //quad节点含得球数
    quadLevels:8,                           //quad得深度



    canvasHeightRate:0.8,                 //画布高度比例
    canvasWidthRate:0.9,                  //画布宽度比例
    stopColor:"#5c2699",                           //停止按钮颜色
    startColor:"gold",                          //开始按钮颜色
    animationtime:900                       //滚动动画时间
}
