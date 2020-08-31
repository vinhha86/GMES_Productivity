Ext.define('GSmartApp.view.pcontract.PContract_PO_List', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_List',
    id:'PContract_PO_List',
    requires: [
        'Ext.Number',
        'Ext.Date',
        'Ext.grid.plugin.RowWidget'
    ],
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.status == 0) {
                return "po_accept";
            }
            else {
                if(record.get('po_quantity') != record.get('amount_org')){
                    return "po_wrongamount"
                }
            }
        }
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
        store:'{PContractProductPOStore}'
    },
    // store: {
    //     type: 'PContract_PO'
    // },
    columns:[{
        text:'PO Buyer',
        dataIndex:'po_buyer',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'PO Vendor',
        dataIndex:'po_vendor',
        width: 100,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text:'SL',
        align: 'right',
        dataIndex:'po_quantity',
        width: 90,
        renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
            return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
        }
    },{
        text:'Ngày giao',
        dataIndex:'shipdate',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        width: 70
    },
    {
        text:'Ngày NPL',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'matdate',
        width: 70
    },
    {
        text:'Ngày VC',
        renderer: Ext.util.Format.dateRenderer('d/m/y'),
        dataIndex:'productiondate',
        width: 70
    },
    {
        text:'Số ngày SX',
        dataIndex:'productiondays',
        width: 70
    },
    {
        text:'Phân xưởng',
        dataIndex:'factories',
        width: 80,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        text: 'Phụ trách',
        dataIndex: 'merchandiser_name',
        flex: 1,
        renderer: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value;
        }
    },{
        xtype: 'actioncolumn',
        width: 25,
        menuDisabled: true,
        sortable: false,
        items: [
            {
                iconCls: 'x-fa fas fa-bars violetIcon',
                handler: 'onMenu_PO'
            },            
            // {
            //     iconCls: 'x-fa fas fa-trash',
            //     tooltip: 'Xóa',
            //     handler: 'onXoa'
            // },{
            //     iconCls: 'x-fa fas fa-list',
            //     tooltip: 'Chi tiết',
            //     handler: 'onEdit'
            // },{
            //     iconCls: 'x-fa fas fa-check',
            //     tooltip: 'Chốt đơn',
            //     handler: 'onAccept'
            // }
        ]
    }],
    plugins: {
        rowwidget: {
            widget: 
            {
                xtype: 'grid',
                bind: {
                    store: '{record.sub_po}',
                    // title: 'Danh sách hàng xuất'
				},
                columns:[{
                    text:'PO Buyer',
                    dataIndex:'po_buyer',
                    width: 100
                },{
                    text:'PO Vendor',
                    dataIndex:'po_vendor',
                    width: 100
                },{
                    text:'SL',
                    align: 'end',
                    dataIndex:'po_quantity',
                    width: 90,
                    renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                    }
                },{
                    text:'YCSX',
                    align: 'end',
                    dataIndex:'amount_org',
                    width: 90,
                    renderer: function (value, metaData, record, rowIdx, colIdx, stor) {
                        return value == 0 ? "" : Ext.util.Format.number(value, '0,000');
                    }
                },{
                    text:'Ngày giao',
                    dataIndex:'shipdate',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    width: 70
                },{
                    text:'Ngày NPL',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'matdate',
                    width: 70
                },{
                    text:'Ngày VC',
                    // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    renderer: function(value){
                        var date = Ext.Date.parse(value, 'c');
                        return Ext.Date.format(date, 'd/m/y');
                    },
                    dataIndex:'productiondate',
                    width: 70
                },{
                    text:'Số ngày SX',
                    dataIndex:'productiondays',
                    width: 70
                },{
                    text:'Phân xưởng',
                    dataIndex:'factories',
                    flex: 1
                },{
                    xtype: 'actioncolumn',
                    width: 25,
                    menuDisabled: true,
                    sortable: false,
                    items: [
                        {
                            iconCls: 'x-fa fas fa-bars violetIcon',
                            handler: 'onMenu_SubPO'
                        },            
                    ]
                }],	
                listeners:{
                    itemclick: 'onSelectPO'
                }					
			}
		}
	},    
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[{
            xtype:'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth : 0,
            bind:{
                value: 'Danh sách Đơn hàng (PO)'
            }
        },
		'->'
		,
	    {
            xtype:'button',
            itemId:'btnAddPrice_PContract_PO_List',
            ui: 'header',
			tooltip: 'Thêm chào giá',
            iconCls: 'x-fa fa-plus',
            handler: 'onAddPOTap',
        },
        // {
        //     xtype:'button',
        //     itemId:'btnShowFactory',
        //     ui: 'header',
		// 	tooltip: 'Xem năng suất nhà máy',
        //     iconCls: 'x-fa fa-industry',
        //     handler: 'onFactoriesTap',
        // }
        ]
    },
    {
        dock: 'bottom',
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                html: '<div class="color-box">'
                +'<div class="color-square po_free"></div>&nbspChưa chốt'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square po_wrongamount"></div>&nbspSai SL phân xưởng'
                +'</div>',
                margin: '5'
            },{
                html: '<div class="color-box">'
                +'<div class="color-square po_accept"></div>&nbspĐã chốt'
                +'</div>',
                margin: '5'
            }]
        }]
    }    
    ],
    
});

