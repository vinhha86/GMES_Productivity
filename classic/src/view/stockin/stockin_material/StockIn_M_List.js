Ext.define('GSmartApp.view.stockin.Stockin_M_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_M_List',
    id: 'Stockin_M_List',
    reference: 'Stockin_M_List',
    controller: 'Stockin_M_List_ViewController',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{StockinStore}'
    },
    columns: [{
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockincodeFilter',
                width: 146,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockincodeFilterKeyup',
                    buffer: 500
                }
            },
        },
        {text: 'Số Invoice', dataIndex: 'invoice_number', width: 150,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'invoice_numberFilter',
                width: 146,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onInvoice_numberFilterKeyup',
                    buffer: 500
                }
            },
        },
        {text: 'Loại nhập kho', dataIndex: 'stockintype_name', width: 150},    
        {
            text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'stockindate',
            width: 120
        },
        {text: 'Nơi xuất', dataIndex: 'orgfrom_name', flex: 1},    
        {text: 'Nơi nhận', dataIndex: 'orgto_name', flex: 1 },
        {text: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120},    
        // {
        //     text: 'Số lượng',
        //     xtype: 'numbercolumn',
        //     format: '0,000',
        //     align: 'right',
        //     dataIndex: 'totalpackage',
        //     flex: 1
        // },
        {
            text: 'Trạng thái', dataIndex: 'statusString', width: 120,
            // renderer: function(value, metaData, record){
            //     switch(value){
            //         case -1: return 'Chưa kiểm tra đủ';
            //         case 0: return 'Đã kiểm tra đủ';
            //         case 1: return 'Đã duyệt';
            //     }
            //     return '';
            // }
        },    
        {
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,

            items: [{
                iconCls: 'x-fa fas fa-edit',
                tooltip: GSmartApp.Locales.btn_sua[GSmartApp.Locales.currentLocale],
                handler: 'onEdit'
            }, {
                iconCls: 'x-fa fas fa-trash',
                tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
                handler: 'onDelete'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [
        {
            xtype: 'button',
            margin: 3,
            text: 'Lập phiếu mới',
            iconCls: 'x-fa fa-plus',
            itemId: 'btnAdd_Pcontract_Stockin',
            bind: {
                hidden: '{!isAdd_Pcontract_Stockin}'
            }
        },
        {
            xtype: 'button',
            margin: 3,
            text: 'Lập phiếu mới',
            iconCls: 'x-fa fa-bars',
            menu: [
                {
                    itemId: 'btnNhapMuaMoi', // id:1
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập mua mới',
                    handler: 'onNhapMuaMoi'
                },
                {
                    itemId: 'btnNhapDieuChuyen', // id:2
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập điều chuyển',
                    // handler: 'onNhapMuaMoi'
                },
                {
                    itemId: 'btnNhapGiaCong', // id:4
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập vải trả lại từ gia công',
                    // handler: 'onNhapMuaMoi'
                },
                {
                    itemId: 'btnNhapToCat', // id:3
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập vải thừa từ tổ cắt',
                    // handler: 'onNhapMuaMoi'
                },
                {
                    itemId: 'btnNhapMau', // id:6
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập mẫu',
                    // handler: 'onNhapMuaMoi'
                },
                {
                    itemId: 'btnNhapCungCap', // id:5
                    // iconCls: 'fa fa-file-pdf-o greenIcon',
                    text: 'Nhập cấp bù từ nhà cung cấp',
                    // handler: 'onNhapMuaMoi'
                },
            ],
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
        },
        {
            margin: 3,
            itemId: 'stockindate_from',
            xtype: 'datefield',
            value: new Date(),
            format:'d/m/Y',
            fieldLabel: 'Nhập từ ngày:',
            labelWidth: 86,
            width: 215,
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
        }, 
        {
            itemId: 'stockindate_to',
            xtype: 'datefield',
            value: new Date(),
            margin: 3,
            format:'d/m/Y',
            fieldLabel: 'đến ngày:',
            labelWidth: 65,
            width: 195,
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
        },        
        {
            itemId: 'OrgFromStore',
            xtype: 'combobox',
            emptyText: 'Nơi xuất',
            bind:{
                store: '{OrgFromStore}'
            },
            queryMode: 'local',
            margin: 3,
            displayField: 'name',
            valueField: 'id',
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
            // flex: 1,
        },      
        // {
        //     itemId: 'OrgToStore',
        //     xtype: 'combobox',
        //     emptyText: 'Nơi nhận',
        //     bind:{
        //         store: '{OrgToStore}'
        //     },
        //     queryMode: 'local',
        //     margin: 3,
        //     displayField: 'name',
        //     valueField: 'id',
        //     flex: 1,
        // },
        {
            itemId: 'stockintypeid_link',
            xtype: 'combobox',
            emptyText: 'Loại nhập kho',
            bind:{
                store: '{StockinTypeStore}'
            },
            queryMode: 'local',
            margin: 3,
            displayField: 'name',
            valueField: 'id',
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
            // flex: 1,
        }, 
        {
            // width: 100,
            xtype: 'button',
            margin: 3,
            // text: GSmartApp.Locales.btn_loc[GSmartApp.Locales.currentLocale],
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem',
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
        }]
    }, 
    // {
    //     dock: 'bottom',
    //     layout: 'hbox',
    //     xtype: 'toolbar',
    //     border: false,
    //     height: 50,
    //     items: [{
    //         xtype: 'textfield',
    //         value: 25,
    //         itemId: 'limitpage',
    //         maskRe: /[0-9]/,
    //         width: 180,
    //         selectOnFocus: true,
    //         margin: 5,
    //         fieldLabel: 'Số bản ghi/ Trang',
    //         labelWidth: 120
    //     }, '-', {
    //         xtype: 'pagingtoolbar',
    //         displayInfo: true,
    //         flex: 1,
    //         nextText: 'Trang tiếp',
    //         prevText: 'Trang trước',
    //         afterPageText: '/ {0}',
    //         beforePageText: 'Trang',
    //         itemId: 'page',
    //         refreshText: 'Làm mới dữ liệu',
    //         border: false,
    //         bind: {
    //             store: '{StockinStore}'
    //         },
    //         emptyMsg: 'Không có kết quả tìm kiếm',
    //         lastText: 'Trang cuối',
    //         firstText: 'Trang đầu',
    //         displayMsg: 'Hiển thị {0} - {1} của {2}'
    //     }]
    // }
],
 
});

