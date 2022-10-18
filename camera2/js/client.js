//获取支持的音视频设备
if (!navigator.mediaDevices ||
    !navigator.mediaDevices.enumerateDevices()) {
    console.log('不支持')
} else {
    navigator.mediaDevices.enumerateDevices()
        .then((deviceInfos) => {
            deviceInfos.forEach((info) => {
                console.log(info.kind + "：label=" +
                    info.label + "：id=" + info.deviceId + "：group = " + info.groupId);
            })
        })
        .catch((err) => {
            console.log(err.name + "：" + err.message)
        });
}

if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator
    .mozGetUserMedia) {
    var constraints = {
        audio: true,
        video: true
    };
    //调用用户媒体设备, 访问摄像头
    getUserMedia(constraints, success, error);
} else {
    alert('不支持访问用户媒体');
}
//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

//获取video标签
var videoPlayer = document.querySelector('video#player')

function success(stream) {
    console.log(stream);
    //将流赋给video标签
    videoPlayer.srcObject = stream;
}

function error(error) {
    console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}