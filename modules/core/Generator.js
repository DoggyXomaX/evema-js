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

    const value = Evema.GetLocal( that, 'Enabled' );
    Evema.SetLocal( that, 'Enabled', !value );
}

Generator.Options = {
    Standard: {
        enabled: false
    },
    Current: {},
    Setters: {
        Enabled: function( source, value ) {
            if ( value && !Evema.Get( 'Power:Enabled' ) ) return;
            
            source.Options.Current.enabled = value;

            if ( value ) {
                $( source.Button ).addClass( 'enabled' );
            } else {
                $( source.Button ).removeClass( 'enabled' );
            }
        }
    },
    Getters: {
        Enabled: function( source ) {
            const value = source.Options.Current.enabled;
            return ( value !== undefined ? value : source.Options.Standard.enabled );
        }
    }
};

Generator.Actions = {
    'Init'   : Generator.Init,
    'Toggle' : Generator.Toggle
};

return Generator; } )();
