Ext.define('GSmartApp.view.org.ListOrgMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'lsorgmenu',
    id:'ListOrgMenu',
    controller: 'ListOrgMenuController',
    reference: 'ListOrgMenu',
    useArrows:true,
    bufferedRenderer: false,
    bodyStyle: {
        
    },
    // viewConfig: {
    //     stripeRows: true,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true
    // },    
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            containerScroll: true
        },
        listeners: {
            beforedrop: 'onBeforeDropOrg',
            drop: 'onDropOrg',
        }      
    },
    rootVisible: false,
    bind:{
        store:'{MenuStore}'
    },
    columns:[{
        text:'Đơn vị',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1
    }],
    listeners: {
       itemcontextmenu: 'onContextMenu'
    },
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        border: false,
        items: [{
            xtype: 'checkbox',
            fieldLabel: 'Hiện đơn vị không hoạt động ',
            labelWidth: 200,
            labelAlign: 'right',
            bind: {
                value:'{isDisplayInactive}'
            },
            listeners: {
                change: 'onchkboxchange'
            }
        }]
    }]
});

