var appTranslator = {
	// @todo implement later
	translate: function(message) {
		return message;
	},
	// common labels
	labels: {
		error: 'Lỗi',
		Close: 'Đóng',
		Save: 'Lưu',
		Cancel: 'Hủy',
		Yes: 'Có',
		No: 'Không',
		Send: 'Gửi',
		SavingData: 'Đang lưu dữ liệu',
		ConfirmDeleteTitle: 'Xác nhận xóa',
		ConfirmDeleteMessage: 'Bạn có chắc chắn muốn xóa:',
		Confirm: 'Xác nhận'
	},
	messages: {
		common: {
			fullName: 'Họ tên',
			errorDuringExecution: 'Lỗi trong quá trình thực hiện',
			noData: 'Không tìm thấy dữ liệu',
            invalidData: 'Dữ liệu không hợp lệ',
			noSelectStore: 'Bạn chưa chọn doanh nghiệp',
			noSelectDepot: 'Bạn chưa chọn cửa hàng',
			noEnterData: 'Bạn chưa nhập dữ liệu',
		},
		customer: {
			code:{
				customer: 'Khách hàng',
				customerInfo: 'Thông tin khách hàng',
				customerDelete: 'Bạn có chắc chắn muốn xóa khách hàng này không?',
				customerNot: 'Bạn có chắc chắn muốn xóa khách hàng này không?',
				msgCodeError: 'Code không hợp lệ hoặc đã được sử dụng!',
				lbStatusNew: 'Đã kích hoạt'
			}
		},
	}
};
