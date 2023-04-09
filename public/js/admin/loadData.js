
/**
 * object xử lý load data
 * @author hungpx
 * Lưu ý: Chỉ xử lý loadData khi storeId thay đổi (khi 1 user quản lý nhiều doanh nghiệp), còn
 * trường hợp quản lý 1 doanh nghiệp thì load từ form rồi
 */
var AppData =
{
    init: function(options){
    	var storeId = options && options.storeId ? options.storeId : '#storeId';
        var depotId = options && options.depotId ? options.depotId : '#depotId';
        var typeDepot = options && options.typeDepot ? options.typeDepot : 'manage';
        var moreValueDepots = options && options.moreValueDepots ? options.moreValueDepots : []; //Thêm giá trị khác(VD: 1- => Không có cửa hàng nào)
        var defaultDepotId = options && options.defaultDepotId ? options.defaultDepotId : false;
        var multiselectDepot = options && options.multiselectDepot ? options.multiselectDepot : false;
        var defaultAssignDepotId = options && options.defaultAssignDepotId ? options.defaultAssignDepotId : false;
        var addOptionsDepotId = options && options.addOptionsDepotId ? options.addOptionsDepotId : [];

        var relatedDepotId = options && options.relatedDepotId ? options.relatedDepotId : '#relatedDepotId';
        var defaultRelatedDepotId = options && options.defaultRelatedDepotId && $(options.defaultRelatedDepotId).val() ? $(options.defaultRelatedDepotId).val().split(',') : '';
        var typeRelatedDepot = options && options.typeRelatedDepot ? options.typeRelatedDepot : 'manage';
        var morerValueRelatedDepots = options && options.moreValueRelatedDepots ? options.moreValueRelatedDepots : [];
        var multiselectRelatedDepot = options && options.multiselectRelatedDepot ? options.multiselectRelatedDepot : false;
        var defaultAssignRelatedDepotId = options && options.defaultAssignRelatedDepotId ? options.defaultAssignRelatedDepotId : false; //cho phép chọn set value mặc định nếu chỉ có 1 kết quả

        var categoryId = options && options.categoryId ? options.categoryId : '#categoryId';
        var multiselectCategory = options && options.multiselectCategory ? options.multiselectCategory : false;

        $(storeId).change(function () {
            var storeId = $(this).val();
            //Load cửa hàng
            AppData.loadDepots({
                storeId: storeId,
                type: typeDepot,
                element: depotId,
                addOptionsDepotId: addOptionsDepotId,
                moreValueDepots: moreValueDepots,
                defaultDepotId: defaultDepotId,
                multiselect: multiselectRelatedDepot,
                defaultAssignDepotId: defaultAssignDepotId
            });

            if($(relatedDepotId).length) {
                AppData.loadDepots({
                    storeId: storeId,
                    type: typeRelatedDepot,
                    element: relatedDepotId,
                    moreValueDepots: morerValueRelatedDepots,
                    defaultDepotId: defaultRelatedDepotId,
                    multiselect: multiselect,
                    defaultAssignDepotId: defaultAssignRelatedDepotId
                });
            }

            //Load danh mục
            if($(categoryId).length) {
                AppData.loadCategories({
                    storeId: storeId,
                    element: categoryId,
                    multiselect: multiselectCategory,
                });
            }

        });
    },

    /**
     * load kho của doanh nghiệp
     * @params options
     * - storeId: id của doanh nghiệp
     * Chỉ load kho của 1 doanh nghiệp
     */
    loadDepots: function(options)
    {
        if(! options.storeId) {
            return;
        }
        var element = options.element;
        var dataPost = {};
        dataPost.storeId = options.storeId;

        if(options.type) {
            dataPost.type = options.type;
        }

        // Gắn sẵn depotId đã được chọn trước đó
        var selectedDepotIds = [];
        if($(element).val()) {
            if($.isArray($(element).val())) {
                selectedDepotIds = $(element).val();
            } else {
                selectedDepotIds.push($(element).val());
            }
        }

        AppAjax.post(
            '/store/manage/load?tab=depot',
            dataPost,
            function(rs) {
                // xóa kho của doanh nghiệp cũ, giữ lại - Chọn cửa hàng -
                $(options.element).find('option:gt(0)').remove();
                if(options.element) {
                    var htmlOptions = "";
                    // Thêm options
                    if(options.moreValueDepots && $.isArray(options.moreValueDepots)) {
                        $.each(options.moreValueDepots, function (index, value) {
                            var selected = '';
                            if(options.defaultDepotId && $.isArray(options.defaultDepotId) && $.inArray(value.id, options.defaultDepotId) != -1) {
                                selected = 'selected="selected"';
                            } else if(options.defaultDepotId && options.defaultDepotId == value.id) {
                                selected = 'selected="selected"';
                            } else if(selectedDepotIds && $.isArray(selectedDepotIds) && $.inArray(value.id, selectedDepotIds) != -1) {
                                selected = 'selected="selected"';
                            }
                            htmlOptions += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
                        });
                    }

                    $.each(rs.data, function(index, value) {
                        var selected = '';
                        if(options.defaultDepotId && $.isArray(options.defaultDepotId) && $.inArray(value.id, options.defaultDepotId) != -1) {
                            selected = 'selected="selected"';
                        } else if(options.defaultDepotId && options.defaultDepotId == value.id) {
                            selected = 'selected="selected"';
                        } else if(selectedDepotIds && $.isArray(selectedDepotIds) && $.inArray(value.id, selectedDepotIds) != -1) {
                            selected = 'selected="selected"';
                        }
                        htmlOptions += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
                    });
                    $(element).append(htmlOptions);

                    // Multiselect theo multiselect b
                    if ($(element).hasClass('select-multipleCheckbox')) {
                        $(element).trigger('change.select2');
                    } else {
                        if(options.multiselect) {
                            $(element).trigger('change.select2');
                        }
                    }

                    /**
                     * - Nếu có và tham số noDefaultAssignDepotId == true => ko chọn sẵn kho với doanh nghiệp có 1 kho
                     * - Mặc định chọn sẵn kho nếu doanh nghiệp chỉ có 1 kho
                     * */
                    if(options.defaultAssignDepotId && $(element + ' option').length == 2) {
                        $(element).val($(element + ' option:eq(1)').val());
                        // rise event change depotId
                        $(element).change();
                    }

                    if(options.defaultDepotId) {
                        $(element).change();
                    }

                    AppForm.initSelectSearchBox(element);
                }
            }
        );
    },
    //Load danh mục
    loadCategories: function(options){
        if (! options.storeId){
            return;
        }
        var element = options.element;
        var dataPost = {};
        dataPost.storeId = options.storeId;
        AppAjax.post('/store/category/load',
            dataPost,
            function(rs) {
                // xóa kho của doanh nghiệp cũ,
                $(element).find('option:gt(0)').remove();
                if(element) {
                    var htmlOptions = "";
                    $.each(rs.data, function(index, value) {
                        htmlOptions += '<option value="'+ value.id +'" >'+ value.name +'</options>';
                    });
                    $(element).append(htmlOptions);
                    // Multiselect theo multiselect b
                    if ($(element).hasClass('select-multipleCheckbox')) {
                        $(element).trigger('change.select2');
                    } else {
                        if(options.multiselect) {
                            $(element).trigger('change.select2');
                        }
                    }

                    AppForm.initSelectSearchBox(element);
                }
            }
        );
    }
};
/**
 * object xử lý load doanh nghiệp
 * @author VanCK
 */
