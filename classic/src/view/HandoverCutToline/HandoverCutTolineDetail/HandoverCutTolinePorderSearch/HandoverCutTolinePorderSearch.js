Ext.define('GSmartApp.view.handovercuttoline.HandoverCutTolinePorderSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutTolinePorderSearch',
    id: 'HandoverCutTolinePorderSearch',
    reference: 'HandoverCutTolinePorderSearch',
    controller: 'HandoverCutTolinePorderSearchController',
    viewModel:{
        // type:'HandoverCutTolineSKUDetailViewModel'
    },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: false,
        columnLines: true,
        rowLines: true,
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onEditHandoverSKU'
    //         } 
    //     }
    // },    
    // features: [{
    //     ftype:'summary',
    //     groupHeaderTpl: 'Tổng',
    //     dock: 'bottom'
    // }],
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
            flex:1,
            border: false
        },{
            xtype:'button',
            text: 'Quay lại',
            margin: 3,
            itemId:'btnQuayLai',
            iconCls: 'x-fa fa-backward'
        },{
            xtype:'button',
            text: 'Chọn',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        }]
    }]
});

