Ext.define('GSmartApp.view.sku.SkuSearchCriteria', {
    extend: 'Ext.Panel',
    xtype: 'SkuSearchCriteria',
    id: 'SkuSearchCriteria',
    controller: 'SkuSearchCriteriaController',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },    
    items: [
        {
            xtype: 'container',
            margin: '0 0 2 0',
            layout: 'vbox',
            items:[
                {
                    xtype:  'combo',
                    margin: '0 0 2 0',
                    width: '100%',
                    reference:'skusearch_ProductType',
                    editable: false,
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    fieldLabel: "Phân loại:",
                    allowBlank: false,
                    labelWidth: 80,
                    blankText: 'Không được để trống',
                    bind:{
                        store: '{ProductTypeStore}',
                        value: '{type}'
                    },
                    listeners: {
                        select: 'onProductTypeItemSelected'
                    }                    
                }, 
                {
                    xtype: 'container',
                    margin: '0 0 2 0',
                    width: '100%',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            reference:'skusearch_code',
                            fieldLabel: 'Mã Buyer:',
                            labelWidth: 80,
                            hideLabel: false,
                            bind: '{code}'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            margin: '0 0 0 5',
                            reference:'skusearch_partnercode',
                            fieldLabel: 'KH/NCC:',
                            labelWidth: 70,
                            hideLabel: false,
                            bind: '{partnercode}'
                        },
                    ]
                },
                {
                    xtype:  'combo',
                    width: '100%',
                    reference:'skusearch_cboPartner',
                    // editable: false,
                    margin: '0 0 2 0',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    fieldLabel: "Endbuyer",
                    selectOnFocus: true,
                    labelWidth: 80,
                    bind:{
                        store: '{OrgStore}',
                        value: '{orgcustomerid_link}',
                        readOnly: '{isReadOnly_cmbKhachHang}'
                    }
                },  
            ]
        },    
        {
            xtype: 'SkuSearchCriteria_Attr',
            // margin: '2 2 0 2',
            border: true,
            flex: 1
        }
    ],
    fbar: [{
        minWidth: 80,
        text: 'Tìm sản phẩm',
        iconCls: 'x-fa fa-search',
        handler: 'onSearchButton'
    }],    
});
