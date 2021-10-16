const Evema = {
    Core: {},
    Modules: {},
    QueuePosition: 0,
    Queue: []
};

Evema.ProceedQueue = function() {
    const that = Evema;

    if ( that.QueuePosition >= that.Queue.length ) {
        console.log( "Module loading complete" );
        that.Init();
        return;
    }

    const script = document.createElement( "SCRIPT" );
    
    script.onload = function() {
        const that = Evema;

        console.log( `${that.Queue[ that.QueuePosition ].name}: Success` );
        that.QueuePosition++;
        that.ProceedQueue();
    };

    script.onerror = function( e ) {
        const that = Evema;

        console.error( `${that.Queue[ that.QueuePosition ].name}: Failed` );
        that.QueuePosition++;
        that.ProceedQueue();
    };

    const q = that.Queue[ that.QueuePosition ].path;
    const hasJsExtension = q.lastIndexOf( '.js' ) === q.length - 3;
    script.src = `/modules/${( hasJsExtension ? q : `${q}.js` )}`;
    document.body.appendChild( script );
};

Evema.OnIndexLoad = function( data ) {
    const that = Evema;

    if ( data === undefined ) {
        console.error( 'Failed to load modules/index.json' );
        return;
    }

    const modules = data.modules;
    that.QueuePosition = 0;
    that.Queue = modules;

    console.log( `Load ${modules.length} modules` );
    that.ProceedQueue();
};

Evema.LoadModules = function() {
    const that = Evema;

    $.getJSON( '../modules/index.json', that.OnIndexLoad );
};

Evema.Init = function() {
    const that = Evema;

    console.log( 'Initializing modules' );

    const keys = Object.keys( that.Modules );
    const keysLength = keys.length;
    for ( let i = 0; i < keysLength; i++ ) {
        console.log( `Initializing "${keys[ i ]}"...` );
        that.Eval( `${keys[ i ]}:Init` );
    }

    console.log( 'Initializing complete' );
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

Evema.GetLocal = function( module, name ) {
    if ( !module || !module.Options ) return;
    const options = module.Options;
    const value = options.Current[ name ];
    return ( value !== undefined ? value : options.Standard[ name ] );
}

Evema.Actions = {

};

Evema.Options = {
    Standard: {},
    Current: {}
}

window.onload = Evema.LoadModules;
