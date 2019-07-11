function easeOutBounce(x) {
    var base = -Math.cos(x * (0.5 * Math.PI)) + 1;
    var rate = Math.pow(base, 1.5);
    var rateR = Math.pow(1 - x, 2);
    var progress = -Math.abs(Math.cos(rate * (2.5 * Math.PI))) + 1;
    return (1 - rateR) + (progress * rateR);
}

var timing,
    timingProps = {
        type: 'sync',
        duration: 150,
        start: 'autostart',
        pathTimingFunction: Vivus.LINEAR,
        animTimingFunction: Vivus.LINEAR
    };
let obt1 = new Vivus('xbox_logo', {
    type: 'delayed',
    duration: 550
});