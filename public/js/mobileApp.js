/**
 * class to call / receive events from native mobile app Bridge class name:
 * MobileAppNative
 */
var MobileAppClient =
{
	init: function() {
		this.triggerChangeFormElement();
		this.changeMenu();
		this.barcodeScannerFilter();
		this.refresherPage();
		this.callNumberPhone();
		this.sendSmsPhone();

		//Show Advanced Filter
		$(document).on('click','#buttonShowAndvancedFilterMobileApp',function (){
			var t = $(this);
			if(t.find('i').hasClass('fa-chevron-down')){
				t.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
			} else {
				t.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
			}

			$('#showAdvancedFilterMobileApp').toggleClass('d-none');
		});

		//Thao tác chọn kiểu máy in
		$(document).on('click', '#printHtml', function(e) {
			e.preventDefault();
			$('body').removeClass('modal-open').removeAttr('style');
			AppModal.hide();
			var link = $(this).data('link');
			if (link && typeof MobileAppNative != 'undefined') {
				MobileAppNative.printHtml(link);
			}
		});

		$(document).on('click', '#printHtmlBluetooth', function(e) {
			e.preventDefault();
			$('body').removeClass('modal-open').removeAttr('style');
			AppModal.hide();
			var link = $(this).data('link');
			if (link && typeof MobileAppNative != 'undefined') {
				MobileAppNative.printHtmlBluetooth(link);
			}
		});
	},
	// call number phone on app mobile
	callNumberPhone: function () {
		if (typeof MobileAppNative != 'undefined') {
			$('.callNumberPhone').on('click', function () {
				var numberPhone = $(this).attr('data-numberPhone');
				MobileAppNative.callPhoneNumber(numberPhone);
			});
		}
	},
	// send sms number phone on app mobile
	sendSmsPhone: function () {
		if (typeof MobileAppNative != 'undefined') {
			$('.sendSmsPhone').on('click', function () {
				var numberPhone = $(this).attr('data-numberPhone');
				MobileAppNative.sendSmsPhone(numberPhone);
			});
		}
	},

	triggerChangeFormElement: function (object = false)
	{
		if(! MobileAppClient.isMobileAppLayout()) {
			return;
		}

		// change style form
		if ($(object).val()) {
			$(object).parents('.form-group').addClass('active');
		} else {
			$(object).parents('.form-group').removeClass('active');
		}
		$('.form-app').on('change', 'input, textarea', function () {
			var t = $(this);
			if (t.val()) {
                t.parents('.form-group').addClass('active');
            } else {
                t.parents('.form-group').removeClass('active');
            }
        });

		// scroll fixed bottom button
		$(window).scroll(function(){
			if ($(window).scrollTop() > 35) {
				$('.form-footer').addClass('fixed-bottom');
			} else {
				$('.form-footer').removeClass('fixed-bottom');
			}
		});
    },

    changeMenu: function () {
		if ($('body #navMenuMain').length){
            $('#navMenuMain').mmenu();
		}
    },

	/**
	 * detect if current layout is mobile app
	 */
	isMobileAppLayout: function() {
		return $('body').hasClass('mobileAppLayout');
	},

	/**
	 * start the barcode scanner on mobile device
	 *
	 * @param string selector
	 * @param string handler
	 */
	startBarcode: function(selector, handler) {
		$(selector).click(function() {
			// class runningBarcodeScanner is used to mark which element is used
			// in case screen has multiple barcode scanner icons
			// - remove all old running barcode before starting a new session
			// - add class for the current clicked element
			$('.runningBarcodeScanner').removeClass('runningBarcodeScanner');
			$(this).addClass('runningBarcodeScanner');
			try {
				MobileAppNative.startBarcodeScanner();
			} catch (err) {
				console.log(err);
			}
		});
	},

	/**
	 * # ACTION DO NOT DELETE
	 * receive the barcode scanner from mobile app
	 *
	 * default function to prevent mobile app crash if not found this function.
	 * each screen must re-implement this function to handler private logic
	 *
	 * MobileAppClient.receiveBarcodeResult = function(barcode) { // private
	 * logic here };
	 *
	 * @param string barcode
	 */
	receiveBarcodeResult: function(barcode) {

	},

	/**
	 * # ACTION DO NOT DELETE
	 * - receive the notification token from mobile app - check if token +
	 * currentUserId is registered or not (check local storage or app mobile
	 * cache) - if not: send token + userId to server to save
	 *
	 * @param string token
	 */
	receiveNotificationToken: function(token) {

	},

	barcodeScannerFilter(selector = '.bScanFilter'){
		if(! MobileAppClient.isMobileAppLayout()) {
			return;
		}

		$(document).on('click','.startBarcodeScannerFilter',function (){
			var t = $(this);
			var id = t.data('id');
			if (id) {
				if(t.hasClass('d-none')){
					t.removeClass('d-none');
				}

				MobileAppClient.startBarcode('.startBarcodeScannerFilter');
				MobileAppClient.receiveBarcodeResult = function(barcode) {
					if(barcode) {
						$('#' + id).val(barcode).change().focus().trigger(jQuery.Event('keyup'));
					}
				}
			} else {
				t.addClass('d-none');
			}
		});
	},

	/* Hành động cuộn xuống để refresh lại trang */
	refresherPage: function (){
		if(! MobileAppClient.isMobileAppLayout()) {
			return;
		}

		if (!CSS.supports('overscroll-behavior-y', 'contain')) {
			console.log("Your browser doesn't support overscroll-behavior :(");
		}

		async function simulateRefreshAction() {
			const sleep = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

			const transitionEnd = function(propertyName, node) {
				return new Promise(resolve => {
					function callback(e) {
						e.stopPropagation();
						if (e.propertyName === propertyName) {
							node.removeEventListener('transitionend', callback);
							resolve(e);
						}
					}
					node.addEventListener('transitionend', callback);
				});
			}

			const refresher = document.querySelector('.refresher');

			document.body.classList.add('refreshing');
			await sleep(2000);

			refresher.classList.add('shrink');
			await transitionEnd('transform', refresher);
			refresher.classList.add('done');

			refresher.classList.remove('shrink');
			document.body.classList.remove('refreshing');
			await sleep(0); // let new styles settle.
			refresher.classList.remove('done');
		}

		let _startY = 0;

		const pageBody = document.querySelector('#contentBodyLayout');

		pageBody.addEventListener('touchstart', e => {
			_startY = e.touches[0].pageY;
		}, {
			passive: true
		});

		pageBody.addEventListener('touchmove', e => {
			const y = e.touches[0].pageY - 250;

			// Activate custom pull-to-refresh effects when at the top fo the container
			// and user is scrolling up.
			if (document.scrollingElement.scrollTop === 0 && y > _startY && !document.body.classList.contains('refreshing')) {
				//Khi modal đang mở thì hủy sự kiện ko cho load lại trang
				if(!$('.modal').hasClass('show')) {
					simulateRefreshAction();
					document.location.reload();
				}
			}
		}, {
			passive: true
		});
	},
};

