/**
 * Created by Dull on 2017/5/11 0011.
 */
/**
 * Dots
 */
var Dots = function () {
  // 画布相关
  this.canvas;
  this.ctx;

  // 绘制点相关
  this.x;
  this.y;
  this.r;

  // 移动相关
  this.sx;
  this.sy;
};

Dots.prototype = {
  // 初始化点的方法 x/y为可选参数 为生成点的位置 不传则随机生成
  init: function (canvas, x, y) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.x = x * 2 || Math.random() * this.canvas.width;
    this.y = y * 2 || Math.random() * this.canvas.height;
    this.r = Math.random() * 50; // 随机生成 <50 的半径值

    // 随机确定点的移动速度与方向 速度值在 [-1.5, 1.5) 之间 提高数值可加快速度
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * 3 - 1.5;

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(255,255,255,.3)";
    this.ctx.fill();
    this.ctx.closePath();
  },

  // 更新点位置
  update: function () {
    this.x = this.x + this.sx;
    this.y = this.y + this.sy;

    // 点超出canvas范围时另其"重生"
    if (this.x < 0 || this.x > this.canvas.width) {
      this.init(this.canvas);
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.init(this.canvas);
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "rgba(255,255,255,.3)";
    this.ctx.fill();
    this.ctx.closePath();
  }

};

/**
 * main
 */
export default function doCanvas() {

  let dotsArr = [],
    dotsNum = 0,
    maxDotsNum = 0,
    overNum = 0, // 超出最大数量的点的数量
    dotsDistance = 250, // 点之间产生连线的最大距离

    //bg = document.getElementById('bg'),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),

    width = parseInt(document.documentElement.clientWidth),
    height = parseInt(document.documentElement.clientHeight),
    area = width * height, // canvas区域面积
    cssText = 'width: ' + width + 'px; height: ' + height + 'px;';
  // 设置背景和canvas的宽高
  //bg.setAttribute('style', cssText);
  canvas.setAttribute('style', cssText);
  canvas.width = (width * 2).toString();
  canvas.height = (height * 2).toString();

  // 根据canvas面积动态确定初始化点的数量和最大数量
  dotsNum = parseInt(area / 25000);
  maxDotsNum = dotsNum * 2;

  //生成点
  for (let i = 0; i < dotsNum; i++) {
    let dot = new Dots();
    dotsArr.push(dot);
    dot.init(canvas);
  }

  //动画与连线
  let requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
  requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

  function animateUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

    // 更新点的位置 数量超出最大值时舍弃旧的点
    if (dotsNum > maxDotsNum) {
      overNum = dotsNum - maxDotsNum;
    }

    for (let i = overNum; i < dotsNum; i++) {
      dotsArr[i].update();
    }

    // 绘制连线
    for (let i = overNum; i < dotsNum; i++) {
      for (let j = i + 1; j < dotsNum; j++) {
        let tx = dotsArr[i].x - dotsArr[j].x,
          ty = dotsArr[i].y - dotsArr[j].y,
          s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
        if (s < dotsDistance) {
          ctx.beginPath();
          ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
          ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
          ctx.strokeStyle = 'rgba(255,255,255,' + (dotsDistance - s) / dotsDistance + ')';
          ctx.strokeWidth = 1;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    requestAnimFrame(animateUpdate);
  }
}
