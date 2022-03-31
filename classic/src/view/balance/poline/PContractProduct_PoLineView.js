Ext.define('GSmartApp.view.balance.PContractProduct_PoLineView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProduct_PoLineView',
    itemId: 'PContractProduct_PoLineView',
    controller: 'PContractProduct_PoLineViewController',
    // viewModel: {
    //     type : 'SizesetViewModel'
    // },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        scrollable: true,
        columnLines: true,
        rowLines: true
    },
    features: [{
        ftype: 'grouping',
        // groupHeaderTpl: '{name}',
        groupHeaderTpl: [
            // 'Group: ',
            '<div style="color:grey; font-weight: bold;">{name:this.formatName}</div>',
            {
                formatName: function(name) {
                    if(name != '' && name != null){
                        var arr = name.split('/');
                        if(arr.length >=2){
                            return arr[1] + '/' + arr[0];
                        }
                    }
                    return '';
                }
            }
        ],
        collapsible: false,
        collapseTip: "",
        expandTip: "",
    }],
    bind: {
        store: '{PContract_PO}'
    },
    columns: [
        {
            text: 'PO Line',
            dataIndex: 'po_buyer',
            sortable: false,
            menuDisabled: true,
            flex: 1,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            text: 'Ngày giao hàng',
            dataIndex: 'shipdate',
            sortable: false,
            menuDisabled: true,
            // flex: 1,
            width: 100,
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(value, 'd/m/y') + '"';
                return Ext.util.Format.date(value, 'd/m/y');
            },
        }
    ],
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            height: 40,
            padding: 2,
            // layout: 'hbox',
            items: [
                {
                    xtype: 'combo',
                    labelWidth: 50,
                    fieldLabel: 'Tháng',
                    emptyText:'Tháng',
                    bind: {
                        store : '{monthBalanceArray}'
                    },
                    // valueField: 'yearMonth',
                    // displayField: 'monthYear',
                    itemId: 'monthBalanceArray',
                    margin: 1,
                    // width: 100,
                    flex: 1,
                    editable: false,
                    readOnly: false,
                    enableKeyEvents : true,
                },
            ]
        },
        // {
        //     dock: 'bottom',
        //     xtype: 'toolbar',
        //     height: 40,
        //     padding: 2,
        //     // layout: 'hbox',
        //     items: [
        //         {
        //             xtype: 'button',
        //             text: 'test popup chart',
        //             iconCls: 'x-fa fa-calculator',
        //             handler: 'test_popup_chart'
        //         }
        //     ]
        // },
    ]
});

