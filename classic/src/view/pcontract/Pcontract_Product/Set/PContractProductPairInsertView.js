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
        text:'Mã Buyer',
        dataIndex:'productBuyerCode',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Tên SP',
        dataIndex:'productName',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'Số lượng',
        dataIndex:'amount',
        width: 80,
        align: 'right',
        editor:{
            xtype:'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function(value, meta, record){
            return Ext.util.Format.number(value, '0,000');
        }
    }],
    dockedItems:[{
        dock:'bottom',
        border: false,
        layout:'hbox',
        items:[{
            flex: 1,
            border: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnChon',
            iconCls: 'x-fa fa-save'
        },{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        }]
    }]
});

