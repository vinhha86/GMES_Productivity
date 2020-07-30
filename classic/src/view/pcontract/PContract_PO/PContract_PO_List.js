Ext.define('GSmartApp.view.pcontract.PContract_PO_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_List',
    id:'PContract_PO_List',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 0) {
                return "po_accept";
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
    // store: {
    //     type: 'PContract_PO'
    // },
    columns:[{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        width: 100
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        width: 100
    },{
        text:'SL',
        align: 'end',
        dataIndex:'po_quantity',
        width: 60
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 70
    },
    {
        text:'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'matdate',
        width: 70
    },
    {
        text:'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'productiondate',
        width: 70
    },
    {
        text:'Số ngày SX',
        dataIndex:'productiondays',
        width: 50
    },
    {
        text:'Phân xưởng',
        dataIndex:'factories',
        width: 80
    },{
        text: 'Phụ trách',
        dataIndex: 'merchandiser_name',
        flex: 1
    },{
        xtype: 'actioncolumn',
        width: 25,
        menuDisabled: true,
        sortable: false,
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_PO'
            },            
            // {
            //     iconCls: 'x-fa fas fa-trash',
            //     tooltip: 'Xóa',
            //     handler: 'onXoa'
            // },{
            //     iconCls: 'x-fa fas fa-list',
            //     tooltip: 'Chi tiết',
            //     handler: 'onEdit'
            // },{
            //     iconCls: 'x-fa fas fa-check',
            //     tooltip: 'Chốt đơn',
            //     handler: 'onAccept'
            // }
        ]
    }],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                bind: {
                    store: '{record.sub_po}',
                    // title: 'Danh sách hàng xuất'
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
                    text:'SL',
                    align: 'end',
                    dataIndex:'po_quantity',
                    width: 60
                },{
                    text:'Ngày giao',
                    dataIndex:'shipdate',
                    renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    width: 70
                },{
                    text:'Ngày NPL',
                    renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    dataIndex:'matdate',
                    width: 70
                },{
                    text:'Ngày VC',
                    renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    dataIndex:'productiondate',
                    width: 70
                },{
                    text:'Số ngày SX',
                    dataIndex:'productiondays',
                    width: 50
                },{
                    text:'Phân xưởng',
                    dataIndex:'factories',
                    flex: 1
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    menuDisabled: true,
                    sortable: false,
                    items: [
                        {
                            iconCls: 'x-fa fas fa-bars violetIcon',
                            handler: 'onMenu_SubPO'
                        },            
                    ]
                }],	
                listeners:{
                    itemclick: 'onSelectPO'
                }					
			}
		}
	},    
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
                value: 'Danh sách Đơn hàng (PO)'
            }
        },
		'->'
		,
	    {
            xtype:'button',
            itemId:'btnAddPrice_PContract_PO_List',
            ui: 'header',
			tooltip: 'Thêm chào giá',
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

