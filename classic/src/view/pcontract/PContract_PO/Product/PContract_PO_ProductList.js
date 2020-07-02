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
            text:'Tên SP',
            xtype: 'treecolumn',
            dataIndex:'text',
            flex: 1,
            
        },
        {
            text:'Style',
            dataIndex:'code',
            width: 120,
            cls: 'x-tree-node-icon'
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
    ]    
});

