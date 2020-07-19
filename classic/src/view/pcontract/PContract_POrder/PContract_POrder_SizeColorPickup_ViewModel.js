Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_POrder_SizeColorPickup_ViewModel',
     stores:{
        SizePickupStore:{
            type: 'SizeColorPickupStore'
        },
        ColorPickupStore:{
            type: 'SizeColorPickupStore'
        },
    },
    data: {
        pcontractid_link: null,
        poid_link: null,
    }
})