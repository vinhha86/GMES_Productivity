Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    // id:'PContract_POList',

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
        store:'{PContractPOList}'
    },
    columns:[{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        flex: 1
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        flex: 1
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 70
    },{
        text:'SL',
        dataIndex:'po_quantity',
        width: 60
    }],
    // plugins: {
    //     rowwidget: {
    //         widget: 
    //         {
    //             xtype: 'grid',
    //             bind: {
    //                 store: '{record.sub_po}',
    //                 // title: 'Danh sách hàng xuất'
	// 			},
    //             columns:[
    //                 {
    //                     text:'PO Buyer',
    //                     dataIndex:'po_buyer',
    //                     width: 100
    //                 },{
    //                     text:'PO Vendor',
    //                     dataIndex:'po_vendor',
    //                     width: 100
    //                 },{
    //                     text:'Ngày giao',
    //                     dataIndex:'shipdate',
    //                     renderer: Ext.util.Format.dateRenderer('d/m/Y'),
    //                     width: 80
    //                 },{
    //                     text:'SL',
    //                     dataIndex:'po_quantity',
    //                     width: 60
    //                 }			
    //             ]				
	// 		}
	// 	}
	// },      
    dockedItems:[{
        dock:'top',
        border: 'hbox',
        items:[{
            xtype:'combo',
            editable: false,
            width:'95%',
            margin: 5,
            fieldLabel: 'Sản phẩm',
            itemId: 'productFilter',
            bind: {
                store: '{ProductFilterStore}',
                value: '{IdProduct_filterPO}'
            },
            valueField: 'productid_link',
            displayField: 'productName',
            queryMode: 'local'
        }]
    }]
});

