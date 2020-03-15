import $ from 'jquery'
import 'kity'
import 'kityminder-core'

export default ()=>{
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