var storeSuggestHandler =
    {
        // cài đặt của doanh nghiệp
        storeSettings: {
            pos: {},
            accounting: {}
        },

        /**
         * @param options
         * - tbSuggest jquery selector (ô gợi ý doanh nghiệp)
         * - emptyDataHandler hàm xử lý khi xóa toàn bộ text ở tbSuggest
         * - selectHandler hàm xử lý khi user chọn doanh nghiệp từ danh sách gợi ý
         */
        load: function(options)
        {
            var storeName = options.tbSuggest;

            if(options.emptyDataHandler) {
                $(options.tbSuggest).keyup(function() {
                    if(!$(this).val()) {
                        options.emptyDataHandler();
                    }
                });
            }

            $(storeName).autoComplete({
                noResultsText: '',
                resolver: 'custom',
                formatResult: function (item) {
                    return {
                        value: item.id,
                        text: item.label
                    };
                },
                events: {
                    search: function (query, callback) {
                        AppAjax.ajax({
                            url: '/store/manage/load',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                tab: 'suggest',
                                q: query
                            },
                            success: function (res) {
                                callback(res.data);
                            }
                        });
                    }
                }
            });

            // Chọn user từ danh sách gợi ý
            $(storeName).on('autocomplete.select', function (evt, item) {
                return options.selectHandler(item);
            });
        },

        /**
         * load kho của doanh nghiệp
         * @params options
         * - storeId: id của doanh nghiệp
         * - responseHandler: hàm xử lý kết quả trả về
         * - autoPopulateSelectBoxDepot: jquery selector, select box để populate kết quả danh sách cửa hàng
         * - Không nên sử dụng multiselect và select2 cùng 1 lúc
         */
        loadDepots: function(options)
        {
            if(!options.storeId && !options.storeIds) {
                return;
            }

            var dataPost = {}, defaultOpts = '';
            if(options.storeId) {
                dataPost.storeId = options.storeId;
            }
            if(options.typeRetail) {
                dataPost.typeRetail = 1;
            }
            if(options.typeShipping) {
                dataPost.typeShipping = 1;
            }
            if(options.type) {
                dataPost.type = options.type;
            }

            // Gắn sẵn depotId đã được chọn trước đó
            var selectedDepotIds = [];
            if($(options.autoPopulateSelectBoxDepot).val()) {
                if($.isArray($(options.autoPopulateSelectBoxDepot).val())) {
                    selectedDepotIds = $(options.autoPopulateSelectBoxDepot).val();
                } else {
                    selectedDepotIds.push($(options.autoPopulateSelectBoxDepot).val());
                }
            }

            // Thêm options
            if(options.addOptionsDepotId && $.isArray(options.addOptionsDepotId)) {
                $.each(options.addOptionsDepotId, function (index, value) {
                    selected = '';
                    var id = value.id;
                    if(selectedDepotIds && $.isArray(selectedDepotIds) && $.inArray(id.toString(), selectedDepotIds) != -1) {
                        selected = 'selected="selected"';
                    } else if(selected && selected == value.id) {
                        selected = 'selected="selected"';
                    }
                    defaultOpts += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
                });
            }
            var url = '/store/manage/load?tab=depot';
            if(options.storeIds) {
                // /admin/user/add + edit đang dùng đến cái này
                url = '/store/manage/load?tab=loadManyStore';
                dataPost.storeIds = options.storeIds;
            }
            AppAjax.post(
                url,
                dataPost,
                function(rs) {
                    // xóa kho của doanh nghiệp cũ, giữ lại - Chọn cửa hàng -
                    if(options.autoPopulateSelectBoxDepot) {
                        $(options.autoPopulateSelectBoxDepot).find('option:gt(0)').remove();
                    }
                    if(options.autoPopulateSelectBoxDepot) {
                        var htmlOptions = "";

                        $.each(rs.data, function(index, value) {
                            var selected = '';
                            if(options.defaultDepotId && $.isArray(options.defaultDepotId) && $.inArray(value.id, options.defaultDepotId) != -1) {
                                selected = 'selected="selected"';
                            } else if(options.defaultDepotId && options.defaultDepotId == value.id) {
                                selected = 'selected="selected"';
                            } else if(selectedDepotIds && $.isArray(selectedDepotIds) && $.inArray(value.id, selectedDepotIds) != -1) {
                                selected = 'selected="selected"';
                            }
                            htmlOptions += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
                        });
                        $(options.autoPopulateSelectBoxDepot).append(defaultOpts + htmlOptions);

                        // Multiselect theo multiselect b
                        if ($(options.autoPopulateSelectBoxDepot).hasClass('select-multipleCheckbox')) {
                            $(options.autoPopulateSelectBoxDepot).trigger('change.select2');
                        } else {
                            if(options.multiselect) {
                                $(options.autoPopulateSelectBoxDepot).trigger('change.select2');
                            }
                        }

                        /**
                         * - Nếu có và tham số noDefaultAssignDepotId == true => ko chọn sẵn kho với doanh nghiệp có 1 kho
                         * - Mặc định chọn sẵn kho nếu doanh nghiệp chỉ có 1 kho
                         * */
                        if(options.noDefaultAssignDepotId && options.noDefaultAssignDepotId == true) {

                        } else {
                            if($(options.autoPopulateSelectBoxDepot + ' option').length == 2) {
                                $(options.autoPopulateSelectBoxDepot).val($(options.autoPopulateSelectBoxDepot + ' option:eq(1)').val());
                                // rise event change depotId
                                $(options.autoPopulateSelectBoxDepot).change();
                            }
                        }

                        if(options.defaultDepotId) {
                            $(options.autoPopulateSelectBoxDepot).change();
                        }

                        // Chuyển select thành select2 cho phép gõ gợi ý
                        if(options.select2 && rs.data.length > 10) {
                            $(options.autoPopulateSelectBoxDepot).select2();
                        }
                    }

                    if(options.responseHandler) {
                        options.responseHandler(rs.data);
                    }
                }
            );
        },

        /**
         * load cài đặt của doanh nghiệp
         * @params array options
         * - storeId
         * - responseHandler: hàm xử lý khi nhận được kết quả từ server trả về
         */
        loadSettings: function(options)
        {
            AppAjax.post(
                '/store/setting/load?tab=commonSettings',
                {
                    storeId: options.storeId
                },
                function(rs) {
                    storeSuggestHandler.storeSettings = rs.data;
                    if(options.hasOwnProperty('responseHandler')) {
                        options.responseHandler(rs.data);
                    }
                    return rs.data;
                }
            );
        },

        /**
         * load tài khoản kế toán của doanh nghiệp
         * @params array options
         * - storeId
         * - responseHandler: xử lý dữ liệu trả về
         * - defaultTypeHandler: [account_accounts.type => ['#transferAccountId', '#creditAccountId'] ]
         */
        loadAccountingAccounts: function(options)
        {
            AppAjax.post(
                '/accounting/account/load',
                {
                    storeId: options.storeId,
                    itemId: options.itemId ? options.itemId : '',
                    type: options.type ? options.type : '',
                    types: options.hasOwnProperty('types') ? options.types : []
                },
                function(rs) {
                    if(options.hasOwnProperty('responseHandler')) {
                        options.responseHandler(rs.data);
                    }
                }
            );
        },

        suggestAccountingAccount: function(options) {
            $(options.tbSuggest).autoComplete({
                noResultsText: '',
                resolver: 'custom',
                formatResult: function (item) {
                    return {
                        value: item.id,
                        text: item.label
                    };
                },
                events: {
                    search: function (query, callback) {
                        AppAjax.ajax({
                            url: '/accounting/account/load?tab=suggest',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                storeId: $(options.storeId).val(),
                                q: query
                            },
                            success: function(res){
                                callback(res);
                            }
                        });
                    }
                }
            });

            // Chọn khách hàng từ danh sách gợi ý
            $(options.tbSuggest).on('autocomplete.select', function (evt, item) {
                return options.selectHandler(item);
            });
        },

        assignAccountingAccounts: function (data, options) {
            if(!data || data == "null" || data == "undefined") {
                if(options.hasOwnProperty('errorHandler')) {
                    options.errorHandler();
                }
                return false;
            }

            var depotId = options.depotId ? options.depotId : '';
            var assignElements = options.assignElements ? options.assignElements : [];
            if(!assignElements.length) {
                if(options.hasOwnProperty('errorHandler')) {
                    options.errorHandler();
                }
                return false;
            }

            // Tài khoản ngân hàng
            // var depotBankAccounts = [];
            // var depotCreditAccounts = [];
            // $.each(data, function (i, vl) {
            //     if(vl.type == 1) {// Tài khoản ngân hàng
            //         if(depotId && vl.itemId && depotId == vl.itemId) {
            //             depotBankAccounts.push(vl.id);
            //         }
            //     } else if(vl.type == 7) { // Tài khoản quẹt thẻ
            //         if(depotId && vl.itemId && depotId == vl.itemId) {
            //             depotCreditAccounts.push(vl.id);
            //         }
            //     }
            // });

            // Xử lý gắn tài khoản vào element
            $.each(assignElements, function(index, value) {
                var options = '<option value="">- '+value.label+' -</option>';
                // Mảng đánh dấu tài khoản theo cửa hàng
                var depotAccounts = [];
                $.each(data, function (i, vl) {
                    if(vl.type == value.typeAccount) {
                        //if(depotId && vl.itemId && depotId == vl.itemId) {
                        depotAccounts.push(vl.id);
                        //}
                    }
                });

                $.each(data, function (i, vl) {
                    var selected = '';
                    if(vl.type == value.typeAccount) {
                        if(depotAccounts.length == 1 || vl.id == value.defaultAccountId) {
                            selected = 'selected="selected"';
                        }
                        //if(!depotAccounts.length || (depotAccounts.length && vl.itemId && vl.itemId == depotId)) {
                        options += '<option value="' + vl.id + '" ' + selected + '>' + vl.label + '</option>';
                        //}
                    }
                    // else if(value.typeAccount == 7 && !depotCreditAccounts.length) {
                    //     if(vl.type == 1) {
                    //         // Chưa có tài khoản loại quẹt thẻ theo của hàng => Lấy tài khoản loại ngân hàng
                    //         if(vl.id == value.defaultAccountId) {
                    //             selected = 'selected="selected"';
                    //         }
                    //         if(depotBankAccounts.length) {
                    //             if(vl.itemId && vl.itemId == depotId) {
                    //                 options += '<option value="' + vl.id + '" ' + selected + '>' + vl.label + '</option>';
                    //             }
                    //         } else {
                    //             options += '<option value="'+ vl.id +'" '+selected+'>'+ vl.label +'</option>';
                    //         }
                    //     }
                    // }
                });

                $(value.elementId).html(options);
                if (value.value){
                    $(value.elementId).val(value.value);
                }
            });

            if(options.hasOwnProperty('responseHandler')) {
                options.responseHandler();
            }
        },

        loadAccountingContacts: function(options)
        {
            AppAjax.post(
                '/accounting/contact/loaditems',
                {
                    storeId: options.storeId,
                    types: options.hasOwnProperty('types') ? options.types : []
                },
                function(rs) {
                    if(options.hasOwnProperty('responseHandler')) {
                        options.responseHandler(rs.data);
                    }
                }
            );
        },

        /**
         * @author Chautm
         * - Lấy thương hiệu và khởi tạo select2.
         * - Load lại thương hiệu, đặt mặc định phần tử đã chọn.
         * @param opts
         */
        loadBrands: function (opts) {
            if (!opts.element) {
                return;
            }
            var e = $(opts.element), s = $('#storeId'), data = '',
                defaultOpts = '<option value="">- Thương hiệu -</option>',
                reload = false, selected = -5, loadNoBrand = 0;

            if (opts.reload && opts.reload == true) {
                reload = true;
            }
            if (opts.loadNoBrand) {
                loadNoBrand = 1;
            }

            // Gắn lại brandId đã được chon
            var selectedBrandIds = [];
            if(e.val()) {
                if($.isArray(e.val())) {
                    selectedBrandIds = e.val();
                } else {
                    selectedBrandIds.push(e.val());
                }
            }

            // Thêm options
            if(opts.addOptionsBrandId && $.isArray(opts.addOptionsBrandId)) {
                $.each(opts.addOptionsBrandId, function (index, value) {
                    selected = '';
                    var id = value.id;
                    if(selectedBrandIds && $.isArray(selectedBrandIds) && $.inArray(id.toString(), selectedBrandIds) != -1) {
                        selected = 'selected="selected"';
                    } else if(selected && selected == value.id) {
                        selected = 'selected="selected"';
                    }

                    defaultOpts += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
                });
            }

            // Khởi tạo select2
            if (!reload) {
                e.select2({
                    minimumResultsForSearch: 10
                });
            }

            if (opts.storeId) {
                AppAjax.post('/product/brand/load', {storeId: opts.storeId, json: 1, loadNoBrand: loadNoBrand},
                    function (response) {
                        if(response.data) {
                            data = $.map(response.data, function (obj) {
                                selected = '';
                                var id = obj.id;
                                if(selectedBrandIds && $.isArray(selectedBrandIds) && $.inArray(id.toString(), selectedBrandIds) != -1) {
                                    selected = 'selected="selected"';
                                } else if(selected && selected == obj.id) {
                                    selected = 'selected="selected"';
                                }
                                return '<option value="' + obj.id + '" '+selected+'>' + obj.name + '</option>';
                            });
                            e.html(defaultOpts + data);
                            if (e.hasClass('select-multipleCheckbox')) {
                                $(e).trigger('change.select2');
                            } else {
                                if(opts.multiselect) {
                                    $(e).trigger('change.select2');
                                }
                            }
                        }
                    }
                );
            } else {
                s.change(function () {
                    if ($(this).val()) {
                        AppAjax.post('/product/brand/load', {storeId: $(this).val(), json: 1, loadNoBrand: loadNoBrand},
                            function (response) {
                                if(response.data) {
                                    data = $.map(response.data, function (obj) {
                                        return '<option value="' + obj.id + '">' + obj.name + '</option>';
                                    });
                                    e.html(defaultOpts + data);
                                    if (e.hasClass('select-multipleCheckbox')) {
                                        $(e).trigger('change.select2');
                                    } else {
                                        if(opts.multiselect) {
                                            $(e).trigger('change.select2');
                                        }
                                    }
                                }
                            }
                        );
                    }
                });
            }
        },

        /**
         * @author Giapnv
         * Khi chọn doanh nghiệp
         * => Load Cửa hàng
         * => Load Thương hiệu
         * => Load Danh mục
         * => Load Danh mục nội bộ
         * @param options
         */
        storeLoadRelatedData: function (options) {
            // @todo checking
            // VanCK comment 2018-11-19
            // dòng này đang call 2 lần, vì khi có storeId thì controller đã tự fill data rồi
            // call hàm này thành ra client lại call thêm 1 lần nữa.
            // chỉ call ở js khi mà $('#storeId').change() thôi
            this.loadDataStore(options);

            var tbSuggest = options && options.tbSuggest ? options.tbSuggest : '#storeIdName';
            this.load({
                tbSuggest: tbSuggest,
                emptyDataHandler: function() {
                    $('#storeId').val('');
                    $(tbSuggest).val('');
                },
                selectHandler: function(s) {
                    $('#storeId').val(s.id);
                    $(tbSuggest).val(s.label);
                }
            });

            // Thay đổi doanh nghiệp
            $('#storeId').change(function () {
                storeSuggestHandler.loadDataStore(options);
            });
        },

        loadDataStore: function (options) {
            var storeId = $('#storeId').val();
            if(!storeId) {
                return false;
            }

            var depotId = options && options.depotId ? options.depotId : '#depotId';
            var defaultDepotId = options && options.defaultDepotId && $(options.defaultDepotId).val() ? $(options.defaultDepotId).val().split(',') : '';
            var typeDepot = options && options.typeDepot ? options.typeDepot : 'manage';
            var multiSelectDepotId = options && options.multiSelectDepotId ? options.multiSelectDepotId : false;
            var addOptionsDepotId = options && options.addOptionsDepotId ? options.addOptionsDepotId : false;
            var noDefaultAssignDepotId = options && options.noDefaultAssignDepotId ? options.noDefaultAssignDepotId : false;
            var select2DepotId = options && options.select2DepotId ? options.select2DepotId : false;

            var relatedDepotId = options && options.relatedDepotId ? options.relatedDepotId : '#relatedDepotId';
            var defaultRelatedDepotId = options && options.defaultRelatedDepotId && $(options.defaultRelatedDepotId).val() ? $(options.defaultRelatedDepotId).val().split(',') : '';
            var typeRelatedDepot = options && options.typeRelatedDepot ? options.typeRelatedDepot : 'manage';
            var multiSelectRelatedDepotId = options && options.multiSelectRelatedDepotId ? options.multiSelectRelatedDepotId : false;
            var addOptionsRelatedDepotId = options && options.addOptionsRelatedDepotId ? options.addOptionsRelatedDepotId : false;
            var noDefaultAssignRelatedDepotId = options && options.noDefaultAssignRelatedDepotId ? options.noDefaultAssignRelatedDepotId : false;
            var select2RelatedDepotId = options && options.select2RelatedDepotId ? options.select2RelatedDepotId : false;

            var categoryId = options && options.categoryId ? options.categoryId : '#categoryId';
            var multiSelectCategoryId = options && options.multiSelectCategoryId ? options.multiSelectCategoryId : false;
            var addOptionsCategoryId = options && options.addOptionsCategoryId ? options.addOptionsCategoryId : false;

            var internalCategoryId = options && options.internalCategoryId ? options.internalCategoryId : '#internalCategoryId';
            var multiSelectInternalCategoryId = options && options.multiSelectInternalCategoryId ? options.multiSelectInternalCategoryId : false;
            var addOptionsInternalCategoryId = options && options.addOptionsInternalCategoryId ? options.addOptionsInternalCategoryId : false;

            var brandId = options && options.brandId ? options.brandId : '#brandId';
            var loadNoBrand = options && options.loadNoBrand ? 1 : 0;
            var addOptionsBrandId = options && options.addOptionsBrandId ? options.addOptionsBrandId : false;
            var multiSelectBrandId = options && options.multiSelectBrandId ? options.multiSelectBrandId : false;
            // Loại bỏ text option mặc định select
            var noDefaultValueSelect = options && options.noDefaultValueSelect ? options.noDefaultValueSelect : false;

            if($(depotId).length) {
                this.loadDepots({
                    type: typeDepot,
                    storeId: storeId,
                    defaultDepotId: defaultDepotId,
                    multiselect: multiSelectDepotId,
                    autoPopulateSelectBoxDepot: depotId,
                    addOptionsDepotId: addOptionsDepotId,
                    select2: select2DepotId,
                    noDefaultAssignDepotId: noDefaultAssignDepotId
                });
            }
            if($(relatedDepotId).length) {
                this.loadDepots({
                    type: typeRelatedDepot,
                    storeId: storeId,
                    defaultDepotId: defaultRelatedDepotId,
                    multiselect: multiSelectRelatedDepotId,
                    autoPopulateSelectBoxDepot: relatedDepotId,
                    addOptionsDepotId: addOptionsRelatedDepotId,
                    select2: select2RelatedDepotId,
                    noDefaultAssignDepotId: noDefaultAssignRelatedDepotId,
                    noDefaultValueSelect: noDefaultValueSelect
                });
            }
            if($(brandId).length) {
                this.loadBrands({
                    element : brandId,
                    reload: true,
                    multiselect: multiSelectBrandId,
                    loadNoBrand: loadNoBrand,
                    addOptionsBrandId: addOptionsBrandId,
                    storeId: storeId
                });
            }
            if($(categoryId).length) {
                categorySuggestHandler.load({
                    element: categoryId,
                    reload: true,
                    multiselect: multiSelectCategoryId,
                    addOptionsCategoryId: addOptionsCategoryId,
                    storeId: storeId,
                    noDefaultValueSelect: noDefaultValueSelect,
                });
            }
            if($(internalCategoryId).length) {
                categorySuggestHandler.loadInternal({
                    element: internalCategoryId,
                    reload: true,
                    multiselect: multiSelectInternalCategoryId,
                    addOptionsInternalCategoryId: addOptionsInternalCategoryId,
                    storeId: storeId,
                    noDefaultValueSelect: noDefaultValueSelect,
                });
            }
            if(options && options.hasOwnProperty('executeOtherHandler')) {
                options.executeOtherHandler();
            }
        }
    };

