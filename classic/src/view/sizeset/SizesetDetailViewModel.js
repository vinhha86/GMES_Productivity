Ext.define('GSmartApp.view.sizeset.SizesetDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SizesetDetailViewModel',
    requires: ['GSmartApp.store.sizeset.SizesetStore',
        'GSmartApp.store.attribute.attributeStore',
        'GSmartApp.store.sizeset.SizesetAttributeValueStore',
        'GSmartApp.store.attribute.attributeValueStore'
    ],
    stores: {
        SizesetStore: {
            type: 'SizesetStore'
        },
        AttributeStore: {
            type: 'attributeStore'
        },
        AttributeValueStore: {
            type: 'attributeValueStore'
        },
        SizesetAttributeValueStore: {
            type : 'SizesetAttributeValueStore'
        }
    },
    data:{
        sizeset : {
            name: '',
            comment: ''
        },
        isWindow: false,
        btnQuayLai: false
    }
})