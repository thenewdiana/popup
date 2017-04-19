define(['jquery','jqueryUI'],function($,$UI){
	function Window(){
		this.config={
			width: 500,
			height: 300,
			title:'系统消息',
			content:'',
			handler:null,
			hasCloseBtn:false,
			hasMask:false,
			isDraggable:true,
			skinClassName:null,
			text4AlertBtn:'确定',
			handler4AlertBtn:null,
			handler4CloseBtn:null
		};
		this.handlers = {};
	}
	Window.prototype={
		on:function(type,handler){
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire:function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0,len=handlers.length;i<len;i++){
					handlers[i](data);
				}
			}
			return this;
		},
		alert:function(config){
			var CFG=$.extend(this.config,config);
			var mask = null;
			var that = this;
			if(CFG.hasMask){
				mask=$('<div class="window_mask"></div>');
				mask.appendTo('body');
			}
			var boundingBox=$('<div class="window_boundingBox">'+
												'<div class="window_header">'+CFG.title+'</div>'+
												'<div class="window_body">'+CFG.content+'</div>'+
												'<div class="window_footer">'+'<input class="window_alertBtn" type="button" value="'+CFG.text4AlertBtn+'" /></div>'+
				                '</div>');
			boundingBox.appendTo('body');
			var alertBtn=boundingBox.find('.window_alertBtn');
			alertBtn.click(function(){
				boundingBox.remove();
				mask&&mask.remove();
				that.fire('alert');
			});
			boundingBox.css({
				width: CFG.width +'px',
				height: CFG.height + 'px',
				left:(CFG.x||(window.innerWidth)-CFG.width)/2 + 'px',
				top:(CFG.y||(window.innerHeight)-CFG.height)/2 + 'px'
			});
			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function() {
					boundingBox.remove();
					mask&&mask.remove();
					that.fire('close');
				});
			}
			if(CFG.handler4AlertBtn){
				this.on('alert',CFG.handler4AlertBtn);
			}
			if(CFG.handler4CloseBtn){
				this.on('close',CFG.handler4CloseBtn);
			}
			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}
			if(CFG.isDraggable){
				if(CFG.dragHandle){
					boundingBox.draggable({handle:CFG.dragHandle,containment: "window"});
				}else{
					boundingBox.draggable({containment: "window"});
				}
			}
			return this;
		},
		confirm:function(){},
		prompt:function(){}
	}
	return {
		Window:Window
	}
});