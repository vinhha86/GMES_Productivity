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
    indent: 0,
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
            text:'Mã SP (Buyer)',
            xtype: 'treecolumn',
            dataIndex:'code',
            width: 120,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'styleCodeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onStyleCodeFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                if(record.data.parent_id != 0){
                    return '- ' + value;
                }
                return value;
            }
            
        },
        {
            text:'Mô tả',
            dataIndex:'info',
            flex: 1,
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'textFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onTextFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
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
        xtype: 'toolbar',
        height: 40,
        padding: 2,
        // layout: 'hbox',
        items: [
        {
            xtype: 'filefield',
            buttonText: 'Tải báo giá',
            buttonOnly: true,
            hidden: true,
            itemId: 'fileUpload',
            width: 35,
            height: 32,
            margin: 3
        },
        // {
        //     xtype: 'splitbutton',
        //     renderTo: Ext.getBody(),
        //     margin: 3,
        //     iconCls: 'x-fa fas fa-bars violetIcon',
        //     menu: new Ext.menu.Menu({
        //         items: [
        //             // these will render as dropdown menu items when the arrow is clicked:
        //             {
        //                 text: 'Upload báo giá',
        //                 iconCls: 'x-fa fa-upload',
        //                 itemId: 'splbtn_Upload'
        //             },
        //             {
        //                 text: 'Mẫu file upload', 
        //                 iconCls: 'x-fa fa-download',
        //                 itemId: 'splbtn_Template'
        //             },
        //             {
        //                 text: 'Xuất Excel báo giá', 
        //                 iconCls: 'x-fa fa-download',
        //                 itemId: 'splbtn_Excel'
        //             }
        //         ]
        //     })
        // }
        {
            xtype:'button',
            tooltip: 'Upload báo giá',
            // margin: 3,
            iconCls: 'x-fa fa-upload',
            itemId: 'splbtn_Upload'
        },
        {
            xtype:'button',
            tooltip: 'Xuất Excel báo giá',
            // margin: 3,
            iconCls: 'x-fa fa-file-excel-o',
            itemId: 'splbtn_Excel'
        },
        {
            xtype:'button',
            tooltip: 'Tải file mẫu',
            // margin: 3,
            iconCls: 'x-fa fa-download',
            itemId: 'splbtn_Template'
        }
        ]
    }] 
});

