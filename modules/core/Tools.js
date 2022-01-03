Evema.Modules[ "Tools" ] = ( function() {

const Tools = {
    List: [
        { class: 'file-tool',      func: "Evema.Eval('Tools:File')"      },
        { class: 'element-tool',   func: "Evema.Eval('Tools:Element')"   },
        { class: 'power-tool',     func: "Evema.Eval('Tools:Power')"     },
        { class: 'generator-tool', func: "Evema.Eval('Tools:Generator')" },
        { class: 'about-tool',     func: "Evema.Eval('Tools:About')"     },
        { class: 'options-tool',   func: "Evema.Eval('Tools:Options')"   },
        { class: 'exit-tool',      func: "Evema.Eval('Tools:Exit')"      }
    ]
};

Tools.Init = function() {
    const that = Tools;

    const panel = $( '.tools' )[ 0 ];
    Evema.SetLocal( that, 'Panel', panel );

    const listLength = that.List.length;
    const buttons = {
        'tools__show': $( '.tools__show' ).attr( 'onclick', 
            "Evema.Eval('Tools:ShowPanel')" 
        )[ 0 ],
        'tools__hide': $( '.tools__hide' ).attr( 'onclick', 
            "Evema.Eval('Tools:HidePanel')" 
        )[ 0 ]
    };

    for ( let i = 0; i < listLength; i++ ) {
        panel.appendChild( document.createElement( 'HR' ) );

        const button = document.createElement( 'BUTTON' );
        $( button )
            .addClass( 'tools__button' )
            .addClass( that.List[ i ].class )
            .attr( 'onclick', that.List[ i ].func );

        buttons[ that.List[ i ].class ] = button;
        panel.appendChild( button );
    }

    Evema.SetLocal( that, 'Buttons', buttons );
};

Tools.HidePanel = function() {
    const that = Tools;

    const panel = Evema.GetLocal( that, 'Panel' );
    const showButton = Evema.GetLocal( that, 'Buttons' )[ 'tools__show' ];
    $( panel ).addClass( 'hidden' );
    $( showButton ).addClass( 'active' );
};

Tools.ShowPanel = function() {
    const that = Tools;

    const panel = Evema.GetLocal( that, 'Panel' );
    const showButton = Evema.GetLocal( that, 'Buttons' )[ 'tools__show' ];
    $( panel ).removeClass( 'hidden' );
    $( showButton ).removeClass( 'active' );
};

Tools.File = function() {
    console.log( "Tools.File not implemented" );
};

Tools.Element = function() {
    console.log( "Tools.Element not implemented" );
};

Tools.Power = function() {
    Evema.Eval( 'Power:Toggle' );
};

Tools.Generator = function() {
    Evema.Eval( 'Generator:Toggle' );
};

Tools.OptionsFunc = function() {
    console.log( "Tools.OptionsFunc not implemented" );
};

Tools.About = function() {
    console.log( "Tools.About not implemented" );
};

Tools.Exit = function() {
    window.close();
};

Tools.Options = {
    Standard: {
        Buttons: {},
        Panel: {}
    },
    Current: {
        
    }
};

Tools.Actions = {
    'Init'      : Tools.Init,
    'HidePanel' : Tools.HidePanel,
    'ShowPanel' : Tools.ShowPanel,
    'File'      : Tools.File,
    'Element'   : Tools.Element,
    'Power'     : Tools.Power,
    'Generator' : Tools.Generator,
    'Options'   : Tools.OptionsFunc,
    'About'     : Tools.About,
    'Exit'      : Tools.Exit
};

return Tools; } )();
