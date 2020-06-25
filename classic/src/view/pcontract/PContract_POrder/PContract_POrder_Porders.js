Ext.define('GSmartApp.view.pcontract.PContract_POrder_Porders', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POrder_Porders',
    id:'PContract_POrder_Porders',
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
        store:'{porderStore}'
    },
    columns:[
        {
            header:'Mã lệnh',
            dataIndex:'ordercode',
            width: 100
        },
        {
            header:'Phân xưởng',
            dataIndex:'granttoorgcode',
            flex: 1
        },
        {
            header:'Dải cỡ',
            dataIndex:'sizesetname',
            width: 70
        },
        {
            header:'SL',
            dataIndex:'totalorder',
            width: 70,
            summaryType: 'sum', 
            // summaryRenderer: 'renderSum'
            editor: {xtype: 'numberfield', hideTrigger:true, allowBlank: true, maxValue: 9999999, selectOnFocus: false}
        },{
            xtype: 'actioncolumn',
            width: 20,
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoa'
            }]
        }
    ]
});

