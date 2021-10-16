Evema.Modules[ "Tools" ] = ( function() {

const Tools = {};

Tools.Init = function() {
    const that = Tools;

    Evema.Set( 'Tools:Buttons', {
        'tools__show'    : $( '.tools__show'    )[ 0 ],
        'tools__hide'    : $( '.tools__hide'    )[ 0 ],
        'file-tool'      : $( '.file-tool'      )[ 0 ],
        'element-tool'   : $( '.element-tool'   )[ 0 ],
        'power-tool'     : $( '.power-tool'     )[ 0 ],
        'generator-tool' : $( '.generator-tool' )[ 0 ],
        'about-tool'     : $( '.about-tool'     )[ 0 ],
        'options-tool'   : $( '.options-tool'   )[ 0 ],
        'exit-tool'      : $( '.exit-tool'      )[ 0 ]
    } );

    Evema.Set( 'Tools:Panel', $( '.tools' )[ 0 ] );
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