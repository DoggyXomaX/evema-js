Evema.Modules[ "ContextMenu" ] = ( function() {
const ContextMenu = {};

ContextMenu.Init = function() {
    const that = ContextMenu;

    const gridInstance = Evema.Get( 'Grid:Instance' );
    if ( gridInstance === undefined ) {
        console.warn( 'No grid instance' );
        return;
    }

    window.addEventListener( 'contextmenu', function( e ) { 
        e.preventDefault(); 
    }, false );

    gridInstance.oncontextmenu = function() {
        Evema.SetLocal( that, 'Visible', true );
    }
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
