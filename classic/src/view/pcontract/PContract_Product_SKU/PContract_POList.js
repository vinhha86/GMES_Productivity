Ext.define('GSmartApp.view.pcontract.PContract_POList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList',
    // id:'PContract_POList',
    controller: 'PContract_POListController',
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
        text:'Mã Buyer (SP)',
        dataIndex:'productbuyercode',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'POBuyerFilter',
            width: '98%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOBuyerFilterKeyup',
                buffer: 500
            }
        },

    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 75
    },{
        text:'SL',
        align: 'end',
        dataIndex:'po_quantity',
        width: 60,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
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
            displayField: 'productBuyerCode',
            queryMode: 'local'
        }]
    }]
});

