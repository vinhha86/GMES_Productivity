Ext.define('GSmartApp.view.personel.BaoCaoBaoAn.ChiTietBaoAnView', {
    extend: 'Ext.form.Panel',
    xtype: 'ChiTietBaoAnView',
    id: 'ChiTietBaoAnView',
    controller: 'ChiTietBaoAnViewController',
    layout: 'vbox',
    bind: {
        title: '{title_detail}'
    },
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Ca 1',
        readOnly: true,
        margin: 5,
        bind: {
            value: '{ca1}'
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Ca 2',
        readOnly: true,
        margin: 5,
        bind: {
            value: '{ca2}'
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Ca 3',
        readOnly: true,
        margin: 5,
        bind: {
            value: '{ca3}'
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Ca 4',
        readOnly: true,
        margin: 5,
        bind: {
            value: '{ca4}'
        }
    }]
});