/**
 * @author Chautm
 * - Gợi ý danh mục
 * @type {{load: categorySuggestHandler.load, loadInternal: categorySuggestHandler.loadInternal}}
 */
var categorySuggestHandler = {
    /**
     * @author Chautm
     * - Dùng để khởi tạo ô chọn danh mục sử dụng select2.
     * - Load cùng sự kiện thay đổi doanh nghiệp.
     * - Sử dụng thư viện select2.
     * - Có thể tìm kiếm nếu dữ liệu trong ô lớn hơn 10 bản ghi.
     * @param opts
     */
    load: function (opts) {
        if (!opts.element) {
            return;
        }
        var e = $(opts.element), s = $('#storeId'), data = '',
            defaultOpts = '<option value="">' +(opts.noDefaultValueSelect ? '' : '- Danh mục -')+'</option>',
            reload = false, selected = -5;

        if(opts.hasOwnProperty('noDefaultOption') && opts.noDefaultOption){
            defaultOpts = '';
        }

        if(opts.reload && opts.reload == true){
            reload = true;
        }
        // Gắn sẵn categoryId đã được chọn trước đó
        var selectedCategoryIds = [];
        if(e.val()) {
            if($.isArray(e.val())) {
                selectedCategoryIds = e.val();
            } else {
                selectedCategoryIds.push(e.val());
            }
        }
        // Thêm options
        if(opts.addOptionsCategoryId && $.isArray(opts.addOptionsCategoryId)) {
            $.each(opts.addOptionsCategoryId, function (index, value) {
                selected = '';
                var id = value.id;
                if(selectedCategoryIds && $.isArray(selectedCategoryIds) && $.inArray(id.toString(), selectedCategoryIds) != -1) {
                    selected = 'selected="selected"';
                } else if(selected && selected == value.id) {
                    selected = 'selected="selected"';
                }
                defaultOpts += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
            });
        }

        // Khởi tạo select2
        if(!reload){
            e.select2({
                minimumResultsForSearch: 10
            });
        }

        if (opts.storeId) {
            AppAjax.post('/store/category/load', {storeId: opts.storeId},
                function (response) {
                    data = $.map(response, function (obj) {
                        selected = '';
                        var id = obj.id;
                        if(selectedCategoryIds && $.isArray(selectedCategoryIds) && $.inArray(id.toString(), selectedCategoryIds) != -1) {
                            selected = 'selected="selected"';
                        } else if(selected && selected == obj.id) {
                            selected = 'selected="selected"';
                        }
                        return '<option value="' + obj.id + '" '+selected+'>' + obj.name + '</option>';
                    });
                    e.html(defaultOpts + data);
                    if (e.hasClass('select-multipleCheckbox')) {
                        $(e).trigger('change.select2');
                    } else {
                        if(opts.multiselect) {
                            $(e).trigger('change.select2');
                        }
                    }
                }
            );
        } else {
            s.change(function () {
                if ($(this).val()) {
                	AppAjax.post('/store/category/load', {storeId: $(this).val()},
                        function (response) {
                            data = $.map(response, function (obj) {
                                return '<option value="' + obj.id + '">' + obj.name + '</option>';
                            });
                            e.html(defaultOpts + data);
                            if (e.hasClass('select-multipleCheckbox')) {
                                $(e).trigger('change.select2');
                            } else {
                                if(opts.multiselect) {
                                    $(e).trigger('change.select2');
                                }
                            }
                        }
                    );
                }
            });
        }
    },

    /**
     * @author Chautm
     * - Dùng để khởi tạo ô chọn danh mục nội bộ sử dụng select2.
     * - Load cùng sự kiện thay đổi doanh nghiệp.
     * - Sử dụng thư viện select2.
     * - Có thể tìm kiếm nếu dữ liệu trong ô lớn hơn 10 bản ghi.
     * @param opts
     */
    loadInternal: function (opts) {
        if (!opts.element) {
            return;
        }
        var e = $(opts.element), s = $('#storeId'), data = '',
            reload = false,
            defaultOpts = '<option value="">' +(opts.noDefaultValueSelect ? '' : '- Danh mục nội bộ -')+'</option>',
            selected = -5;

        // Gắn sẵn InternalCategoryIds đã được chọn trước đó
        var selectedInternalCategoryIds = [];
        if(e.val()) {
            if($.isArray(e.val())) {
                selectedInternalCategoryIds = e.val();
            } else {
                selectedInternalCategoryIds.push(e.val());
            }
        }

        // Thêm options
        if(opts.addOptionsInternalCategoryId && $.isArray(opts.addOptionsInternalCategoryId)) {
            $.each(opts.addOptionsInternalCategoryId, function (index, value) {
                selected = '';
                var id = value.id;
                if(selectedInternalCategoryIds && $.isArray(selectedInternalCategoryIds) && $.inArray(id.toString(), selectedInternalCategoryIds) != -1) {
                    selected = 'selected="selected"';
                }
                defaultOpts += '<option value="'+ value.id +'" '+selected+'>'+ value.name +'</options>';
            });
        }

        if(opts.reload && opts.reload == true){
            reload = true;
        }

        // Khởi tạo select2
        if(!reload) {
            e.select2({
                placeholder: '- Danh mục nội bộ -',
                minimumResultsForSearch: 10
            });
        }

        if (opts.storeId) {
        	AppAjax.post('/store/category/load?tab=internal', {storeId: opts.storeId, 'page' : 'store.internall.loadNew'},
                function (response) {
                    data = $.map(response, function (obj, i) {
                        selected = '';
                        var id = obj.id;
                        if(selectedInternalCategoryIds && $.isArray(selectedInternalCategoryIds) && $.inArray(id.toString(), selectedInternalCategoryIds) != -1) {
                            selected = 'selected="selected"';
                        }
                        return '<option value="' + obj.id + '" '+selected+'>' + obj.value + '</option>';
                    });
                    e.html(defaultOpts + data);
                    if (e.hasClass('select-multipleCheckbox')) {
                        $(e).trigger('change.select2');
                    } else {
                        if(opts.multiselect) {
                            $(e).trigger('change.select2');
                        }
                    }
                }
            );
        } else {
            s.change(function () {
                if ($(this).val()) {
                    AppAjax.post('/store/category/internalload/', {storeId: $(this).val(),'page' : 'store.internall.loadNew'},
                        function (response) {
                            data = $.map(response, function (obj, i) {
                                if(selected == obj.id){
                                    return '<option selected="selected" value="' + obj.id + '">' + obj.value + '</option>';
                                }

                                return '<option value="' + obj.id + '">' + obj.value + '</option>';
                            });
                            e.html(defaultOpts + data);
                            if (e.hasClass('select-multipleCheckbox')) {
                                $(e).trigger('change.select2');
                            } else {
                                if(opts.multiselect) {
                                    $(e).trigger('change.select2');
                                }
                            }
                        }
                    );
                }
            });
        }
    }
};

