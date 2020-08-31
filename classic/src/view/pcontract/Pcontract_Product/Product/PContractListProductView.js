Ext.define('GSmartApp.view.pcontract.PContractListProductView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractListProductView',
    id:'PContractListProductView',
    controller: 'PContractListProductViewCotroller',
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
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            } 
        },
        gridexporter: true
    },
    bind:{
        store:'{PContractProductStore}'
    },
    reference: 'PContractListProductView',
    columns:[{
        text:'Ảnh',
        dataIndex:'imgproduct',
        width: 45,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
        },
        listeners:{
            click: 'viewImg'
        },
        exportStyle: {
            
        }
    },{
        text:'Mã Buyer',
        dataIndex:'productBuyerCode',
        width: 120
    },{
        text:'Mô tả',
        dataIndex:'productinfo',
        flex: 1
    },
    // {
    //     text:'Ngày SX',
    //     xtype:'datecolumn',
    //     format: 'd/m/Y',
    //     align: 'center',
    //     dataIndex:'production_date',
    //     width: 100,
    //     editor:{
    //         xtype:'datefield'
    //     }
    // },{
    //     text:'Ngày GH',
    //     xtype:'datecolumn',
    //     format: 'd/m/Y',
    //     align: 'center',
    //     dataIndex:'delivery_date',
    //     width: 100,
    //     editor:{
    //         xtype:'datefield'
    //     }
    // },
    // {
    //     text:'EMT',
    //     dataIndex:'emt',
    //     width: 60,
    //     editor:{
    //         xtype:'textfield',
    //         maskRe: /[0-9.]/,
    //         selectOnFocus: true
    //     }
    // },
    // {
    //     text:'SL',
    //     dataIndex:'pquantity',
    //     width: 60,
    //     editor:{
    //         xtype:'textfield',
    //         maskRe: /[0-9.]/,
    //         selectOnFocus: true
    //     }
    // },
    {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        items: [
            // {
            // iconCls: 'x-fa fas fa-edit',
            // tooltip: "Số lượng",
            // handler: 'onEditSoLuong'
            // },
            {
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Hủy',
                handler: 'onXoa'
            }
        ]
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
            labelWidth : 0,
            value: 'Danh sách sản phẩm (Style)'
        },
		'->'
		,
		{
            xtype:'button',
            itemId:'btnAddProduct_PContractListProductView',
            ui: 'header',
            margin: '10 5 0 0',
			tooltip: 'Thêm sản phẩm',
            iconCls: 'x-fa fa-plus'
        },
        // {
        //     xtype:'button',
        //     itemId:'btnExcel',
        //     ui: 'header',
        //     margin: '10 5 0 0',
		// 	tooltip: 'Export Excel',
        //     iconCls: 'x-fa fa-file-excel'
        // }
        ]
    }]
});

