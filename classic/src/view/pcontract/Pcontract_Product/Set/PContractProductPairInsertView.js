Ext.define('GSmartApp.view.pcontract.PContractProductPairInsertView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractProductPairInsertView',
    id:'PContractProductPairInsertView',
    controller: 'PContractProductPairInsertViewCotroller',
    productpairid_link: 0,
    viewModel: {
        type: 'PContractViewModel'
    },
    viewConfig: {
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1
        }
    },
    bind:{
        store:'{PContractProductPairStore}'
    },
    reference: 'PContractProductPairInsertView',
    columns:[{
        text:'Ảnh',
        dataIndex:'imgproduct',
        width: 50,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
        }
    },{
        text:'Mã SP',
        dataIndex:'productCode',
        width: 60
    },{
        text:'Tên SP',
        dataIndex:'productName',
        flex: 1
    },{
        text:'Số lượng',
        dataIndex:'amount',
        width: 80,
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        }
    }],
    dockedItems:[{
        dock:'bottom',
        border: false,
        layout:'hbox',
        items:[{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnChon',
            iconCls: 'x-fa fa-save'
        },{
            flex: 1
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

