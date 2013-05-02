/*
* MyCarousel Javascript Plugin
* version: 0.0.1
* Date: 05/02/2013
* author: santiago chen
* email: santiago1209@foxmail.com
* more on https://github.com/santiagochen
* 
* --The USE of the MyCarousel plugin--
*
* Export 1: MyCarousel.init(); initialize for the carousel image;
* MyCarousel.init({
*		target: document.getElementById("carou"),
*		movestep: 2,
*		automove:true,
*		timer: 3,
*		killanimate:false,
*		anti:false,
*		});
* Params:
* target: Required. Set your targeting dom element; 
* automove: Optional. Default is true, prevent automove when you set the false to automove.
* timer: Optional. Default is 2 seconds, with it, you could decide how often the automove happens.
* movestep: Optional. Default is 1 image move the time when an automove happens, you could decide how many images move once an automove 
* 			happens.
* killanimate: Optional. Default is false, you could kill the moving animate if you set this equal to true.
* anti: Optional. Default is false. with it, you decide the automove's direction.
*
* Export 2: MyCarousel.move(step)  Handler for move towards Right.
* Export 3: MyCarousel.antimove(step) Handler for moving towards Left.
* Params:
* step: Optional. Default is 1 image move the time when you make a moving attempt. With it, you decide how many images move the time when 
* 		making a moving attempt.
*/

var MyCarousel=MyCarousel||{};(function(e){var t={},n,r,i,s,o,u,a=!1,f,l;MyCarousel.move=function(e){var n=e||1;if(a!=0)return;s==1?p(t.holder,"false",n):c(t.holder,"false",n)},MyCarousel.antimove=function(e){var n=e||1;if(a!=0)return;s==1?p(t.holder,"true",n):c(t.holder,"true",n)},MyCarousel.init=function(e){t.holder=e.target,t.cell={width:t.holder.children[0].clientWidth,height:t.holder.children[0].clientHeight},v(),t.holder.style.position="relative",t.holder.style.left="0px",t.holder.style.top="0px",i=e.movestep||1,r=e.timer*1e3||2e3,s=e.killanimate||!1,u=e.anti||!1,o=e.speed||1,n=e.automove||!1;if(n==1)if(s==1){a==0,l=0;var c=setInterval(function(){if(a==0){l++;if(l!=Math.ceil(r/1e3))return;p(t.holder)}},1e3)}else{a==0,f=0;var d=setInterval(function(){if(a==0){f++;if(f!=Math.ceil(r/1e3))return;h(t.holder),a=!0}},1e3)}};var c=function(e,t,n){a=!0,m(e,n,t),v()},h=function(e){m(e,i),v()},p=function(e,t,n){var r=n||i;a=!0;if(u==1)if(t==null||t=="true"){for(var s=0;s<r;s++)e.insertBefore(e.children[e.children.length-1-s].cloneNode(!0),e.firstChild),v();var o=e.children.length;for(var f=0;f<r;f++)e.removeChild(e.children[o-1-f]),v()}else{for(var c=0;c<r;c++)e.appendChild(e.children[c].cloneNode(!0)),v();for(var h=0;h<r;h++)e.removeChild(e.children[0]),v()}else if(t=="true"){for(var s=0;s<r;s++)e.insertBefore(e.children[e.children.length-1-s].cloneNode(!0),e.firstChild),v();var o=e.children.length;for(var f=0;f<r;f++)e.removeChild(e.children[o-1-f]),v()}else{for(var c=0;c<r;c++)e.appendChild(e.children[c].cloneNode(!0)),v();for(var h=0;h<r;h++)e.removeChild(e.children[0]),v()}a=!1,l=0},d=function(e){e.style.left="0px",e.style.top="0px"},v=function(){var n=0;for(var r=0;r<t.holder.children.length;r++)t["child"+(r+1)]=t.holder.children[r],n+=t.holder.children[r].clientWidth,e.getComputedStyle(t["child"+(r+1)]).marginLeft&&(n+=parseInt(e.getComputedStyle(t["child"+(r+1)]).marginLeft)),e.getComputedStyle(t["child"+(r+1)]).marginRight&&(n+=parseInt(e.getComputedStyle(t["child"+(r+1)]).marginRight));t.holder.style.width=n+"px"},m=function(e,n,r){var i=n||1;if(u==1)if(r==null||r=="true")for(var s=0;s<i;s++)e.insertBefore(e.children[e.children.length-1-s].cloneNode(!0),e.firstChild),v(),e.style.left=-(t.cell.width*i)+"px";else for(var l=0;l<i;l++)e.appendChild(e.children[l].cloneNode(!0)),v();else if(r=="true")for(var s=0;s<i;s++)e.insertBefore(e.children[e.children.length-1-s].cloneNode(!0),e.firstChild),v(),e.style.left=-(t.cell.width*i)+"px";else for(var l=0;l<i;l++)e.appendChild(e.children[l].cloneNode(!0)),v();var c=setInterval(function(){if(u==1)if(r==null||r=="true")if(parseInt(e.style.left)>0){clearInterval(c);var n=e.children.length;for(var s=0;s<i;s++)e.removeChild(e.children[n-1-s]),v();d(e),a=!1,f=0}else a=!0,e.style.left=parseInt(e.style.left)+1+"px";else if(parseInt(e.style.left)<-(t.cell.width*i)){clearInterval(c);for(var o=0;o<i;o++)t.holder.removeChild(t.holder.children[0]);d(e),a=!1,f=0}else a=!0,e.style.left=parseInt(e.style.left)-1+"px";else if(u==0)if(r=="true")if(parseInt(e.style.left)>0){clearInterval(c);var n=e.children.length;for(var s=0;s<i;s++)e.removeChild(e.children[n-1-s]),v();d(e),a=!1,f=0}else a=!0,e.style.left=parseInt(e.style.left)+1+"px";else if(parseInt(e.style.left)<-(t.cell.width*i)){clearInterval(c);for(var o=0;o<i;o++)t.holder.removeChild(t.holder.children[0]);d(e),a=!1,f=0}else a=!0,e.style.left=parseInt(e.style.left)-1+"px"},o)}})(window)
