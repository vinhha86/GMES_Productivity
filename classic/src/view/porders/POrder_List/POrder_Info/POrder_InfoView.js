Ext.define('GSmartApp.view.porders.POrder_List.POrder_InfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'POrder_InfoView',
    id: 'POrder_InfoView',
    controller: 'POrder_InfoViewController',
    reference: 'POrder_InfoView',
    bodyPadding: 5,
    border: false,
    IdPOrder: 0,
    items: [{
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Mã lệnh",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.ordercode}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Style",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.stylebuyer}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Tên sản phẩm",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.productname}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'numberfield',
                    margin: 2,
                    fieldLabel: "Số lượng",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    minValue: 0,
                    bind: {
                        value: '{porder.totalorder}'
                    },
                    hideTrigger:true,
                    fieldStyle:{
                        'text-align':'right',
                    },
                    labelWidth: 120,
                    width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "PO Buyer",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.po_buyer}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Tên Buyer",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.buyername}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "PO Vendor",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.po_vendor}'
                    },
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'textfield',
                    margin: 2,
                    fieldLabel: "Tên Vendor",
                    allowBlank: false,
                    // itemId: 'contractcode',
                    blankText: 'Không được để trống',
                    bind: {
                        value: '{porder.vendorname}'
                    },
                    labelWidth: 120,
                    width: 250
            }]
        },{
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'datefield',
                    margin: 2,
                    reference: 'productiondate_plan',
                    fieldLabel: "Ngày vào chuyền",
                    allowBlank: false,
                    itemId: 'productiondate_plan',
                    bind: {
                        value: '{productiondate_plan}'
                    },
                    format: 'd-m-Y',
                    labelWidth: 120,
                    width: 250
            },{
                xtype: 'datefield',
                    margin: 2,
                    reference: 'golivedate',
                    fieldLabel: "Ngày giao hàng",
                    allowBlank: false,
                    itemId: 'golivedate',
                    bind: {
                        value: '{golivedate}'
                    },
                    format: 'd-m-Y',
                    labelWidth: 120,
                    width: 250
            },{
                xtype:'combobox',
                // itemId:'txtstatus',
                bind:{
                    store:'{POrder_ListStatusStore}',
                    value: '{porder.porder_statusid_link}'
                },
                fieldLabel: "Trạng thái",
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',
                editable: false,
                allowBlank: false,
                margin: 2,
                labelWidth: 120,
                // flex: 1,
                width: 504
            }]
        }]
    }]
})