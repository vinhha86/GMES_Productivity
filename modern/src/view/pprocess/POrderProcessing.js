Ext.define('GSmartApp.view.pprocess.POrderProcessing', {
    extend: 'Ext.form.Panel',
    xtype: 'porderprocessing',
    controller: 'POrderProcessingController',
	viewModel: {
        type: 'POrderProcessingViewModel'
    },
    requires: [
        'GSmartApp.store.POrderProcessing'
    ],
    layout: 'vbox',
    header: false,
    bodyPadding: 2,
    defaults: {
        margin:'0 0 10 0'
    },

    items: [{
        layout: 'hbox',
        defaults: {
            margin:'5 5 0 5'
        },
        items: [{
            xtype: 'textfield',
            reference: 'porderFilterField',
            placeholder: 'Mã SX',
            maxWidth: 200,
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onPOrderFilterKeyup',
                buffer: 500
            }
        }, {
            xtype: 'combobox',
            reference:'factorycombo',
            editable: false,
            maxWidth: 200,
            flex: 1,
            bind: {
                store:'{FactoryStore}'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onFactoryItemSelected'
            }
        }, {
            xtype: 'combobox',
            reference:'orgcombo',
            editable: false,
            maxWidth: 200,
            flex: 1,
            bind: {
                store:'{ProductionLineStore}'
            },
            displayField: 'name',
            valueField: 'id',
            listeners: {
                select: 'onOrgItemSelected'
            }
        }]
    },{
        xtype: 'grid',
        height: '100%',
        width: '100%',
        features: [{
            ftype: 'grouping',
            groupHeaderTpl: '<b>{name}</b>',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }],
        viewConfig: {
            enableTextSelection: false,
            stripeRows: false,
         },
        bind: {
            store:'{POrderProcessingStore}'
        },
        columns: [{
            text: 'Mã lệnh',
            flex: 1,
            dataIndex: 'pordercode',
        }, {
            text: 'PO Buyer',
            flex: 1,
            dataIndex: 'po_buyer'
        }, {
            text: 'PO Vendor',
            flex: 1,
            dataIndex: 'po_vendor'
        }],
        listeners: {
            // itemtap: 'onItemTap',
            childtap: 'onChildTap'
        },
    }]
});
