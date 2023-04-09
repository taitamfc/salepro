"use strict";
$(function () {
    // load drawCharts 1 lần rồi, thêm option callback đang gây ra tình huống load thêm lần nữa
    // google.charts.load('current', {'packages': ['corechart'], 'callback': drawCharts});
    google.charts.load('current', {'packages': ['corechart']});
    AppData.init();
    AppDashboard.init();
});
var AppDashboard  = {
    storeId: '',
    depotId: '',
    dateRangeValue: 'today',
    isDoneLoadingRevenue: false,
    isDoneLoadingHistory: false,
    isDoneLoadingTopProduct: false,
    isDoneLoadingChartRevenue: false,
    isDoneLoadingTopDepot: false,
    isDoneLoadingNewOrders: false, //load đơn hàng mới, đã gửi hvc, thất bại
    dataChart: {},
    init: function() {
        AppDashboard.storeId = $('#storeId').val();
        AppDashboard.depotId = $('#depotId').val();
        AppDashboard.dateRangeValue =  $('#dateRangeValue').val() ? $('#dateRangeValue').val() : 'today';
        $('#dashBoardDateRangeOption').on('click', '.dropdown-item', function () {
            AppDashboard.dateRangeValue = $(this).attr('data-range');
            $('#dashBoardDateRangeOption').find('.dateValue').text($(this).text());
            //AppDashboard.loadDashboard();
            AppDashboard.resetData({notLoadHistory: true});
            AppDashboard.loadDashboardRevenue();
            AppDashboard.loadDashboardTop();
            AppDashboard.loadTopDepot();
            AppDashboard.loadNewOrders();
        });
        $('#storeOptions').on('click', '.dropdown-item', function () {
            AppDashboard.storeId = $(this).attr('data-value');
            $('#storeOptions').find('.storeValue').text($(this).text());
            AppDashboard.loadDepots($(this).attr('data-value'));
            AppDashboard.loadDashboard();
            AppDashboard.loadChartRevenue();
        });
        $('#depotOptions').on('click', '.dropdown-item', function () {
            AppDashboard.depotId = $(this).attr('data-value');
            $('#depotOptions').find('.depotValue').text($(this).text());
            AppDashboard.loadDashboard();

        });
        //Vừa vào chạy luôn 1 lần
        AppDashboard.loadDashboard();
        //thông báo chỉ load 1 lần ngay khi mới vào
        AppDashboard.loadAnnouncement();
        //chart chỉ load 1 lần
        AppDashboard.loadChartRevenue();

        //Vẽ lại chart khi thay đổi màn hình
        $(window).resize(function() {
           drawCharts();
        });
    },
    loadDashboard: function() {
       // AppDashboard.openLoading();
        AppDashboard.resetData();
        AppDashboard.loadDashboardRevenue();
        AppDashboard.loadDashboardHistory();
        AppDashboard.loadDashboardTop();
        AppDashboard.loadTopDepot();
        AppDashboard.loadNewOrders();
        AppDashboard.loadChartRevenue();
    },
    resetData: function(options){
        AppDashboard.isDoneLoadingRevenue = false,
        AppDashboard.isDoneLoadingHistory = false,
        AppDashboard.isDoneLoadingTopProduct =  false,
        AppDashboard.isDoneLoadingTopDepot =  false,
        AppDashboard.isDoneLoadingNewOrders =  false,
        //
        $('#revenueDashboardArea').find('.totalRevenue').empty().html('<span class="spinner-border spinner-border-sm"></span>');
        $('#revenueDashboardArea').find('.rateRevenue').empty().html('');
        $('#revenueDashboardArea').find('.totalRetailRevenue').empty().html('<span class="spinner-border spinner-border-sm"></span>');
        $('#revenueDashboardArea').find('.totalBillRetail').empty().html('');
        $('#revenueDashboardArea').find('.rateRetail').empty().html('');
        $('#revenueDashboardArea').find('.totalShippingRevenue').empty().html('<span class="spinner-border spinner-border-sm"></span>');
        $('#revenueDashboardArea').find('.totalBillShipping').empty().html('');
        $('#revenueDashboardArea').find('.rateShipping').empty().html('');
        $('#revenueDashboardArea').find('.totalRemainValue').empty().html('<span class="spinner-border spinner-border-sm"></span>');
        $('#revenueDashboardArea').find('.totalProductRemainValue').empty().html('');
        if (! options || ! options.notLoadHistory){
            $('#historyDashboarArea').find('.card-body').empty().html('<div class="text-center"><span class="spinner-border"></span></div>');
        }
        $('#topDashboardProduct tbody').empty().append('<tr><td colspan="3"><div class="text-center"><span class="spinner-border"></span></div></td></tr>');
        $('#topDashboardEmployee tbody').empty().append('<tr><td colspan="3"><div class="text-center"><span class="spinner-border"></span></div></td></tr>');
        $('#topDashboardDepot tbody').empty().append('<tr><td colspan="3"><div class="text-center"><span class="spinner-border"></span></div></td></tr>');
        $('#topDashboardOrder tbody').empty().append('<tr><td colspan="3"><div class="text-center"><span class="spinner-border"></span></div></td></tr>');
    },

    //Doanh thu
    loadDashboardRevenue: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue: AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=revenue', params, function (rs) {
            AppDashboard.isDoneLoadingRevenue = true;
            if (! rs.data){
              //  $('#revenueDashboardArea').find('.card-body').append('<div class="text-info">Không có dữ liệu</div>');
            }else{
                AppDashboard.appendRevenueDashboard(rs.data);
            }
            // AppDashboard.closeLoading();
        });

    },
    appendRevenueDashboard: function(data){
        var currentData = data.current;
        var periodData = data.period;
        if (data.current){
            var revenueTemplate = $('#revenueDashboardArea');
            revenueTemplate.find('.totalRevenue').text(AppFuntions.roundBigNumber(currentData.totalRevenue));
            revenueTemplate.find('.totalRetailRevenue').text(AppFuntions.roundBigNumber(currentData.totalRetailRevenue));
            revenueTemplate.find('.totalShippingRevenue').text(AppFuntions.roundBigNumber(currentData.totalShippingRevenue));
            revenueTemplate.find('.totalBillShipping').text(' ('+ AppFuntions.roundBigNumber(currentData.totalBillShipping) + ' đơn)');
            var numberRetailValueHtml = AppFuntions.roundBigNumber(currentData.totalBillRetail) + ' hóa đơn';
            revenueTemplate.find('.totalBillRetail').text(' ('+numberRetailValueHtml+')');
           // $('#revenueDashboardArea').find('.card-body').empty().append(revenueTemplate);
        }
        if (data.currentInventory){
            var revenueTemplate = $('#revenueDashboardArea');
            revenueTemplate.find('.totalRemainValue').text(AppFuntions.roundBigNumber(data.currentInventory.totalRemain));
            revenueTemplate.find('.totalProductRemainValue').text(AppFuntions.roundBigNumber(data.currentInventory.totalProductRemain) + ' sản phẩm');
        }
        //So sánh tổng doanh thu cùng kỳ
        var iconRateRevenue = '<i class="fa fa-long-arrow-up"></i>';
        var rateRevenue = AppDashboard.comparePreriod(currentData.totalRevenue, periodData.totalRevenue);
        if (rateRevenue < 0){
            iconRateRevenue = '<i class="fa fa-long-arrow-down"></i>';
        }
        var rateHtml = iconRateRevenue +' '+ Math.abs(rateRevenue)+ '%';
        $('#revenueDashboardArea').find('.rateRevenue').empty().append(rateHtml).attr('title', AppFuntions.formatDecimal(periodData.totalRevenue));

        //So sánh doanh thu bán lẻ cùng kỳ
        var rateRetailRevenue = AppDashboard.comparePreriod(currentData.totalRetailRevenue, periodData.totalRetailRevenue);
        var iconRateRetailRevenue = '<i class="fa fa-long-arrow-up"></i>';
        if (rateRetailRevenue < 0){
            iconRateRetailRevenue = '<i class="fa fa-long-arrow-down"></i>';
        }
        var rateHtml = iconRateRetailRevenue +' '+ Math.abs(rateRetailRevenue)+ '%';
        $('#revenueDashboardArea').find('.rateRetail').empty().append(rateHtml).attr('title', AppFuntions.formatDecimal(periodData.totalRetailRevenue));

        //So sánh doanh thu chuyển hàng
        var rateShipping = AppDashboard.comparePreriod(currentData.totalShippingRevenue, periodData.totalShippingRevenue);
        var iconRateShippingRevenue = '<i class="fa fa-long-arrow-up"></i>';
        if (rateShipping < 0){
            iconRateShippingRevenue = '<i class="fa fa-long-arrow-down"></i>';
        }
        var rateHtml = iconRateShippingRevenue +' '+ Math.abs(rateShipping)+ '%';
        $('#revenueDashboardArea').find('.rateShipping').empty().append(rateHtml).attr('title', AppFuntions.formatDecimal(periodData.totalShippingRevenue));

    },
    comparePreriod: function(currentValue, periodValue){
        currentValue = parseInt(currentValue);
        periodValue = parseInt(periodValue);
        if (! periodValue && ! currentValue){
            return 0;
        }
        if (! periodValue && currentValue > 0){
            return 100;
        }
        var value = currentValue - periodValue;
        if (currentValue == 0){
            return -100;
        }
        if (periodValue == 0){
            return 100;
        }
        var percent = Math.round(value *100/ periodValue);
        return percent;

    },

    //Lịch sử tạo dơn
    loadDashboardHistory: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue:  AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=history', params, function (rs) {
            AppDashboard.isDoneLoadingHistory = true;
            if (rs.code == 0 || ! rs.data){
                $('#historyDashboarArea').find('.card-body').append('<div class="text-info">Không có dữ liệu</div>');
            }else{
                AppDashboard.appendHistoryDashboard(rs.data);
            }
            // AppDashboard.closeLoading();
        });
    },
    appendHistoryDashboard: function(data){
        var html = '<ul class="media-list">';
        $.each(data, function (key,item) {
            var cartColor = '';
            var cartIcon = 'fa-shopping-bag';
            var link = '';
            var modeStr = '';
            var moneyColor = 'text-dark';
            switch (item.mode) {
                case 'order':
                    cartColor = '';
                    if(item.saleChannel == appConsts.order.saleChannels.SALE_CHANNEL_SHOPEE) {
                        cartColor = 'color-shoppe';
                    } else if(item.saleChannel == appConsts.order.saleChannels.SALE_CHANNEL_SENDO) {
                        cartColor = 'color-sendo';
                    }else if(item.saleChannell == appConsts.order.saleChannels.SALE_CHANNEL_TIKI) {
                        cartColor = 'color-tiki';
                    }else if(item.saleChannell == appConsts.order.saleChannels.SALE_CHANNEL_LAZADA){
                        cartColor = 'color-lazada';
                    }
                    cartIcon = 'fa-shopping-cart';
                    link = '/order/manage/detail?storeId='+ item.storeId + '&id=' + item.id;
                    modeStr = 'đơn hàng';
                    break;
                case 'wholesale':
                	cartColor = 'text-blue-400';
                    modeStr = 'hóa đơn';
                    link = '/pos/bill/detail?storeId='+ item.storeId + '&id=' + item.id;
                    break;
                case 'retail':
                	cartColor = 'text-blue-400';
                    modeStr = 'hóa đơn';
                    link = '/pos/bill/detail?storeId='+ item.storeId + '&id=' + item.id;
                    break;
            }
            if (item.type == 'import'){
                cartColor = 'text-danger';
                modeStr = 'hóa đơn trả hàng';
                cartIcon = 'fal fa-reply';
                moneyColor = 'text-danger';
            }
            var depotNameStr = '';
            if (item.depotName){
                depotNameStr = ' - ' + item.depotName;
            }
            html += '<li class="media">';
            html += '<div class="mr-2"><a href="'+link+'" class="btn '+cartColor+' fal '+cartIcon+' fa-lg"></a></div>';
            html += '<div class="media-body">';
            html += (item.customerName ? item.customerName : 'Hệ thống');
            html += '<div class="font-size-sm">'+AppDashboard.toCalendarTime(item.createdDateTime)+' '+depotNameStr+'</div>';
            html += '</div>';
            html += '<div class="ml-3 text-right">' +
                    '<a class="'+moneyColor+' font-weight-semibold" href="'+link+'">'+(item.type == 'import'? '- '+ item.money: item.money)+'</a> ';
            if (item.mode == 'order'){
                html += '<br/><span class="badge badge-pill '+item.classStatus+'" >'+item.statusName+'</span>';
            }
            html +=   '</div>';
            html += '</li>';
        });
        html += '</ul>';
        $('#historyDashboarArea').find('.card-body').empty().append(html);
    },

    //5 sản phẩm bán chay, 5 nhân viên doanh số cao nhất
    loadDashboardTop: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue:  AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=top', params, function (rs) {
            AppDashboard.isDoneLoadingTopProduct  = true;
            if (rs.code == 0 || ! rs.data){
                $('#topDashboardProduct tbody').empty().append('<tr><td colspan="3"><div class="col-md-12 text-info">Không có dữ liệu</div></td></tr>');
                $('#topDashboardEmployee tbody').empty().append('<tr><td colspan="3"><div class="col-md-12 text-info">Không có dữ liệu</div></td></tr>');
            }else{
                if (rs.data.products){
                    var html = '';
                    var keyIndex = 0;
                    $.each(rs.data.products, function (key,item) {
                        var textImage = item.imagePath ? '<img src="'+item.imagePath+'" class="rounded-circle" width="32" height="32" alt="">' : '';
                        if (! textImage){
                            textImage = '<a href="#" class="btn '+AppDashboard.getRandomBackgroundClass(keyIndex)+' rounded-round btn-icon btn-sm"><span class="letter-icon">'+item.name.charAt(0).toUpperCase()+'</span></a>'
                        }
                        var textCode = item.code ? '<span> - '+item.code+'</span>' : '';
                        html += '<tr>';
                        html += '<td class="text-wrap">';
                        html += '<a href="#" class="text-default letter-icon-title">'+item.name+'</a><div class="font-size-sm">';
                        html += '</td>';
                        html += '<td class="text-right"><span class="">'+item.total+'</span></td>';
                        html += '<td class="text-right"><span class="">'+item.remain+'</span></td>';
                        html += '<td class="text-right"><span class="mb-0">'+AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(item.revenue))+'</span></td>';
                        html += '</tr>';
                        keyIndex += 1;
                    });
                    $('#topDashboardProduct tbody').empty().append(html);
                }
                if (rs.data.employees && rs.data.employees.length){
                    var html = '';
                    var keyIndex = 0;
                    $.each(rs.data.employees, function (key,item) {
                        html += '<tr>';
                        html += '<td>';
                        html += '<div class="d-flex align-items-center">';
                        html += '<a href="#" class="text-default letter-icon-title">'+item.fullName+'</a><div class="font-size-sm">';
                        html += '</div>';
                        html += '</div>';
                        html += '</td>';
                        html += '<td class="text-right"><span class="">'+item.total+'</span></td>';
                        html += '<td class="text-right"><span class="mb-0">'+AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(item.revenue))+'</span></td>';
                        html += '</tr>';
                        keyIndex += 1;
                    });
                    $('#topDashboardEmployee tbody').empty().append(html);
                }else{
                    $('#topDashboardEmployee tbody').empty().append('<tr><td colspan="3"><div class="col-md-12 text-info">Không có dữ liệu</div></td></tr>');
                }
            }
            // AppDashboard.closeLoading();
        });
    },

    //load top depot
    loadTopDepot: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue:  AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=topdepot', params, function (rs) {
            AppDashboard.isDoneLoadingTopDepot = true;
            if (rs.code == 1 && rs.data != 'undefined') {
                var html = '';
                var keyIndex = 0;
                $.each(rs.data, function (key, item) {
                    keyIndex += 1;
                    html += '<tr>';
                    html += '<td style="max-width: 50px;" class="text-right"><span class="text-muted">' + keyIndex + '</span></td>';
                    html += '<td>';
                    html += '<a href="javascript:;" class="text-default letter-icon-title">' + item.name + '</a>';
                    html += '</div>';
                    html += '</td>';
                    html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(item.revenue)) + '</span></td>';
                    html += '</tr>';

                });
                $('#topDashboardDepot tbody').empty().append(html);
            } else {

                $('#topDashboardDepot tbody').empty().append('<tr><td colspan="3"><div class="col-md-12 text-info">Không có dữ liệu</div></td></tr>');
            }
        });
    },

    //load danh sách đơn hàng mới + đã gửi hvc + thất bại
    /**
     * https://erp.nhanh.vn/nhiem-vu/sua-lai-dong-tong-dashboard/116516
     * Dòng tổng đơn hàng không tính trạng thái đã gửi vận chuyển
     */
    loadNewOrders: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue:  AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=orders', params, function (rs) {
            AppDashboard.isDoneLoadingNewOrders = true;
            if (rs.code == 1 && rs.data != 'undefined') {
                let totalNewQuantity = rs.data.totalNewQuantity ? parseInt(rs.data.totalNewQuantity) : 0;
                let totalNewValue = rs.data.totalNewValue ? parseInt(rs.data.totalNewValue) : 0;
                let totalSentCarrierQuantity = rs.data.totalSentCarrierQuantity ? parseInt(rs.data.totalSentCarrierQuantity) : 0;
                let totalSentCarrierValue = rs.data.totalSentCarrierValue ? parseInt(rs.data.totalSentCarrierValue) : 0;
                let totalSuccessQuantity = rs.data.totalSuccessQuantity ? parseInt(rs.data.totalSuccessQuantity) : 0;
                let totalSuccessValue = rs.data.totalSuccessValue ? parseInt(rs.data.totalSuccessValue) : 0;
                let totalFailedQuantity = rs.data.totalFailedQuantity ? parseInt(rs.data.totalFailedQuantity) : 0;
                let totalFailedValue = rs.data.totalFailedValue ? parseInt(rs.data.totalFailedValue) : 0;
                let totalCancelQuantity = rs.data.totalCancelQuantity ? parseInt(rs.data.totalCancelQuantity) : 0;
                let totalCancelValue = rs.data.totalCancelValue ? parseInt(rs.data.totalCancelValue) : 0;

                var html = '';
                html += '<tr>';
                html += '<td class="">Mới</td>';
                html += '<td class="text-right"><span class="">' + AppFuntions.formatDecimal(totalNewQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalNewValue)) + '</span></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td class="">Đã gửi vận chuyển</td>';
                html += '<td class="text-right"><span class="">' + AppFuntions.formatDecimal(totalSentCarrierQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalSentCarrierValue)) + '</span></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td class="">Thành công</td>';
                html += '<td class="text-right"><span class="">' + AppFuntions.formatDecimal(totalSuccessQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalSuccessValue)) + '</span></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td class="">Thất bại</td>';
                html += '<td class="text-right"><span class="">' + AppFuntions.formatDecimal(totalFailedQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalFailedValue)) + '</span></td>';
                html += '</tr>';
                html += '<tr>';
                html += '<td class="">Hủy</td>';
                html += '<td class="text-right"><span class="">' + AppFuntions.formatDecimal(totalCancelQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalCancelValue)) + '</span></td>';
                html += '</tr>';
                html += '<td class="font-weight-semibold">Tổng</td>';
                html += '<td class="text-right"><span class="font-weight-semibold">' + AppFuntions.formatDecimal(totalNewQuantity + totalSuccessQuantity + totalCancelQuantity + totalFailedQuantity) + '</span></td>';
                html += '<td class="text-right"><span class="font-weight-semibold mb-0">' + AppFuntions.formatDecimal(AppFuntions.roundFloatNumber(totalNewValue + totalSuccessValue + totalCancelValue + totalFailedValue)) + '</span></td>';
                html += '</tr>';
                $('#topDashboardOrder tbody').empty().append(html);
            } else {

                $('#topDashboardOrder tbody').empty().append('<tr><td colspan="3"><div class="col-md-12 text-info">Không có dữ liệu</div></td></tr>');
            }
        });
    },

    loadChartRevenue: function(){
        var params = {
            storeId: AppDashboard.storeId,
            depotId: AppDashboard.depotId,
            dateRangeValue:  AppDashboard.dateRangeValue,
        };
        AppAjax.post('/report/dashboard/index?typeReport=timeline', params, function (rs) {
            AppDashboard.isDoneLoadingChartRevenue = true;
            if (rs.data){
                AppDashboard.dataChart = rs.data;
                setTimeout(function () {
                    drawCharts();
                }, 500);
            }
        });
    },
    drawChartRevenue: function(data){
        var dataChartRevenue = new google.visualization.DataTable();
        dataChartRevenue.addColumn('string', 'Ngày');
        dataChartRevenue.addColumn('number', 'Tháng này');
        dataChartRevenue.addColumn('number', 'Tháng trước');
        $.each(data, function(key, item){
            var row = [item.date, parseInt(item.revenue), parseInt(item.lastRevenue) ];
            dataChartRevenue.addRow(row);
        });
        var options = {
            animation:{
                duration: 1000,
                easing: 'out'
            },
            legend: {
                position: 'none',
            },
            fontSize: '14px',
            series: {
                0: {
                    targetAxisIndex: 3
                },
                1: {
                    targetAxisIndex: 3
                },
            },
            chartArea: {left:30, top:40, bottom: 50, right:110},
            backgroundColor: {
                fillOpacity: 0.8
            },
    		lineWidth: 2,
            pointSize: 4
        };
        var formatter = new google.visualization.NumberFormat({pattern:'#,###'});
        formatter.format(dataChartRevenue, 1);
        var chartRevenue = new google.visualization.AreaChart(document.getElementById('chartRevenue'));
        chartRevenue.draw(dataChartRevenue, options);
    },


    openLoading: function () {
        $('#loadingModal').modal('show');
    },
    closeLoading: function(){
        if (AppDashboard.isDoneLoadingHistory && AppDashboard.isDoneLoadingRevenue && AppDashboard.isDoneLoadingTopProduct){
            setTimeout(function(){$('#loadingModal').modal('hide') },300);
        }
    },
    toCalendarTime: function(date, refernceDate=null){
        var myTime = moment(date, [moment.ISO_8601, 'DD/MM/YYYY HH:mm:ss']);
        return myTime.fromNow();
    },

    loadAnnouncement: function(){
        AppAjax.post('/report/dashboard/index?typeReport=announcement', {}, function (rs) {
            if (rs.code == 0 || ! rs.data){
                $('#announcementArea li').empty().append('<div class="text-info">Không có dữ liệu</div>');
            }else{
                AppDashboard.appendAnnouncement(rs.data);
            }
        });
    },
    appendAnnouncement: function(data){
        if (! data){
            $('#announcementArea li').append('<div class="col-md-12 text-info">Không có dữ liệu</div>');
            return;
        }

        var html = '';
        var keyIndex = 0;
        $.each(data, function (key,item) {
             html += '<li class="media">';
            var link = item.viewLink;
            html += '<div class="media-body">';
            if(item.image) {
                html += '<div class="row"><div class="col-3 p-0 text-center"><a href="'+link+'"><img width="130" height="60" src="' + item.image + '" /></a></div>';
                html += '<div class="col-9"><a class="text-default" href="'+link+'">'+item.title+'</a>';
                html += '<div class="font-size-sm">'+AppDashboard.toCalendarTime(item.createdDateTime)+'</div></div></div>';
            } else {
                html += '<a class="text-default" href="'+link+'">'+item.title+'</a>';
                html += '<div class="font-size-sm">'+AppDashboard.toCalendarTime(item.createdDateTime)+'</div>';
            }
            html += '</div>';
            keyIndex += 1;
            html += '</li>';
        });
        $('#announcementArea').empty().append(html);
    },

    getRandomBackgroundClass: function(key){
        key = parseInt(key);
        if (key > 4){
            key = key % 5;
        }
        var randomBgClass = [
          'bg-blue', 'bg-warning-400', 'bg-success-400', 'bg-pink-400' , 'bg-teal-400'
        ];
        return randomBgClass[key];
    },
    //Load kho theo kiểu riêng không dùng được hàm chung
    loadDepots: function(storeId){
        if (! storeId){
            return;
        }
        AppAjax.post(
            '/store/manage/load?tab=depot',
            {storeId: storeId,'type':'manage'},
            function(rs) {
                var htmlOptions = '';
                $.each(rs.data, function(index, value) {
                     htmlOptions += '<li><a href="javascript:;" data-value="'+value.id+'" class="dropdown-item">'+value.name+'</a></li>'
                });
                $('#depotSelectElement').empty().append(htmlOptions);
            }
        );
    }
};

function drawCharts(){
    if (AppDashboard.dataChart){
        AppDashboard.drawChartRevenue(AppDashboard.dataChart);
    }
}
