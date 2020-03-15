import $ from 'jquery'
import parseURL from './Utils/parseURL.js'
import errorComponent from './Components/error.js'
import toolbarComponent from './Components/toolbar.js'
import mainComponent from './Components/main.js'

var file_url = parseURL(window.location.href).params.file
if (file_url == undefined) {
    errorComponent('文件地址不能为空')
} else {
    $.ajax({
        type: 'GET',
        url: file_url,
        data: null,
        dataType: 'text',
        success: data => {
            toolbarComponent();
            mainComponent(data);
            window.setTimeout(() => {
                $('#loading-cover').fadeOut()
            }, 1000);
        },
        error: (xhr, state, err) => {
            errorComponent(err)
        }
    })
}
