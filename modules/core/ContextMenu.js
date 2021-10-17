Evema.Modules[ "ContextMenu" ] = ( function() {
const ContextMenu = {};

ContextMenu.Init = function() {

}

ContextMenu.Show = function() {
    const that = ContextMenu;

    Evema.SetLocal( that, "Visible", true );
}

ContextMenu.Hide = function() {
    const that = ContextMenu;

    Evema.SetLocal( that, "Visible", false );
}

ContextMenu.OnVisible = function() {
    console.log( "ContextMenu.OnVisible" );
}

ContextMenu.Actions = {
    'Init' : ContextMenu.Init,
    'Show' : ContextMenu.Show,
    'Hide' : ContextMenu.Hide
};

ContextMenu.Options = {
    Standard: {
        Visible: false
    },
    Current: {},
    Setters: {
        Visible: ContextMenu.OnVisible
    }
}

return ContextMenu; } )();
