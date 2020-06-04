Ext.define('GSmartApp.view.pcontract.PContract_PO_ProductList', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_PO_ProductList',
    id:'PContract_PO_ProductList',
    // controller: 'PContractSKU_ListProductViewCotroller',
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
        }
    },
    bind:{
        store:'{PContractProductStore}'
    },
    reference: 'PContract_DeliveryPlan_ProductList',
    columns:[{
        text:'Ảnh',
        dataIndex:'imgproduct',
        width: 50,
        textAlign: 'center',
        renderer: function(value, meta, record){
            return '<img style="width:16px; height:14px" src="data:image/gif;base64,'+ value +'">';
        },
        listeners:{
            click: 'viewImg'
        }
    },{
        text:'Mã SP',
        dataIndex:'productCode',
        width: 60
    },{
        text:'Tên SP',
        dataIndex:'productName',
        flex: 1
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        padding: '0 0 10 5',
        height: 35,
        items:[
            {
                xtype      : 'fieldcontainer',
                defaultType: 'radiofield',
                cls: 'boldlabel',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        boxLabel  : 'Sản phẩm (Style)',
                        name: 'productlist',
                        id        : 'chkStyleSelect',
                        inputValue: '0',
                        checked: true
                    }, {
                        boxLabel  : 'Bộ sản phẩm (Set)',
                        name: 'productlist',
                        id        : 'chkSetSelect',
                        inputValue: '1',
                        margin: '0 0 0 5',
                    }
                ],
                listeners: {change:'onCheckStatusChange'}          
            }
		]
    }]    
});

