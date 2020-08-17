Ext.define('GSmartApp.view.TaskBoard.Comment', {
    extend       : 'Ext.DataView',
    xtype        : 'Comment',
    itemSelector : 'div.comment-wrap',
    itemId       : 'Comment',
    cls          : 'commentview',
    userStore: null,
    itemTpl : '<tpl for=".">' +
    '<div class="comment-wrap">' +
    '<div class="comment-header"><h4>{userName}</h4><span class="date">{[Ext.util.Format.date(values.Date, "d/m/y G:i")]}</span><span style = "float:right">{typename}</span></div>' +
    '<div class="comment-body"><img src="{userImgUrl}"/><div>{Text}</div></div>' +
    '</div>' +
    '</tpl>',

    collectData : function (comments) {
        var me = this;
        var collected = this.callParent(arguments),
            result    = [];
        
        for (var i = 0; i < collected.length; i++) {
            var renderData = Ext.apply({}, collected[ i ]);
            var comment    = comments[ i ];
            var user       = me.userStore.getById(comment.get('UserId'));
            var userImgUrl = user.getImageUrl();

            renderData.userName         = user.getName();
            renderData.userImgUrl = userImgUrl || Ext.BLANK_IMAGE_URL;

            result.push(renderData);
        }

        return result;
    }
});
