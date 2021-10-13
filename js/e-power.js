Evema.Core.Power = {};

Evema.Core.Power.C_BUTTON_CLASS = ".tools__button.power-tool";

Evema.Core.Power.Button = null;

Evema.Core.Power.Init = function() {
    const that = Evema.Core.Power;

    that.Button = $( that.C_BUTTON_CLASS )[ 0 ];
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
