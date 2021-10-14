Evema.Core.Power = {};

Evema.Core.Power.Button = null;

Evema.Core.Power.Init = function() {
    const that = Evema.Core.Power;

    that.Button = Evema.Get( 'Tools:Buttons' )[ 'power-tool' ];
    if ( that.Button === undefined ) {
        console.warn( `"${that.C_BUTTON_CLASS}" button was not found in document` );
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

Evema.Core.Power.Actions = [
    { name: 'Init', func: Evema.Core.Power.Init },
    { name: 'Toggle', func: Evema.Core.Power.Toggle }
];
