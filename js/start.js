/**
 * Created by FusGoethe on 15/5/25.
 */

var DealScroll = window.DealScroll,
    gameSetup = window.gameSetup; 

window.onload = function(){

    //调整全局
    DealScroll.init();

    //安装游戏
    gameSetup();

}
