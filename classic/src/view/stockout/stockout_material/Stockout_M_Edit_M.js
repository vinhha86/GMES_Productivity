Ext.define('GSmartApp.view.stockout.Stockout_M_Edit_M', {
    extend: 'Ext.container.Container',
    xtype: 'Stockout_M_Edit_M',
    controller: 'Stockout_M_Edit_M_Controller',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'cbostockouttype',
                    width: 370,
                    labelWidth: 80,
                    fieldLabel: 'Loại phiếu:',
                    editable: false,
                    displayField: 'name',
                    valueField: 'id',
                    bind: {
                        store: '{StockoutTypeStore}',
                        value: '{stockout.stockouttypeid_link}'
                    }
                },
                {
                    xtype: 'textfield',
                    margin: '0 0 0 5',
                    reference: 'txtstockoutcode',
                    width: 225,
                    labelWidth: 75,
                    fieldLabel: 'Số phiếu:',
                    readOnly: true,
                    bind: {value:'{stockout.stockoutcode}'}
                },
                {
                    xtype: 'datefield',
                    margin: '0 0 0 5',
                    reference: 'txtstockoutdate',
                    width: 220,
                    labelWidth: 70,
                    fieldLabel: 'Ngày xuất:',
                    editable: false,
                    format:'d/m/Y',
			        altFormats: "Y-m-d\\TH:i:s.uO",
                    bind: {
                        value: '{stockout.stockoutdate}'
                    }
                },
                {
                    xtype: 'combo',
                    margin: '0 5 0 5',
                    reference: 'stockout_usercreateid_link',
                    flex: 1,
                    labelWidth: 85,
                    valueField: 'id',
			        displayField: 'fullName',
                    fieldLabel: 'Người xuất:',
                    readOnly: true,
                    bind: {
                        value: '{stockout.usercreateid_link}',
                        store: '{UserStore}'
                    },
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_from_link',
                    width: 370,
                    labelWidth: 80,
                    fieldLabel: 'Nơi xuất:',
                    editable: false,
                    bind: {
                        store: '{OrgFromStore}',
                        value: '{stockout.orgid_from_link}'
                    },
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'combobox',
                    reference: 'stockout_orgid_to_link',
                    width: 450,
                    labelWidth: 75,
                    fieldLabel: 'Nơi nhận:',
                    editable: false,
                    margin: '0 0 0 5',
                    bind: {
                        store: '{OrgToStore}',
                        value: '{stockout.orgid_to_link}'
                    },
                    displayField: 'name',
                    valueField: 'id'
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_shipperson',
                    flex: 1,
                    labelWidth: 85,
                    fieldLabel: 'Người nhận:',
                    hideLabel: false,
                    bind: {value:'{stockout.shipperson}'}
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    reference: 'stockout_reason',
                    width: 370,
                    labelWidth: 80,
                    fieldLabel: 'Lý do xuất:',
                    hideLabel: false,
                    bind: {value:'{stockout.reason}'}
                },
                {
                    xtype: 'textfield',
                    margin: '0 5 0 5',
                    reference: 'stockout_extrainfo',
                    flex: 1,
                    labelWidth: 75,
                    fieldLabel: 'Kèm theo:',
                    hideLabel: false,
                    bind: {value:'{stockout.extrainfo}'}
                }
            ]
        },
    ]
});
