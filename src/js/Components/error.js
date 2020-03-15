import $ from 'jquery'

export default err => {
    console.log(err)
    $('#loading-icon').hide();
    $('#error-message').html(`Error message: ${err}`);
    $('#error-prompt').css({
        display: 'block'
    })
}