Ext.define('GSmartApp.view.personel.Personnel_ListOrg_View', {
    extend: 'Ext.tree.Panel',
    xtype: 'Personnel_ListOrg_View',
    id:'Personnel_ListOrg_View',
    controller: 'Personnel_ListOrg_ViewController',
    useArrows:true,
    bufferedRenderer: false,
    bodyStyle: {
        
    },
    rootVisible: false,
    bind:{
        store:'{OrgStore}'
    },
    columns:[{
        text:'Đơn vị',
        dataIndex:'name',
        xtype: 'treecolumn',
        flex: 1,
        renderer: function (value, metaData, record, rowIndex) {
            // metaData.tdCls = 'process-editablecolumn';
            // console.log(metaData);
            // metaData.style = "display: none;";
            if(record.data.orgtypeid_link == 1)
                metaData.iconCls = 'x-fa fa-building'
            if(record.data.orgtypeid_link == 13){
                    metaData.iconCls = 'x-fa fa-industry'
                if(record.data.is_manufacturer == 1)
                    metaData.iconCls = 'x-fa fa-handshake'
                else
                    metaData.iconCls = 'x-fa fa-industry'
            }
            if(record.data.orgtypeid_link == 14)
                metaData.iconCls = 'x-fa fa-sliders'
            if(record.data.orgtypeid_link == 8)
                metaData.iconCls = 'x-fa fa-home'
            if(record.data.orgtypeid_link == 9)
                metaData.iconCls = 'x-fa fa-check-circle'
            if(record.data.orgtypeid_link == 21)
                metaData.iconCls = 'x-fa fa-bath'
            return value;
        }                     
    }]
});

