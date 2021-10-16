let Evema = {};

Evema.Core = {};

Evema.Modules = {};

Evema.LoadModules = function() {
    const that = Evema;
    
    that.Modules = { ...that.Core };

    // TODO: Load additional modules
};

Evema.Init = function() {
    const that = Evema;

    that.LoadModules();
    that.Eval( 'Tools:Init' );
    that.Eval( 'Grid:Init' );
    that.Eval( 'Power:Init' );
    that.Eval( 'Generator:Init' );
    that.Eval( 'Schema:Init' );
}

Evema.Eval = function( action_query, params ) {
    const that = Evema;

    const path = action_query.split( ':' );
    if ( path.length !== 2 ) {
        console.warn( `Unknown action type "${action_query}"` );
        return;
    }

    const module_name = path[ 0 ];
    let module;
    if ( module_name === '@' ) {
        module = that;
    } else {
        module = that.Modules[ module_name ];
    }

    if ( module === undefined ) {
        console.warn( `Module "${module_name}" not found` );
        return;
    }

    const actions = module.Actions;
    if ( actions === undefined ) {
        console.warn( `Module "${module_name}" has no actions` );
        return;
    }

    const action_name = path[ 1 ];
    const current_action = actions[ action_name ];
    if ( current_action !== undefined ) {
        current_action( params );
    } else {
        console.warn( `Unknown "${module_name}" action "${action_name}"` );
    }
};

Evema.Set = function( option_query, value ) {
    const that = Evema;

    const path = option_query.split( ':' );
    if ( path.length !== 2 ) {
        console.warn( `Unknown option type "${option_query}"` );
        return;
    }

    const module_name = path[ 0 ];
    let module;
    if ( module_name === '@' ) {
        module = that;
    } else {
        module = that.Modules[ module_name ];
    }

    if ( module === undefined ) {
        console.warn( `Module "${module_name}" not found` );
        return;
    }

    const options = module.Options;
    if ( options === undefined ) {
        console.warn( `Module "${module_name}" has no options` );
        return;
    }

    const option_name = path[ 1 ];
    options.Current[ option_name ] = value;
}

Evema.Get = function( option_query ) {
    const that = Evema;

    const path = option_query.split( ':' );
    if ( path.length !== 2 ) {
        console.warn( `Unknown option type "${option_query}"` );
        return;
    }
    
    const module_name = path[ 0 ];
    let module;
    if ( module_name === '@' ) {
        module = that;
    } else {
        module = that.Modules[ module_name ];
    }

    if ( module === undefined ) {
        console.warn( `Module "${module_name}" not found` );
        return;
    }

    const options = module.Options;
    if ( options === undefined ) {
        console.warn( `Module "${module_name}" has no options` );
        return;
    }

    const option_name = path[ 1 ];
    const value = options.Current[ option_name ];
    return ( value !== undefined ? value : options.Standard[ option_name ] );
}

Evema.GetLocal = function( source, name ) {
    if ( !source || !source.Options ) return;
    const options = source.Options;
    const value = options.Current[ name ];
    return ( value !== undefined ? value : options.Standard[ name ] );
}

Evema.Actions = {};

Evema.Options = {
    Standard: {},
    Current: {}
}

window.onload = Evema.Init;