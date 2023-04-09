$(function () {
    'use strict';
    AppCommon.init();
    AppDataGrid.init();
    AppDateTime.init();
    AppFuntions.initAutoNumeric('.autoNumeric');
	// 25/08/2022 Giapnv: Khởi tạo các ô input cho phép nhập số thập phân
	AppFuntions.initAutoNumericDecimal('.autoNumericDecimal');
    AppForm.init();
    AppLocation.init();
	AppCommon.checkExpiredDate();

	/*---------------- Result Filtering ---------------*/
	var t = $('#filter-advanced-elements');
	if(t.find('.fInputHidden.d-none').length != t.find('.row.form-group.input-group').length) {
		t.addClass('show');
	}
	$(document).on('click','#dropDownAvdancedFilter', function (e) {
		e.preventDefault();
		$(this).find('i').toggleClass('fa-rotate-180');
		if($(this).find('i').hasClass('fa-rotate-180')) {
			$('#filter-advanced-elements').addClass('show');
		} else {
			$('#filter-advanced-elements').removeClass('show');
		}
		$('#filter-advanced-elements').find('.fInputHidden').toggleClass('d-none');
		// if($('#buttonMenuMobileFilter:visible').length > 0){
		// 	$('#boxFilters').trigger('change');
		// }
	});
	//Fix cho button lọc trôi theo bộ lọc
	// if ($(window).width() < 735) {
	// 	renderStyleButtonMobile();
	// }
	// var currentHeight = $('#boxFilters').height();
	//
	// $(window).on('scroll', function () {
	// 	if ($(window).width() < 735) {
	// 		if ($(this).scrollTop() >= currentHeight) {
	// 			renderStyleButtonDefault();
	// 		} else {
	// 			renderStyleButtonMobile();
	// 			$('#buttonMenuMobileFilter').attr('style', 'display:inline-flex');
	// 		}
	// 	}
	// });
	// $(document).on('change','#boxFilters',function (){
	// 	var currentHeight = $(this).height();
	// 	$(window).on('scroll', function () {
	// 		if ($(window).width() < 735) {
	// 			if ($(this).scrollTop() >= currentHeight) {
	// 				renderStyleButtonDefault();
	// 			} else {
	// 				renderStyleButtonMobile();
	// 				$('#buttonMenuMobileFilter').attr('style', 'display:inline-flex');
	// 			}
	// 		}
	// 	});
	// });
	// $(window).resize(function() {
	// 	if ($(this).width() < 735) {
	// 		renderStyleButtonMobile();
	// 		$('#buttonMenuMobileFilter').attr('style','display:inline-flex');
	// 	} else {
	// 		renderStyleButtonDefault();
	// 	}
	// });
	/*---- End Fix button lọc trên mobile --------------*/

    /*-------------- Advanced Filtering --------------*/
	//Mở modal bộ lọc
    $(document).on('click','#advancedFilterModal',function (){
		$('#modalAdvancedFilter').modal();
		$('#modalAdvancedFilter').on('shown.bs.modal', function () {
			$('#newFilterName').trigger('focus');
		});
		var params = window.location.pathname + window.location.search;
		$('#filterValues').val(params);
	});

    // Lưu modal bộ lọc
    $('#saveAdvancedFilter').on('click',function (){
    	let name = $('#newFilterName').val(),
			type = $('#typeFilter').val(),
			filterValues = $('#filterValues').val();
    	if(!name || !type || !filterValues){
    		$('#msgAdvancedFilter').addClass('alert alert-danger').html('Dữ liệu không hợp lệ');
		}
    	AppAjax.post(
    		'/user/setting/savefilter',
			{
				storeId: $('#storeId').val(),
				type: type,
				name: name,
				filterValues: filterValues
			},
			function (rs){
    			if(rs.code){
    				if($('#msgAdvancedFilter').hasClass('alert-danger')){
						$('#msgAdvancedFilter').removeClass('alert-danger').addClass('alert-success').html('Lưu bộ lọc mới thành công');
					} else {
						$('#msgAdvancedFilter').addClass('alert alert-success').html('Lưu bộ lọc mới thành công');
					}
					setTimeout(function() {
						window.location.reload();
					}, 1000);
				} else {
					$('#msgAdvancedFilter').addClass('alert alert-danger').html(rs.messages);
				}
			}
		);
	});

    // Xóa modal bộ lọc
	$(document).on('click', '#deleteSavedFilter', function(e) {
		e.preventDefault();
		AppModal.show({
			size: 'modal-md',
			color: '',
			title: 'Xác nhận xóa?',
			content: '<div class="alert alert-warning"><p class="mb-0">Bạn có chắc chắn muốn xóa bộ lọc: <span class="font-weight-semibold overflow-hidden d-block" title="' + $(this).attr('data-label') + '">' + $(this).attr('data-label') + '</span></p></div>',
			buttons: [{
				title: '<i class="fal fa-check mr-1"></i> ' + appTranslator.translate(appTranslator.labels.Yes),
				color: 'btn-danger',
				attributes: {
					'id': 'modal-btn-deleteFilter-yes',
					'data-id': $(this).attr('data-id'),
					'data-link': $(this).attr('data-link'),
				}
			},
				{
					title: '<i class="fal fa-times mr-1"></i> ' + appTranslator.translate(appTranslator.labels.No),
					color: 'btn-light',
					attributes: {
						'data-dismiss': 'modal'
					}
				}
			]
		});
	});
	$(document).on('click', '#modal-btn-deleteFilter-yes', function(e) {
		e.preventDefault();
		$('body').removeClass('modal-open').removeAttr('style');
		// Cần ẩn modal sau đoạn xử lý rs vì ẩn trước thì modal bị xóa
		// nên các nút bị xóa, không lấy được các attributes nữa
		AppModal.hide();
		AppAjax.post(
			$(this).attr('data-link'),
			{
				id: $(this).attr('data-id') ,
				storeId : $('#storeId').val()
			},
			function(rs) {
				if (rs.code) {
					new PNotify({
						title: '<i class="far fa-check mr-1"></i> Xóa thành công: ',
						text: 'Đã xóa bộ lọc này',
						type: 'success'
					});
					setTimeout(function() {
						window.location.reload();
					}, 1000);
				} else {
					new PNotify({
						title: '<i class="far fa-check"></i> Lỗi xóa: ' + $('#modal-btn-delete-yes').attr('data-label'),
						text: rs.messages,
						type: 'danger'
					});
				}
			}
		);
	});

    /*------- End Advanced Filtering -------*/

	/*---- Fix page content, bộ lọc bị vỡ khi bảng bị tràn màn hình -----*/
	let parentWidth = $('.table-responsive').parents('.page-content').width(),
		tableWidth = $('.table-responsive table').width();
	if(parentWidth > 768 && tableWidth > parentWidth){
		$('.table-responsive').parents('.page-content').css({'width':parentWidth + 'px'});
		$('.table-responsive').parents('.content-wrapper').css({'width': '100%'});
		$('.table-responsive').parents('.content').css({'padding': '0'});
	}
	$( window ).resize(function() {
		if ($(this).width() !== parentWidth) {
			parentWidth = $(this).width();
			if(parentWidth > 768 && tableWidth > parentWidth){
				$('.table-responsive').parents('.page-content').css({'width':parentWidth + 'px'});
				$('.table-responsive').parents('.content-wrapper').css({'width': '100%'});
				$('.table-responsive').parents('.content').css({'padding': '0'});
			} else {
				$('.table-responsive').parents('.page-content').css({'width':''});
				$('.table-responsive').parents('.content-wrapper').css({'width': ''});
				$('.table-responsive').parents('.content').css({'padding': ''});
			}
		}
	});
	/* Chỉnh lại độ rộng khi click Ẩn/Hiện cột */
	$('.table-responsive').on('change',function (){
		var t = $(this);
		let parentWidth = t.parents('.page-content').width(),
			tableWidth = $('.table-responsive table').width();
		if(parentWidth > 768 && tableWidth > parentWidth){
			$('.table-responsive').parents('.page-content').css({'width':parentWidth + 'px'});
			$('.table-responsive').parents('.content-wrapper').css({'width': '100%'});
			$('.table-responsive').parents('.content').css({'padding': '0'});
		} else {
			$('.table-responsive').parents('.page-content').css({'width':''});
			$('.table-responsive').parents('.content-wrapper').css({'width': ''});
			$('.table-responsive').parents('.content').css({'padding': ''});
		}
	});

	//Style Menu ngang bị tràn nội dung sang bên phải khi có nhiều menu con
	if($('#menuHorizontal').length){
		if($('#menuHorizontal li').length >= 10) {
			$('#menuHorizontal > li:nth-last-child(3) .dropdown-menu,#menuHorizontal > li:nth-last-child(2) .dropdown-menu,#menuHorizontal > li:last-child .dropdown-menu').css({'left': 'inherit','right': 0});
			$('#menuHorizontal > li:nth-last-child(3) .dropdown-menu .dropdown-submenu .dropdown-menu,#menuHorizontal > li:nth-last-child(2) .dropdown-menu .dropdown-submenu .dropdown-menu,#menuHorizontal > li:last-child .dropdown-menu .dropdown-submenu .dropdown-menu').css({'right': 100+'%','left': 'inherit'});
		}
	}

	//Fix text hidden on annoucement dashboard
	$(document).ready(function() {
		$('#notifyBox li').hover(function () {
			if($(this).find('a').width() > 450){
				$('#notifyBox li:hover a').css('margin-left', '-15em');
			} else if($(this).find('a').width() > 400){
				$('#notifyBox li:hover a').css('margin-left', '-5em');
			}
		},function () {
			$('#notifyBox li a').css('margin-left', '0em');
		});

	});

	// suggest doanh nghiệp
	storeSuggestHandler.load({
		tbSuggest: '#storeIdName',
		emptyDataHandler: function () {
			$('#storeId').val('');
		},
		selectHandler: function (s) {
			$('#storeIdName').val(s.label);
			$('#storeId').val(s.id).trigger('change');
		}
	});

	// suggest doanh nghiệp
	storeSuggestHandler.load({
		tbSuggest: '#businessIdName',
		emptyDataHandler: function () {
			$('#businessId').val('');
		},
		selectHandler: function (s) {
			$('#businessIdName').val(s.label);
			$('#businessId').val(s.id).trigger('change');
		}
	});

	/**
	 * @author NghiaNV
	 * check sau 30p thì mới call thông báo lên server check 1 lần.
	 * Thay đổi lại logic khi user đăng nhập, lưu lastSigninDateTime vào localstorage (không lưu cookie nữa),
	 * dùng để check toàn bộ các thông báo có publishedDateTime lớn hơn khoảng thời gian này để tính là thông báo mới, không quan tâm tới việc user đã đọc / chưa đọc nữa, vì thực tế không có nhiều tác dụng
	 */
	if(MobileAppClient.isMobileAppLayout()){
		localStorage.removeItem('lastSigninDateTime');
		localStorage.removeItem('announcementData');
	} else {
		if(localStorage.lastSigninDateTime) {
			var lastTimeAnnouncement = AppAnnouncement.lastTimeAnnouncement(),
				announcementData = AppAnnouncement.announcementData(),
			currentDateTime = AppAnnouncement.currentDateTime;
			if (currentDateTime > Number(lastTimeAnnouncement)) {  // current date time > time cookie + 30 phút
				AppAnnouncement.loadLatestAnnouncement();
			}else{
				AppAnnouncement.loadAnnouncementDom({data : announcementData});
			}
		} else {
			localStorage.lastSigninDateTime = AppAnnouncement.currentDateTime;
			AppAnnouncement.loadLatestAnnouncement();
		}
	}


	/**
	 * Click scroll to bottom support menu mobile
	 * */
	$(document).on('click','#supportBottom',function (){
		$('html , body').animate({
			scrollTop: $(document).height()
		}, 'slow');
		return false;
	});
});

