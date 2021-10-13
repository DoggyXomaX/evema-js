Evema.Core.Tools = {};

Evema.Core.Tools.Init = function() {
    const that = Evema.Core.Tools;

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

const T_HidePanel = function() {
    const that = Evema.Core.Tools;

    const panel = Evema.Get( 'Tools:Panel' );
    const showButton = Evema.Get( 'Tools:Buttons' )[ 'tools__show' ];
    $( panel ).addClass( 'hidden' );
    $( showButton ).addClass( 'active' );
};

const T_ShowPanel = function() {
    const that = Evema.Core.Tools;

    const panel = Evema.Get( 'Tools:Panel' );
    const showButton = Evema.Get( 'Tools:Buttons' )[ 'tools__show' ];
    $( panel ).removeClass( 'hidden' );
    $( showButton ).removeClass( 'active' );
};

const T_File = function() {
    console.log( "T_File not implemented" );
};

const T_Element = function() {
    console.log( "T_Element not implemented" );
};

const T_Power = function() {
    Evema.Eval( 'Power:Toggle' );
};

const T_Generator = function() {
    Evema.Eval( 'Generator:Toggle' );
};

const T_Options = function() {
    console.log( "T_Options not implemented" );
};

const T_About = function() {
    console.log( "T_About not implemented" );
};

const T_Exit = function() {
    window.close();
};

Evema.Core.Tools.Options = {
    Standard: {
        Buttons: {},
        Panel: {}
    },
    Current: {
        
    }
};

Evema.Core.Tools.Actions = [
    { name: 'Init', func: Evema.Core.Tools.Init },
    { name: 'HidePanel', func: T_HidePanel },
    { name: 'ShowPanel', func: T_ShowPanel },
    { name: 'File', func: T_File },
    { name: 'Element', func: T_Element },
    { name: 'Power', func: T_Power },
    { name: 'Generator', func: T_Generator },
    { name: 'Options', func: T_Options },
    { name: 'About', func: T_About },
    { name: 'Exit', func: T_Exit }
];