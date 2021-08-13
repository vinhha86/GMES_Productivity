Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_Order.Stockin_Order_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_Order_List',
    id: 'Stockin_Order_List',
    reference: 'Stockin_Order_List',
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store: '{Stockin_Order_Store}'
    },
    features: [
        {
            ftype: 'summary',
            dock: 'bottom'
        }
    ],
    columns: [
        {text: 'Số phiếu', dataIndex: 'stockincode', width: 120,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockin_order_code_filter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockin_Order_Code_FilterKeyup',
                    buffer: 500
                }
            },
            summaryType: 'count',
            summaryRenderer: 'renderSum'
        },
        {text: 'Số Invoice', dataIndex: 'invoice_number', width: 120,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'stockin_order_invoice_filter',
                width: 115,
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStockin_Order_Invoice_FilterKeyup',
                    buffer: 500
                }
            },
        },
        {
            text: GSmartApp.Locales.ngaynhap[GSmartApp.Locales.currentLocale],
            xtype: 'datecolumn',
            format: 'd/m/Y',
            dataIndex: 'stockindate',
            width: 90
        },
        {
            text: 'Loại nhập kho', dataIndex: 'stockintype_name', width: 100,
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
                    select: 'onStockinTypeFilterKeyup',
                },
                bind:{
                    store: '{StockinTypeStore}',
                    value: '{stockinTypeComboValue_order}',
                },
                matchFieldWidth: false,
                listConfig: {
                    listeners: {
                        beforeshow: function(picker) {
                            picker.minWidth = picker.up('combobox').getSize().width;
                        }
                    }
                }
            },
        },    
        {
            text: 'Nơi giao', dataIndex: 'orgfrom_name', flex: 1,
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
                    value: '{orgFromFilterValue_order}',
                },
            },
        },    
        {
            text: 'Nơi nhận', dataIndex: 'orgto_name', flex: 1,
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
                    value: '{orgToFilterValue_order}',
                },
            },
        },
        {
            text: 'Người lập phiếu', dataIndex: 'usercreate_name', width: 120,
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
                    value: '{UsercreateFilterValue_order}',
                },
            },
        },
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
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        border: false,
        items: [
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
            // width: 100,
            xtype: 'button',
            margin: 3,
            // text: "Đồng bộ từ MITI",
            iconCls: 'x-fa fa-search',
            itemId: 'btnTimKiem',
            bind: {
                hidden: '{isAdd_Pcontract_Stockin}'
            }
        }]
    }, 
],
 
});

