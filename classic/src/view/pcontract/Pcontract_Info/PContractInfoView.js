Ext.define('GSmartApp.view.PContract.PContractInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractInfoView',
    id: 'PContractInfoView',
    controller: 'PContractInfoViewCotroller',
    bodyPadding: 5,
    border: false,
    IdPContract: 0,
    layout: 'vbox',
    items: [
        {
            layout: 'hbox',
            flex:1,
            border: false,
            items: [
                {
                    xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Mã nội bộ",
                    allowBlank: false,
                    itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{PContract.contractcode}'
                    },
                    labelWidth: 80,
                    flex: 1
                }, 
                {
                    xtype: 'datefield',
                    margin: 2,
                    fieldLabel: "Ngày lập:",
                    bind: {
                        value: '{PContract.contractdate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    value: new Date(),
                    itemId: 'contractdate',
                    labelWidth: 80,
                    flex: 1
                }, 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Loại hình:",
                    bind: {
                        value: '{PContract.contracttypeid_link}',
                        store: '{ContractTypes}'
                    },
                    itemId: 'contracttypeid_link',
                    labelWidth: 100,
                    flex: 1
                },
                {
                    xtype: 'combo',
                    margin: 2,
                    fieldLabel: "Thị trường:",
                    allowBlank: false,
                    itemId: 'market',
                    blankText: 'Không được để trống',
                    bind: {
                        store: '{MarketStore}',
                        value: '{PContract.marketypeid_link}'
                    },
                    displayField: 'name',
                    valueField: 'id',
                    labelWidth: 80,
                    flex: 1
                }           
                // {
                //     xtype: 'datefield',
                //     margin: 2,
                //     fieldLabel: "Ngày chốt:",
                //     bind: {
                //         value: '{PContract.confirmdate}'
                //     },
                //     format: 'd/m/Y',
                //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     value: new Date(),
                //     itemId: 'confirmdate',
                //     labelWidth: 90,
                //     width: 300
                // }
            ]
        }, 
        {
            layout: 'hbox',
            flex:1,
            border: false,
            items: [
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Buyer:",
                    bind: {
                        value: '{PContract.orgbuyerid_link}',
                        store: '{EndBuyer}'
                    },
                    itemId: 'orgbuyerid_link',
                    labelWidth: 80,
                    flex: 1
                }, 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Vendor:",
                    bind: {
                        value: '{PContract.orgvendorid_link}',
                        store: '{Vender}'
                    },
                    itemId: 'orgvenderid_link',
                    labelWidth: 80,
                    flex: 1
                }, 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Bên thanh toán:",
                    bind: {
                        value: '{PContract.payer}',
                        store: '{PayerStore}'
                    },
                    itemId: 'orgpayerid_link',
                    labelWidth: 100,
                    flex: 1
                }, 
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Bên hiển thị:",
                    bind: {
                        value: '{PContract.orgshow}',
                        store: '{PayerStore}'
                    },
                    itemId: 'orgshowid_link',
                    labelWidth: 80,
                    flex: 1
                }
            ]
        }
    ]
})