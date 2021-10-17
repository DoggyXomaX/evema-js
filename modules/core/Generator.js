Evema.Modules[ "Generator" ] = ( function() {
const Generator = {};

Generator.Button = null;

Generator.Init = function() {
    const that = Generator;

    const btn_name = 'generator-tool';
    that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
    if ( that.Button === undefined ) {
        console.warn( `"${btn_name}" button was not found in document` );
    }
}

Generator.Toggle = function() {
    const that = Generator;

    const new_value = !Evema.GetLocal( that, 'Enabled' );
    if ( new_value && !Evema.Get( 'Power:Enabled' ) ) return;
    
    Evema.SetLocal( that, 'Enabled', new_value );

    if ( new_value ) {
        $( that.Button ).addClass( 'enabled' );
    } else {
        $( that.Button ).removeClass( 'enabled' );
    }
}

Generator.Options = {
    Standard: {
        enabled: false
    },
    Current: {},
    Setters: {
        Enabled: {

        }
    },
    Getters: {
        Enabled: function( options ) {
            console.log( "Enabled getters just for test" );
            const value = options.Current.enabled;
            return ( value !== undefined ? value : options.Standard.enabled );
        }
    }
};

Generator.Actions = {
    'Init'   : Generator.Init,
    'Toggle' : Generator.Toggle
};

return Generator; } )();
