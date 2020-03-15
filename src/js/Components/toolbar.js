import $ from 'jquery'

export default () => {
    $('#toolbar').hide()
    $('.toolbar-container').hover(() => {
        $('#toolbar').fadeIn()
    }, () => {
        $('#toolbar').fadeOut()
    })
}