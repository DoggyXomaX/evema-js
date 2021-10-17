Evema.Modules[ "ContextMenu" ] = ( function() {
const ContextMenu = {};

ContextMenu.Instance = null;

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

    window.addEventListener( 'click', function( e ) {
        Evema.SetLocal( that, 'Visible', false );
    }, false );

    gridInstance.oncontextmenu = function( e ) {
        e.stopPropagation();
        e.preventDefault();

        // console.log( e );
        Evema.SetLocal( that, 'Position', { x: e.x, y: e.y } );
        Evema.SetLocal( that, 'Visible', true );
    }

    that.Instance = $( '.context-menu' )[ 0 ];
    that.Instance.addEventListener( 'click', function( e ) {
        e.stopPropagation();

        // console.log( 'Context menu click' );
    } );
    Evema.SetLocal( that, 'Instance', that.Instance );
}

ContextMenu.Show = function() {
    const that = ContextMenu;

    Evema.SetLocal( that, "Visible", true );
}

ContextMenu.Hide = function() {
    const that = ContextMenu;

    Evema.SetLocal( that, "Visible", false );
}

ContextMenu.OnVisible = function( source, value ) {
    if ( value ) {
        const position = Evema.GetLocal( source, 'Position' );
        source.Instance.style.left = `${position.x}px`;
        source.Instance.style.top = `${position.y}px`;
        $( source.Instance ).removeClass( 'hidden' );
    } else {
        $( source.Instance ).addClass( 'hidden' );
    }
}

ContextMenu.Actions = {
    'Init' : ContextMenu.Init,
    'Show' : ContextMenu.Show,
    'Hide' : ContextMenu.Hide
};

ContextMenu.Options = {
    Standard: {
        Instance: null,
        Visible: false,
        Position: { x: 0, y: 0 }
    },
    Current: {},
    Setters: {
        Visible: ContextMenu.OnVisible
    }
}

return ContextMenu; } )();
