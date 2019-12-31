export class Utils {
  public sizes;
  constructor() {
    this.sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  }
  bytesToSize(bytes) {
    if (bytes === 0) { return '0 B'; }
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const sz = (bytes / Math.pow(k, i)).toFixed(2);
    return sz + ' ' + this.sizes[i];
  }
}
