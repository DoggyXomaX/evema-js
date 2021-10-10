let Evema = {};

Evema.LoadModules = function() {
    Evema.Modules.push(
        { name: 'Tools', value: Evema.Tools },
        { name: 'Grid', value: Evema.Grid }
    );
};

Evema.Init = function() {
    let that = Evema;

    that.LoadModules();
    that.Eval( 'Tools:Init' );
    that.Eval( 'Grid:Init' );
}

Evema.Modules = [];

Evema.Eval = function( action_query ) {
    const path = action_query.split( ':' );
    if ( path.length !== 2 ) {
        console.warn( `Unknown action type "${action_query}"` );
        return;
    }

    let module;
    const module_name = path[ 0 ];
    for ( let i = 0, k = Evema.Modules.length; i < k; i++ ) {
        if ( Evema.Modules[ i ].name === module_name ) {
            module = Evema.Modules[ i ];
            break;
        }
    }

    if ( module === undefined ) {
        console.warn( `Module "${module_name}" not found` );
        return;
    }

    const actions = module.value.Actions;
    if ( actions === undefined ) {
        console.warn( `Module "${module_name}" has no actions` );
        return;
    }

    const action_name = path[ 1 ];
    for ( let i = 0, k = actions.length; i < k; i++ ) {
        if ( actions[ i ].name === action_name ) {
            actions[ i ].func();
            return;
        }
    }
    console.warn( `Unknown "${module_name}" action "${action_name}"` );
};

Evema.Set = function( option_query, value ) {
    const that = Evema;

    const path = option_query.split( ':' );
    if ( path.length !== 2 ) {
        console.warn( `Unknown option type "${option_query}"` );
        return;
    }

    let module;
    const module_name = path[ 0 ];
    for ( let i = 0, k = that.Modules.length; i < k; i++ ) {
        if ( that.Modules[ i ].name === module_name ) {
            module = that.Modules[ i ];
            break;
        }
    }

    if ( module === undefined ) {
        console.warn( `Module "${module_name}" not found` );
        return;
    }

    const options = module.value.Options;
    if ( options === undefined ) {
        console.warn( `Module "${module_name}" has no options` );
        return;
    }

    const option_name = path[ 1 ];
    options.Current[ option_name ] = value;
}

window.onload = Evema.Init;