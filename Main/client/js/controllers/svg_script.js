var app = angular.module('app', ['test']);

app.directive('svgIcon', function () {
  function link(scope, element, attrs) {
    function path(icon) {
      return icons[icon];
    }

    function renderSVG() {
      element.html(path(attrs.p));
      element.children().css({
        margin: '0 1em 1em 0',
        fill: 'rgba(0,0,0,.7)'
      });
    }

    renderSVG();

    element[0].addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', this.innerHTML);
      elementDragged = this;
				});


  }

  return {
    link: link,
    restrict: 'E'
  };
});


var icons = {
  rectangle: "<svg width='61' height='61'><rect width='60' height='60' fill='rgba(0,0,0,.9)'></svg>",
  circle: "<svg height='60' width='60'><circle cx='30' cy='30' r='30' fill='rgba(0,0,0,.9)' /></svg>",
  arrow: "<svg width='60' height='60'><path d='m0,30 h15 v30 h30 V30 h15 L30,0' style='fill:rgba(0,0,0,.9);'/></svg>",
  bookmark: "<svg viewBox='0 0 32 32'> <path d='M6 2 L26 2 L26 30 L16 24 L6 30 Z'/></svg>",
  calendar: "<svg viewBox='0 0 32 32'> <path d='M2 4 L6 4 L6 2 A2 2 0 0 1 10 2 L10 4 L22 4 L22 2 A2 2 0 0 1 26 2 L26 4 L30 4 L30 10 L2 10 M2 12 L30 12 L30 30 L2 30'/></svg>",
  camera: "<svg viewBox='0 0 32 32'> <path d='M0 6 L8 6 L10 2 L22 2 L24 6 L32 6 L32 28 L0 28 z M9 17 A7 7 0 0 0 23 17 A7 7 0 0 0 9 17'/></svg>",
  chat: "<svg viewBox='0 0 32 32'> <path d='M32 16 A16 12 0 0 0 0 16 A16 12 0 0 0 16 28 L18 28 C20 30 24 32 28 32 C27 31 26 28 26 25.375 L26 25.375 A16 12 0 0 0 32 16 '/></svg>",
  check: "<svg viewBox='0 0 32 32'> <path d='M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z'/></svg>",
  heart: "<svg viewBox='0 0 32 32'> <path d='M0 10 C0 6, 3 2, 8 2 C12 2, 15 5, 16 6 C17 5, 20 2, 24 2 C30 2, 32 6, 32 10 C32 18, 18 29, 16 30 C14 29, 0 18, 0 10'/></svg>",
  home: "<svg viewBox='0 0 32 32'> <path d='M16 0 L32 16 L28 16 L28 30 L20 30 L20 20 L12 20 L12 30 L4 30 L4 16 L0 16 Z'/></svg>",
  metsa: "<svg     width='500'   height='500'   viewBox='0 0 1044.09448819 1052.3622047'   >    <path       style='fill:#333333;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.48007575;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'       d='m 8.2432259,66.238533 c 1.08175,-8.54566 4.8692701,-14.55563 12.0834101,-17.35436 l 38.57399,-13.13302 46.009934,-16.41629 c 12.21999,-3.08373 21.43116,-2.95504 30.67328,-2.81421 13.91826,3.66631 22.31373,8.90025 29.27906,14.54013 8.86387,6.61266 15.37526,15.74778 18.35743,25.79701 4.7541,17.13852 2.2126,27.44027 1.6266,31.89451 -1.9242,8.599014 -5.77887,17.198017 -12.08334,25.797027 -7.06326,5.67832 -13.12557,11.86172 -27.77687,13.71099 -9.63337,-0.55991 -19.27252,-0.87935 -30.64028,-5.38213 L 72.843026,107.04475 36.592776,91.566523 14.970376,80.475463 c -4.23827,-4.69037 -6.8635001,-9.54656 -6.7271501,-14.23693 z' /></svg>"
};