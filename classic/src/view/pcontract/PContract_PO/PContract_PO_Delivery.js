Ext.define('GSmartApp.view.pcontract.PContract_PO_Delivery', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_Delivery',
    id:'PContract_PO_Delivery',

    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 1) {
                return "accept";
            }
        }
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
        store:'{PContractProductPOStore}'
    },
    columns:[{
        text:'Số Line',
        dataIndex:'po_buyer',
        width: 100
    },{
        text:'Style',
        dataIndex:'po_vendor',
        width: 100
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        width: 80
    },{
        text:'SL giao',
        dataIndex:'po_quantity',
        width: 80
    },{
        text:'Cảng (DC)',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        dataIndex:'matdate',
        width: 150
    },{
        text:'Đóng gói',
        dataIndex:'etm_avr',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 65,
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        },{
            iconCls: 'x-fa fas fa-list',
            tooltip: 'Chi tiết',
            handler: 'onEdit'
        },{
            iconCls: 'x-fa fas fa-check',
            tooltip: 'Chốt đơn',
            handler: 'onAccept'
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
                value: 'Kế hoạch (Line) giao hàng'
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
        },
        // {
        //     xtype:'button',
        //     itemId:'btnShowFactory',
        //     ui: 'header',
		// 	tooltip: 'Xem năng suất nhà máy',
        //     iconCls: 'x-fa fa-industry',
        //     handler: 'onFactoriesTap',
        // }
        ]
    }]
});

