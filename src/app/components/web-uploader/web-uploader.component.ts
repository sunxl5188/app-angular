import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-uploader',
  templateUrl: './web-uploader.component.html',
  styleUrls: ['./web-uploader.component.less']
})
export class WebUploaderComponent implements OnInit {

  opts = {
    swf: './assets/webuploader/Uploader.swf',
    server: 'http://www.js.me/demo/data.php',
    dnd: undefined, // 指定Drag And Drop拖拽的容器
    disableGlobalDnd: false, // 是否禁掉整个页面的拖拽功能
    paste: undefined, // 粘贴来添加截屏的图片 指定监听paste事件的容器 建议设置为document.body
    auto: true,
    pick: {
      id: '#picker',
      // label: '', // 请采用 innerHTML 代替
      innerHTML: '上传图片', // 指定按钮文字
      multiple: false // 是否开起同时选择多个文件能力
    },
    compress: false, // 图片在上传前不进行压缩
    headers: {},
    accept: {
      title: 'Images', // 文字描述
      extensions: 'gif,jpg,jpeg,bmp,png', // 允许的文件后缀，不带点，多个用逗号分割。
      mimeTypes: 'image/!*' // 多个用逗号分割。
    },
    formData: {},
    fileVal: 'file',
    method: 'POST',
    fileNumLimit: undefined, // 验证文件总数量
    fileSizeLimit: undefined, // 验证文件总大小是否超出限制
    fileSingleSizeLimit: 1024 * 1024 * 2, // 验证单个文件大小是否超出限制
    uploadFinished: undefined, // 所有文件上传结束后触发
    uploadSuccess: undefined, // 上传成功后触发
    uploadComplete: undefined // 不管成功或者失败，文件上传完成时触发
  };

  constructor() { }

  ngOnInit() {
    const upload = WebUploader.create(this.opts);
    // 当文件被加入队列之前触发
    upload.on('fileQueued', (file) => {
      // 图片列表
      const $li = $('<div id="' + file.id + '" class="image-item fid="">' +
        '<img><div class="image-panel">' +
        '<span class="data"></span>' +
        '<a href="javascript:void(0);" class="cancel">删除</a>' +
        '</div><div class="uploadIfy-progress">' +
        '<div class="uploadIfy-progress-bar"></div></div></div>'
        );
      const $img = $li.find('img');
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
      const ratio = window.devicePixelRatio || 1;
      const thumbnailWidth = 100 * ratio;
      const thumbnailHeight = 100 * ratio;

      upload.makeThumb(file, (error, src) => {
          if (error) {
            $img.replaceWith('<span>不能预览</span>');
            return;
          }
          $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);

      // 文件列表
      // $li = $('<div class="uploadIfy-queue-item" id="' + file.id + '" fid=""><div class="cancel"><a href="javascript:void(0);">X</a></div><span class="fileName">' + file.name + ' (' + bytesToSize(file.size) + ')</span><span class="data"></span><div class="uploadIfy-progress"><div class="uploadIfy-progress-bar"></div></div></div>');


      // $list为容器jQuery实例
      // $(opts.fileList.id).append($li);

      // 删除文件
      $li.on('click', '.cancel', () => {
        const fid = $li.attr('fid');
        upload.removeFile(file);
        $li.remove();
        console.log(fid);
      });
    });
    // 当文件上传成功时触发
    upload.on('uploadSuccess', (file, response) => {});
    // 不管成功或者失败，文件上传完成时触发
    upload.on('uploadComplete', () => {
      console.log('队列已执行完成');
    });
    // 上传过程中触发，携带上传进度
    upload.on('uploadProgress', (file, percentage) => {});
    // 当文件上传出错时触发
    upload.on('uploadError', (file, response) => {});
    // 上传错误
    upload.on('error', (error) => {
      if (error === 'F_EXCEED_SIZE') {
        layer.alert('文件超出指定大小', {icon: 2});
      }
      if (error === 'Q_TYPE_DENIED') {
        layer.alert('文件类型不正确！', {icon: 2});
      }
      if (error === 'Q_EXCEED_NUM_LIMIT') {
        layer.alert('文件超出个数！', {icon: 2});
      }
    });
  }

  bytesToSize(bytes) {
    if (bytes === 0) { return '0 B'; }
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sz = (bytes / Math.pow(k, i)).toFixed(2);
    return sz + ' ' + sizes[i];
  }
}
