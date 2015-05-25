/**
 * Created by FusGoethe on 15/5/25.
 */

var DealScroll = window.DealScroll;


window.onload = function(){

    DealScroll.init();
    //modify body;
    document.body.style.height= 4* DealScroll.offsetHeight +'px';

}