var AppAnnouncement = {
    currentDateTime : new Date().getTime(),

	lastTimeAnnouncement: function(){
		var lastTime;
		if ($.cookie('lastTimeAnnouncement') == null){
			lastTime = null;
		}else{
			lastTime = $.cookie('lastTimeAnnouncement');
		}
		return lastTime;
	},

	announcementData: function (){
        var data;
        if (localStorage.announcementData == null){
            data = null;
        } else {
            data = localStorage.announcementData;
        }
        return data;
    },

    loadLatestAnnouncement: function () {
        AppAjax.post(
            '/application/index/loadAnnouncement',
			{},
        	function(rs) {
				if (rs.code == 1) {
					// Kiểm tra các thông báo có publishDateTime > lastSigninDateTime để hiển thị ra ngoài danh sách
					var dataBeforeCheck = JSON.parse(rs.announcementData),
						dataAfterCheck = [];
					$.each(dataBeforeCheck, function (index, value) {
						if (Number(value[2]) > Number(localStorage.lastSigninDateTime)) {
							dataAfterCheck.push(value);
						}
					})
					localStorage.announcementData = JSON.stringify(dataAfterCheck);
				}
				var data = AppAnnouncement.announcementData();
				AppAnnouncement.loadAnnouncementDom({data: data});
			}
        );
    },
    loadAnnouncementDom:function(options){
		if(JSON.parse(options.data).length > 0){
			$('#js-notify-qty').append('<i class="fas fa-bell fa-lg"></i>');
		}else{
			$('#js-notify-qty').append('<i class="far fa-bell fa-lg"></i>');
		}

        if(options.data){
			var currentData = JSON.parse(options.data);
            $.each(currentData, function( index, value ) {
                $('#notifyBox').append('<li class="dropdown-item"><a href="'+value[0]+'" class="media-title noticeItem font-weight-semibold text-default"><i class="far fa-bell mr-1"></i>'+ value[1] +'</a></li>\n');
            });
        }
    }
};

function formatDecimal(n){
    n += '';
    if(!$.trim(n)){
        return '';
    }

    var x = n.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }

    return x1 + x2;
}
function renderStyleButtonMobile(){
	$('#buttonMenuMobileFilter').parent().css({
		'position': 'fixed',
		'top': '48px',
		'padding': '0',
		'left': '0',
		'width': '100%',
		'max-width': '100%',
		'z-index': '100'
	});
	if ($('#expired-messages').text().length > 0) {
		$('#buttonMenuMobileFilter').parent().css({
			'position': 'fixed',
			'top': '72px',
			'padding': '0',
			'left': '0',
			'width': '100%',
			'max-width': '100%',
			'z-index': '100'
		});
	}
}
function renderStyleButtonDefault() {
	$('#buttonMenuMobileFilter').parent().attr('style', '');
	$('#buttonMenuMobileFilter').attr('style', 'display:none');
}
