Ext.define('GSmartApp.view.product.ProductInfoView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductInfoView',
    id: 'ProductInfoView',
    controller: 'ProductInfoViewCotroller',
    layout:'hbox',
	bodyPadding: 5,
    border: false,
    IdProduct: 0,
    items:[{
        layout:'vbox',
        border: false,
        flex: 1,
        items:[
        {
            layout:'hbox',
            border:false,
            items:[{
                xtype:'textfield',
                margin: 1,
                fieldLabel: "Mã nội bộ",
                bind:{
                    value : '{product.code}'
                },
                tooltip:'Nhập mã sản phẩm',
                itemId:'code',
                name:'code',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110
            },{
                xtype:'textfield',
                margin: 1,
                height: 32,
                width: 400,
                tooltip:'Nhập tên sản phẩm',
                fieldLabel: "Tên nội bộ",
                allowBlank: false,
                blankText: 'Không được để trống',
                bind:{
                    value : '{product.name}'
                },
                name:'name',
                labelWidth: 110
            }]
        },
        {
            layout:'hbox',
            border:false,
            items:[{
                xtype:'textfield',
                margin: 1,
                fieldLabel: "Mã Buyer",
                bind:{
                    value : '{product.buyercode}'
                },
                tooltip:'Nhập mã Buyer',
                itemId:'buyercode',
                name:'buyercode',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110
            },{
                xtype:'textfield',
                margin: 1,
                height: 32,
                width: 400,
                tooltip:'Nhập tên Buyer',
                fieldLabel: "Tên Buyer",
                allowBlank: false,
                blankText: 'Không được để trống',
                bind:{
                    value : '{product.buyername}'
                },
                name:'buyername',
                labelWidth: 110
            }]
        },
        {
            layout:'hbox',
            border:false,
            items:[{
                xtype:'textfield',
                margin: 1,
                fieldLabel: "Mã Vendor",
                bind:{
                    value : '{product.vendorcode}'
                },
                tooltip:'Nhập mã Vendor',
                itemId:'vendorcode',
                name:'vendorcode',
                height: 32,
                allowBlank: false,
                blankText: 'Không được để trống',
                labelWidth: 110
            },{
                xtype:'textfield',
                margin: 1,
                height: 32,
                width: 400,
                tooltip:'Nhập tên Vendor',
                fieldLabel: "Tên Vendor",
                allowBlank: false,
                blankText: 'Không được để trống',
                bind:{
                    value : '{product.vendorname}'
                },
                name:'vendorname',
                labelWidth: 110
            }]
        },        
        // {
        //     layout:'hbox',
        //     border:false,
        //     items:[{
        //         xtype:'combo',
        //         queryMode: 'local',
        //         valueField: 'id',
        //         displayField: 'fullName',
        //         margin: 1,
        //         height: 32,
        //         tooltip:'Chọn người thiết kế',
        //         fieldLabel: "Người thiết kế",
        //         bind:{
        //             value : '{product.designerid_link}',
        //             store : '{UserStore}'
        //         },
        //         itemId:'designerid_link',
        //         name: 'designerid_link',
        //         labelWidth: 110
        //     },{
        //         xtype:'textfield',
        //         margin: 1,
        //         height: 32,
        //         width: 400,
        //         fieldLabel: "Người duyệt mẫu",
        //         bind:{
        //             value : '{product.samplemakername}'
        //         },
        //         name:'samplemakername',
        //         readOnly : true,
        //         labelWidth: 110
        //     }]
        // },{
        //     layout:'hbox',
        //     border:false,
        //     items:[{
        //         xtype:'datefield',
        //         margin: 1,
        //         height: 32,
        //         fieldLabel: "Ngày duyệt mẫu",
        //         bind:{
        //             value : '{product.samplemakeDate}'
        //         },
        //         format: 'd/m/Y',
        //         readOnly: true,
        //         itemId:'samplemakeDate',
        //         name: 'samplemakeDate',
        //         labelWidth: 110
        //     },{
        //         xtype:'textfield',
        //         margin: 1,
        //         width: 400,
        //         height: 32,
        //         fieldLabel: "Người may mẫu",
        //         bind:{
        //             value : '{product.samplemakername}'
        //         },
        //         name:'samplemakername',
        //         readOnly : true,
        //         labelWidth: 110
        //     }]
        // }
        ]
    },{
        xtype:'ProductImageView',
        margin: 3
    }]
})