/**
 * object xử lý load sản phẩm, imei
 * @author VanCK
 */
var productSuggestHandler =
{
    rsCache: [],
    keyEnter: false,

    /**
     * @param options
     * - storeId jquery selector (chọn doanh nghiệp)
     * - depotId jquery selector (chọn cửa hàng)
     * - tbSuggest jquery selector (ô gợi ý sản phẩm)
     * - fGetProductStoreId hàm get id của sản phẩm (dùng trong tình huống suggest IMEI của sản phẩm)
     * - cacheHandler hàm xử lý khi gặp sản phẩm đã tồn tại trong danh
     * - selectHandler hàm xử lý khi user chọn sản phẩm từ danh sách gợi ý
     */
    load: function(options)
    {
        var tbProduct = options.tbSuggest,
            noResultsText = options.noResultsText ? options.noResultsText : 'Không tìm thấy sản phẩm';
        // check image suggest product
        var autocompleteResultHasImage = false;

        $(tbProduct).keyup(function(e) {
            // - Bắt key enter của đầu đọc mã vạch, check nếu mã vạch đã tồn tại trong danh sách
            // thì tăng số lượng của dòng sản phẩm đó lên
            // - Nếu dùng mobile barcode scanner thì chủ động set productSuggestHandler.keyEnter = true
            if(e.keyCode === 13 || productSuggestHandler.keyEnter) {
                productSuggestHandler.keyEnter = true;
                if(options.cacheHandler && productSuggestHandler.rsCache[$(tbProduct).val()]) {
                    options.cacheHandler($(tbProduct).val());
                    productSuggestHandler.keyEnter = false;
                    if(!options.notEmptyTbSuggest) {
                        $(tbProduct).val('');
                    }
                }
            } else {
                productSuggestHandler.keyEnter = false;
            }

            // Trường hợp xóa nội dung ở ô gợi ý
            if(options && options.emptyDataHandler) {
                if(!$(this).val()) {
                    options.emptyDataHandler();
                }
            }
        });

        $(tbProduct).autoComplete({
            resolver: 'custom',
            formatResult: function (item) {
                var textLabel = options.suggestBy == appConsts.product.suggests.SUGGEST_IMEI ? item.label : item.text;
                var textDisplay = '';
                // nếu có image mới hiện box image
                if (autocompleteResultHasImage && item.imgPath) {
                    textDisplay += '<div class="d-inline-flex boxImage mr-2"><img src="' + item.imgPath + '" /></div>';
                }
                textDisplay += '<div class="d-flex align-items-center flex-wrap w-100">';
                textDisplay += '<div class="text-nowrap w-100">'+textLabel+'</div>';
                textDisplay += '<div><span>('+(item.price ? AppFuntions.formatDecimal(item.price) : 0)+')</span>';
                if(item.showAvailable == true){
                    textDisplay += '<span class="ml-1 '+(item.available > 0 ? 'text-success' : 'text-danger')+'">(Tồn CTB: '+(item.available ? AppFuntions.formatDecimal(item.available) : 0)+')</span>';
                }
                if (item.code) {
                    textDisplay += '<span class="ml-1">('+item.code+')</span>';
                }
                textDisplay += '</div></div>';
                return {
                    value: item.id,
                    text: "[" + item.code + "] " + item.text,
                    html: textDisplay
                };
            },
            minLength: 3,
            noResultsText: noResultsText,
            events: {
                search: function (query, callback) {
                    $(tbProduct).parent('.input-group').find('.fa-spinner').addClass('fa-spin');
                    AppAjax.ajax({
                        url: '/product/item/suggest',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            q: query,
                            storeId: $(options.storeId).val(),
                            relatedStoreId: options.relatedStoreId ? $(options.relatedStoreId).val() : '',
                            allowSuggestOtherStore: options.allowSuggestOtherStore ? 1 : '',
                            depotId: $(options.depotId).val(),
                            id: options.fGetProductStoreId ? options.fGetProductStoreId() : null,
                            onlyChild: options.onlyChild ? options.onlyChild : '',
                            onlyParent: options.onlyParent ? options.onlyParent : '',
                            isOriginal: options.isOriginal ? options.isOriginal : '',
                            loadParent : options.loadParent ? options.loadParent : '',
                            isClone: options.isClone ? options.isClone : '',
                            status: options.status,
                            type: options.type,
                            supplierId: options.supplierId ? $(options.supplierId).val() : '',
                            imeiStt: options.imeiStt,
                            suggestBy: options.suggestBy
                        },
                        success: function (rs) {
                            // check dữ liệu trả về có ảnh không
                            // nếu có thì sẽ đánh dấu hasImage để hiện box ảnh
                            autocompleteResultHasImage = false;
                            if (rs.length > 0) {
                                $.each(rs, function (key, val) {
                                    if (val.imgPath != '') {
                                        autocompleteResultHasImage = true;
                                        return false;
                                    }
                                });
                            }

                            $(tbProduct).parent('.input-group').find('.fa-spinner').removeClass('fa-spin');

                            // server response only 1 result:
                            // - no need to show the select, trigger select handler
                            // - save result to cache to reduce further call to server
                            if(rs.length == 1 && productSuggestHandler.keyEnter) {
                                options.selectHandler(rs[0]);
                                if(options.cacheHandler) {
                                    productSuggestHandler.rsCache[$(tbProduct).val()] = rs[0];
                                }
                                // current lib has no close event
//							$(tbProduct).autocomplete('close');
                            } else {
                                callback(rs);
                            }
                            productSuggestHandler.keyEnter = false;
                        }
                    });
                }
            }
        }).addClass('suggestProductBox');

        // Chọn sản phẩm từ danh sách gợi ý
        $(tbProduct).on('autocomplete.select', function (evt, item) {
        	productSuggestHandler.keyEnter = false;
            return options.selectHandler(item);
        });
    },

    /** @author hungpx
     *  Sửa lại hàm suggest sản phẩm cũ không dùng chung được
     */
    onlyParent: '',
    onlyChild: '',
    loadSuggest: function (options) {
        let tbProduct = options.tbSuggest;
        // check image suggest product
        let autocompleteResultHasImage = false;
        $(tbProduct).keyup(function(e) {
            // - Bắt key enter của đầu đọc mã vạch, check nếu mã vạch đã tồn tại trong danh sách
            // thì tăng số lượng của dòng sản phẩm đó lên
            // - Nếu dùng mobile barcode scanner thì chủ động set productSuggestHandler.keyEnter = true
            if(e.keyCode === 13 || productSuggestHandler.keyEnter) {
                productSuggestHandler.keyEnter = true;
                if(options.cacheHandler && productSuggestHandler.rsCache[$(tbProduct).val()]) {
                    options.cacheHandler($(tbProduct).val());
                    productSuggestHandler.keyEnter = false;
                    if(!options.notEmptyTbSuggest) {
                        $(tbProduct).val('');
                    }
                }
            } else {
                productSuggestHandler.keyEnter = false;
            }

            // Trường hợp xóa nội dung ở ô gợi ý
            if(options && options.emptyDataHandler) {
                if(!$(this).val()) {
                    options.emptyDataHandler();
                }
            }
        });

        $(tbProduct).autoComplete({
            resolver: 'custom',
            formatResult: function (item) {
                var textDisplay = '';
                // 17/06/2021 Giapnv: Hiển thị label "Có thể bán" hoặc "Tồn trong kho" theo cài đặt "Xuất âm"
                var textRemain = 'Tồn CTB';
                var valueRemain = item.available;
                if(options.hasOwnProperty('checkNegativeSale') && options.checkNegativeSale) {
                    if(storeSuggestHandler.storeSettings.pos.hasOwnProperty('restrictOutOfStock')
                        && storeSuggestHandler.storeSettings.pos.restrictOutOfStock == appConsts.settings.values.VALUE_NEGATIVE_SALE_REMAIN) {
                        textRemain = 'Tồn trong kho';
                        valueRemain = item.remainInDepot;
                    }
                }
                // nếu có image mới hiện box image
                if (autocompleteResultHasImage && item.imgPath) {
                    textDisplay += '<div class="d-inline-flex boxImage mr-2"><img src="' + item.imgPath + '" /></div>';
                }

                textDisplay += '<div class="d-flex align-items-center flex-wrap w-100 '+(autocompleteResultHasImage && item.imgPath ? '' : 'px-2')+'">';
                textDisplay += '<div class="text-nowrap w-100 font-weight-semibold">'+item.label+'</div>';
                if (item.hasOwnProperty('priceListValue') && item.priceListValue){
                    textDisplay += '<div><span class="font-weight-semibold">(<span class="text-success">'+(item.priceListValue ? AppFuntions.formatDecimal(item.priceListValue) : 0)+'</span> - <span><i class="fal fa-tag mr-1"></i>'+ item.priceListName +'</span>)</span>';
                }else{
                    textDisplay += '<div><span>('+(item.price ? AppFuntions.formatDecimal(item.price) : 0)+')</span>';
                }
                if(item.showAvailable == true){
                    textDisplay += '<span class="ml-1 '+(valueRemain > 0 ? 'text-success' : 'text-danger')+'">('+textRemain+': '+(valueRemain ? AppFuntions.formatDecimal(valueRemain) : 0)+')</span>';
                }
                if (item.code) {
                    textDisplay += '<span class="ml-2 font-size-sm">'+ item.code +'</span>';
                }
                textDisplay += '</div></div>';
                return {
                    value: item.id,
                    text: "[" + item.code + "] " + item.text,
                    html: textDisplay
                };
            },
            minLength: 3,
            noResultsText: 'Không tìm thấy sản phẩm',
            events: {
                search: function (query, callback) {
                    let suggestType = options.hasOwnProperty('suggestType') ? $(options.suggestType).val() : null;
                    /*
                    * 18/05/2022 Giapnv
                    * Trường hợp suggest sản phẩm dùng cho cả bản web và app
                    * (mà web dùng theo suggestType, app dùng theo getAttributeValueSuggestType)
                    * thì đang truyền cả 2 tùy chọn => Nếu getAttributeValueSuggestType ko có giá trị thì lấy theo suggestType
                    * */
                    if(options.hasOwnProperty('getAttributeValueSuggestType') && options.getAttributeValueSuggestType) {
                        suggestType = $(options.getAttributeValueSuggestType).attr('data-value')
                            ? $(options.getAttributeValueSuggestType).attr('data-value') : suggestType;
                    }
                    // hungpx lấy dữ liệu bảng giá
                    let priceListId = '';
                    if (options.hasOwnProperty('priceListId')){
                        if ($(options.priceListId).is("select")){
                            priceListId = $(options.priceListId).val();
                        }else{
                            priceListId = $(options.priceListId).find('.dropdown-item.active').attr('data-id');
                        }
                    }
                    let suggestProductBy = '';
                    let storeId = $(options.storeId).val();
                    let depotId = $(options.depotId).val();
                    let status = options.status ? options.status : appConsts.product.statuses.STATUS_NEW + ', ' + appConsts.product.statuses.STATUS_ACTIVE;
                    let relatedStoreId =  options.relatedStoreId ? $(options.relatedStoreId).val() : '';
                    let allowSuggestOtherStore =  options.allowSuggestOtherStore ? 1 : '';
                    let fGetProductStoreId = options.fGetProductStoreId ? options.fGetProductStoreId() : null;
                    let imeiStatus = '';
                    let onlyChild = 1;
                    let onlyParent = '';
                    let unTypeCombo = options.unTypeCombo ? 1 : '';
                    let branchId = options.branchId ? $(options.branchId).val() : '';
                    let loadParent = options.loadParent ? options.loadParent : '';
                    if (suggestType == 'imei') {
                        if (typeof options.imeiStt !== 'undefined' && options.imeiStt){
                            imeiStatus = options.imeiStt;
                        }else{
                            imeiStatus = appConsts.imei.statuses.STATUS_NEW + ', ' + appConsts.imei.statuses.STATUS_DEMO;
                        }
                    } else if (suggestType == 'soldLots') {
                        onlyChild = '';
                        onlyParent = 1;
                    }
                    productSuggestHandler.onlyChild = onlyChild;
                    productSuggestHandler.onlyParent = onlyParent;
                    if (suggestType == 'weight') {
                        suggestProductBy = appConsts.product.suggests.SUGGEST_WEIGHT;
                    } else if (suggestType == 'imei') {
                        suggestProductBy = appConsts.product.suggests.SUGGEST_IMEI;
                    } else if (suggestType == 'product') {
                        suggestProductBy = '';
                    } else if (suggestType == 'soldLots') {
                        suggestProductBy = appConsts.product.suggests.SUGGEST_SOLDLOTS;
                    }
                    $(tbProduct).parent('.input-group').find('.fa-spinner').addClass('fa-spin');
                    AppAjax.ajax({
                        url: '/product/item/suggest',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            q: query,
                            storeId: storeId,
                            relatedStoreId: relatedStoreId,
                            allowSuggestOtherStore: allowSuggestOtherStore,
                            depotId: depotId,
                            id: fGetProductStoreId,
                            onlyChild: onlyChild,
                            onlyParent: onlyParent,
                            status: status,
                            imeiStt: imeiStatus,
                            suggestBy: suggestProductBy,
                            type: options.type,
                            unTypeCombo: unTypeCombo,
                            branchId: branchId,
                            loadParent: loadParent,
                            priceListId: priceListId
                        },
                        success: function (rs) {
                            // check dữ liệu trả về có ảnh không
                            // nếu có thì sẽ đánh dấu hasImage để hiện box ảnh
                            autocompleteResultHasImage = false;
                            if (rs.length > 0) {
                                $.each(rs, function (key, val) {
                                    if (val.imgPath != '') {
                                        autocompleteResultHasImage = true;
                                        return false;
                                    }
                                });
                            }

                            $(tbProduct).parent('.input-group').find('.fa-spinner').removeClass('fa-spin');

                            // server response only 1 result:
                            // - no need to show the select, trigger select handler
                            // - save result to cache to reduce further call to server
                            if (rs.length == 1 && productSuggestHandler.keyEnter) {
                                options.selectHandler(rs[0]);
                                if (options.cacheHandler) {
                                    productSuggestHandler.rsCache[$(tbProduct).val()] = rs[0];
                                }
                                // current lib has no close event
//							$(tbProduct).autocomplete('close');
                            } else {
                                callback(rs);
                            }
                            productSuggestHandler.keyEnter = false;
                        }
                    });
                }
            }
        }).addClass('suggestProductBox');

        // Chọn sản phẩm từ danh sách gợi ý
        $(tbProduct).on('autocomplete.select', function (evt, item) {
            productSuggestHandler.keyEnter = false;
            $(tbProduct).val('');
            return options.selectHandler(item);
        });
    },

    loadProductBatch: function (options) {
        var tbProduct = options.tbSuggest;
        $('body').on('keyup', tbProduct, function(e) {
            // - Bắt key enter của đầu đọc mã vạch, check nếu mã vạch đã tồn tại trong danh sách
            // thì tăng số lượng của dòng sản phẩm đó lên
            // - Nếu dùng mobile barcode scanner thì chủ động set productSuggestHandler.keyEnter = true
            if(e.keyCode === 13 || productSuggestHandler.keyEnter) {
                productSuggestHandler.keyEnter = true;
                if(options.cacheHandler && productSuggestHandler.rsCache[$(tbProduct).val()]) {
                    options.cacheHandler($(tbProduct).val());
                    productSuggestHandler.keyEnter = false;
                    if(!options.notEmptyTbSuggest) {
                        $(tbProduct).val('');
                    }
                }
            } else {
                productSuggestHandler.keyEnter = false;
            }

            // Trường hợp xóa nội dung ở ô gợi ý
            if(options && options.emptyDataHandler) {
                if(!$(this).val()) {
                    options.emptyDataHandler();
                }
            }
        });

        $(tbProduct).autoComplete({
            resolver: 'custom',
            formatResult: function (item) {
                var remainNumber = item.batchRemain > 0 ? item.batchRemain : 0;
                var textDisplay = '';
                textDisplay += '<div class="d-flex align-items-center flex-wrap w-100">';
                textDisplay += '<div class="text-nowrap w-100 font-weight-semibold">'+item.label+'</div>';
                textDisplay += '<span class="ml-1 '+(remainNumber > 0 ? 'text-success' : 'text-danger')+'">(Tồn: '+(remainNumber ? AppFuntions.formatDecimal(remainNumber) : 0)+')</span>';
                textDisplay += '</div></div>';
                return {
                    value: item.id,
                    text: item.label,
                    html: textDisplay
                };
            },
            minLength: 3,
            noResultsText: 'Không tìm thấy lô',
            events: {
                search: function (query, callback) {
                    let storeId = $(options.storeId).val();
                    let depotId = $(options.depotId).val();
                    let productStoreId = $(tbProduct).attr('data-psid');
                    AppAjax.ajax({
                        url: '/product/batch/load?tab=suggest',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            storeId: storeId,
                            depotId: depotId,
                            loadRemain: 1,
                            productStoreId: productStoreId,
                            q: query
                        },
                        success: function(rs) {
                            if (rs.length == 1 && productSuggestHandler.keyEnter) {
                                options.selectHandler(rs[0]);
                                if (options.cacheHandler) {
                                    productSuggestHandler.rsCache[$(tbProduct).val()] = rs[0];
                                }
                            } else {
                                callback(rs);
                            }
                            productSuggestHandler.keyEnter = false;
                        }
                    });
                }
            }
        }).addClass('suggestProductBox');

        // Chọn sản phẩm từ danh sách gợi ý
        $(tbProduct).on('autocomplete.select', function (evt, item) {
            productSuggestHandler.keyEnter = false;
            $(tbProduct).val('');
            return options.selectHandler(item);
        });
    }
};

