Evema.Core.Generator = {};

Evema.Core.Generator.Button = null;

Evema.Core.Generator.Init = function() {
    const that = Evema.Core.Generator;

    const btn_name = 'generator-tool';
    that.Button = Evema.Get( 'Tools:Buttons' )[ btn_name ];
    if ( that.Button === undefined ) {
        console.warn( `"${btn_name}" button was not found in document` );
    }
}

Evema.Core.Generator.Toggle = function() {
    const that = Evema.Core.Generator;

    const new_value = !Evema.Get( 'Generator:Enabled' );
    if ( new_value && !Evema.Get( 'Power:Enabled' ) ) return;
    
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

Evema.Core.Generator.Actions = {
    'Init'   : Evema.Core.Generator.Init,
    'Toggle' : Evema.Core.Generator.Toggle
};