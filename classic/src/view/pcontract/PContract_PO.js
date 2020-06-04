Ext.define('GSmartApp.view.pcontract.PContract_PO', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO',
    id:'PContract_PO',

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        }
    },
    bind:{
        store:'{PContractDocumentStore}'
    },
    columns:[{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        width: 100
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        width: 100
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        width: 80
    },{
        text:'SL giao',
        dataIndex:'description',
        width: 80,
        editor:{
            xtype:'po_quantity',
            selectOnFocus: true
        }
    },{
        text:'Ngày đồng bộ NPL',
        dataIndex:'matdate',
        width: 80
    },{
        text:'Năng suất y/c ngày',
        dataIndex:'etm_avr',
        width: 80
    },{
        text:'Số ngày SX',
        dataIndex:'productiondate',
        width: 70
    },{
        text:'Phân xưởng SX',
        dataIndex:'factories',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        },{
            iconCls: 'x-fa fas fa-list',
            tooltip: 'Chi tiết',
            handler: 'onXoa'
        }]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: '{titleDeliveryPlan}'
            }
        },
		'->'
		,
	    {
            xtype:'button',
            itemId:'btnThemMoi',
            ui: 'header',
			tooltip: 'Thêm kế hoạch giao hàng',
            iconCls: 'x-fa fa-plus',
            handler: 'onAddPOTap',
        },{
            xtype:'button',
            itemId:'btnShowFactory',
            ui: 'header',
			tooltip: 'Xem năng suất nhà máy',
            iconCls: 'x-fa fa-industry',
            handler: 'onFactoriesTap',
        }]
    }]
});

