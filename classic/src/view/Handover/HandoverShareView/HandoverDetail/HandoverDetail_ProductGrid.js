Ext.define('GSmartApp.view.handover.HandoverDetail_ProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverDetail_ProductGrid',
    id: 'HandoverDetail_ProductGrid',
    reference: 'HandoverDetail_ProductGrid',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEditProductTotalPackage'
            } 
        }
    },
    bind: {
        store: '{HandoverProductStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Mã SP(Buyer)',
        dataIndex: 'buyercode',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Tên SP(Buyer)',
        dataIndex: 'buyername',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    }, {
        text: 'Số lượng',
        dataIndex: 'totalpackage',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function(value){
            return Ext.util.Format.number(parseFloat(value), '0,000');
        },
        flex: 1,
        align: 'end'
    }, {
        text: 'Đơn vị tính',
        dataIndex: 'unitName',
        flex: 1,
    }, {
        xtype: 'actioncolumn',
        width: 28,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu'
            },            
        ],
        bind: {
            hidden: '{isCreateNew}'
        }
    }],
    dockedItems:[{
        layout: 'vbox',
        border: false,
        dock:'top',
        items: [{
            layout:'hbox',
            items:[{
                xtype: 'radiogroup',
                simpleValue: true, 
                bind: {
                    value: '{radioVal}'
                },
                defaults: {
                    // name: 'ccType',
                    // margin: '0 15 0 0'
                },
    
                items: [{
                    boxLabel: 'Nhập thủ công',
                    inputValue: 1,
                    width: 120,
                    checked: true
                }, {
                    boxLabel: 'Nhập mã vạch',
                    inputValue: 2,
                    width: 120,
                }, {
                    boxLabel: 'Nhập RFID',
                    inputValue: 3,
                    width: 120,
                }],
                listeners: {
                    change : 'onRadioChange'
                }
            }]
        },{
            layout:'hbox',
            margin: '5',
            items:[{
                xtype: 'textfield',
                fieldLabel: "Mã SP(Buyer)",
                // itemId: 'pordercode',
                // blankText: 'Không được để trống',
                bind: {
                    // value: '{pordercode}'
                },
                margin: '0 3',
                labelWidth: 100,
                // flex: 1,
                // enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterPordercode'
                // }
            },{
                xtype: 'textfield',
                fieldLabel: "SL",
                // itemId: 'pordercode',
                // blankText: 'Không được để trống',
                bind: {
                    // value: '{pordercode}'
                },
                margin: '0 3',
                labelWidth: 30,
                // flex: 1,
                // enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterPordercode'
                // }
            },{
                xtype:'button',
                // text: 'Lưu',
                margin: '0 3',
                // itemId:'btnLuu',
                iconCls: 'x-fa fa-plus'
            }],
            bind: {
                hidden: '{isRdoLine1Hidden}'
            }
        },{
            layout:'hbox',
            margin: '5',
            items:[{
                xtype: 'textfield',
                fieldLabel: "Mã vạch",
                // itemId: 'pordercode',
                // blankText: 'Không được để trống',
                bind: {
                    // value: '{pordercode}'
                },
                margin: '0 3',
                labelWidth: 100,
                // flex: 1,
                // enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterPordercode'
                // }
            },{
                xtype:'button',
                // text: 'Lưu',
                margin: '0 3',
                // itemId:'btnLuu',
                iconCls: 'x-fa fa-plus'
            }],
            bind: {
                hidden: '{isRdoLine2Hidden}'
            }
        },{
            layout:'hbox',
            margin: '5',
            items:[{
                xtype: 'textfield',
                fieldLabel: "Thiết bị RFID",
                // itemId: 'pordercode',
                // blankText: 'Không được để trống',
                bind: {
                    // value: '{pordercode}'
                },
                margin: '0 3',
                labelWidth: 100,
                // flex: 1,
                // enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterPordercode'
                // }
            },{
                xtype:'button',
                text: 'Start',
                margin: '0 3',
                // itemId:'btnLuu',
                // iconCls: 'x-fa fa-plus'
            },{
                xtype:'button',
                text: 'Stop',
                margin: '0 3',
                // itemId:'btnLuu',
                // iconCls: 'x-fa fa-plus'
            }],
            bind: {
                hidden: '{isRdoLine3Hidden}'
            }
        }],
        bind: {
            hidden: '{!isPorderCodeFieldHidden}'
        }
    }]
});

