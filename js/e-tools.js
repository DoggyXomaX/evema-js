Evema.Tools = {};

Evema.Tools.Buttons = [];

Evema.Tools.Init = function() {

};

const T_File = function() {
    console.log( "T_File not implemented" );
};

const T_Element = function() {
    console.log( "T_Element not implemented" );
};

const T_Power = function() {
    console.log( "T_Power not implemented" );
};

const T_Generator = function() {
    console.log( "T_Generator not implemented" );
};

const T_About = function() {
    console.log( "T_About not implemented" );
};

const T_Exit = function() {
    window.close();
};

Evema.Tools.Options = {
    Standard: {

    },
    Current: {
        
    }
};

Evema.Tools.Actions = [
    { name: 'Init', func: Evema.Tools.Init },
    { name: 'File', func: T_File },
    { name: 'Element', func: T_Element },
    { name: 'Power', func: T_Power },
    { name: 'Generator', func: T_Generator },
    { name: 'About', func: T_About },
    { name: 'Exit', func: T_Exit }
];