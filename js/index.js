var firstFlag = true;
(function() {
	$('body').on('touchmove touchstart', function (event) {
	    event.preventDefault();
	});
	$(".icon").addClass("on");
	$(".loading").height($(window).height());
	$(document).on("touchstart",function(event){
		if(firstFlag){
			var musicClass = $(".music").attr("class");
			if(musicClass.indexOf("on") >= 0 && $('#audio-bg').get(0).paused){
				$('#audio-bg').get(0).play();
			}
			firstFlag = false;
		}
	});
	$('.music').on('touchstart', function(event) {
		videoPlay(event);
	});
	//判断手机横竖屏
	function orient() {
		if (window.orientation == 0 || window.orientation == 180) {
			$(".tips-alert").hide();
		} else if (window.orientation == 90 || window.orientation == -90) {
			$(".tips-alert").show();
		}
	}
	orient();
	$(window).bind( 'orientationchange', function(e){
		orient();
	});
})();
window.onload = function(){
	$('#pagepiling').pagepiling();
	var per = parseInt($("#loading_per").html());
	var perListener1 = setInterval(function(){
		if(per == 23){
			clearInterval(perListener1);
			setTimeout(function(){
				var perListener3 = setInterval(function(){
					if(per == 99){
						clearInterval(perListener3);
						setTimeout(function(){
							if(document.readyState=='complete'){ 
								$('#audio-bg').get(0).play();
								$("#loading_per").html("100");
								$(".loading").animate({
									"opacity" : "0"
								},1000,function(){
									$(".music").show();
									$("#pagepiling").show();
									$("#pagepiling").animate({
										"opacity" : "1"
									},1000);
									$(".icon").removeClass("on");
									$(".top-text-div img").removeClass("on");
						            $(".changjing").removeClass("on");
						            $(".changjing-"+0).addClass("on").css("transition-delay","0.5s");
									$(".top-text-1-"+0).addClass("on").css("transition-delay","1.5s");
									$(".top-text-2-"+0).addClass("on").css("transition-delay","2.5s");
									$(".top-text-3-"+0).addClass("on").css("transition-delay","3.5s");
								});
							}
						},1000);
					}
					$("#loading_per").html(per++);
				},50);
			},500);
		}
		$("#loading_per").html(per++);
	},50);
}
//音乐播放
var videoPlay = function(event){
	event.preventDefault();
    event.stopPropagation();
	var bg = $('#audio-bg').get(0);
	var self = $(".music");
	if (bg.paused) {
		bg.play();
		self.addClass('on');
		self.children().attr('src', './img/music_on.png');
	} else {
		bg.pause();
		self.removeClass('on');
		self.children().attr('src', './img/music_off.png');
	}
}
// 分享
var shareWord = "妈妈老了，岁月请别欺负她 （2分钟看哭了很多人）";
var shareWordQQ = "妈妈老了，岁月请别欺负她 ";
var shareDesc = "妈，我想您了，有很多话想对您说……";
var baseUrl = 'http://www.goopal.com.cn/mother_day';
var wx_title = shareWord;
var wx_desc = shareDesc;
var wx_link = baseUrl + '/index.html';
var wx_imgUrl = baseUrl + '/img/share_img.png';
var setShare = function() {
	//分享到朋友圈
	wx.onMenuShareTimeline({
		title: wx_title,
		link: wx_link,
		imgUrl: wx_imgUrl,
		success: function() {
			console.log('分享成功');
		},
		cancel: function() {
			console.log('分享取消');
		},
		error: function() {
			console.log('分享失败');
		}
	});
	wx.onMenuShareAppMessage({
		title: wx_title,
		desc: wx_desc,
		link: wx_link,
		imgUrl: wx_imgUrl,
		success: function() {
			console.log('分享成功');
		},
		cancel: function() {
			console.log('分享取消');
		},
		error: function() {
			console.log('分享失败');
		}
	});
	wx.onMenuShareQQ({
	    title: shareWordQQ,
		desc: wx_desc,
		link: wx_link,
		imgUrl: wx_imgUrl,
		success: function() {
			console.log('分享成功');
		},
		cancel: function() {
			console.log('分享取消');
		},
		error: function() {
			console.log('分享失败');
		}
	});
};
$.ajax({
	url: 'https://endpoint.goopal.com.cn/common/weixin/signature',
	type: 'post',
	data: JSON.stringify({
		url: window.location.href
	}),
	dataType: 'json',
	success: function(data) {
		if (data.status == 200) {
			var returnData = data.data.signatureData;
			wx.config({
				appId: returnData.appId,
				timestamp: returnData.timestamp,
				nonceStr: returnData.nonceStr,
				signature: returnData.signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'hideMenuItems'
				]
			});
			wx.ready(function() {
				wx.hideMenuItems({
					menuList: [ // 批量隐藏功能按钮接口
						"menuItem:share:QZone" // 分享到 QQ 空间
					]
				});
				setShare();
			});
		}
	}
});