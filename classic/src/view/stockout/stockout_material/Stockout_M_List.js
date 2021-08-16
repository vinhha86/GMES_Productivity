Ext.define('GSmartApp.view.stockout.Stockout_M_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockout_M_List',
    itemId: 'Stockout_M_List',
    reference: 'Stockout_M_List',
    controller: 'Stockout_M_List_Controller',
    requires: [
        'GSmartApp.store.Stockout',
        'Ext.Number',
        'Ext.Date'
    ],
    layout: 'fit',
    //frame: true,
    scrollable: true,
    bind: {
        store: '{Stockout}'
    },
    columnLines: true,
    viewConfig: {
        enableTextSelection: false,
        stripeRows: false
    },
    columns: [
        {
            xtype: 'actioncolumn',
            reference: 'stockout_contextmenu',
            width: 45,
            menuDisabled: true,
            sortable: false,
            items: [
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-pencil-square-o greenIcon',
                    tooltip: 'Sửa phiếu',
                    handler: 'onStockoutEdit'
                },
                {
                    // iconCls: 'x-fa fas fa-bars violetIcon',
                    iconCls: 'x-fa fas fa-trash-o redIcon',
                    tooltip: 'Xóa phiếu',
                    handler: 'onStockoutItemDelete'
                },
            ]
        },     
        // {
        //     text: 'STT',
        //     width: 50,
        //     xtype: 'rownumberer',
        //     align: 'center'
        // },
        { 
            header: 'Số phiếu', dataIndex: 'stockoutcode', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockoutcodeFilter',
                width: 145,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockoutcodeFilterKeyup',
                    buffer: 500
                }
            },
        },
        { 
            header: 'Số YCX', dataIndex: 'stockout_order_code', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockout_order_codeFilter',
                width: 145,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockout_order_codeFilterKeyup',
                    buffer: 500
                }
            },
        },
        { header: 'Ngày xuất', dataIndex: 'stockoutdate', renderer: Ext.util.Format.dateRenderer('d/m/Y'), width: 90 },
        { 
            header: 'Loại xuất kho', dataIndex: 'stockouttype_name', width: 150,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'combobox',
                width: '98%',
                flex: 1,
                margin: 2,
                editable: false,
                readOnly: false,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                // enableKeyEvents: true,
                listeners: {
                    // keyup: 'onStockincodeFilterKeyup',
                    // buffer: 500,
                    select: 'onStockoutTypeFilterKeyup',
                },
                bind:{
                    store: '{StockoutTypeStore}',
                    value: '{stockoutTypeComboValue}',
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                },
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1,
                        handler: 'onStockoutTypeComboValueTriggerClick',
                        bind: {
                            // hidden: '{!isStatusComboValueTriggerHidden}',
                            // hidden: '{isStatusComboValueTriggerHidden}',
                            // hidden: '{!statusComboValue}',
                        }
                    }
                }
            },
        },
        { 
            header: 'Nơi giao', dataIndex: 'org_from_name', flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrgFromFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{orgFromFilterValue}',
                },
            },
        },
        { 
            header: 'Nơi nhận', dataIndex: 'org_to_name', flex: 1, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onOrgToFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{orgToFilterValue}',
                },
            },
        },
        { 
            header: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120, 
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'textfield',
                // fieldStyle: "",
                // reference: 'invoice_numberFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onUsercreateFilterKeyup',
                    buffer: 500
                },
                bind:{
                    value: '{UsercreateFilterValue}',
                },
            },
        },
        {
            text: 'Trạng thái', dataIndex: 'statusString', width: 120,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            },
            items: {
                xtype: 'combobox',
                width: '98%',
                flex: 1,
                margin: 2,
                editable: false,
                readOnly: false,
                displayField: 'text',
                valueField: 'id',
                queryMode: 'local',
                anyMatch: true,
                // enableKeyEvents: true,
                listeners: {
                    // keyup: 'onStockincodeFilterKeyup',
                    // buffer: 500,
                    select: 'onStatusFilterKeyup',
                },
                bind:{
                    store:'{listStatusArray}',
                    value: '{statusComboValue}',
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                },
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        weight: 1,
                        handler: 'onStatusComboValueTriggerClick',
                        bind: {
                            // hidden: '{!isStatusComboValueTriggerHidden}',
                            // hidden: '{isStatusComboValueTriggerHidden}',
                            // hidden: '{!statusComboValue}',
                        }
                    }
                }
            },
        },  
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            // {
            //     tooltip: 'Lập phiếu xuất kho mới',
            //     text: 'Lập phiếu mới',
            //     iconCls: 'x-fa fa-plus',
            //     margin: 3,
            //     itemId: 'btnThemMoi'
            // },
            {
                xtype: 'button',
                margin: 3,
                text: 'Lập phiếu mới',
                iconCls: 'x-fa fa-bars',
                menu: [
                    // {
                    //     itemId: 'btnXuatTo', // id:11
                    //     // iconCls: 'fa fa-file-pdf-o greenIcon',
                    //     text: 'Xuất tổ sản xuất',
                    //     handler: 'onXuatTo'
                    // },
                    {
                        itemId: 'btnXuatCat', // id:1
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất NPL cho nhà cắt',
                        handler: 'onXuatCat'
                    },
                    {
                        // itemId: 'btnNhapGiaCong', // id:3
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất gia công',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        // itemId: 'btnNhapToCat', // id:5
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất mẫu',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        // itemId: 'btnNhapMau', // id:4
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất trả nhà cung cấp',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        // itemId: 'btnNhapCungCap', // id:7
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất tiêu huỷ',
                        // handler: 'onNhapMuaMoi'
                    },
                    {
                        // itemId: 'btnNhapCungCap', // id:2
                        // iconCls: 'fa fa-file-pdf-o greenIcon',
                        text: 'Xuất điều chuyển nội bộ',
                        handler: 'onXuatDieuChuyenNoiBo'
                    },
                ],
                // bind: {
                //     hidden: '{isNhapmoi}'
                // }
            },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'Xuất từ ngày:',
                labelWidth: 86,
                width: 215,
                format:'d/m/Y',
                itemId: 'stockoutdate_from',
                value: new Date(),  // defaults to today
                // value: Ext.Date.add (new Date(),Ext.Date.DAY,-5),  // defaults to today
            },
            {
                xtype: 'datefield',
                margin: 3,
                fieldLabel: 'đến ngày:',
                labelWidth: 65,
                width: 195,
                format:'d/m/Y',
                itemId: 'stockoutdate_to',
                value: new Date(),  // defaults to today
            },
            // {
            //     itemId: 'OrgToStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi nhận',
            //     bind: {
            //         store: '{OrgToStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 3,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            // {
            //     itemId: 'OrgFromStore',
            //     xtype: 'combobox',
            //     emptyText: 'Nơi xuất',
            //     bind: {
            //         store: '{OrgFromStore}'
            //     },
            //     queryMode: 'local',
            //     margin: 1,
            //     width: 180,
            //     displayField: 'name',
            //     valueField: 'id'
            // },
            {
                xtype: 'combobox',
                margin: 3,
                itemId: 'stockouttypeid',
                emptyText: 'Loại xuất kho',
                displayField: 'name',
                valueField: 'id',
                bind: {
                    store: '{StockoutTypeStore}'
                }
            },
            {
                tooltip: 'Tìm phiếu xuất',
                iconCls: 'x-fa fa-search',
                margin: 1,
                handler: 'onSearch'
            }
        ]
    }, 
    ]
});
