(function() {
	$(".icon").addClass("on");
	$('#audio-bg').get(0).pause();
	$(".loading").height($(window).height());
	$('.music').on('touchstart', function() {
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
	$('#audio-bg').get(0).pause();
	var per = parseInt($("#loading_per").html());
	document.addEventListener("WeixinJSBridgeReady", function () {
		WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
			var perListener1 = setInterval(function(){
				if(per == 23){
					clearInterval(perListener1);
					setTimeout(function(){
						var perListener2 = setInterval(function(){
							if(per == 67){
								clearInterval(perListener2);
								setTimeout(function(){
									var perListener3 = setInterval(function(){
										if(per == 99){
											clearInterval(perListener3);
											setTimeout(function(){
												if(document.readyState=='complete'){ 
										                network = e.err_msg.split(":")[1];
										 				playAudio();
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
					},500);
				}
				$("#loading_per").html(per++);
			},50);
		});
	}, false);
}
var playAudio =  function() {
    var audio = $('#audio-bg');
    if (audio.attr('src') == undefined) {
        audio.attr('src', audio.data('src'));
    }
    audio[0].play();
}
// 分享
var shareWord = "妈妈老了，岁月请别欺负她 （2分钟看哭了很多人）";
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
					'onMenuShareAppMessage'
				]
			});
			wx.ready(function() {
				setShare();
			});
		}
	}
});