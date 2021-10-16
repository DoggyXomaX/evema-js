let Evema = {};

Evema.Core = {};

Evema.Modules = {};

Evema.LoadModules = function() {
    const core = Evema.Core;
    Evema.Modules = {
        'Tools'     : core.Tools,
        'Grid'      : core.Grid,
        'Power'     : core.Power,
        'Generator' : core.Generator
    };
};

Evema.Init = function() {
    let that = Evema;

    that.LoadModules();
    that.Eval( 'Tools:Init' );
    that.Eval( 'Grid:Init' );
    that.Eval( 'Power:Init' );
    that.Eval( 'Generator:Init' );
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
    if ( value ) return value;
    return options.Standard[ option_name ];
}

Evema.Actions = {};

Evema.Options = {
    Standard: {},
    Current: {}
}

window.onload = Evema.Init;