/**
 * object xử lý load thông tin user
 * @author VanCK
 */
var userSuggestHandler =
    {
        /**
         * @param options
         * - storeId jquery selector (chọn doanh nghiệp)
         * - depotId jquery selector (chọn cửa hàng)
         * - tbSuggest jquery selector (ô gợi ý user)
         * - emptyDataHandler hàm xử lý khi xóa toàn bộ text ở tbSuggest
         * - selectHandler hàm xử lý khi chọn user từ danh sách gợi ý
         */
        load: function(options) {
            if(options.emptyDataHandler) {
                $(options.tbSuggest).keyup(function() {
                    if(!$(this).val()) {
                        options.emptyDataHandler();
                    }
                });
            }
            var loadNoUser = 0;
            if(options.loadNoUser){
                loadNoUser = 1;
            }
            $(options.tbSuggest).autoComplete({
                noResultsText: '',
                resolver: 'custom',
                formatResult: function (item) {
                    return {
                        value: item.id,
                        text: item.label
                    };
                },
                events: {
                    search: function (query, callback) {
                        AppAjax.ajax({
                            url: '/system/user/suggest',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                loadNoUser: loadNoUser,
                                storeId: $(options.storeId).val(),
                                depotId: $(options.depotId).val(),
                                page: options.page ? options.page : '',
                                role: options.role ? options.role : '',
                                optionNoCustomerCare: options.optionNoCustomerCare ? options.optionNoCustomerCare : 0,
                                q: query
                            },
                            success: function (res) {
                                callback(res);
                            }
                        });
                    }
                }
            });

            // Chọn user từ danh sách gợi ý
            $(options.tbSuggest).on('autocomplete.select', function (evt, item) {
                return options.selectHandler(item);
            });
        }
    };

