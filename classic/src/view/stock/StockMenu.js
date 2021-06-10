Ext.define('GSmartApp.view.stock.StockMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'StockMenu',
    itemId:'StockMenu',
    controller: 'StockMenuController',
    reference: 'StockMenu',
    useArrows:true,
    bufferedRenderer: false,
    // viewConfig: {
    //     plugins: {
    //         ptype: 'treeviewdragdrop',
    //         containerScroll: true
    //     },
    //     listeners: {
    //         beforedrop: 'onBeforeDropOrg',
    //         drop: 'onDropOrg',
    //     }      
    // },
    rootVisible: false,
    bind:{
        store:'{StockTreeStore}'
    },
    columns:[{
        text:'Khoang',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            // metaData.tdCls = 'process-editablecolumn';
            // console.log(metaData);
            if(record.data.type == 0)
                metaData.iconCls = 'x-fa fa-building';
            if(record.data.type == 1)
                metaData.iconCls = 'x-fa fa-industry';
            if(record.data.type == 2)
                metaData.iconCls = 'x-fa fa-home';
            if(record.data.type == 3){
                if(record.data.khoangKhongXacDinh == true){
                    metaData.iconCls = 'x-fa fa-minus-square-o';
                    return 'Khoang ' + value;
                }else{
                    metaData.iconCls = 'x-fa fa-bars';
                    return 'Dãy ' + value;
                }
            }
            if(record.data.type == 4){
                metaData.iconCls = 'x-fa fa-square-o';
                return 'Hàng ' + value;
            }
            if(record.data.type == 5){
                metaData.iconCls = 'x-fa fa-minus-square-o';
                return 'Tầng ' + value + ' (' + record.get('spaceepc') + ')';
            }
            return value;
        }                     
    }],
    dockedItems:[
        // {
        //     layout:'hbox',
        //     border: false,
        //     dock:'bottom',
        //     items:[{
        //     },{
        //         xtype:'button',
        //         text: 'Làm mới',
        //         margin: 3,
        //         itemId:'btnReload',
        //         iconCls: 'x-fa fa-refresh',
        //     },{
        //         flex:1,
        //         border: false
        //     },]
        // },
        {
            layout:'hbox',
            border: false,
            dock:'top',
            items:[
                {
                    xtype:'textfield',
                    labelWidth: 0,
                    margin: '5 1 5 1',
                    emptyText: "Mã hàng",
                    itemId: 'txtMaHang',
                    reference: 'ValueFilterFieldMaHang',
                    // width: 120,
                    flex: 1,
                    bind: {
                        value: '{searchObj.maHang}'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onMaHangFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    xtype:'textfield',
                    labelWidth: 0,
                    margin: '5 1 5 1',
                    emptyText: "Đơn hàng",
                    itemId: 'txtDonHang',
                    reference: 'ValueFilterFieldDonHang',
                    // width: 120,
                    flex: 1,
                    bind: {
                        value: '{searchObj.donHang}'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onDonHangFilterKeyup',
                        buffer: 500
                    }
                },
                {
                    xtype: 'button',
                    // text: 'Thoát',
                    itemId: 'btnSearch',
                    iconCls: 'x-fa fa-search',
                    tooltip: 'Tìm kiếm',
                    margin: '5 1 5 1',
                },
                {
                    xtype: 'button',
                    // text: 'Thoát',
                    itemId: 'btnResetTree',
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Bỏ lọc',
                    margin: '5 1 5 1',
                },
                // {
                //     flex:1,
                //     border: false
                // },
            ]
        }
    ],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
});

