Evema.Core.Generator = {};

Evema.Core.Generator.C_BUTTON_CLASS = ".tools__button.generator-tool";

Evema.Core.Generator.Button = null;

Evema.Core.Generator.Init = function() {
    const that = Evema.Core.Generator;

    that.Button = Evema.Get( 'Tools:Buttons' )[ 'generator-tool' ];
    if ( that.Button === undefined ) {
        console.warn( `"${that.C_BUTTON_CLASS}" button was not found in document` );
    }
}

Evema.Core.Generator.Toggle = function() {
    const that = Evema.Core.Generator;

    const new_value = !Evema.Get( 'Generator:Enabled' );
    Evema.Set( 'Generator:Enabled', new_value );

    if ( new_value ) {
        $( that.Button ).addClass( 'enabled' );
    } else {
        $( that.Button ).removeClass( 'enabled' );
    }
}

Evema.Core.Generator.Options = {
    Standard: {
        Enabled: false
    },
    Current: {}
};

Evema.Core.Generator.Actions = [
    { name: 'Init', func: Evema.Core.Generator.Init },
    { name: 'Toggle', func: Evema.Core.Generator.Toggle }
];