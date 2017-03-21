var game={
	data:[],//存储所有单元格数据的二位数组
	RN:4,//总行数
	CN:4,//总列数
	score:0,//保存当前分数
	state:1,//保存游戏当前状态：运行中，结束，动画播放中
	RUNNING:1,//运行中
	GAMEOVER:0,//游戏结束
	getGridHTML:function(){//获得背景格所有html代码
		for(var r=0,arr=[];r<this.RN;r++){//遍历数组
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		return '<div id="g'+arr.join('" class="grid"></div><div id="g')
			+'" class="grid"></div>';
	},
	getCellHTML:function(){//获得前景格所有html代码
		for(var r=0,arr=[];r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		return '<div id="c'+arr.join('" class="cell"></div><div id="c')
			+'" class="cell"></div>';
	},
	start:function(){
		var panel=document.getElementById("gridPanel");
		panel.innerHTML=this.getGridHTML()+this.getCellHTML();
		panel.style.height=this.RN*116+16+"px";
		panel.style.width=this.CN*116+16+"px";
		this.data=[];
		for(var r=0;r<this.RN;r++){//r从0 开始，到RN结束，每次+1
			this.data.push([]);//在data中压入空数组
		for(var c=0;c<this.CN;c++){//c从0 开始，到CN结束，每次+1
			this.data[r].push(0);//向data中r行，压入一个0
		}
		}
		/*this.data=[
			[2,4,0,4],	
			[2,4,2,4],	
			[4,0,4,2],	
			[2,0,2,4]
		];*/
		this.score=0;//重新开始游戏时，分数重置为0
		this.state=this.RUNNING;//重置游戏状态为运行中
		document.getElementById("gameOver")
					.style.display="none";
		this.date=[];
		this.randomNum();
		this.randomNum();
		this.updateView();
	},
	randomNum:function(){
		if(!this.isFull()){
		for(;;){
			var r=Math.floor(Math.random()*this.RN);
			var c=Math.floor(Math.random()*this.CN);
			if(this.data[r][c]==0){
				//var a=Math.random;
				this.data[r][c]=Math.random()>0.5?4:2;
				break;
				}
			}
		}
	},
	updateView:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				// var divObj=document.getElementById("c"+r+c);
				var divObj=document.getElementById("c"+r+c);
				//if(this.data[r][c]==0){/
				if(this.data[r][c]==0){
				//divObj.innerHTML="";
					divObj.innerHTML="";
				//divObj.className="cell";
					divObj.className="cell";
				}else{
				/*divObj.innerHTML=this.data[r][c];
				divObj.className="cell n"+this.data[r][c];*/
					divObj.innerHTML=this.data[r][c];
					divObj.className="cell n"+this.data[r][c];
				}
			}
		}
		var span=document.getElementById("score");
		span.innerHTML=this.score;
		if(this.isGameOver()){
			if(document.cookie){
				var oldmax=document.cookie.split(";")[0].split("=")[1];
			}
			this.state=this.GAMEOVER;
			document.getElementById("finalScore")
					.innerHTML=this.score;
			document.getElementById("gameOver")
					.style.display="block";
		}
	},
	isFull:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}
			}
		}	
					return true;
	},
/**************************************************/
	moveLeft:function(){//左移所有行
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){//遍历data中每一行
			this.moveLeftInRow(r);//左移当前行
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();
			this.updateView();
		}
	},
	moveLeftInRow:function(r){//左移一行,传入要移动的行号
		//c从0开始，遍历当前行中的元素，到<CN-1结束,每次+1
		for(var c=0;c<this.CN-1;c++){
			//找到c之后下一个不为0的值得位置，存在nextc中
			var nextc=this.getNextInRow(r,c);
			if(nextc==-1){//如果nextc等于-1
				break;//   退出循环
			}else{//否则
			//	 如果当前位置等于0
				if(this.data[r][c]==0){
			//		将当前位置设置为下一个位置的值
					this.data[r][c]=this.data[r][nextc];
			//      将下一个位置设置为0
					this.data[r][nextc]=0;
					c--;//保证下次依然检查当前元素
				}else if(this.data[r][c]
						==this.data[r][nextc]){
			//   否则，如果当前位置等于下一位置
			//      将当前位置*2
					this.data[r][c]*=2;
			//      将下一位置设为0
					this.score+=this.data[r][c];
					this.data[r][nextc]=0;
				}
			}
		}
	},
	getNextInRow:function(r,c){//找r行c列位置之后，不为0的下一个位置
		//nextc从c+1开始，遍历r行剩余元素
		for(var nextc=c+1;nextc<this.CN;nextc++){
			if(this.data[r][nextc]!=0){//如果nextc不等于0
				return nextc;//返回nextc
			}
		}//(循环结束)返回-1
		return -1;
	},
