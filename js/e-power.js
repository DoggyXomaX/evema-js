Evema.Core.Power = {};

Evema.Core.Power.Button = null;

Evema.Core.Power.Init = function() {
    const that = Evema.Core.Power;

    const btn_name = 'power-tool';
    that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
    if ( that.Button === undefined ) {
        console.warn( `"${btn_name}" button was not found in document` );
    }
};

Evema.Core.Power.Toggle = function() {
    const that = Evema.Core.Power;

    const new_value = !Evema.Get( 'Power:Enabled' );
    Evema.Set( 'Power:Enabled', new_value );

    if ( new_value ) {
        $( that.Button ).addClass( 'enabled' );
    } else {
        $( that.Button ).removeClass( 'enabled' );
        if ( Evema.Get( 'Generator:Enabled' ) ) {
            Evema.Eval( 'Generator:Toggle' );
        }
    }
}

Evema.Core.Power.Options = {
    Standard: {
        Enabled: false
    },
    Current: {}
}

Evema.Core.Power.Actions = {
    'Init'   : Evema.Core.Power.Init,
    'Toggle' : Evema.Core.Power.Toggle
};
