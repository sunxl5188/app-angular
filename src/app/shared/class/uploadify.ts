import {Utils} from './utils';

export class Uploadify {
  private utils = new Utils();
  private conf = {
    list: '', // 显示文件容器
    type: '', // 上传显示的列表 image,file显示图片或文件
    swf: './assets/webuploader/Uploader.swf',
    server: 'http://www.api.me/index/index/upload',
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
  create(opts) {
    Object.assign(this.conf, opts);
    const self = this;
    const upload = new WebUploader.create(self.conf);
    // 当文件被加入队列之前触发
    upload.on('fileQueued', (file) => {
      let $list;
      // 图片列表
      if (self.conf.type === 'image') {
        $list = $('<div id="' + file.id + '" class="image-item fid="">' +
          '<img><div class="image-panel">' +
          '<span class="data"></span>' +
          '<a href="javascript:void(0);" class="cancel">删除</a>' +
          '</div><div class="uploadIfy-progress">' +
          '<div class="uploadIfy-progress-bar"></div></div></div>'
        );
        const $img = $list.find('img');
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
      }
      // 文件列表
      if (self.conf.type === 'file') {
        $list = $('<div class="uploadIfy-queue-item" id="' + file.id + '" fid="">' +
          '<div class="cancel"><a href="javascript:void(0);">X</a></div>' +
          '<span class="fileName">' + file.name + ' (' + self.utils.bytesToSize(file.size) + ')</span>' +
          '<span class="data"></span><div class="uploadIfy-progress">' +
          '<div class="uploadIfy-progress-bar"></div>' +
          '</div></div>');
      }
      if (self.conf.list && self.conf.type) {
        // $list为容器jQuery实例
        $(self.conf.list).append($list);
        // 删除文件
        $list.on('click', '.cancel', () => {
          const fid = $list.attr('fid');
          upload.removeFile(file);
          $list.remove();
          console.log(fid);
        });
      }
    });
    // 当文件上传成功时触发
    upload.on('uploadSuccess', (file, response) => {
      const $this = $('#' + file.id);
      if (response.status === 1) {
        $this.find('.image-panel').show(); // 显示图片时
        $this.find('.data').text('成功');
        $this.attr('fid', response.data.id);
      } else {
        $this.find('.image-panel').show(); // 显示图片时
        $this.find('.data').text('失败');
        $this.attr('fid', '');
      }
    });
    // 不管成功或者失败，文件上传完成时触发
    upload.on('uploadComplete', () => {
      console.log('队列已执行完成');
    });
    // 上传过程中触发，携带上传进度
    upload.on('uploadProgress', (file, percentage) => {
      $('#' + file.id).find('.uploadIfy-progress-bar').width(percentage * 100 + '%');
    });
    // 当文件上传出错时触发
    upload.on('uploadError', (file, response) => {
      console.log(file);
      $('#' + file.id).find('.data').text('失败');
    });
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
}
