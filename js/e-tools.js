Evema.Core.Tools = {};

Evema.Core.Tools.Buttons = [];

Evema.Core.Tools.Init = function() {

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

    },
    Current: {
        
    }
};

Evema.Core.Tools.Actions = [
    { name: 'Init', func: Evema.Core.Tools.Init },
    { name: 'File', func: T_File },
    { name: 'Element', func: T_Element },
    { name: 'Power', func: T_Power },
    { name: 'Generator', func: T_Generator },
    { name: 'Options', func: T_Options },
    { name: 'About', func: T_About },
    { name: 'Exit', func: T_Exit }
];