/**
 * Created by gitbong on 4/22/15.
 */

var gb = gb || {};

(function (ins) {
	var ua;
	var app;

	var browser = {};
	var sys = {};
	var device = {};

	var _brand;
	var _model;
	var _browser;
	var _browserVersion;
	var _system;
	var _systemVertion;
	var _screenW;
	var _screenH;
	var _browserW;
	var _browserH;
	var _devicePixelRatio;
	var _isMobile;
	var _isPc;

	function _browserInfo(type, vertion) {
		_browser = type;
		_browserVersion = vertion;
	}

	function _sysInfo(type, vertion) {
		_system = type;
		_systemVertion = vertion;
	}

	function _deviceInfo(type, vertion) {


		if (vertion == 'iphone' || vertion == 'ipad')
			vertion += _appleHandle(_screenW, _screenH, _devicePixelRatio);

		function _appleHandle(w, h, p) {
			var arr = [
				{model: '3GS', width: 320, height: 480, pixel: 1},
				{model: '4+', width: 320, height: 480, pixel: 2},
				{model: '5+', width: 320, height: 568, pixel: 2},
				{model: '6+', width: 375, height: 667, pixel: 2},
				{model: '6+ Plus', width: 414, height: 736, pixel: 3},
				{model: '1/2/Mini', width: 1024, height: 768, pixel: 1},
				{model: '3/4/Air', width: 1024, height: 768, pixel: 2}
			];
			for (var i in arr) {
				var r = arr[i].width / arr[i].height;
				if (w / h == r || h / w == r && p == arr[i].pixel)
					return arr[i].model;
			}
			return ''
		}

		_brand = type;
		_model = type + ' ' + vertion;
	}

	function _init() {
		ua = navigator.userAgent.toLowerCase();
		app = navigator.appVersion.toLowerCase();

		_screenW = window.screen.width;
		_screenH = window.screen.height;
		_devicePixelRatio = window.devicePixelRatio;
		_browserW = window.innerWidth;
		_browserH = window.innerHeight;

		_isMobile = (ua.match(/mobile/) || ua.match(/arm/)) ? true : false;
		_isPc = !_isMobile;

		var b;
		(b = ua.match(/msie ([\d.]+)/)) ? _browserInfo('ie', b[1]) : 0;
		(b = ua.match(/firefox\/([\d.]+)/)) ? _browserInfo('firefox', b[1]) : 0;
		(b = ua.match(/crios\/([\d.]+)/)) ? _browserInfo('chromemob', b[1]) : 0;
		(b = ua.match(/opera.([\d.]+)/)) ? _browserInfo('opera', b[1]) : 0;
		(b = ua.match(/micromessenger\/([\d.]+)/)) ? _browserInfo('micromessenger', b[1]) : 0;
		(b = ua.match(/ucbrowser\/([\d.]+)/)) ? _browserInfo('ucbrowser', b[1]) : 0;
		(b = ua.match(/ uc /)) ? _browserInfo('ucbrowser', b[1]) : 0;
		(b = ua.match(/miuibrowser\/([\d.]+)/)) ? _browserInfo('miuibrowser', b[1]) : 0;
		(b = ua.match(/weibo__([\d.]+)/)) ? _browserInfo('weibo', b[1]) : 0;
		(b = ua.match(/qq\/([\d.]+)/)) ? _browserInfo('qq', b[1]) : 0;
		(b = ua.match(/mqqbrowser\/([\d.]+)/)) ? _browserInfo('mqqbrowser', b[1]) : 0;
		(b = ua.match(/maxthon\/([\d.]+)/)) ? _browserInfo('maxthon', b[1]) : 0;
		(b = ua.match(/baiduboxapp\/([\d.]+)/)) ? _browserInfo('baiduapp', b[1]) : 0;
		(b = ua.match(/baidubrowser\/([\d.]+)/)) ? _browserInfo('baidubrowser', b[1]) : 0;
		(b = ua.match(/chrome\/([\d.]+)/)) ? _browserInfo('chrome', b[1]) : 0;
		(b = ua.match(/version\/([\d.]+).*safari/)) ? _browserInfo('safari', b[1]) : 0;

		var s;
		(s = ua.match(/windows nt ([\d.]+)/)) ? _sysInfo('windows', s[1]) : 0;
		(s = ua.match(/mac os x ([\d._]+)/)) ? _sysInfo('mac', s[1]) : 0;
		(s = ua.match(/cpu iphone os ([\d._]+)/)) ? _sysInfo('ios', s[1]) : 0;
		(s = ua.match(/cpu os ([\d._]+)/)) ? _sysInfo('ios', s[1]) : 0;
		(s = ua.match(/iph os ([\d._]+)/)) ? _sysInfo('ios', s[1]) : 0;
		(s = ua.match(/android ([\d._]+)/)) ? _sysInfo('android', s[1]) : 0;
		(s = ua.match(/tablet os ([\d.]+)/)) ? _sysInfo('tabletos', s[1]) : 0;

		var d;
		var oppo = ["x909t", "r827t", "x909"];
		for (var i = 0; i < oppo.length; i++) {
			(ua.indexOf(oppo[i]) > -1) ? device.oppo = oppo[i] : undefined;
		}
		var nubia = ["nx507j"];
		for (i = 0; i < nubia.length; i++) {
			(ua.indexOf(nubia[i]) > -1) ? device.nubia = nubia[i] : undefined;
		}
		(d = ua.match(/iphone/)) ? _deviceInfo('apple', d) : undefined;
		(d = ua.match(/iph os/)) ? _deviceInfo('apple', d) : undefined;
		(d = ua.match(/ipad/)) ? _deviceInfo('apple', d) : undefined;
		(d = ua.match(/ipod/)) ? _deviceInfo('apple', d) : undefined;
		(d = ua.match(/macintosh/)) ? _deviceInfo('mac', d) : undefined;
		(d = ua.match(/windows/)) ? _deviceInfo('pc', d) : undefined;
		(d = ua.match(/playbook/)) ? _deviceInfo('blackberry', d) : undefined;
		(d = ua.match(/gt-([a-z\d.]+)/)) ? _deviceInfo('samsung', d[1]) : undefined;
		(d = ua.match(/sch-([a-z\d.]+)/)) ? _deviceInfo('samsung', d[1]) : undefined;
		(d = ua.match(/sm-([a-z\d.]+)/)) ? _deviceInfo('samsung', d[1]) : undefined;
		(d = ua.match(/sgh-([a-z\d.]+)/)) ? _deviceInfo('samsung', d[1]) : undefined;
		(d = ua.match(/(hm note [a-z\d.]+)/)) ? _deviceInfo('xiaomi', d[1]) : undefined;
		(d = ua.match(/(mi [\d.]+)/)) ? _deviceInfo('xiaomi', d[1]) : undefined;
		(d = ua.match(/ (m[\d.]+) /)) ? _deviceInfo('meizu', d[1]) : undefined;
		(d = ua.match(/lenovo_([a-z\d.]+)/)) ? _deviceInfo('lenove', d) : undefined;
		(d = ua.match(/sonyericsson([a-z\d.]+)/)) ? _deviceInfo('sonyericsson', d[1]) : undefined;
		(d = ua.match(/sony([a-z\d.]+)/)) ? _deviceInfo('sony', d[1]) : undefined;
		(d = ua.match(/htc ([a-z\d.]+)/)) ? _deviceInfo('htc', d[1]) : undefined;
		(d = ua.match(/changhong([a-z\d.]+)/)) ? _deviceInfo('changhong', d[1]) : undefined;
		(d = ua.match(/nexus ([a-z\d.]+)/)) ? _deviceInfo('nexus', d[1]) : undefined;
		(d = ua.match(/lg-([a-z\d.]+)/)) ? _deviceInfo('lg', d[1]) : undefined;
		(d = ua.match(/huawei_([a-z\d.]+)/)) ? _deviceInfo('huawei', d[1]) : undefined;
		(d = ua.match(/huawei([a-z\d.]+)/)) ? _deviceInfo('huawei', d[1]) : undefined;
		(d = ua.match(/hisense ([a-z\d.]+)/)) ? _deviceInfo('hisense', d[1]) : undefined;
		(d = ua.match(/hs-([a-z\d.]+)/)) ? _deviceInfo('hisense', d[1]) : undefined;

		console.log(browser, sys, device)
	}

	_init();

	ins.deviceInfo = function () {
		_init();
		return {
			brand: _brand,
			model: _model,
			browser: _browser,
			browserVertion: _browserVersion,
			system: _system,
			systemVertion: _systemVertion,
			screenWidth: _screenW,
			screenHeight: _screenH,
			browserWidth: _browserW,
			browserHeight: _browserH,
			isMobile: _isMobile,
			isPc: _isPc
		};
	}


})(gb);