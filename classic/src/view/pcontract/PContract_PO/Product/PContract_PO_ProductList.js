Ext.define('GSmartApp.view.pcontract.PContract_PO_ProductList', {
    extend: 'Ext.tree.Panel',
    xtype: 'PContract_PO_ProductList',
    id:'PContract_PO_ProductList',
    // controller: 'PContractSKU_ListProductViewCotroller',
    IdPContract: 0,
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    selModel: {
        //selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    rootVisible: false,
    bind:{
        store:'{PContractProductTreeStore}'
    },
    reference: 'PContract_DeliveryPlan_ProductList',
    columns:[        
        {
            text: 'Style',
            xtype: 'treecolumn',
            dataIndex:'code',
            width: 120,
            // cls: 'x-tree-node-icon'
        },
        {
            text:'Tên SP',
            dataIndex:'text',
            flex: 1
            
        },
        
    // {
    //     text:'Ảnh',
    //     dataIndex:'imgproduct',
    //     width: 40,
    //     textAlign: 'center',
    //     renderer: function(value, meta, record){
    //         return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
    //     }
    // }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            flex: 1
        },{
            xtype: 'button',
            margin: 3,
            text: 'Báo giá',
            iconCls: 'x-fa fa-download',
            itemId: 'btnExcel'
        }]
    }] 
});

