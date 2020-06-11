Ext.define('GSmartApp.view.org.ListOrgMenu', {
    extend: 'Ext.tree.Panel',
    xtype: 'lsorgmenu',
    id:'ListOrgMenu',
    controller: 'ListOrgMenuController',
    reference: 'ListOrgMenu',
    // viewConfig: {
    //     stripeRows: true,
    //     enableTextSelection: true,
    //     columnLines: true,
    //     rowLines: true
    // },    
    rootVisible: false,
    bind:{
        store:'{MenuStore}'
    },
    columns:[{
        text:'Menu đơn vị',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1
    }]
});

