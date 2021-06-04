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
                metaData.iconCls = 'x-fa fa-building'
            if(record.data.type == 1)
                metaData.iconCls = 'x-fa fa-industry'
            if(record.data.type == 2)
                metaData.iconCls = 'x-fa fa-home'
            if(record.data.type == 3)
                metaData.iconCls = 'x-fa fa-bars'
            if(record.data.type == 4)
                metaData.iconCls = 'x-fa fa-square-o'
            if(record.data.type == 5)
                metaData.iconCls = 'x-fa fa-minus-square-o'
            return value;
        }                     
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
        },{
            xtype:'button',
            text: 'Làm mới',
            margin: 3,
            itemId:'btnReload',
            iconCls: 'x-fa fa-refresh',
        },{
            flex:1,
            border: false
        },]
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
});

