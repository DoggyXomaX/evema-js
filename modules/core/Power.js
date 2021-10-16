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
};

Power.Toggle = function() {
    const that = Power;

    const new_value = !Evema.GetLocal( that, 'Enabled' );
    Evema.SetLocal( that, 'Enabled', new_value );

    if ( new_value ) {
        $( that.Button ).addClass( 'enabled' );
    } else {
        $( that.Button ).removeClass( 'enabled' );
        if ( Evema.Get( 'Generator:Enabled' ) ) {
            Evema.Eval( 'Generator:Toggle' );
        }
    }
}

Power.Options = {
    Standard: {
        Enabled: false
    },
    Current: {}
};

Power.Actions = {
    'Init'   : Power.Init,
    'Toggle' : Power.Toggle
};

return Power; } )();
