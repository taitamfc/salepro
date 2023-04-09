var AppFuntions = {
	formatDecimal: function (n) {
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
	},
	/**
	 *  Làm tròn số lớn => đổi sang dạng string
	 *  VD: 2.000.000 => 2 triệu
	 */
	roundBigNumber: function(value, decimal) {
        decimal = decimal ? decimal : 2;
		const myInt = parseInt(value);
		var num = AppFuntions.formatDecimal(myInt);
		var unit = '';
		if(myInt >= 900000){
			num = AppFuntions.decimalAdjust('round', myInt/1000000, -1*decimal).toString() ;
			unit = ' triệu';
		}
		if(myInt >= 900000000){
			num = AppFuntions.decimalAdjust('round', myInt/1000000000, -1*decimal).toString();
			unit = ' tỷ';

		}
		return num + '' +unit;
	},
	decimalAdjust: function(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// If the value is negative...
		if (value < 0) {
			return -decimalAdjust(type, -value, exp);
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	},
	initAutoNumeric: function(selector, options={}) {
		//hungpx kiểm tra nếu autonumeric đã khởi tạo rồi thì không khởi tạo nữa
		let index = 0;
		$(selector).each(function(){
			if (! AutoNumeric.isManagedByAutoNumeric($(selector + ':eq('+index+')').get(0))){
				new AutoNumeric($(selector + ':eq('+index+')').get(0),{
					decimalPlaces: options.hasOwnProperty('mDec') ? options.mDec : 0,
					minimumValue:options.hasOwnProperty('minimumValue') ? options.minimumValue : '0',
					modifyValueOnWheel: false
				});
			}
			index += 1;
		});
	},
	initAutoNumericDecimal: function(selector, options={}) {
		let index = 0;
		$(selector).each(function(){
			if (! AutoNumeric.isManagedByAutoNumeric($(selector + ':eq('+index+')').get(0))){
				new AutoNumeric($(selector + ':eq('+index+')').get(0), {
					decimalPlaces: options.hasOwnProperty('mDec') ? options.mDec : 3,
					allowDecimalPadding: false,
					minimumValue:options.hasOwnProperty('minimumValue') ? options.minimumValue : '0',
					modifyValueOnWheel: false
				});
			}
			index += 1;
		});
	},
	isValidForm: function(form,options){
		var isValid = true, key = 0, pos = 0;
		if (options == undefined || !options || options == ''){
            options = {};
		}
		$.each(form.find('.required'), function(){
			if (! $(this).val()){
                if(key == 0){
                    pos = $(this).offset().top;
                }
                key++;

				if (options.class){
                    $(this).addClass(options.class); // border-danger
				}
				$(this).closest('.form-group').find('.error').empty().append('<span class="validation-invalid-label">Bạn chưa nhập dữ liệu</span>');
				isValid = false;
			}else{
                if (options.class){
                    $(this).removeClass(options.class);
                }
				$(this).closest('.form-group').find('.error').empty();
			}
		});

		$.each(form.find('textarea.editor'), function () {
			var val = AppCommon.getDataCkEditor($(this).attr('id')).getData();
			if (!val) {
				if ($(this).hasClass('required-editor')) {
					$(this).closest('.form-group').find('.error').empty().append('<span class="validation-invalid-label">Bạn chưa nhập dữ liệu</span>');
					isValid = false;
				}
			} else {
				$(this).val(val);
				$(this).closest('.form-group').find('.error').empty();
			}
		});


        if(!isValid){
            jQuery('html, body').animate({scrollTop: parseInt(pos) - 100}, 'slow');
        }

		return isValid;
	},
	/**
	 * - Validate dung lượng ảnh tối đa cho phép upload
	 * - Khi click chọn ảnh check dung luôn và trả về thông báo
	 *
	 * @param maxSize: đơn vị MB
	 * @author ToanNV
	 * */
	validFileSize: function (selector, t, maxSize = 5) {
		if (t.files && t.files[0]) {
			let sizeUpload = t.files[0].size / 1024 / 1024;
			let pow = Math.pow(10, 2);
			let sz = Math.round(sizeUpload * pow) / pow;

			if (sz > maxSize) {
				PNotify.removeAll();
				new PNotify({
					title: '<i class="far fa-bell"></i> Lỗi',
					text: `Dung lượng ảnh phải nhỏ hơn hoặc bằng ${maxSize}MB`,
					type: 'danger'
				});
				selector.val('');
				return false;
			}
			return true;
		}
		return false;
	},
	// Append message error for element
	showCommonErrors: function (errors) {
		var scrollError = false;

		$.each(errors, function (key, messages) {
			var e = $('#' + key);
			if (!scrollError && e.length){
				scrollError = true;
				jQuery('html, body').animate({scrollTop: parseInt(e.offset().top) - 100}, 'slow');
			}
			e.addClass('border-danger');
			let messageInvalid = '';
			if (typeof messages == "object"){
				$.each(messages, function (key, mes) {
					if (typeof mes == "object") {
						$.each(mes, function (k, v) {
							messageInvalid += mes[k] + '\n';
						});
					}else messageInvalid += mes+'\n';
				});
			}else messageInvalid = messages;

			e.closest('.form-group').find('.error').empty().append('<span class="validation-invalid-label">' + messageInvalid + '</span>');
		});
	},

    validateEmail: function(email){
		var regexPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!regexPattern.test(email)) {
			return false;
		}
		return true;
	},
    html_entity_decode: function (str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    },
    validateMobile: function (mobile) {
        // html_entity_decode
        mobile = AppFuntions.html_entity_decode(mobile);

        mobile = mobile.replace(/\s/g, '');
        mobile = mobile.replace(/\./g, '');
        mobile = mobile.replace(/,/g, '');
        mobile = mobile.replace(/^(\+84|84|\(84\))/, '0');

        if (/^0/.exec(mobile) == null) {
            mobile = '0' + mobile;
        }
        if (isNaN(mobile) || mobile.length < 10 || mobile.length > 11) {
            return false;
        }

        return true;
    },
    validateDate: function (date) {
        var matches = /^(\d{2})[\/](\d{2})[\/](\d{4})$/.exec(date);
        if (matches == null) {
            return false;
        }

        return true;
    },
	// Hàm làm tròn số thập phân
    roundFloatNumber: function(number, decimal = 1000) {
        return Math.round(number * decimal) / decimal;
	},
	roundFloatNumberNew: function(number, decimal = appConsts.common.DECIMAL_ROUND_PRECISION) {
		const p = Math.pow(10, decimal);
		return Math.round(number * p) / p;

		// return Math.round(number * decimal) / decimal;
	},
    roundIntNumber: function(number, decimal = 0) {
		const p = Math.pow(10, decimal);
		return Math.round(number * p) / p;
	},
    roundToDecimal: function (nb, decimal) {
        if (!decimal || decimal == 0) {
            return nb;
        }
        return Math.round(nb / decimal) * decimal;
    },

	stringToSlug(str) {
		let from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
		let to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
		for (let i = 0, l = from.length; i < l; i++) {
			str = str.replace(RegExp(from[i], "gi"), to[i]);
		}
		str = str.toLowerCase().trim();
		return str;
	},

	getDataTime() {
		const date = new Date();
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	},

	removeParam: function(key, sourceURL) {
		var rtn = sourceURL.split("?")[0],
			param,
			params_arr = [],
			queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
		if (queryString !== "") {
			params_arr = queryString.split("&");
			for (var i = params_arr.length - 1; i >= 0; i -= 1) {
				param = params_arr[i].split("=")[0];
				if (param === key) {
					params_arr.splice(i, 1);
				}
			}
			if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
		}
		return rtn;
	}
};
