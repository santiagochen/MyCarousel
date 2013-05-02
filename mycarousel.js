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

	
var MyCarousel = MyCarousel||{};	

(function(window){
	
	var //define ports
		tarObj = {},
		_automove,
		_timer,
		_moveStep,
		_killAniMate,
		_speed,
		_anti,
		
		//define inner-parameters
		_underway = false,
		_mIntCounter,
		_mIntCounterSwitch;
	
	//Handler for move;	
	MyCarousel.move = function(step){
		var _step = step||1;
		if(_underway==false){
			if(_killAniMate==true){
				autoHorizontalSwitch(tarObj.holder,"false",_step);
				}
			else{
				manualHorizontalMove(tarObj.holder,"false",_step);
				}
			}
		else{
			return;
			}
		}
	
	//Handler for antimove;
	MyCarousel.antimove = function(step){
		var _step = step||1;
		if(_underway==false){
			if(_killAniMate==true){
				autoHorizontalSwitch(tarObj.holder,"true",_step);
				}
			else{
				manualHorizontalMove(tarObj.holder,"true",_step);
				}
			
			}
		else{
			return;
			}
		}
	
	//ports for set targets
	MyCarousel.init = function(param){
		tarObj.holder = param.target; //get value for target;
		
		tarObj.cell = {
			width: tarObj.holder.children[0].clientWidth,
			height: tarObj.holder.children[0].clientHeight,
			}
		//get value for tarObj.width
		getHolderWidth();
		
		//define viewport's position.
		tarObj.holder.style.position = "relative"; 
		tarObj.holder.style.left = "0px";
		tarObj.holder.style.top = "0px";
		
		_moveStep = param.movestep || 1; //get value for steps of moving;
		_timer = param.timer*1000||2000; //get timer for Interval;
		_killAniMate = param.killanimate||false; //get boolean for animate
		_anti = param.anti||false; //get boolean for anit;
		_speed = param.speed||1; //keep it unabled, for it has little use in reality.
		_automove = param.automove||false; //define whether automove is needed;
		
		if(_automove==true){
			//No Animate here;
			if(_killAniMate==true){
				_underway==false;	
				_mIntCounterSwitch=0;
				
				//setinterval to move
				var moveIntervalCopy = setInterval(function(){
					if(_underway==false){
						_mIntCounterSwitch++;
						if(_mIntCounterSwitch==Math.ceil(_timer/1000)){
							autoHorizontalSwitch(tarObj.holder);
							}
						else{
							return
							}
						}
					},1000)
			
				}
			//Animate here to move a little;
			else{
				_underway==false;	
				_mIntCounter=0;
				
				//setinterval to move
				var moveInterval = setInterval(function(){
					if(_underway==false){
						_mIntCounter++
						if(_mIntCounter==Math.ceil(_timer/1000)){
							autoHorizontalMove(tarObj.holder);
							_underway=true;
							}
						else{
							return
							}
						}
					},1000)
				}
			
			}
			
		}
	
	var manualHorizontalMove = function(target,manti,step){
		_underway = true;		
		animateMove(target,step,manti);
		getHolderWidth();
		}
	
	var autoHorizontalMove=function(target){
		animateMove(target,_moveStep);	
		getHolderWidth();	
		}
	
	//The controller on carousel without animation;
	var autoHorizontalSwitch = function(target,manti,step){
		var _tempStep = step||_moveStep;
		_underway=true;
		if(_anti==true){
			if(manti==null||manti=="true"){
				//clone to the beginning;
				for(var x=0;x<_tempStep;x++){
					target.insertBefore(target.children[target.children.length-1-x].cloneNode(true),target.firstChild);
					getHolderWidth();
					}	
				//directly delelte the end;
				var tempChildLength = (target.children.length)
				for(var y=0; y<_tempStep; y++){
					target.removeChild(target.children[tempChildLength-1-y]);
					getHolderWidth();
					}
				}
			else{
				//clone to the end
				for(var n=0;n<_tempStep;n++){
					target.appendChild(target.children[n].cloneNode(true));
					getHolderWidth();
					}
				//directly delete the begining;
				for(var m=0;m<_tempStep;m++){
					target.removeChild(target.children[0]);
					getHolderWidth();
					}
				}
			}
		else{
			if(manti=="true"){
				//clone to the beginning;
				for(var x=0;x<_tempStep;x++){
					target.insertBefore(target.children[target.children.length-1-x].cloneNode(true),target.firstChild);
					getHolderWidth();
					}	
				//directly delelte the end;
				var tempChildLength = (target.children.length)
				for(var y=0; y<_tempStep; y++){
					target.removeChild(target.children[tempChildLength-1-y]);
					getHolderWidth();
					}
				}
			else{
				//clone to the end
				for(var n=0;n<_tempStep;n++){
					target.appendChild(target.children[n].cloneNode(true));
					getHolderWidth();
					}
				//directly delete the begining;
				for(var m=0;m<_tempStep;m++){
					target.removeChild(target.children[0]);
					getHolderWidth();
					}
				}
			
			}
		_underway=false;
		_mIntCounterSwitch=0;
		}
		
	var restorePos=function(target){
		target.style.left = "0px";
		target.style.top = "0px"
		}
		
	var getHolderWidth = function(){
		var tempWidth = 0; //calculate holder's width for use;
		for(var z=0; z<tarObj.holder.children.length; z++){
			tarObj[("child"+(z+1))]=tarObj.holder.children[z]; //child+number
			tempWidth+=tarObj.holder.children[z].clientWidth;
			if(window.getComputedStyle(tarObj[("child"+(z+1))]).marginLeft){
				tempWidth+=parseInt(window.getComputedStyle(tarObj[("child"+(z+1))]).marginLeft);
				}
			if(window.getComputedStyle(tarObj[("child"+(z+1))]).marginRight){
				tempWidth+=parseInt(window.getComputedStyle(tarObj[("child"+(z+1))]).marginRight)
				}
			}
		//set the viewport's width by tarObj.width;
		tarObj.holder.style.width = tempWidth+"px";
		}
	
	var animateMove = function(target,step,manti){
		var _tempStep = step||1;
		//clone to the beginning;
		if(_anti==true){
			if(manti==null||manti=="true"){
				for(var x=0;x<_tempStep;x++){
					target.insertBefore(target.children[target.children.length-1-x].cloneNode(true),target.firstChild);
					getHolderWidth();
					target.style.left = -(tarObj.cell.width*_tempStep)+"px";
					}
				}
			else{
				for(var n=0;n<_tempStep;n++){
					target.appendChild(target.children[n].cloneNode(true));
					getHolderWidth();
					}
				}
			
			}
		else{
			if(manti=="true"){
				for(var x=0;x<_tempStep;x++){
					target.insertBefore(target.children[target.children.length-1-x].cloneNode(true),target.firstChild);
					getHolderWidth();
					target.style.left = -(tarObj.cell.width*_tempStep)+"px";
					}
				}
			else{
				for(var n=0;n<_tempStep;n++){
					target.appendChild(target.children[n].cloneNode(true));
					getHolderWidth();
					}
				}
			}
		
		var aniInterval = setInterval(function(){
			if(_anti==true){
				if(manti==null||manti=="true"){
					if(parseInt(target.style.left)>0){
						clearInterval(aniInterval);
						//directly delelte the end;
						var tempChildLength = (target.children.length)
						for(var y=0; y<_tempStep; y++){
							target.removeChild(target.children[tempChildLength-1-y]);
							getHolderWidth();
							}
						restorePos(target);
						_underway=false;
						_mIntCounter=0;
						}
					else{
						_underway=true;
						target.style.left=parseInt(target.style.left)+1+"px";
						}
					}
				else{
					if(parseInt(target.style.left)<(-(tarObj.cell.width*_tempStep))){
						clearInterval(aniInterval);
						//after animation, delete the begining;
						for(var m=0;m<_tempStep;m++){
							tarObj.holder.removeChild(tarObj.holder.children[0]);
							}
						restorePos(target);
						_underway=false;
						_mIntCounter=0;
						}
					else{
						_underway=true;
						target.style.left=parseInt(target.style.left)-1+"px";
						}
					
					}
				
				}
			else if(_anti==false){
				if(manti=="true"){
					if(parseInt(target.style.left)>0){
						clearInterval(aniInterval);
						//directly delelte the end;
						var tempChildLength = (target.children.length)
						for(var y=0; y<_tempStep; y++){
							target.removeChild(target.children[tempChildLength-1-y]);
							getHolderWidth();
							}
						restorePos(target);
						_underway=false;
						_mIntCounter=0;
						}
					else{
						_underway=true;
						target.style.left=parseInt(target.style.left)+1+"px";
						}
					}
				else{
					if(parseInt(target.style.left)<(-(tarObj.cell.width*_tempStep))){
						clearInterval(aniInterval);
						//after animation, delete the begining;
						for(var m=0;m<_tempStep;m++){
							tarObj.holder.removeChild(tarObj.holder.children[0]);
							}
						restorePos(target);
						_underway=false;
						_mIntCounter=0;
						}
					else{
						_underway=true;
						target.style.left=parseInt(target.style.left)-1+"px";
						}
					}
				}
				
			},_speed)
			
		}

	})(window)
	