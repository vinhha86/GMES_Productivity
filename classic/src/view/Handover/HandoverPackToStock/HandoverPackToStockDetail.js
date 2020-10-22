Ext.define('GSmartApp.view.handover.HandoverPackToStockDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'handover_pack_tostock_edit',
    id: 'handover_pack_tostock_edit',
    reference: 'handover_pack_tostock_edit',
    layout: 'border',
    items: [
    {
        region: 'center',
        border: false,
        xtype: 'HandoverDetail',
        id: 'handover_pack_tostock_detail'
    }],
});