/**
 * object xử lý load thông tin khách hàng
 * @author VanCK
 */
var customerSuggestHandler =
    {
        rsCache: [],
        keyEnter: false,

        /**
         * @param options
         * - storeId jquery selector (chọn doanh nghiệp)
         * - depotId jquery selector (chọn cửa hàng)
         * - tbSuggest jquery selector (ô gợi ý khách hàng)
         * - emptyDataHandler hàm xử lý khi xóa toàn bộ text ở tbSuggest
         * - selectHandler hàm xử lý khi chọn khách hàng từ danh sách gợi ý
         */
        load: function(options) {
            if(options.emptyDataHandler) {
                $(options.tbSuggest).keyup(function() {
                    if(!$(this).val()) {
                        options.emptyDataHandler();
                    }
                });
            }

            $(options.tbSuggest).keyup(function(e) {
                if (e.keyCode === 13 || customerSuggestHandler.keyEnter) {
                    customerSuggestHandler.keyEnter = true;
                    if (options.cacheHandler && customerSuggestHandler.rsCache[$(options.tbSuggest).val()]) {
                        options.cacheHandler($(options.tbSuggest).val());
                        customerSuggestHandler.keyEnter = false;
                        $(options.tbSuggest).val('');
                    }
                } else {
                    customerSuggestHandler.keyEnter = false;
                }
            });

            $(options.tbSuggest).autoComplete({
                noResultsText: '',
                resolver: 'custom',
                formatResult: function (item) {
                    let label = item.label;
                    // Nếu có chỉ định cột hiển thị ở danh sách suggest thì hiển thị theo field này
                    if(options.hasOwnProperty('fieldDisplayLabel')){
                        if (typeof item[options.fieldDisplayLabel] != "undefined"){
                            label = item[options.fieldDisplayLabel];
                        }
                    }
                    // Biến đánh dấu có thêm <b> focus từ khóa trong kết quả tìm kiếm không
                    if(options.hasOwnProperty('isBoldShowMatchedTxt') && typeof isBoldShowMatchedTxt != "undefined"){
                        isBoldShowMatchedTxt = options.isBoldShowMatchedTxt;
                    }
                    return {
                        value: item.id,
                        text: label
                    };
                },
                minLength: options.minLength ? options.minLength : 3,
                events: {
                    search: function (query, callback) {
                        AppAjax.ajax({
                            url: '/customer/manage/suggest',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                storeId: $(options.storeId).val(),
                                depotId: $(options.depotId).val(),
                                q: query,
                                suggestField: options.suggestField,
                                loadCustomerTagIds: options.hasOwnProperty('loadCustomerTagIds') ? options.loadCustomerTagIds : 0,
                            },
                            success: function (res) {
                                if(res.data && res.data.length == 1 && customerSuggestHandler.keyEnter) {
                                    options.selectHandler(res.data[0]);
                                    if(options.cacheHandler) {
                                        customerSuggestHandler.rsCache[query] = res.data[0];
                                    }
                                } else {
                                    callback(res);
                                }
                                customerSuggestHandler.keyEnter = false;
                            }
                        });
                    }
                }
            });

            // Chọn khách hàng từ danh sách gợi ý
            $(options.tbSuggest).on('autocomplete.select', function (evt, item) {
                return options.selectHandler(item);
            });
        }
    };

