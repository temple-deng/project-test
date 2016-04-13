window.onload = function(){
    var form = document.getElementById('addForm');
    form.addEventListener('submit', function(event){
        event.preventDefault();
        //var formData = new FormData();
        //formData.append('userName', document.getElementById('name').value);
        //formData.append('files', document.getElementById('file').files[0]);
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
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var searchStr = "name=" + document.getElementById('name').value + "&age=" +document.getElementById('age').value;
        xhr.send(searchStr);
    })
};