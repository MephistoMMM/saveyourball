/**
 * Created by FusGoethe on 15/5/25.
 */

var DealScroll = window.DealScroll,
    gameSetup = window.gameSetup,
    Item1Adjust = window.Item1Adjust,
    Item2Adjust = window.Item2Adjust,
    Item3Adjust = window.Item3Adjust,
    introductionAdjust = window.introductionAdjust,
    logoAdjust = window.logoAdjust

window.onload = function(){

    //调整全局
    DealScroll.init();

    //安装游戏
    gameSetup();

    //介绍适应屏幕
    introductionAdjust();
    Item1Adjust();
    Item2Adjust();
    Item3Adjust();
    logoAdjust();

}
