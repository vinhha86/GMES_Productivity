Ext.define('GSmartApp.view.pcontract.PContract_POrder_Req', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Req',
    id:'PContract_POrder_Req',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            // listeners: {
            //     edit: 'onEdit'
            // } 
        }
    },
    features: [{
        ftype:'summary',
        groupHeaderTpl: 'Tổng',
        dock: 'bottom'
    }],
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{porderReqStore}'
    },
    columns:[
        // {
        //     header:'Style',
        //     dataIndex:'ordercode',
        //     width: 100
        // },
        {
            header:'Phân xưởng',
            dataIndex:'granttoorgcode',
            flex: 1
        },
        {
            header:'SL',
            align: 'end',
            dataIndex:'totalorder',
            width: 70,
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            align: 'right',
            renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
            },
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
        },{
            xtype: 'actioncolumn',
            width: 50,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-magic',
                tooltip: 'Tạo lệnh',
                handler: 'onPOrderCreate'
            },{
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoa'
            }]
        }
    ],
    dockedItems: [{
        dock: 'top',
        padding: '0 0 10 5',
        height: 30,
        xtype: 'toolbar',
        items: [{
            xtype: 'checkboxfield',
            labelStyle: "font-size:11px",
            fieldStyle: 'font-size:11px;text-align:right',
            fieldLabel: 'Tự động chia số lượng:',
            hideTrigger:true,
            labelAlign: 'left',
            labelWidth: 120,
            flex: 1,
            bind: {
                value: '{po.isauto_calculate}'
            }
        },'->'
		,]
    }]
});

