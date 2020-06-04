Ext.define('GSmartApp.view.PContract.PContractInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractInfoView',
    id: 'PContractInfoView',
    controller: 'PContractInfoViewCotroller',
	bodyPadding: 5,
    border: false,
    IdPContract: 0,
    items:[{
        layout:'hbox',
        border: false,
        items:[{
            layout:'vbox',
            border: false,
            items:[{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "Mã nội bộ",
                    allowBlank: false,
                    itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind:{
                        value : '{PContract.contractcode}'
                    },
                    labelWidth: 80,
                    width: 300
                },{
                    xtype:'datefield',
                    margin: 2,
                    fieldLabel: "Ngày lập:",
                    bind:{
                        value : '{PContract.contractdate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    value: new Date(),
                    itemId:'contractdate',
                    labelWidth: 80,
                    width: 300
                },{
                    xtype:'datefield',
                    margin: 2,
                    fieldLabel: "Ngày chốt:",
                    bind:{
                        value : '{PContract.contractdate}'
                    },
                    format: 'd/m/Y',
                    altFormats: "Y-m-d\\TH:i:s.uO",
                    value: new Date(),
                    itemId:'confirmdate',
                    labelWidth: 90,
                    width: 300
                }]
            },{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Buyer:",
                    bind:{
                        value : '{PContract.orgcustomerid_link}',
                        store : '{CustomerStore}'
                    },
                    itemId:'orgbuyerid_link',
                    labelWidth: 80,
                    width: 300
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Vendor:",
                    bind:{
                        value : '{PContract.orgvenderid_link}',
                        store : '{Vender}'
                    },
                    itemId:'orgvenderid_link',
                    labelWidth: 80,
                    width: 300
                },{
                    xtype:'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    margin: 2,
                    fieldLabel: "Loại hình:",
                    bind:{
                        value : '{PContract.contracttypeid_link}',
                        store : '{ContractTypes}'
                    },
                    itemId:'contracttypeid_link',
                    labelWidth: 90,
                    width: 300
                }]
            },{
                layout:'hbox',
                border:false,
                items:[{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "HĐ Buyer",
                    bind:{
                        value : '{PContract.cust_contractcode}'
                    },
                    itemId:'buyer_contractcode',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    labelWidth: 80,
                    width: 300
                },{
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "HĐ Vendor",
                    bind:{
                        value : '{PContract.cust_contractcode}'
                    },
                    itemId:'vendor_contractcode',
                    allowBlank: false,
                    blankText: 'Không được để trống',
                    labelWidth: 80,
                    width: 300
                },
                // {
                //     xtype:'combo',
                //     queryMode: 'local',
                //     valueField: 'id',
                //     displayField: 'name',
                //     margin: 2,
                //     fieldLabel: "Brand:",
                //     bind:{
                //         value : '{PContract.branchid_link}',
                //         store : '{BranchStore}'
                //     },
                //     itemId:'branchid_link',
                //     labelWidth: 80,
                //     width: 300
                // },{
                //     xtype:'combo',
                //     queryMode: 'local',
                //     valueField: 'id',
                //     displayField: 'name',
                //     margin: 2,
                //     fieldLabel: "Season",
                //     bind:{
                //         value : '{PContract.seasonid_link}',
                //         store : '{SeasonStore}'
                //     },
                //     itemId:'seasonid_link',
                //     labelWidth: 80,
                //     width: 300
                // },
                {
                    xtype:'textfield',
                    margin: 2,
                    fieldLabel: "Merchandiser:",
                    allowBlank: false,
                    itemId: 'merchandiser',
                    blankText: 'Không được để trống',
                    bind:{
                        value : '{PContract.merchandiser_name}'
                    },
                    labelWidth: 90,
                    width: 300
                }                
                // {
                //     xtype:'datefield',
                //     margin: 2,
                //     fieldLabel: "Ngày giao hàng",
                //     bind:{
                //         value : '{PContract.deliverydate}'
                //     },
                //     format: 'd/m/Y',
                //     altFormats: "Y-m-d\\TH:i:s.uO",
                //     itemId:'deliverydate',
                //     labelWidth: 100,
                //     width: 250
                // }
                ]
            }]
        },{
            xtype:'textarea',
            labelAlign: 'top',
            margin: 2,
            fieldLabel:'Ghi chú',
            bind:{
                value : '{PContract.description}'
            },
            flex : 1
        }]
    }]
})