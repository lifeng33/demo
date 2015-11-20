
Ext.onReady(function() {
    Ext.QuickTips.init();

    var tree = new Ext.ux.tree.TreeGrid({
        height: 200,
        monitorResize:true,
        renderTo: 'treeGrid',
        enableDD: true,

        columns:[{
            header: 'Task',
            menuDisabled : true,
            dataIndex: 'task',
            width: 230
        },{
            header: 'Duration',
            width: 100,
            menuDisabled : true,
            dataIndex: 'duration',
            align: 'center',
            sortType: 'asFloat',
            tpl: new Ext.XTemplate('{duration:this.formatHours}', {
                formatHours: function(v) {
                    if(v < 1) {
                        return Math.round(v * 60) + ' mins';
                    } else if (Math.floor(v) !== v) {
                        var min = v - Math.floor(v);
                        return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                    } else {
                        return v + ' hour' + (v === 1 ? '' : 's');
                    }
                }
            })
        },{
            header: 'Assigned To',
            width: 150,
            menuDisabled : true,
            dataIndex: 'user'
        }],
		 doLayout:function(){
							this.setWidth(0);
							var width = this.getEl().parent().getWidth();
							this.setWidth(width);
						},
			viewConfig:{
							forceFit:true,
							scrollOffset:2
						},
        dataUrl: 'treegrid-data.json'
    });
});