/******************右移************************************/
	moveRight:function(){//左移所有行
		var before=this.data.toString();
		for(var r=0;r<this.RN;r++){//遍历data中每一行
			this.moveRightInRow(r);//左移当前行
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();
			this.updateView();
		}
	},
	moveRightInRow:function(r){//左移一行,传入要移动的行号
		//c从CN-1开始，遍历当前行中的元素，到>0结束,每次-1
		for(var c=this.CN-1;c>0;c--){
			//找到c之前前一个不为0的值得位置，存在prevc中
			var prevc=this.getPrevcInRow(r,c);
			if(prevc==-1){//如果prevc等于-1
				break;//   退出循环
			}else{//否则
			//	 如果c位置等于0
				if(this.data[r][c]==0){
			//		将c位置设置为prevc位置的值
					this.data[r][c]=this.data[r][prevc];
			//      将prevc位置设置为0
					this.data[r][prevc]=0;
					c++;//保证下次依然检查当前元素
				}else if(this.data[r][c]
						==this.data[r][prevc]){
			//   否则，如果c位置等于prevc位置
			//      将c位置*2
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
			//      将prevc位置设为0
					this.data[r][prevc]=0;
				}
			}
		}
	},
	getPrevcInRow:function(r,c){//找r行c列位置之后，不为0的下一个位置
		//prevc从c-1开始，遍历r行剩余元素
		for(var prevc=c-1;prevc>=0;prevc--){
			if(this.data[r][prevc]!=0){//如果prevc不等于0
				return prevc;//返回prevc
			}
		}//(循环结束)返回-1
		return -1;
	},
/*****************上移***************************/
	moveUp:function(){
		//c从0开始，遍历data中每一列
			//调用moveUpIncol方法，传入c列，移动当前列
			//移动后拍照，保存在after
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){//遍历data中每一行
			this.moveUpInCol(c);//左移当前行
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();
			this.updateView();
		}
	},
	moveUpInCol:function(c){//左移一行,传入要移动的行号
		//r从0开始，遍历当前行中的元素，到r<RN-1结束,每次++
		for(var r=0;r<this.RN-1;r++){
			//找到c之前前一个不为0的值得位置，存在prevc中
			var nextr=this.getNextrInCol(r,c);
			if(nextr==-1){//如果prevc等于-1
				break;//   退出循环
			}else{//否则
			//	 如果c位置等于0
				if(this.data[r][c]==0){
			//		将c位置设置为prevc位置的值
					this.data[r][c]=this.data[nextr][c];
			//      将prevc位置设置为0
					this.data[nextr][c]=0;
					r--;//保证下次依然检查当前元素
				}else if(this.data[r][c]
						==this.data[nextr][c]){
			//   否则，如果c位置等于prevc位置
			//      将c位置*2
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
			//      将prevc位置设为0
					this.data[nextr][c]=0;
				}
			}
		}
	},
	getNextrInCol:function(r,c){//找r行c列位置之后，不为0的下一个位置
		//prevc从c-1开始，遍历r行剩余元素
		for(var nextr=r+1;nextr<this.RN;nextr++){
			if(this.data[nextr][c]!=0){//如果prevc不等于0
				return nextr;//返回prevc
			}
		}//(循环结束)返回-1
		return -1;
	},
	/*************下移*****************************/
	moveDown:function(){
		//c从0开始，遍历data中每一列
			//调用moveUpIncol方法，传入c列，移动当前列
			//移动后拍照，保存在after
		var before=this.data.toString();
		for(var c=0;c<this.CN;c++){//遍历data中每一行
			this.moveDownInCol(c);//左移当前行
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();
			this.updateView();
		}
	},
	moveDownInCol:function(c){//左移一行,传入要移动的行号
		//r从0开始，遍历当前行中的元素，到r<RN-1结束,每次++
		for(var r=this.RN-1;0<r;r--){
			//找到c之前前一个不为0的值得位置，存在prevc中
			var prevr=this.getPrevrInCol(r,c);
			if(prevr==-1){//如果prevc等于-1
				break;//   退出循环
			}else{//否则
			//	 如果c位置等于0
				if(this.data[r][c]==0){
			//		将c位置设置为prevc位置的值
					this.data[r][c]=this.data[prevr][c];
			//      将prevc位置设置为0
					this.data[prevr][c]=0;
					r++;//保证下次依然检查当前元素
				}else if(this.data[r][c]
						==this.data[prevr][c]){
			//   否则，如果c位置等于prevc位置
			//      将c位置*2
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
			//      将prevc位置设为0
					this.data[prevr][c]=0;
				}
			}
		}
	},
	getPrevrInCol:function(r,c){//找r行c列位置之后，不为0的下一个位置
		//prevc从c-1开始，遍历r行剩余元素
		for(var prevr=r-1;prevr>=0;prevr--){
			if(this.data[prevr][c]!=0){//如果prevc不等于0
				return prevr;//返回prevc
			}
		}//(循环结束)返回-1
		return -1;
	},
	isGameOver:function(){
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				if(this.data[r][c]==0){
					return false;
				}else if(c<this.CN-1&&(this.data[r][c]==this.data[r][c+1])){
						return false;
				}else if(r<this.RN-1&&(this.data[r][c]==this.data[r+1][c])){
						return false;
					}
		}
		}
		return true;
	}//
}
//当窗口加载后
window.onload=function(){
	game.start();
	document.onkeydown=function(){
		if(game.state==game.RUNNING){
			var e=window.event||arguments[0];
			var code=e.keyCode;
			//如果按的是向左箭头，就调用左移方法
			//左37  上38   右39   下40
			if(code==37){
				game.moveLeft();
			}else if(code==39){
				game.moveRight();
			}else if(code==38){
				game.moveUp();
			}else if(code==40){
				game.moveDown();
			}
	}
	//gameOver();
	}
}