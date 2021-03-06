var utils = {

  extend: function (parent, child) {
    var bufferProto = spread({}, child.prototype);

    child.parent = parent.prototype;
    child.prototype = Object.create(parent.prototype);
    child.prototype = spread(child.prototype, bufferProto);
    return child;
  },

  addContainer: function (name) {
    return createdModules.AnimationManager.view.addContainer(name);
  },

  addToRenderLoop: function (callback) {
    return createdModules.AnimationManager.view.addToRenderLoop(callback);
  },

  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getSymConfig: function(reelIdx, symIdx) {
    var symConfig = {},
        symWidth = config.symbol.width,
        symHeight = config.symbol.height,
        symOffset = config.symbol.offset;

    symConfig.left = reelIdx * (symWidth + symOffset) + config.reelsContainerPosition.x;
    symConfig.top = config.reels[reelIdx].verticalOffset + (symHeight + symOffset) * symIdx + config.reelsContainerPosition.y;
    symConfig.centerX = symConfig.left + (symWidth + symOffset) / 2;
    symConfig.centerY = symConfig.top + (symHeight + symOffset) / 2;

    return symConfig;
  },

  getReelAreaParams: function () {
    var x = config.reelsContainerPosition.x,
      y = config.reelsContainerPosition.y,
      reelWidth = config.symbol.width + config.symbol.offset,
      symsHeight = config.symbol.height + config.symbol.offset,
      reelsAmt = config.reels.length,
      visibleSyms = [],
      reelAreaWidth,
      reelAreaHeight,
      maxSymsAmt,
      i = 0;

    for(; i < reelsAmt; i++){
      visibleSyms.push(config.reels[i].visibleSyms)
    }

    maxSymsAmt = Math.max.apply(null, visibleSyms);
    reelAreaWidth = reelWidth * reelsAmt;
    reelAreaHeight = symsHeight * maxSymsAmt;

    return {x: x, y: y, height: reelAreaHeight, width: reelAreaWidth}
  },

  getReelAreaCenter: function () {
    // var initialX = config.reelsContainerPosition.x,
    //     initialY = config.reelsContainerPosition.y,
    //     reelWidth = config.symbol.width + config.symbol.offset,
    //     symsHeight = config.symbol.height + config.symbol.offset,
    //     reelsAmt = config.reels.length,
    //     visibleSyms = [],
    //     reelAreaWidth,
    //     reelAreaHeight,
    //     maxSymsAmt,
    //     i = 0;
    //
    // for(; i < reelsAmt; i++){
    //   visibleSyms.push(config.reels[i].visibleSyms)
    // }
    //
    // maxSymsAmt = Math.max.apply(null, visibleSyms);
    // reelAreaWidth = reelWidth * reelsAmt;
    // reelAreaHeight = symsHeight * maxSymsAmt;
    //
    // return {x: initialX + reelAreaWidth / 2, y: initialY + reelAreaHeight / 2}

    var initialX = utils.getReelAreaParams().x,
        initialY = utils.getReelAreaParams().y,
        reelAreaWidth = utils.getReelAreaParams().width,
        reelAreaHeight = utils.getReelAreaParams().height,
        x = initialX + reelAreaWidth / 2,
        y = initialY + reelAreaHeight / 2;

    return {x: x, y: y}
  },

  initInfoButton: function (container, x, y, image) {
    var params = {
        x: x,
        y: y,
        img: image,
        imgDis: image
      },
      button = new Button(params);

    container.addChild(button);
    return button
  },

};

function spread(targetObj, sourceObj) {
  var prop;

  for (prop in sourceObj) {
    if (sourceObj.hasOwnProperty(prop)) {
      targetObj[prop] = sourceObj[prop];
    }
  }
  return targetObj;
}