/**
 * Quét mã vạch cho sản phẩm, mã vạch, user, v.v...
 * options = {
 *     	tbScanner : '#tbLoadBarcode', // input id
 *		btnScanner: '.btnScanner', // scanner button id, class
 *		selectHandler: function(barcode) { // xử lý sau khi có barcode}
 * }
 *
 * @type {{load: barcodeScanHandler.load}}
 */
var barcodeScanHandler = {
	load: function (options) {
		if(! MobileAppClient.isMobileAppLayout()) {
			return false;
		}

		var tbScanner = options.tbScanner ? options.tbScanner : '#tbLoadBarcode';
		var btnScanner = options.btnScanner ? options.btnScanner : '.btnScanner';
		MobileAppClient.startBarcode(btnScanner);
		MobileAppClient.receiveBarcodeResult = function (barcode) {
			if (! barcode) {
				return false;
			}
			$(tbScanner).val(barcode);
			if (typeof options.selectHandler != 'undefined') {
				return options.selectHandler(barcode);
			}
		}
	}
};

/**
 * Chuyển các tab qua lại trên trang theo thao tác vuốt ngang
 * options = {
 *     	tabView : 1, // hiển thị số lượng tab
 *		spaceBetween: 5, // giống padding trong css
 * }
 * @type {{load: swiperTab.load}}
* */
var swiperTab = {
	init: function () {
		if ($('.swiperDefault').length) {
			$('.swiperDefault').each(function () {
				new Swiper(".swiperDefault", {
					slidesPerView: "auto",
					spaceBetween: 0,
					pagination: {
						clickable: true,
					}
				});
			});
		}
	},
	load: function (options){
		if(! MobileAppClient.isMobileAppLayout()) {
			return false;
		}

		var tabView = options.tabView ?? 1,
			spaceBetween = options.spaceBetween ?? 5;

		function setCurrentSlide(ele,index){
			$(".swiper1 .swiper-slide").removeClass("selected");
			ele.addClass("selected");
		}

		var swiper1 = new Swiper('.swiper1', {
			slidesPerView: tabView,
			paginationClickable: true,
			spaceBetween: spaceBetween,
			freeMode: true,
			loop: false,
		});
		swiper1.slides.each(function(index,val){
			var ele=$(this);
			ele.on("click",function(){
				setCurrentSlide(ele,index);
				swiper2.slideTo(index, 500, false);
			});
		});

		var swiper2 = new Swiper ('.swiper2', {
			direction: 'horizontal',
			loop: false,
			autoHeight: true,
			onSlideChangeEnd: function(swiper){
				var n=swiper.activeIndex;
				setCurrentSlide($(".swiper1 .swiper-slide").eq(n),n);
				swiper1.slideTo(n, 500, false);
			}
		});
	}
}

/**
 * Thao tác in đơn hàng qua app mobile
 * - urlPrint :  This is url page print
* */
var printerPageMobile = {
	load: function (options) {
		if(! MobileAppClient.isMobileAppLayout()) {
			return false;
		}
		var link = options.link ? options.link : null;
		if (link && typeof MobileAppNative != 'undefined') {
			var url = new URL(link),
				pathname = url.pathname,
				listUrl = [
					'/pos/bill/print',
					'/order/manage/pickup',
					'/inventory/bill/viewbill',
					'/report/order/salechannel',
					'/shipping/handover/view',
					'/order/manage/printlabel',
				];
			if(listUrl.includes(pathname)) {
				MobileAppNative.printHtml(link);
				// Tạm ẩn để thử tính năng qua xprinter service
				// AppModal.show({
				// 	size: 'modal-md',
				// 	color: '',
				// 	title: 'Chọn loại máy in',
				// 	content: '<div class="row text-center"><div class="col-6"><a id="printHtml" class="btn btn-info text-white" data-link="'+ link +'">Máy in Wifi</a></div><div class="col-6"><a id="printHtmlBluetooth" class="btn btn-primary text-white" data-link="'+ link +'">Máy in Bluetooth</a></div></div>',
				// });
			}
			return link;
		}
	}
}

$(function(){
	MobileAppClient.init();
});
