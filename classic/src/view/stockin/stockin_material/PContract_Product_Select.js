Ext.define('GSmartApp.view.stockin.PContract_Product_Select', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Product_Select',
    id:'PContract_Product_Select',
    controller: 'PContract_Product_Select_Controller',
    viewModel: 'PContract_Product_Select_ViewModel',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        selType: 'checkboxmodel',
    },
    bind:{
        store:'{PContractProductStore}'
    },
    columns:[
        {
            text:'Ảnh',
            dataIndex:'imgproduct',
            width: 45,
            textAlign: 'center',
            renderer: function(value, meta, record){
                return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
            },
            listeners:{
                click: 'viewImg'
            }
        },
        {
            text:'Mã SP (Buyer)',
            dataIndex:'productBuyerCode',
            width: 120,
            listeners:{
                dblclick: 'viewProductDetail'
            },
        },
        {
            text:'Tên SP (Buyer)',
            dataIndex:'productName',
            width: 200
        },
        {
            text:'Mô tả',
            dataIndex:'productinfo',
            flex: 1
        }
    ],
    fbar: [
		{
			minWidth: 80,
			text: 'Chọn',
			iconCls: 'x-fa fa-check',
			handler: 'onSelectButton'
		},
		{
			minWidth: 80,
			text: 'Đóng',
			iconCls: 'x-fa fa-window-close',
			handler: 'onCloseButton'
		}, 

	]	
});

