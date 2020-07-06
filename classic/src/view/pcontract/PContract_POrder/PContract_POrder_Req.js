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
            // summaryRenderer: 'renderSum'
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
        },{
            xtype: 'actioncolumn',
            width: 25,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-magic',
                tooltip: 'Tạo lệnh',
                handler: 'onPOrderCreate'
            }]
        }
    ]
});

