Ext.define('GSmartApp.view.PContract.PContractImageViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractImageViewCotroller',
    init: function () {
        var me = this.getView();
    },
    control: {
       
    },
    onView: function (m) {
        var me = this.getView();
        var src = "";
        switch (m.currentTarget.id) {
            case "imgproduct1":
                src = me.down('#img1').getSrc();
                break;
            case "imgproduct2":
                src = me.down('#img2').getSrc();
                break;
            case "imgproduct3":
                src = me.down('#img3').getSrc();
                break;
            case "imgproduct4":
                src = me.down('#img4').getSrc();
                break;
            case "imgproduct5":
                src = me.down('#img5').getSrc();
                break;
            default:
                break;
        }
        me.down('#imgView').setSrc(src);
    }
})