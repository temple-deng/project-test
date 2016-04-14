window.onload = function(){
    var form = document.getElementById('addForm');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        var formData = new FormData();
        formData.append('userName', document.getElementById('name').value);
        var filesArr = document.getElementById('file').files;
        [].forEach.call(filesArr,function(value, index, arr){
            formData.append('updatefile['+ index + "]", value);
        });
        var xhr = new XMLHttpRequest();
        xhr.open('POST','upload/upload.html');

        xhr.onload = function(){
            if(xhr.status == 200){
                alert('上传成功'+ xhr.responseText);
            }
            else {
                alert('上传失败' + xhr.responseText);
            }
        };

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                var progress = document.getElementById('uploadprogress');
                progress.value = progress.innerHTML = complete;
            }
        };


        xhr.send(formData);
    })
};