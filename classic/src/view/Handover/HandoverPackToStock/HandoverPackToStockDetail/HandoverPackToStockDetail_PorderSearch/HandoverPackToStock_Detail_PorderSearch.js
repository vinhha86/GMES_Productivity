Ext.define('GSmartApp.view.handover.HandoverPackToStock_Detail_PorderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverPackToStock_Detail_PorderSearch',
    id: 'HandoverPackToStock_Detail_PorderSearch',
    reference: 'HandoverPackToStock_Detail_PorderSearch',
    controller: 'HandoverPackToStock_Detail_PorderSearchController',
    viewModel:{
        // type:'HandoverPackToStock_Detail_PorderSearchViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        store:'{POrder_ListStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
        { header: 'Mã lệnh', dataIndex: 'ordercode', flex: 1},
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-window-close'
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
});

