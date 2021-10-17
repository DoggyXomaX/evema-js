Evema.Modules[ "Power" ] = ( function() {
const Power = {};

Power.Button = null;

Power.Init = function() {
    const that = Power;

    const btn_name = 'power-tool';
    that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
    if ( that.Button === undefined ) {
        console.warn( `"${btn_name}" button was not found in document` );
    }
}

Power.Toggle = function() {
    const that = Power;

    const enabled = Evema.GetLocal( that, 'Enabled' );
    Evema.SetLocal( that, 'Enabled', !enabled );
}

Power.Options = {
    Standard: {
        enabled: false
    },
    Current: {},
    Setters: {
        Enabled: function( source, value ) {
            const options = source.Options;
            options.Current.enabled = value;

            if ( value ) {
                $( source.Button ).addClass( 'enabled' );
            } else {
                $( source.Button ).removeClass( 'enabled' );
                Evema.Set( 'Generator:Enabled', false );
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

Power.Actions = {
    'Init'   : Power.Init,
    'Toggle' : Power.Toggle
};

return Power; } )();