/**
 * object xử lý load thông tin nhà cung cấp
 */
var supplierSuggestHandler =
    {
        rsCache: [],
        keyEnter: false,

        /**
         * @param options
         * - storeId jquery selector (chọn doanh nghiệp)
         * - depotId jquery selector (chọn cửa hàng)
         * - tbSuggest jquery selector (ô gợi ý khách hàng)
         * - emptyDataHandler hàm xử lý khi xóa toàn bộ text ở tbSuggest
         * - selectHandler hàm xử lý khi chọn khách hàng từ danh sách gợi ý
         */
        load: function(options) {
            if(options.emptyDataHandler) {
                $(options.tbSuggest).keyup(function() {
                    if(!$(this).val()) {
                        options.emptyDataHandler();
                    }
                });
            }

            $(options.tbSuggest).keyup(function(e) {
                if(e.keyCode == 13) {
                    supplierSuggestHandler.keyEnter = true;
                    if(options.cacheHandler && supplierSuggestHandler.rsCache[$(options.tbSuggest).val()]) {
                        options.cacheHandler($(options.tbSuggest).val());
                        supplierSuggestHandler.keyEnter = false;
                        $(options.tbSuggest).val('');
                    }
                } else {
                    supplierSuggestHandler.keyEnter = false;
                }
            });

            $(options.tbSuggest).autoComplete({
                noResultsText: '',
                resolver: 'custom',
                formatResult: function (item) {
                    return {
                        value: item.id,
                        text: item.label
                    };
                },
                events: {
                    search: function (query, callback) {
                        AppAjax.ajax({
                            url: '/store/supplier/suggest',
                            type: 'POST',
                            dataType: 'JSON',
                            data: {
                                storeId: $(options.storeId).val(),
                                q: query,
                                noSupplier: options.noSupplier,
                                status: options.status
                            },
                            success: function (res) {
                                if(res.data && res.data.length == 1 && supplierSuggestHandler.keyEnter) {
                                    options.selectHandler(res.data[0]);
                                    if(options.cacheHandler) {
                                        supplierSuggestHandler.rsCache[query] = res.data[0];
                                    }
                                } else {
                                    callback(res.data);
                                }
                                supplierSuggestHandler.keyEnter = false;
                            }
                        });
                    },
                }
            });

            // Chọn khách hàng từ danh sách gợi ý
            $(options.tbSuggest).on('autocomplete.select', function (evt, item) {
                return options.selectHandler(item);
            });
        }
    };


/**
 * Load sellers DN theo merchantId
 * @author ToanNV
 * */
var AppSeller = {
    init: function (options) {
        let elementId = options.hasOwnProperty('elementId') ? options.elementId : '#storeId';
        let elementStoreId = options.hasOwnProperty('storeId') ? options.storeId : '#storeId';
        let storeId = $(elementStoreId).val();
        if (typeof storeId != "undefined" && storeId){
            AppSeller.load(storeId, options);
        }

        if (!options.hasOwnProperty('notOnchange')) {
            $(document).on('change', elementId, function () {
                AppSeller.load($(elementStoreId).val(), options);
            });
        }
    },
    load: function (storeId, options) {
        if (storeId && typeof globalMerchantId != "undefined"){
            let params = {
                'storeId': storeId,
                'merchantId': globalMerchantId,
            };
            AppAjax.ajax({
                url: '/ecommerce/manage/loadseller',
                data: params,
                type: "POST",
                success: function (rs) {
                    if (options.hasOwnProperty('success')) {
                        options.success(rs);
                    }
                }
            });
        }
    }
}
