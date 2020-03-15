import $ from 'jquery'
import 'kity'
import 'kityminder-core'

// toolbar
$('#toolbar').hide()
$('.toolbar-container').hover(() => {
    $('#toolbar').fadeIn()
}, () => {
    $('#toolbar').fadeOut()
})

$.ajax({
    type: 'GET',
    url: parseURL().params.file,
    data: null,
    dataType: 'text',
    success: data => {
        // console.log(data)
        init(data)
        window.setTimeout(() => {
            console.log('time out')
            $('#loading-cover').fadeOut()
        }, 1000)
    },
    error: (xhr, state, err) => {
        $('#loading-icon').hide()
        $('#error-message').html(`Error message: ${err}`)
        $('#error-prompt').fadeIn()
    }
})

function parseURL() {
    var url = window.location.href
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

function init(data) {
    var km = window.km = new kityminder.Minder();
    km.renderTo('#minder-view')
    km.importData('json', data)
    // km.disable();
    console.log(kityminder.Minder.getThemeList())

    var zoom_level = 100
    //hand option
    $('.hand').click(() => {
        if (km.queryCommandState('Hand') == 0) {
            $('.hand').addClass('active')

        } else {
            $('.hand').removeClass('active')
        }
        km.execCommand('Hand');
    })

    $('.expand').click(() => {
        km.execCommand('Expand', false);
    })

    $('.zoom-in').click(() => {
        if (km.queryCommandState('ZoomIn') == 0) {
            km.execCommand('ZoomIn');
            zoom_level += 10
            $('.zoom-level').html(`${zoom_level}%`)
        }
    })

    $('.zoom-out').click(() => {
        if (km.queryCommandState('ZoomOut') == 0) {
            km.execCommand('ZoomOut');
            zoom_level -= 10
            $('.zoom-level').html(`${zoom_level}%`)
        }
    })

    $('#select-theme').change(() => {
        km.execCommand('Theme', $('#select-theme').val());
    })
}
