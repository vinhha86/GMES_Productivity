Ext.define('GSmartApp.view.pcontract.Stockin_M_Edit_Product', {
    extend: 'Ext.grid.Panel',
    xtype: 'Stockin_M_Edit_Product',
    id:'Stockin_M_Edit_Product',
    controller: 'Stockin_M_Edit_Product_Controller',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind:{
        store:'{StockinProduct_Store}'
    },
    columns:[{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [
            {
                iconCls: 'x-fa fas fa-trash',
                itemId: 'btn_XoaSP',
                // isActionDisabled: 'checkActionColumnPermission',
                tooltip: 'Hủy',
                handler: 'onXoa',
            }
        ]
    },{
        text:'Mã SP (Buyer)',
        dataIndex:'product_code',
        width: 120,
        listeners:{
            dblclick: 'viewProductDetail'
        },
    },{
        text:'Tên SP (Buyer)',
        dataIndex:'product_name',
        width: 200
    },{
        text:'Mô tả',
        dataIndex:'product_desc',
        flex: 1
    },
    ],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        items:[
			{
				margin:'0 0 0 5',
				xtype: 'button',
				iconCls: 'x-fa fa-angle-double-up',
				itemId: 'btnThuGon',
				bind: {
					hidden: '{IsformMaster}'
				}
			}, 
			{
				margin:'0 0 0 5',
				xtype: 'button',
				itemId: 'btnMoRong',
				iconCls: 'x-fa fa-angle-double-down',
				bind: {
					hidden: '{!IsformMaster}'
				}
			}, 
            {
                xtype: 'textfield',
                margin: '0 5 0 5',
                itemId:'productcode',
                fieldLabel: 'Mã sản phẩm',
                width: 250,
                labelWidth: 90,
                hideLabel: false,			
                enableKeyEvents : true,
                // listeners: {
                //     keypress: 'onPressEnterBtnTimNPL'
                // }
            },   
            {
                tooltip: 'Tìm sản phẩm',
                margin: '0 5 0 5',
                itemId: 'btnTimSP',
                iconCls: 'x-fa fa-search',
                weight: 30,			
                bind:{
                    // hidden: '{isEdit}'
                }
            },         
        ]
    }]
});

