var appConsts = {
    userUi: {
        UI_LAYOUT_MENU_HORIZONTAL: 1, // layout mennu ngang
        UI_LAYOUT_MENU_VERTICAL : 2, // layout menu dọc
        UI_LAYOUT_MENU_HOVER : 1, // menu hover
        UI_LAYOUT_MENU_CLICK : 2, // menu click
        UI_LAYOUT_MENU_FIXED : 1, // menu động
        UI_LAYOUT_MENU_NOT_FIXED : 2, // menu cố định
        UI_LAYOUT_OPEN_PAGE_POPUP : 1, // open page detail popup
        UI_LAYOUT_OPEN_PAGE_NEW : 2, // open page new
        UI_LAYOUT_COLOR_RED : 1, // màu đỏ
        UI_LAYOUT_COLOR_BLACK : 2, // màu đen
        UI_LAYOUT_COLOR_3: 3,
        UI_LAYOUT_COLOR_4: 4,
        UI_LAYOUT_COLOR_5: 5,
        UI_LAYOUT_COLOR_6: 6,
        UI_LAYOUT_COLOR_7: 7,
        UI_LAYOUT_COLOR_8: 8,
        UI_LAYOUT_COLOR_9: 9,
        UI_LAYOUT_COLOR_10: 10,
    },
    storeIdNhanh: 26,
    accounting: {
        account: {
            statuses: {
                STATUS_ACTIVE: 1,
                STATUS_INACTIVE: 2
            },
            types: {
                TYPE_BANK: 1,
                TYPE_PAYMENT_GATEWAY: 2,
                TYPE_CASH: 3,
                TYPE_INSTALLMENT: 5,
                TYPE_DEFAULT: 6,
                TYPE_CREDIT: 7
            },
            PAYMENT_GATEWAY_MOMO: 7,
            PAYMENT_GATEWAY_MOMO_P2SU: 8
        },
        contact: {
            statuses: {
                STATUS_ACTIVE: 1,
                STATUS_INACTIVE: 2
            },
            itemTypes: {
                ITEM_TYPE_CUSTOMER: 1,
                ITEM_TYPE_SUPPLIER: 2,
                ITEM_TYPE_INSTALLMENT: 3,
                ITEM_TYPE_STAFF: 4,
                ITEM_TYPE_OTHER: 20,
                ITEM_TYPE_MERCHANT: 21
            }
        },
        transaction: {
            statuses: {
                STATUS_WAITING: 1,
                STATUS_VERIFIED: 2
            },
            types: {
                TYPE_DEBIT: 1,
                TYPE_CREDIT: 2,
                TYPE_RECEIPT: 3,
                TYPE_PAY: 4,
                TYPE_SALE_IMPORT: 5,
                TYPE_SALE_EXPORT: 6,
                TYPE_IMPORT: 8,
                TYPE_EXPORT: 9,
                TYPE_OTHER: 7,
                TYPE_ACCOUNTING_FORWARD: 12
            },
            itemTypes: {
                ITEM_TYPE_BIL: 1,
                ITEM_TYPE_ORDER: 2
            },
            modes: {
                MODE_SUPPLIER_IMPORT: 1,
                MODE_SUPPLIER_EXPORT: 2,
                MODE_POS_BILL: 3,
                MODE_POS_RETURN: 4,
                MODE_POS_WHOLESALE: 5,
                MODE_POS_WHOLESALE_RETURN: 6,
                MODE_POS_RESALE: 7,
                MODE_WARRANTY: 8,
                MODE_WARRANTY_ACCESSORIES: 9,
                MODE_TRANSFER: 15,
                MODE_INSTALLMENT: 20,
                MODE_FIRST_DEBTS: 21,
                MODE_ORDER: 22,
                MODE_ORDER_RETURN: 23,
                MODE_SUPPLIER_IMPORT_VAT: 24,
                MODE_SUPPLIER_EXPORT_VAT: 25,
                MODE_OTHER: 26,
                MODE_COD_INSTALLMENT: 27,
                MODE_POS_IMPORT_VAT: 28,
                MODE_POS_EXPORT_VAT: 29,
                MODE_CONFIRM_PAYMENT_ORDER: 30,
                MODE_CONFIRM_PAYMENT_ORDER_FEE: 31,
                MODE_IMPORT_GIFT: 32,
                MODE_EXPORT_GIFT: 33
            },
            paymentMethod: {
                PAYMENT_METHOD_CASH: 1,
                PAYMENT_METHOD_TRANSFER: 2,
                PAYMENT_METHOD_CREDIT: 3,
                PAYMENT_METHOD_INSTALLMENT: 4,
                PAYMENT_METHOD_ORDER_COD: 5,
                PAYMENT_METHOD_CASH_AUTO: 6
            }
        },
        transactionItem: {
            statuses: {
                STATUS_WAITING: 1,
                STATUS_VERIFIED: 2
            }
        }
    },
    customer: {
        code: {
            COUPON_CODE: '_COUPON_CODE_',
        },
    },
    imex: {
        types: {
            TYPE_IMPORT: 1,
            TYPE_EXPORT: 2
        },
        modes: {
            MODE_SHIPPING: 1,
            MODE_RETAIL: 2,
            MODE_BONUS: 4,
            MODE_TRANSFER: 3,
            MODE_SUPPLIER: 5,
            MODE_WHOLESALE: 6,
            MODE_INVENTORY_CHECK: 8,
            MODE_OTHER: 10,
            MODE_WARRANTY: 13,
            MODE_WARRANTY_CENTER: 14,
            MODE_REPAIR: 15,
            MODE_WARRANTY_ACCESSORIES: 16,
            MODE_BONUS_WHOLESALE: 17,
            MODE_BONUS_SHIPPING: 18,
            MODE_COMBO: 19
        }
    },
    order: {
        PREFIX_BARCODE_NHANH: 'NVN',
        PREFIX_SELF_CONNECT_CARRIER: 'NVS',
        GUEST_ORDER_MAX_COD: 5000000,
        types: {
            TYPE_SHIPPING_COD: 1,
            TYPE_SHOPPING: 2,
            TYPE_PREORDER: 3,
            TYPE_TRIAL: 4,
            TYPE_GIFT_EXCHANGE: 5,
            TYPE_TEMPORARY: 9,
            TYPE_QUOTATION: 10,
            TYPE_SHIPPING_CHANGE_PRODUCT: 12,
            TYPE_SHIPPING_CUSTOMER_RETURN: 14,
            TYPE_SHIPPING_TRANSFER_DEPOT: 15,
            TYPE_SHIPPING_RETURN_PATIAL_DELIVERY: 16,
            TYPE_SHIPPING_COMPENSATION_LOST_GOODS: 17
        },
        typesShippingCod: {
            TYPE_SHIPPING_COD: 1,
            TYPE_PREORDER: 3,
            TYPE_TRIAL: 4,
            TYPE_GIFT_EXCHANGE: 5,
            TYPE_TEMPORARY: 9,
            TYPE_QUOTATION: 10
        },
        modes: {
            MODE_RETAIL: 1,
            MODE_WHOLESALE: 2
        },
        statuses: {
            STATUS_PACKED: 40,
            STATUS_PACKING: 42,
            STATUS_PICKUP: 43,
            STATUS_NEW: 54,
            STATUS_CONFIRMING: 55,
            STATUS_CONFIRMED: 56,
            STATUS_CUSTOMER_CONFIRMING: 57,
            STATUS_CARRIER_CANCELED: 58,
            STATUS_SHIPPING: 59,
            STATUS_SUCCESS: 60,
            STATUS_FAILED: 61,
            STATUS_CANCELED: 63,
            STATUS_ABORTED: 64,
            STATUS_SOLDOUT: 68,
            STATUS_RETURNING: 71,
            STATUS_RETURNED: 72,
            STATUS_CHANGE_DEPOT: 73
        },
        carriers: {
            DEFAULT_CARRIER_ID: 1,
            CARRIER_VIETTEL: 2,
            CARRIER_GHN: 5,
            CARRIER_GHTK: 8,
            CARRIER_VNPOST_HN: 9,
            CARRIER_TRANSFORMER: 12,
            CARRIER_5SHIP: 15,
            CARRIER_247_EXPRESS: 17,
            CARRIER_AHAMOVE: 18,
            CARRIER_VNPOST_HCM: 19,
            CARRIER_PROSHIP: 20,
            CARRIER_DHL: 21,
            CARRIER_VNPOST: 22,
            CARRIER_ECOTRANS: 23,
            CARRIER_JT_EXPRESS: 24,
            CARRIER_EMS: 25,
            CARRIER_BEST_EXPRESS: 26,
            CARRIER_NINJAVAN: 27,
            CARRIER_SUPER_SHIP: 28,
            CARRIER_SHOPEE_EXPRESS: 29,
            CARRIER_LAZADA_EXPRESS: 30,
            CARRIER_GRAB_EXPRESS: 31,
            CARRIER_TIKI_EXPRESS: 32,
            CARRIER_GHTC: 33
        },
        saleChannels: {
            SALE_CHANNEL_ADMIN: 1,
            SALE_CHANNEL_WEBSITE: 2,
            SALE_CHANNEL_API: 10,
            SALE_CHANNEL_FACEBOOK: 20,
            SALE_CHANNEL_INSTAGRAM: 21,
            SALE_CHANNEL_VATGIA: 40,
            SALE_CHANNEL_LAZADA: 41,
            SALE_CHANNEL_SHOPEE: 42,
            SALE_CHANNEL_SENDO: 43,
            SALE_CHANNEL_TIKI: 45,
            SALE_CHANNEL_ZALOSHOP: 46,
            SALE_CHANNEL_1LANDING: 47,
            SALE_CHANNEL_TIKTOK: 48,
        },
        storePaymentStatuses: {
            STORE_PAYMENT_STATUS_CONFIRMING: 1,
            STORE_PAYMENT_STATUS_CONFIRMED: 2,
            STORE_PAYMENT_STATUS_PAID: 3,
            STORE_PAYMENT_STATUS_NOT_TRANSFER: 4,
            STORE_PAYMENT_STATUS_CHECKED_FAIL: 5,
            STORE_PAYMENT_STATUS_BAD_DEBT: 6
        },
        carrierPaymentStatuses: {
            CARRIER_PAYMENT_STATUS_CHECKING: 1,
            CARRIER_PAYMENT_STATUS_CHECKED: 2
        },
        carrierNoTablePrices: {
            CARRIER_AHAMOVE: 18,
            CARRIER_GRAB_EXPRESS: 31
        },
        carriersNoApiCalculateFee: {
            CARRIER_DHL: 21,
            CARRIER_NINJAVAN: 27
        },
        carrierApplyPromotionCode: {
            CARRIER_AHAMOVE: 18,
            CARRIER_GRAB_EXPRESS: 31
        },
        cityIdsHNHCM: {
            CITY_LOCATION_ID_HN: 254,
            CITY_LOCATION_ID_HCM: 255
        },
        tabs: {
            ORDER_TAB_EDIT: 'edit',
            ORDER_TAB_CONFIRM: 'confirm',

            TAB_CONFIRM: 1,
            TAB_PACKING: 2, // Tab in & đóng gói
            TAB_SENT_CARRIER: 12, // Tab đang chuyển
            TAB_PROCESS: 3, // Tab cần xử lý
            TAB_PAYMENT: 5, // Tab thanh toán
            TAB_COMPLAIN: 6, // Tab khiếu nại

            // Tab danh sách đơn hàng Lazada
            TAB_PROCESSING: 7, // Tab đang xử lý
            TAB_READY_TO_SHIP: 8, // Tab sẵn sàng đi giao
            TAB_SHIPPING: 9, // Tab đang giao hàng
            TAB_WAIT_PAYMENT_COD: 10, // Tab chờ đối soát
            TAB_SHIP_FAIL: 11, // Tab giao thất bại

            // Tab danh sách đơn hàng Shopee
            TAB_SUCCESS: 21, // Tab hoàn thành
            TAB_RETURN: 22, // Tab trả hàng / hoàn tiền

            // Tab danh sách đơn hàng Sendo
            TAB_TROUBLE: 23
        },
        arrReasonCanceled: {
            REASON_OTHER: 18,
            REASON_WRONG_PRODUCT: 1,
            REASON_CANCEL_HIGH_SHIPFEE: 2,
            REASON_CANCEL_NOT_TRANSFER: 3,
            REASON_DUPLICATED: 4,
            REASON_CANCEL_CANNOT_CALL: 5,
            REASON_CUSTOMER_NOT_BUY: 16,
            REASON_CUSTOMER_BUYED_PRODUCT: 12
        },
        arrReasonAborted: {
            REASON_OTHER: 18,
            REASON_DUPLICATED: 4,
            REASON_CANCEL_CANNOT_CALL: 5,
            REASON_CANCEL_SOLD_OUT: 6,
            REASON_CANNOT_CALL_SENDER: 19,
            REASON_SELLER_NOT_SELL_ONLINE: 20,
            REASON_SELLER_DONT_HANDOVER_CARRIER: 22,
            REASON_CARRIER_PICKUP_LATE: 23,
            REASON_WRONG_PICKUP_ADDRESS: 24,
            REASON_SELF_SHIPPING: 26
        },
        arrReasonSoldOut: {
            REASON_CANCEL_SOLD_OUT: 6,
            REASON_OTHER: 18
        },
        arrReasonReturned: {
            REASON_OTHER: 18,
            REASON_CUSTOMER_NOT_LIKE_PRODUCT: 9,
            REASON_CUSTOMER_NOT_PLEASURE_NVVC: 10,
            REASON_SLOW_SHIPPING: 11,
            REASON_CUSTOMER_BUYED_PRODUCT: 12,
            REASON_PACK_FAILED: 34,
            REASON_WRONG_ADDRESS: 14,
            REASON_CANCEL_CANNOT_CALL: 5,
            REASON_WRONG_PRODUCT: 1,
            REASON_CARRIER_LOST_PRODUCT: 25
        },
        arrReasonConfirming: {
            REASON_WAITING_TRANSFER: 8,
            REASON_CANCEL_CANNOT_CALL: 5,
            REASON_CUSTOMER_THINK: 31
        },
        stepsInTab: {
            TAB_PROCESS: {
                STEP_TAB_PROCESS_SOLDOUT: 1, // hết hàng
                STEP_TAB_PROCESS_CARRIER_CANCEL: 2, // Hãng vận chuyển hủy
                STEP_TAB_PROCESS_OVER_WEIGHT: 3, // vượt cân
                STEP_TAB_PROCESS_NEW_FAIL: 4, // mới thất bại
                STEP_TAB_PROCESS_COMPLAIN: 5, // khiếu nại
                STEP_TAB_PROCESS_RETURNING: 6, // đang hoàn
                STEP_TAB_PROCESS_SLOW_SHIPPING: 7, // chuyển chậm
                STEP_TAB_PROCESS_SLOW_PAYMENT: 8, // chậm chuyển tiền
                STEP_TAB_PROCESS_PRE_ORDER: 15 // Đơn đặt trước
            },
            TAB_PAYMENT: {
                STEP_TAB_PAYMENT_SUCCESS: 13,
                STEP_TAB_PAYMENT_SUCCESS_PAYMENTED: 14
            },
            TAB_COMPLAIN: {
                STEP_TAB_COMPLAIN_ALL: 9,
                STEP_TAB_COMPLAIN_NEW: 10,
                STEP_TAB_COMPLAIN_PROCESSING: 11,
                STEP_TAB_COMPLAIN_PROCESSED: 12,
                STEP_TAB_COMPLAIN_PROCESS_FAILED: 18
            }
        },
        sendCarrierTypes: {
            SEND_CARRIER_TYPE_NHANH: 1,
            SEND_CARRIER_TYPE_SHOP: 2
        },
        TAB_SHIPPING_MOMO: {
            STATUS_PICKUP: 43,
            STATUS_SHIPPING: 59,
            STATUS_RETURNING: 71,
            STATUS_FAILED: 61
        },
        isEcommerceNoRequireCustomer: {
            SALE_CHANNEL_TIKI: 45,
            SALE_CHANNEL_TIKTOK: 48,
            SALE_CHANNEL_SHOPEE: 42
        },
        partialReturnStatuses: {
            PARTIAL_RETURN_STATUS_NO_COMPLAIN: 1,
            PARTIAL_RETURN_STATUS_COMPLAINING: 2,
            PARTIAL_RETURN_STATUS_NO_COMPENSATIONED: 3,
            PARTIAL_RETURN_STATUS_COMPENSATIONED: 4
        },
        // Trạng thái đơn sàn
        ecommerce:{
            shopee: {
                STATUS_UNPAID: 'UNPAID',
                STATUS_READY_TO_SHIP: 'READY_TO_SHIP', // Đã chuẩn bị xong hàng
                STATUS_SHIPPED: 'SHIPPED', // Đã vận chuyển
                STATUS_TO_CONFIRM_RECEIVE: 'TO_CONFIRM_RECEIVE',
                STATUS_CANCELLED: 'CANCELLED', // Khách hủy trước khi Seller xác nhận đơn hàng
                STATUS_INVALID: 'INVALID',
                STATUS_TO_RETURN: 'TO_RETURN', // Chuyển hoàn
                STATUS_COMPLETED: 'COMPLETED', // Đã giao thành công
                STATUS_IN_CANCEL: 'IN_CANCEL', // Khách hủy sau khi Seller xác nhận đơn hàng
                STATUS_RETRY_SHIP: 'RETRY_SHIP', // Phát lại
                STATUS_PROCESSED: 'PROCESSED',
            },
            tiktok: {
                STATUS_UNPAID: 100, // Mới
                STATUS_AWAITING_SHIPMENT: 111, // Chờ xác nhận
                STATUS_AWAITING_COLLECTION: 112, // Đã xác nhận
                STATUS_IN_TRANSIT: 121, // Đang chuyển
                STATUS_DELIVERED: 122, // Thành công
                STATUS_COMPLETED: 130, // Thành công
                STATUS_CANCELLED: 140  // Hủy
            }
        }
    },
    shippingHandover: {
        orderTypes: {
            ORDER_TYPE_ORDER_ID: 'orderId',
            ORDER_TYPE_MERCHANT_ID: 'merchantId',
            ORDER_TYPE_CODE_PRINT_ID: 'codePrintId',
            ORDER_TYPE_CODE_CARRIER: 'codeCarrier'
        },
        modes: {
            MODE_NORMAL: 1,
            MODE_TOUR: 2,
            MODE_LAZADA: 11,
            MODE_SHOPEE: 12,
            MODE_SENDO: 13,
            MODE_ZALO: 14,
            MODE_TIKI: 15,
            MODE_TIKTOK: 16,
        },
        types: {
            TYPE_CARRIER_IMPORT: 1,
            TYPE_CARRIER_EXPORT: 2,
            TYPE_DEPOT_PICKUP: 3
        },
        typeProducts: {
            TYPE_PRODUCT_GET: 1,
            TYPE_PRODUCT_RETURN: 2
        }
    },
    product: {
        types: {
            TYPE_PRODUCT: 1,
            TYPE_VOUCHER: 2,
            TYPE_WEIGHT_MEASURE: 3,
            TYPE_IMEI: 4,
            TYPE_PACKAGE: 5,
            TYPE_SERVICE: 6,
            TYPE_TOOL: 7,
            TYPE_BATCH: 8,
            TYPE_COMBO: 9,
            TYPE_MULTI_UNITS: 10
        },
        statuses: {
            STATUS_NEW: 1,
            STATUS_ACTIVE: 2,
            STATUS_INACTIVE: 3,
            STATUS_OUTOFSTOCK: 4
        },
        suggests: {
            SUGGEST_IMEI: 1,
            SUGGEST_NAME: 2,
            SUGGEST_WEIGHT: 3,
            SUGGEST_SOLDLOTS: 4
        }
    },
    imei: {
        statuses: {
            STATUS_NEW: 1,
            STATUS_SOLD: 2,
            STATUS_SHIPPING: 3,
            STATUS_ERROR: 5,
            STATUS_SUPPLIER_RETURN: 6,
            STATUS_REMAIN: 7,
            STATUS_TRANSFER: 8,
            STATUS_WARRANTY: 9,
            STATUS_WARRANTY_RETURNED: 10,
            STATUS_DEMO: 11
        }
    },
    promotion: {
        applies: {
            APPLY_FOR_ALL: 1,
            APPLY_FOR_RETAIL: 2,
            APPLY_FOR_WHOLESALE: 3,
            APPLY_FOR_ONLINE_ORDER: 4
        },
        types: {
            TYPE_PROMOTION: 1,
            TYPE_GIFT: 2,
            TYPE_POINTS: 3,
            TYPE_GIFT_EXCHANGE: 4,
            TYPE_SALE_COMMISSION: 5
        },
        statuses: {
            STATUS_ACTIVE: 1,
            STATUS_INACTIVE: 2
        }
    },
    warranty: {
        history: {
            types: {
                TYPE_WARRANTY: 1,
                TYPE_REPAIR: 2,
                TYPE_CONSIGNMENT: 3,
                TYPE_WARRANTY_CENTER: 4
            },
            statuses: {
                STATUS_NEW: 1,
                STATUS_ASSIGNED: 2,
                STATUS_REPARING: 3,
                STATUS_REPAIRED: 4,
                STATUS_IN_WARRANTY_CENTER: 5,
                STATUS_CANNOT_REPAIR: 6,
                STATUS_WAITING_ACCESSORIES: 7,
                STATUS_CUSTOMER_NOT_REPAIR: 8
            },
            returnStatuses: {
                STATUS_RETURNED_YES: 5,
                STATUS_RETURNED_NO: 6,
                STATUS_SENT_DEPOT: 7,
                STATUS_RECEIVED_DEPOT: 8,
                STATUS_PENDING_SHIP: 9,
                STATUS_SENT_SHIP: 10
            }
        },
        productStatus: {
            types: {
                TYPE_PRODUCT_STATUS: 1,
                TYPE_WARRANTY_BILL_STATUS: 2
            },
            statuses: {
                STATUS_ACTIVE: 1,
                STATUS_INACTIVE: 2
            }
        },
        reason: {
            statuses: {
                STATUS_ACTIVE: 1,
                STATUS_INACTIVE: 2
            }
        }
    },
    media: {
        types: {
            TYPE_FILE_TEMPORARY: 404,
            TYPE_IMAGE_PRODUCT_STORE: 1,
            TYPE_IMAGE_PRODUCT_STORE_IMAGES: 2,
            TYPE_IMAGE_ALBUM_PHOTO: 3,
            TYPE_IMAGE_CAMPAIGN: 6,
            TYPE_IMAGE_MANUAFACTURE: 7,
            TYPE_IMAGE_STORE_PRODUCT_CATEGORY: 8,
            TYPE_IMAGE_ALBUM: 9,
            TYPE_IMAGE_PRODUCT_WITHOUT_SAVE_DB: 10,
            TYPE_IMAGE_PRODUCT_BRAND: 19,
            TYPE_IMAGE_EDIT_THUMB_PHOTO: 12,
            TYPE_IMAGE_EDIT_THUMB_ALBUM: 13,
            TYPE_IMAGE_SELFIE: 22,
            TYPE_IMAGE_CAMPAIGN_PRODUCT: 24,
            TYPE_FILE_IMEX_BILL: 25,
            TYPE_FILE_IMEX_REQ_BILL: 26,
            TYPE_IMAGE_TEMPLATE: 27,
            TYPE_IMAGE_PRODUCT_STORE_CONTENT: 28,
            TYPE_IMAGE_ARTICLE_CONTENT: 29,
            TYPE_IMAGE_PRODUCT_CATEGORY: 31,
            TYPE_IMAGE_MANUAL: 32,
            TYPE_ANNOUNCEMENT: 34,
            TYPE_ICON_STORE_PRODUCT_CATEGORY: 35,
            TYPE_IMAGE_ALBUM_CONTENT: 36,
            TYPE_IMAGE_STORE_SETTING: 37,
            TYPE_IMAGE_STATICPAGE_CONTENT: 38,
            TYPE_ANNOUNCEMENT_ATTACHMENT: 40,
            TYPE_IMAGE_TRANSLATE_CONTENT_CONTENT: 41,
            TYPE_IMAGE_WEBSITE_MENU: 42,
            TYPE_ICON_WEBSITE_MENU: 43,
            TYPE_IMAGE_WEBSITE_CONTENT_KEY: 44,
            TYPE_IMAGE_WARRANTY_HISTORY: 45,
            TYPE_IMAGE_SEASON_CONTENT: 46,
            TYPE_IMAGE_CAMPAIGN_CONTENT: 47,
            TYPE_IMAGE_ARTICLE_CATEGORY: 48,

            TYPE_IMG_ALBUM_CATEGORY: 52,
            TYPE_IMAGE_ARTICLE_AVATAR: 54,
        },
        businessFileTypes: {
            TYPE_IMG_PRODUCT_AVATAR: 1,
            TYPE_IMG_PRODUCT_CONTENT: 2,
            TYPE_IMAGE_ALBUM_PHOTO: 3,//ảnh item album
            TYPE_IMG_PRODUCT_ITEM_IMAGE: 4, /*ảnh item của sp*/

            TYPE_IMG_ALBUM_AVATAR: 9, //ảnh đại diện album
            TYPE_IMG_PRODUCT_CATEGORY: 10,

            TYPE_IMG_BRAND_CONTENT: 18, //ảnh nội dung thương hiệu
            TYPE_IMG_BRAND_AVATAR: 19, //ảnh đại diện thương hiệu
            TYPE_IMG_BANNER: 20, //ảnh đại diện banner
            TYPE_IMG_BANNER_CONTENT: 21, // ảnh phần giới thiệu banner

            TYPE_IMG_ARTICLE_CONTENT : 29, //ảnh giới thiệu, nội dung tin tức
            TYPE_IMG_ARTICLE_CATEGORY_CONTENT : 30, //ảnh mô tả danh mục tin tức

            TYPE_IMG_ALBUM_CONTENT: 36, //ảnh phần nội dung album
            TYPE_IMG_ANNOUNCEMENT_AVATAR: 38,
            TYPE_IMG_MENU_AVATAR: 42, //ảnh đại diện menu
            TYPE_IMG_MENU_ICON: 43, //ảnh icon menu

            TYPE_IMG_ARTICLE_CATEGORY_AVATAR : 48, //ảnh đại diện danh mục tin tức

            TYPE_IMG_ALBUM_CATEGORY_AVATAR: 52, //ảnh đại diện danh mục album
            TYPE_IMG_ALBUM_CATEGORY_CONTENT: 53, //ảnh nội dung danh mục album
            TYPE_IMG_ARTICLE_AVATAR: 54, //ảnh đại diện tin tức

            TYPE_IMAGE_CONTENT_KEY_WEBSITE: 68, //ảnh content key website
        }
    },
    article: {
        STATUS_PUBLISHED: 1,
        STATUS_UNPUBLISHED: 2
    },
    store: {
        gateways: {
            GATEWAY_MOMO: 7
        },
        setting: {
            VALUE_PAYMENT_METHOD_OFF: 2,
            order: {
                VALUE_DECLARED_FEE_NO_BUY: -1, // Không mua bảo hiểm
                VALUE_DECLARED_FEE_SELECT_BUY: 1, // Lựa chọn mua bảo hiểm
                VALUE_DECLARED_FEE_ALL_BUY: 2, // Luôn mua bảo hiểm
                VALUE_NO_PART_DELIVERY: -1, // Không giao 1 phần
                VALUE_YES_PART_DELIVERY_BY_ORDER: 1, // Giao 1 phần theo từng đơn
                VALUE_YES_PART_DELIVERY_ALL_ORDER: 2, // Giao 1 phần toàn bộ đơn
                VALUE_ALLOW_TEST_SELECT_BY_ORDER: 5 // Lựa chọn theo từng đơn
            },
            shipping: {
                OPTION_DISPLAY_NHANH_AND_SELF_CONNECT: 1, // Hiển thị bảng giá của Nhanh và tự kết nối
                OPTION_DISPLAY_NHANH: 2, // Hiển thị bảng giá của Nhanh
                OPTION_DISPLAY_SELF_CONNECT: 3 // Hiển thị bảng giá tự kết nối
            },
            product: {
                VALUE_SEARCH_PRODUCT_FULLTEXT: 1, // Search gần đúng
                VALUE_SEARCH_PRODUCT_SEQUANTIAL: 2 // Search tuần tự
            }
        },
        tags: {
            TYPE_PRODUCT: 1,
            TYPE_CUSTOMER: 2,
            TYPE_BILL_RETAIL: 3,
            TYPE_BILL_INVENTORY: 4,
            TYPE_ORDER: 5
        },
        tagItems: {
            TYPE_PRODUCT: 1,
            TYPE_ARTICLE: 2,
            TYPE_ANNOUNCEMENT: 3,
            TYPE_MANUAL: 4,
            TYPE_STORE_PRODUCT_CATEGORY: 5,
            TYPE_CUSTOMER: 6,
            TYPE_BILL_RETAIL: 7, // Bán lẻ, bán sỉ
            TYPE_BILL_INVENTORY: 8,
            TYPE_BILL_REQUIREMENT: 9,
            TYPE_ORDER: 10,
            TYPE_BILL_RETAIL_REQUIREMENT: 11, // Nháp bán lẻ, bán sỉ
            TYPE_POS_PRODUCT: 12, // Sản phẩm chỉ gắn hiển thị trong POS
        },
        TAG_NOT_LABELED: -1, // Chưa gắn nhãn
    },
    carrier: {
        services: {}
    },
    website: {
        content: {
            // TYPE_TEXTEDITOR: 12
            arrTypeTextarea: [12],

            // TYPE_STORE_ARTICLE: 13
            typeArticle: 13
        },
        menu: {
            TYPE_IMAGE_WEBSITE_MENU: 42,
            TYPE_ICON_WEBSITE_MENU: 43
        },
        article: {
            TYPE_IMAGE_ARTICLE_CATEGORY: 48
        },
        album: {
            TYPE_IMAGE_ALBUM_PHOTO: 3,
            TYPE_IMAGE_EDIT_THUMB_PHOTO: 12
        },
        template: {
            TYPE_COMMON: 1,
            TYPE_DESIGN: 4
        },
        banner:{
            TYPE_IMAGE_STORE_BANNER: 20,
            TYPE_IMAGE_CONTENT_STORE_BANNER: 21,
        }
    },
    supplier: {
        STATUS_PUBLISHED: 1,
        STATUS_UNPUBLISHED: 2
    },
    user: {
        roles: {
            ROLE_SUPERADMIN: 1,
            ROLE_ADMIN: 2,
            ROLE_DEPOT_MANAGER: 14,
            ROLE_DEPOT_STAFF: 15,
            ROLE_STORE_MANAGER: 18,
            ROLE_STORE_VIEWER: 19,
            ROLE_STORE_EDITOR: 21,
            ROLE_STORE_ACCOUNTANT: 22,
            ROLE_STORE_CASHIER: 23,
            ROLE_STORE_CUSTOMER_CARE: 25,
            ROLE_STORE_PROCUREMENT: 26,
            ROLE_STORE_RETAIL_MANAGER: 27,
            ROLE_STORE_CUSTOMER_CARE_MANAGER: 28,
            ROLE_DELIVERER: 30,
            ROLE_SUPPLIER: 45,
            ROLE_DATA_INPUT: 46,
            ROLE_MEMBER: 50,
            ROLE_STORE_SALE: 51,
            ROLE_GUEST: 90
        },
        settings: {
            TYPE_ORDER_ADD: 602,
            TYPE_POS_BILL_ADD: 700,
            TYPE_POS_ADDWHOLESALE: 701,
            TYPE_USER_UI: 810
        }
    },
    merchant: {
        LAZADA_ID: 8142,
        SHOPEE_ID: 8195,
        SENDO_ID: 8237,
        TIKI_ID: 8238,
        ZALO_ID: 8253,
        LANDING_ID: 1000,
        TIKTOK_ID: 8855,
        slave: {
            PRODUCT_SYNC_NHANH: 1,
            PRODUCT_SYNC_BOTH: 2,
            PRODUCT_SYNC_CLIENT_AUTO: 3,
            PRODUCT_SYNC_CLIENT_MANUALLY: 4,
            PRODUCT_SYNC_NHANH_MANUALLY: 5,
            ORDER_SYNC_YES: 1,
            ORDER_SYNC_NO: 2,
            ORDER_SYNC_SAVE_NHANH: 3,
            INVENTORY_ACTIVE: 1,
            INVENTORY_INACTIVE: 2,
            INVENTORY_FAKE: 3
        }
    },
    settings: {
        types : {
            SYSTEM_POINT_DEFAULT_RATE : 1000,
            TYPE_ALL_COMMON_SETTINGS : 9999,
            TYPE_PRODUCT_CATEGORY_IMAGE : 2,
            TYPE_ALBUM : 3,
            TYPE_ALBUM_IMAGE : 4,
            TYPE_DEPOT_IMAGE : 5,
            TYPE_ALBUM_CATEGORY_IMAGE : 6,
            TYPE_MARKETING_CAMPAIGN_IMAGE : 8,
            TYPE_BRAND_IMAGE : 10,
            TYPE_OPTIMIZE_WEBSITE_BANNER : 20,
            TYPE_OPTIMIZE_PROMOTION_BANNER : 21,
            TYPE_OPTIMIZE_PRODUCT_IMAGE : 22,
            TYPE_OPTIMIZE_IMAGE : 23,
            TYPE_WATER_MARK_IMAGE : 2004,
            TYPE_IMPORT_CONDITION : 11,
            TYPE_ONLINE_ORDER_ONLY_REMAIN_PS : 24,
            TYPE_STATUS_ORDER_ACTION : 1313,
            TYPE_DAY_HOLDING_ORDER : 734,
            TYPE_BUY_DECLARED_FEE : 735,
            TYPE_DAY_SHIPPING_ORDER : 736,
            TYPE_NOTE_SHIPPING : 737,
            TYPE_PART_DELIVERY_ORDER : 738,
            TYPE_NEGATIVE_EXPORT_TRANSFER: 121,
            TYPE_NOTI_DEBT: 15,
            TYPE_NOTI_CUSTOMER_CARE: 16,
            TYPE_NOTI_REMAIN: 17,
            TYPE_NOTI_ORDER: 18
        },
        values : {
            VALUE_NO_PART_DELIVERY : -1,
            VALUE_YES_PART_DELIVERY_BY_ORDER : 1,
            VALUE_YES_PART_DELIVERY_ALL_ORDER : 2,
            VALUE_DECLARED_FEE_NO_BUY : -1,
            VALUE_DECLARED_FEE_SELECT_BUY : 1,
            VALUE_DECLARED_FEE_ALL_BUY : 2,
            VALUE_NEGATIVE_SALE_REMAIN : 1,
            VALUE_NEGATIVE_SALE_AVAILABLE : 2,
            VALUE_TOP_POSITION_PRODUCT_POS_BILL_ADD: 1
        },
        zalo : {
            TYPE_SEND_TEXT : 1,
            TYPE_SEND_MEDIA : 2,
            TYPE_SEND_FILE : 3,
            TYPE_SEND_LIST : 4
        }
    },
    common: {
        DECIMAL_ROUND_PRECISION: 3,
        COOKIE_UUID_BEFORE: '_nuuidOld',  // userId lần cuối login
        COOKIE_UUID: '_nuuid',  // userId login
        COOKIE_EXPIRE_UUID: 'nvnKn0x6ac'  // userId login
    },
    inventory: {
        check: {
            types: {
                TYPE_PRODUCT: 1,
                TYPE_FULL: 2,
                TYPE_CATEGORY: 4
            }
        }
    },
    worker: {
        SERVER: 'server',
        CLIENT: 'client',
        CACHE_NAME: "Nhanh.vn-sw",
        types: {
            TYPE_CLEAR: 'clear',
            TYPE_INIT: 'install',
            TYPE_REFESH_CACHE: 'refesh.page',
            TYPE_PUSH_RSS: 'push.rss',
            TYPE_CHANGE_ACCOUNT: 'change.account',
            TYPE_LOGOUT_ACCOUNT: 'logout.account',
            TYPE_CHANGE_CACHE_SETTING: 'change.cache.setting',

        },
        channels: {
            SETTINGS: 'Nhanh.channel.settings',
        }
    },
    localStorage: {
        cache: {
            namespace: 'NhanhCacheSettings',
            settings: {
                SETTING_CACHE_SYNC_AUTO: 1000,
                SETTING_CACHE_SEARCH_PRODUCT: 1002,
                SETTING_CACHE_SEARCH_SUPPLIER: 1003,
                SETTING_CACHE_SEARCH_ACOUNTING: 1004,
            }
        }
    }
};

// Xem chi tiết mã lỗi https://developers.momo.vn/v3/vi/docs/payment/api/result-handling/resultcode/
// Các mã lỗi có thể dùng lại mã QR để thanh toán lại
// trong trường hợp thanh toán thất bại
var MoMoReQRcodePayment = [43, 21, 1000, 7000, 8000, 9000];
