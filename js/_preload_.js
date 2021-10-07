let _preload_images_ = [
    '/img/ui/file-tool/hover.svg',
    '/img/ui/file-tool/active.svg',
    '/img/ui/element-tool/hover.svg',
    '/img/ui/element-tool/active.svg',
    '/img/ui/power-tool/hover.svg',
    '/img/ui/power-tool/active.svg',
    '/img/ui/generator-tool/hover.svg',
    '/img/ui/generator-tool/active.svg',
    '/img/ui/about-tool/hover.svg',
    '/img/ui/about-tool/active.svg',
    '/img/ui/exit-tool/hover.svg',
    '/img/ui/exit-tool/active.svg'
];

let _preload_count_ = 0;

let _preload_ = function() {
    let _div = document.getElementById( '_preload_' );
    for ( let i = 0, k = _preload_images_.length; i < k; i++ ) {
        let _img = document.createElement( "img" );
        _img.src = _preload_images_[ i ];
        _img.onload = function() { 
            _preload_count_++; 
            if ( _preload_count_ >= _preload_images_.length ) {
                _preload_images_ = undefined;
                _preload_count_ = undefined;
                _preload_ = undefined;
                let _d = document.getElementById( '_preload_script_' );
                _d.parentElement.removeChild( _d );
            }
        }
        _div.appendChild( _img );
    }
}

_preload_();