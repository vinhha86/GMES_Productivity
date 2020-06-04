Ext.define('GSmartApp.view.pordercreating.POrderCreating_New_Product', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderCreating_New_Product',
    id: 'POrderCreating_New_Product',
    controller: 'POrderCreating_New_ProductCotroller',
    reference: 'POrderCreating_New_Product',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },     
    border: true,
    bind: {
        store: '{PContractSKUPorderStore}'
    },
    columns: [
//        {text: 'STT', width: 45, xtype: 'rownumberer', align: 'center'},
        {xtype: 'checkcolumn', header: 'Chọn', dataIndex: 'isselected', width: 60,
            editor: {xtype: 'checkbox',cls: 'x-grid-checkheader-editor'}
        },            
        { header: 'Mã vạch', dataIndex: 'skuCode', flex: 1},
        {text:'Màu', dataIndex:'mauSanPham', width: 70},
        {text:'Cỡ', dataIndex:'coSanPham', width: 70},
        // {text:'SL SX', dataIndex:'pquantity_porder', width: 70,
        //     // editor:{
        //     // xtype:'textfield',
        //     // maskRe: /[0-9.]/,
        //     // selectOnFocus: true
        //     // },
        //     // summaryType: 'sum',
        //     // summaryRenderer: function(value, summaryData, dataIndex) {
        //     //     return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        //     // }
        // },
        // {text:'SL mẫu', dataIndex:'pquantity_sample',  width: 70,
        //     // editor:{
        //     //     xtype:'textfield',
        //     //     maskRe: /[0-9.]/,
        //     //     selectOnFocus: true
        //     // },
        //     // summaryType: 'sum',
        //     // summaryRenderer: function(value, summaryData, dataIndex) {
        //     //     return '<div style="color:red; font-weight: bold; align: right">'+ value ;
        //     // }
        // },
        {text:'SL đơn', dataIndex:'pquantity_total', width: 70,
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return '<div style="color:red; font-weight: bold; align: right">'+ value ;
            }
        },
        {text:'SL Lệnh', dataIndex:'pquantity_granted', width: 70},
        {text:'Còn lại', dataIndex:'pquantity_free', width: 70}
    ],
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            border: true,
            items:[{
                xtype: 'combo',
                flex: 1,
                margin: 5,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{productid_link}'
                },
                valueField: 'productid_link',
                displayField: 'productName',
                fieldLabel: 'Tên sản phẩm',
                itemId: 'cmbSanPham'
            }]
        }
    ]
});

