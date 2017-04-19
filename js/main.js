require.config({
	paths:{
		jquery:'jquery-1.10.0.min',
		jqueryUI:'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	$('#a').click(function(){
	 	var win=new w.Window();
	 	win.alert({
	 		width: 300,
	 		height: 150,
	 		title:'提示',
	 		content:'welcome!',
		 	hasCloseBtn:true,
		 	hasMask:true,
		 	isDraggable:true,
		 	dragHandle:'.window_header',
		 	skinClassName:'window_skin_a',
		 	text4AlertBtn:'OK',
		 	handler4AlertBtn:function(){
		 		alert('you click the alert button');
		 	},
		 	handler4CloseBtn:function(){
		 		alert('you click the close button');
		 	},
	 	}).on('alert',function(){alert('the second alert handler');});
	 });
});