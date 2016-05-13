var app = angular.module('app', ['test']);

app.directive('svgIcon', function() {
    function link(scope, element, attrs) {
      function path(icon) {
        return icons[icon];
      }

      function renderSVG() {
          element.html( path(attrs.p) );
				element.children().css({
					  margin: '0 1em 1em 0',
					  fill: 'rgba(0,0,0,.7)'
					
                });
				
      }
      
      renderSVG();
	  
	  
	  				
				
			element[0].addEventListener('dragstart', function(e) {
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
    bookmark: "<svg viewBox='0 0 32 32'> <path d='M6 2 L26 2 L26 30 L16 24 L6 30 Z'/></svg>",
    calendar: "<svg viewBox='0 0 32 32'> <path d='M2 4 L6 4 L6 2 A2 2 0 0 1 10 2 L10 4 L22 4 L22 2 A2 2 0 0 1 26 2 L26 4 L30 4 L30 10 L2 10 M2 12 L30 12 L30 30 L2 30'/></svg>",
    camera: "<svg viewBox='0 0 32 32'> <path d='M0 6 L8 6 L10 2 L22 2 L24 6 L32 6 L32 28 L0 28 z M9 17 A7 7 0 0 0 23 17 A7 7 0 0 0 9 17'/></svg>",
    chat: "<svg viewBox='0 0 32 32'> <path d='M32 16 A16 12 0 0 0 0 16 A16 12 0 0 0 16 28 L18 28 C20 30 24 32 28 32 C27 31 26 28 26 25.375 L26 25.375 A16 12 0 0 0 32 16 '/></svg>",
    check: "<svg viewBox='0 0 32 32'> <path d='M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z'/></svg>",   
    heart: "<svg viewBox='0 0 32 32'> <path d='M0 10 C0 6, 3 2, 8 2 C12 2, 15 5, 16 6 C17 5, 20 2, 24 2 C30 2, 32 6, 32 10 C32 18, 18 29, 16 30 C14 29, 0 18, 0 10'/></svg>",
    home: "<svg viewBox='0 0 32 32'> <path d='M16 0 L32 16 L28 16 L28 30 L20 30 L20 20 L12 20 L12 30 L4 30 L4 16 L0 16 Z'/></svg>",
    skull: "<svg viewBox='0 0 32 32'> <path d='M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12 '/></svg>",
    speakervolume: "<svg viewBox='0 0 32 32'> <path d='M2 12 L8 12 L16 6 L16 26 L8 20 L2 20 z M32 16 A16 16 0 0 1 27.25 27.375 L25.25 25.25 A13 13 0 0 0 29 16 A13 13 0 0 0 25.25 6.75 L27.25 4.625 A16 16 0 0 1 32 16 M25 16 A9 9 0 0 1 22.375 22.375 L20.25 20.25 A6 6 0 0 0 22 16 A6 6 0 0 0 20.25 11.75 L22.375 9.625 A9 9 0 0 1 25 16 '/></svg>",
	flower: "<svg height='100' width='80' viewbox='0 0 1200 1500'> <path d='M277.746,179.205C277.746,80.23,357.988,0,456.962,0c98.974,0,179.216,80.23,179.216,179.205 	c0,33.72-9.32,65.265-25.511,92.207l-18.068-32.701c94.143-30.595,195.224,20.931,225.818,115.05 	c30.595,94.12-20.931,195.223-115.05,225.818c-32.083,10.396-64.945,11.313-95.585,4.26l25.511-27.297 	c58.188,80.059,40.441,192.131-39.617,250.298c-80.082,58.166-192.155,40.441-250.344-39.641 	c-19.786-27.273-30.823-58.28-33.571-89.585l33.846,15.824c-58.166,80.081-170.239,97.829-250.298,39.663 	C13.228,674.934-4.52,562.861,53.657,482.779c19.82-27.273,45.88-47.322,74.826-59.609l-4.603,37.076 	C29.75,429.662-21.764,328.57,8.819,234.439c30.583-94.131,131.687-145.645,225.83-115.062c32.06,10.431,59.174,29.026,79.784,52.75 L277.746,179.205z'/></svg>",
	flower2: "<svg height='100' width='60' viewbox='0 0 400 600'>  <path d='M 260.26266,383.54448 C 242.24997,379.46187 226.10207,364.19494 218.41406,343.97899 L 215.56985,336.5 L 215.03493,294.5 L 214.5,252.5 L 213.69088,293 C 212.81686,336.7487 212.40978,340.28329 207.01416,350.97195 C 199.58787,365.68335 186.59217,377.31043 172.23537,382.08806 C 163.46213,385.00761 150.73917,384.52058 143.69565,380.99559 C 137.8334,378.06177 130.532,370.45691 127.93004,364.57474 C 125.27396,358.57023 124.09653,348.77753 125.08272,340.89357 C 125.89527,334.39773 129.89697,322.17717 132.22608,319.07883 C 132.87885,318.21047 131.85752,318.88402 129.95647,320.57559 C 122.78808,326.95407 117.71054,330.31784 110.7149,333.32274 C 104.36989,336.04816 102.3546,336.42653 94,336.46091 C 85.574352,336.49558 83.855093,336.18331 78.797387,333.69964 C 71.585544,330.15814 64.774205,322.67444 61.961309,315.20163 C 58.737866,306.63816 58.990042,292.11104 62.537095,282.03232 C 67.378655,268.27533 78.342743,254.88875 90.250766,248.19536 C 93.137845,246.57256 109.36566,240.64289 126.31257,235.01831 C 143.25948,229.39373 156.96389,224.63055 156.76681,224.43347 C 156.35532,224.02199 143.12295,227.93754 125,233.83349 C 98.106044,242.58292 92.256336,244.00089 83.119955,243.98522 C 66.844553,243.95731 52.490178,238.52888 40.805525,227.98305 C 31.457736,219.54633 26.772722,210.37271 26.191211,199.36709 C 25.617543,188.50989 27.559185,182.73766 34.246063,175.42115 C 39.819751,169.32264 47.308787,165.03506 56,162.9667 C 61.91237,161.55966 74.317918,161.28864 80.003686,162.44231 C 83.284006,163.1079 83.191112,162.98483 78.5,160.45013 C 63.630414,152.41582 53.219755,139.23964 51.023495,125.67468 C 48.624424,110.85709 56.606536,96.546928 71.042249,89.78549 C 94.587855,78.757137 126.94359,87.309205 142.8772,108.77246 C 144.86974,111.4565 153.925,123.6992 163,135.97846 C 191.17108,174.09638 188.29636,169.1872 154.66674,121.74768 C 148.52503,113.08391 142.52693,104.34865 141.33761,102.33599 C 135.01561,91.63737 132.62979,74.887183 135.44333,60.953791 C 138.72052,44.72429 146.98277,32.538442 159.19737,25.91937 C 164.96512,22.793836 166.22262,22.503817 174.01481,22.501993 C 181.6176,22.500213 183.24403,22.851379 189.19963,25.780574 C 200.87588,31.523413 210.55487,45.395629 213.29754,60.318414 L 214.55071,67.136829 L 216.25842,59.818414 C 225.68648,19.414354 266.08235,8.6482592 286.30659,41.149544 C 293.12192,52.10209 295.36371,61.361492 294.73259,75.951927 C 294.12005,90.112679 291.82916,97.275692 284.60713,107.61155 C 281.79821,111.63156 276.2288,119.551 272.23066,125.21033 C 246.04439,162.27673 245.78223,163.63761 271.50809,128.96114 C 281.37964,115.65506 291.49118,102.97035 293.97818,100.77288 C 306.89764,89.357508 326.99213,83.36644 343.52363,86.001159 C 353.38835,87.573353 365.8238,93.714167 370.27815,99.212941 C 384.92496,117.29401 379.73162,140.6731 357.55271,156.49964 C 354.12654,158.9445 350.23806,161.36309 348.91165,161.87427 C 347.29015,162.49918 349.61258,162.63026 356,162.27436 C 367.60333,161.62782 374.68812,162.97785 383.91428,167.59351 C 416.90365,184.09741 406.22051,227.81064 365.85223,241.49972 C 358.66446,243.93713 355.96639,244.33016 346.5,244.31879 C 336.3642,244.30661 334.51796,243.98548 323,240.23136 C 316.125,237.99055 303.075,233.83991 294,231.00771 C 284.925,228.17552 274.65875,224.94391 271.18612,223.82635 C 267.71349,222.70879 264.7004,221.96626 264.49037,222.17629 C 264.28035,222.38632 279.49659,227.67419 298.30425,233.92711 C 317.11191,240.18003 334.975,246.66662 338,248.34176 C 346.85976,253.24798 357.95687,265.0663 362.75519,274.70582 C 367.83183,284.90444 369.34589,291.97866 368.80043,302.95133 C 367.11713,336.8134 331.91348,348.33044 302.73775,324.56406 L 297.09982,319.97143 L 299.02859,324.33173 C 305.07392,337.9982 305.48871,354.50242 300.06379,365.52198 C 292.71178,380.45605 277.34222,387.41559 260.26266,383.54448 z M 186,300 C 188.48508,297.51492 188.54409,294.8935 186.18068,291.9748 C 184.39639,289.7713 184.50714,289.21924 191.93068,263.31249 C 199.47324,236.99036 199.50884,236.89925 202,237.54263 C 207.89793,239.06586 221.53267,239.16058 225.73657,237.70753 L 229.97314,236.24319 L 230.8548,239.37159 C 231.33972,241.09222 234.76651,252.98901 238.4699,265.80891 C 244.69426,287.35554 245.08225,289.25164 243.60167,290.88765 C 240.47569,294.34183 242.11652,300.31046 246.49414,301.40917 C 254.25977,303.35822 258.07874,292.60335 250.71441,289.52421 C 247.53241,288.19377 247.42438,287.91499 240,261.87602 C 235.875,247.40871 232.6125,235.33066 232.75,235.03591 C 233.55459,233.31117 236.30146,236.5572 250.39136,255.88303 C 265.33746,276.38325 265.95629,277.42116 265.38036,281.02284 C 264.90065,284.02274 265.20476,285.20476 266.88981,286.88981 C 268.05042,288.05042 270.125,289 271.5,289 C 274.58281,289 278,285.74813 278,282.81445 C 278,279.69568 274.16049,276 270.92034,276 C 268.70144,276 267.26646,274.73425 263.26791,269.25 C 260.56113,265.5375 253.48879,255.84224 247.5516,247.70498 C 241.6144,239.56772 237.04346,232.62321 237.39394,232.27272 C 238.0312,231.63546 281.65544,260.64899 282.77955,262.4577 C 283.10692,262.98443 283.48834,264.48067 283.62715,265.78267 C 284.00747,269.34973 285.88121,271 289.55102,271 C 293.55714,271 296.0053,268.78481 295.98469,265.17857 C 295.9566,260.26581 291.92885,257.31615 287.53149,258.98803 C 285.17213,259.88506 282.85468,258.58943 262.44103,244.96063 L 239.95002,229.94491 L 242.89594,226.22246 C 247.885,219.91828 250.32975,214.09923 250.93262,207.09334 L 251.5,200.5 L 255,200.65512 C 256.925,200.74044 268.7375,201.12803 281.25,201.51644 C 299.17662,202.07291 304,202.50504 304,203.55462 C 304,205.19771 307.85272,208 310.11172,208 C 312.93923,208 316.25,204.5785 316.25,201.65644 C 316.25,195.49864 308.95664,192.69708 305.23686,197.42601 L 303.32856,199.85202 L 281.91428,198.96127 C 270.13643,198.47135 258.3625,198.05464 255.75,198.03525 C 251.67842,198.00504 251,197.71435 251,196 C 251,194.9 251.22474,194 251.49942,194 C 251.7741,194 262.4616,190.6018 275.24942,186.44844 C 297.43784,179.24186 298.62126,178.96776 301.15429,180.44844 C 302.61415,181.3018 304.71899,182 305.83171,182 C 307.91159,182 312,177.69173 312,175.5 C 312,174.82334 311.06734,173.08403 309.92742,171.63486 C 306.40933,167.16233 299.90594,168.77509 298.85324,174.38112 C 298.57165,175.88065 293.63159,177.85398 274.5,184.10911 C 261.3,188.42489 250.43564,191.96589 250.35699,191.97799 C 250.27833,191.9901 249.95992,191.33795 249.64942,190.52877 C 249.25564,189.50261 255.11109,184.3872 269.00553,173.61898 C 288.24455,158.7087 289.05888,158.19821 292.80376,158.7005 C 296.13528,159.14735 296.97597,158.84601 298.77367,156.5606 C 301.08231,153.62565 300.94883,150.70592 298.37605,147.86304 C 294.74183,143.84727 288,146.83172 288,152.45627 C 288,156.03171 288.80059,155.32145 257.07624,179.89114 L 248.65247,186.41513 L 246.57624,183.45756 C 241.14176,175.71624 234.54885,170.65791 224.34354,166.39978 C 222.22554,165.51605 222.33334,165.09882 230.38821,143.00509 C 236.92611,125.07227 238.98589,120.43751 240.54467,120.15185 C 246.1637,119.12212 248.13912,111.44771 243.55782,108.44593 C 240.27199,106.29297 237.12613,106.928 234.6612,110.24179 C 232.6987,112.88014 232.68596,113.11824 234.32358,116.55237 L 236.02541,120.12115 L 227.94276,142.31057 C 223.4973,154.51476 219.51683,164.85225 219.09727,165.28278 C 218.67771,165.71331 217.58419,165.77767 216.66722,165.42579 C 215.17398,164.85278 215,162.24055 215,140.39301 C 215,119.6374 215.21843,116 216.46482,116 C 218.23701,116 220,112.95518 220,109.89448 C 220,104.52897 212.96258,102.03742 209,106 C 206.31315,108.68685 206.48107,111.57198 209.5,114.59091 L 212,117.09091 L 212,141.61878 C 212,173.69014 211.65348,173.72419 200.36769,142.76168 C 192.27837,120.56866 192.1184,119.95578 193.69686,117.20548 C 196.99725,111.45488 192.3281,105.44349 186.22753,107.58894 C 180.59979,109.56811 180.9777,118.44347 186.73894,119.5997 C 189.33334,120.12037 189.98289,121.48765 197.5,142.25153 C 201.9,154.40528 205.63384,164.88515 205.79742,165.54014 C 205.96101,166.19513 204.83601,167.00195 203.29742,167.33307 C 196.08896,168.88443 186.55357,176.82682 181.43974,185.53916 C 180.48362,187.16808 179.40307,186.58466 170.43974,179.60007 C 164.97288,175.34008 156.1125,168.49589 150.75,164.39077 C 142.28914,157.91378 141,156.53509 141,153.96346 C 141,150.34523 137.87741,147 134.5,147 C 131.35948,147 128,150.26939 128,153.32569 C 128,154.60481 129.09984,156.68461 130.44408,157.94747 C 132.40215,159.78698 133.56798,160.11603 136.30685,159.60221 C 139.52017,158.99939 140.71285,159.72799 156.16007,171.73043 C 165.19906,178.75369 174.08109,185.63083 175.89792,187.01296 C 178.13941,188.71815 179.08853,190.18477 178.85061,191.57561 C 178.51869,193.51602 177.20708,193.20522 154.25,185.7464 C 138.77371,180.7181 130,177.38884 130,176.54453 C 130,174.01861 126.42169,170.75 123.65644,170.75 C 118.08614,170.75 114.798,177.65514 118.57143,181.42857 C 120.50908,183.36622 126.34929,183.48899 127.89659,181.6246 C 128.84955,180.47635 131.05807,180.90501 141.26904,184.22009 C 147.99607,186.40408 158.9,189.89621 165.5,191.98038 C 173.68872,194.56624 177.60269,196.28275 177.82332,197.38489 C 178.10126,198.77325 176.83772,199.01551 168.82332,199.11048 C 163.6955,199.17124 151.80398,199.50874 142.39772,199.86048 C 125.47565,200.49326 125.2776,200.47629 123.60104,198.25 C 121.28031,195.16831 115.70663,195.15305 113.5567,198.22251 C 111.53269,201.11219 111.58855,203.30259 113.75,205.80232 C 116.82806,209.36212 119.67051,209.48333 122.95883,206.19501 L 125.90319,203.25065 L 151.12235,202.17184 C 164.99289,201.5785 176.62499,201.26823 176.97146,201.48236 C 177.31794,201.69649 177.71156,203.73837 177.84617,206.01985 C 178.18764,211.80705 181.43907,219.97777 185.53538,225.34255 C 187.44092,227.83816 189,230.12756 189,230.43011 C 189,230.94641 180.32313,236.869 155.13819,253.54325 C 145.4938,259.92854 144.23817,260.49264 141.69723,259.58166 C 138.38388,258.39375 136.20976,259.44766 134.02053,263.30295 C 132.66742,265.68583 132.71869,266.14711 134.62086,268.70417 C 135.76475,270.24188 137.69402,271.64721 138.90814,271.82713 C 142.3573,272.33826 146,269.41295 146,266.13193 C 146,264.57986 146.7875,262.63258 147.75,261.80465 C 153.54569,256.81927 192.26948,231.86948 193.03042,232.63042 C 193.56414,233.16414 189.97495,238.88595 184.21536,246.68317 C 178.87191,253.91702 171.60864,263.84513 168.07475,268.74564 C 162.90769,275.91089 161.23462,277.57635 159.53084,277.25065 C 157.07282,276.78077 153.44357,279.56585 152.56938,282.59287 C 151.77787,285.33361 155.41963,290 158.35007,290 C 159.56278,290 161.60669,289.26336 162.89211,288.36302 C 164.88016,286.97053 165.15794,286.09355 164.75192,282.49138 C 164.30054,278.48676 164.70612,277.6658 172.21818,267.37836 C 192.43851,239.68754 196.15014,234.8168 196.65001,235.31668 C 196.94452,235.61119 194.64347,244.77292 191.53657,255.67607 C 182.16729,288.55602 182.01969,289 180.45765,289 C 178.15516,289 175,292.75776 175,295.5 C 175,298.70927 178.29073,302 181.5,302 C 182.875,302 184.9,301.1 186,300 z M 206.92935,233.68763 C 186.95339,228.06119 177.10425,207.67944 185.44991,189.2382 C 188.63661,182.19661 193.36674,177.41356 201.2141,173.29763 C 205.75547,170.91568 207.62682,170.53353 214.5,170.58452 C 221.15204,170.63387 223.47254,171.11658 228.27192,173.44938 C 236.30108,177.35206 242.42787,184.40784 244.98968,192.70201 C 247.53541,200.94411 247.52038,205.07073 244.91657,212.78103 C 239.79256,227.95406 221.77635,237.86944 206.92935,233.68763 z M 163.1875,222.31689 C 162.46562,222.02802 161.60313,222.06354 161.27083,222.39583 C 160.93854,222.72813 161.52917,222.96447 162.58333,222.92105 C 163.74828,222.87307 163.98523,222.63611 163.1875,222.31689 z M 247,162 C 248.1749,160.35 248.91119,159 248.63619,159 C 248.36119,159 247.1749,160.35 246,162 C 244.8251,163.65 244.08881,165 244.36381,165 C 244.63881,165 245.8251,163.65 247,162 z M 252,155.25511 C 252,154.98011 251.325,155.31531 250.5,156 C 249.675,156.68469 249,157.46989 249,157.74489 C 249,158.01989 249.675,157.68469 250.5,157 C 251.325,156.31531 252,155.53011 252,155.25511 z' /> </svg>",
	teddy: "<svg height='100' width='100' viewbox='0 0 800 800'> <path d='M189.271,261.794c3.43-49.716,20.313-73.766,10.447-71.381C41.29,228.715,61.567,81.729,67.404,58.1	c6.653-26.933,106.199-137.536,175.838,43.524c6.963-17.411,163.652-127.092,259.405-5.224 c29.596-139.276,160.167-55.71,177.576-20.892c13.796,27.591,22.636,163.651-128.829,128.833c8.703,13.927,26.146,140-40.01,166.114 c27.854,17.408,102.683,115.919,97.46,222.12c29.597-29.596,74.771-57.484,130.575-36.558 c83.565,31.335-13.929,285.517-59.196,266.365c-100.959-42.712-217.621-48.747-292.48-55.708 c-72.766-6.766-251.616,30.923-278.556,33.077c-87.048,6.964-153.205-248.96-73.121-275.072	c71.097-23.184,121.868,41.78,125.35,50.486c12.187-59.192,24.374-168.874,106.2-194.988 C239.068,373.22,185.789,312.282,189.271,261.794z M34.037,559.418c-23.173,8.015-25.265,62.763-4.675,122.28	c20.591,59.518,56.065,101.267,79.238,93.252c23.171-8.016,25.263-62.763,4.674-122.28 C92.683,593.152,57.207,551.403,34.037,559.418z M728.295,574.841c-23.946-5.281-54.345,40.301-67.901,101.803 c-13.558,61.504-5.136,115.639,18.807,120.917c23.943,5.274,54.345-40.302,67.901-101.807 C760.655,634.253,752.234,580.12,728.295,574.841z M328.699,239.269c28.906,0,52.338-23.432,52.338-52.336 c0-28.908-23.432-52.339-52.338-52.339c-28.907,0-52.338,23.431-52.338,52.339C276.36,215.837,299.792,239.269,328.699,239.269z M437.205,239.272c28.902,0,52.337-23.435,52.337-52.339s-23.435-52.339-52.337-52.339c-28.908,0-52.341,23.435-52.341,52.339 S408.297,239.272,437.205,239.272z M341.93,208.693c7.691,0,13.927-6.236,13.927-13.927c0-7.691-6.236-13.927-13.927-13.927 c-7.691,0-13.927,6.236-13.927,13.927C328.003,202.458,334.239,208.693,341.93,208.693z M425.096,208.693 c7.69,0,13.926-6.236,13.926-13.925c0-7.693-6.235-13.929-13.926-13.929c-7.689,0-13.925,6.236-13.925,13.929 C411.171,202.458,417.406,208.693,425.096,208.693z M412.648,256.57c-1.741,1.74-64.415,0-64.415,0 C369.125,317.504,423.097,272.239,412.648,256.57z M370.661,296.613c0,0,5.536,45.267,5.536,55.711s-33.39,41.785-68.21-20.892 c-5.223-5.224-12.187,1.74-12.187,1.74c0,15.669,31.34,78.345,85.308,33.079c53.968,45.267,85.306-17.409,85.306-33.079 c0,0-6.964-6.964-12.187-1.74c-34.819,62.676-68.354,31.336-68.354,20.892s5.682-55.711,5.682-55.711H370.661z M152.262,156.196 c24.429,0,44.233-19.802,44.233-44.231s-19.804-44.235-44.233-44.235c-24.43,0-44.233,19.805-44.233,44.235 S127.833,156.196,152.262,156.196z M601.514,156.196c24.43,0,44.234-19.805,44.234-44.234c0-24.427-19.805-44.232-44.234-44.232 s-44.234,19.805-44.234,44.232C557.279,136.391,577.084,156.196,601.514,156.196z M386.076,457.368 c-46.158,0-83.577,58.26-83.577,130.125c0,71.866,37.419,130.125,83.577,130.125c46.158,0,83.577-58.259,83.577-130.125 C469.653,515.627,432.234,457.368,386.076,457.368z'/> </svg>",
	car:"<svg height='100' width='120' viewbox='0 0 900 800'> <path d='M5.529,239.083c-3.167-14.075-6.635-32.023-4.223-37.651c0,0,20.058-61.229,25.336-64.748	c5.238-3.492,23.928-14.076,29.559-14.076c1.408-10.909,4.223-14.076,4.223-14.076c9.853-2.815,41.875-3.871,41.875-3.871	c1.407-7.038,55.247-81.99,55.247-81.99l73.897-22.169c0,0,87.269-0.352,167.851,9.149c64.697,7.628,119.66,25.178,122.81,28.503	c6.334,6.686,61.581,89.38,61.581,89.38c24.28-1.759,117.179,21.465,122.81,21.465c1.724,0,20.409,3.519,23.225,11.964	c27.447,0.352,66.155,5.278,75.305,3.871c8.445,0,29.91,87.972,20.058,89.38c21.113,0,18.87,13.592,16.891,26.04	c-1.979,12.447-6.862,24.808-8.798,29.559c4.223,13.371,1.408,26.743,1.408,26.743c-15.483,0-45.746,2.815-53.487,5.631	c-6.745,2.452-16.66,39.87-72.489,47.152c-64.748,8.446-89.373-9.84-101.696-32.021c-3.519-6.334-59.821-6.334-92.195-10.557	s-128.439-9.149-138.292-7.741c-9.853,1.407-0.704,73.545-47.153,74.952c-46.449,1.407-77.13,5.261-92.195-1.407	c-21.465-9.501-55.95-70.73-48.913-86.213c-14.076-1.408-60.173-17.243-60.173-17.243c4.574,8.445,0,27.096-5.278,33.43	c-5.596,6.715-64.801,1.065-69.674-0.352c-19.354-5.631-29.911-47.153-28.503-83.75C19.253,253.51,8.02,250.154,5.529,239.083z	 M799.393,310.751c-10.792,9.385-80.229,11.261-89.613,15.013c-9.385,3.753-88.208,0-102.283,0s-103.221-11.26-127.618-15.013	c-24.396-3.753-95.714-3.754-103.222-3.754v6.569c7.508,0,78.825,0.001,103.222,3.754c24.397,3.752,113.543,15.013,127.618,15.013	s92.898,3.753,102.283,0c9.384-3.752,78.821-5.629,89.613-15.013V310.751z M514.597,255.857	c15.015,4.691,87.27,13.137,153.895,14.075c66.625,0.939,91.021-16.891,93.836-17.829c-8.445,0-133.248,0-140.756,0	s-107.911-6.569-116.357-6.569c-8.445,0-105.884-1.6-88.207,2.815C420.761,249.287,500.954,251.594,514.597,255.857z	 M331.56,206.123h4.458v-14.795c0-0.862,0.051-1.521,0.305-2.128c0.81-2.432,3.09-4.459,5.978-4.459	c4.205,0,5.674,3.345,5.674,7.296v14.086h4.459V191.53c0-8.461-5.27-10.486-8.562-10.486c-1.673,0-3.243,0.506-4.561,1.266	c-1.368,0.76-2.482,1.875-3.191,3.141h-0.102v-15.3h-4.458V206.123z M360.493,177.091v4.509h-3.801v3.395h3.801v13.376	c0,2.889,0.457,5.065,1.723,6.384c1.064,1.215,2.737,1.925,4.813,1.925c1.722,0,3.09-0.304,3.952-0.659l-0.204-3.343	c-0.658,0.202-1.368,0.304-2.583,0.304c-2.484,0-3.344-1.722-3.344-4.763v-13.224h6.384V181.6h-6.384v-5.878L360.493,177.091z	 M376.403,206.02c1.47,0.204,3.801,0.406,6.84,0.406c5.574,0,9.424-1.014,11.806-3.192c1.723-1.671,2.888-3.9,2.888-6.84	c0-5.066-3.801-7.751-7.043-8.562v-0.103c3.597-1.316,5.776-4.204,5.776-7.498c0-2.686-1.064-4.712-2.837-6.028	c-2.128-1.724-4.965-2.484-9.373-2.484c-3.09,0-6.131,0.306-8.057,0.711V206.02z M380.812,175.418	c0.709-0.151,1.875-0.304,3.901-0.304c4.459,0,7.498,1.571,7.498,5.573c0,3.293-2.735,5.726-7.396,5.726h-4.003V175.418z	 M380.812,189.756h3.648c4.813,0,8.815,1.926,8.815,6.587c0,4.965-4.205,6.638-8.764,6.638c-1.571,0-2.837-0.051-3.699-0.203 V189.756z M767.796,196.988c-3.897,2.054-6.127,5.19-5.781,9.328c0.4,4.797,4.882,8.542,11.748,7.967	c6.263-0.522,10.838-4.77,10.363-10.474c-0.335-3.989-3.099-6.656-7.324-7.929l-0.013-0.152c3.879-2.256,4.993-5.349,4.761-8.127	c-0.341-4.089-3.855-7.812-10.218-7.281c-5.755,0.481-9.853,4.383-9.418,9.584c0.236,2.827,2.038,5.522,5.817,6.936L767.796,196.988	z M771.348,183.523c3.989-0.333,5.78,2.263,6,4.888c0.249,2.98-1.754,5.18-4.501,6.375c-3.87-0.693-6.491-2.254-6.766-5.536	C765.845,186.423,767.661,183.831,771.348,183.523z M773.595,211.044c-4.189,0.35-6.959-2.367-7.086-5.713	c-0.263-3.128,1.598-5.828,5.342-7.259c4.549,0.891,7.487,2.577,7.82,6.566C779.949,207.971,777.584,210.71,773.595,211.044z	 M804.967,177.563c-0.809,0.067-1.913,0.21-3.211,0.521c-4.097,0.851-7.593,2.82-10.097,5.726	c-2.961,3.502-4.857,8.794-4.318,15.258c0.713,8.533,5.762,13.601,12.782,13.014c6.814-0.568,10.44-6.463,9.939-12.471	c-0.536-6.413-4.977-10.263-10.782-9.777c-3.636,0.302-6.218,2.248-7.609,4.449l-0.15,0.012c0.304-5.465,3.563-10.872,10.436-12.617	c1.243-0.306,2.401-0.453,3.314-0.479L804.967,177.563z M799.837,208.647c-4.646,0.39-7.453-3.394-8.006-8.786	c-0.067-0.809,0.078-1.481,0.341-2.013c1.014-2.474,3.348-4.346,6.025-4.57c4.088-0.342,7,2.263,7.392,6.958	c0.393,4.696-1.916,8.093-5.701,8.408L799.837,208.647z M323.17,104.779c8.293,0,15.015-6.722,15.015-15.015	c0-8.292-6.722-15.014-15.015-15.014c-8.292,0-15.014,6.722-15.014,15.014C308.156,98.058,314.878,104.779,323.17,104.779z	 M390.882,81.771c-13.204,0.196-19.855-15.465-21.732-18.281c-2.815-5.63-1.876,8.445-9.384,10.322s-40.349-1.876-56.302-10.322	s-81.639-0.938-84.454,1.876s-15.135,59.362-12.198,53.487c0.938-1.878,65.685-6.568,79.761-7.506	c14.075-0.939,134.188,0.938,143.571,0.938s143.571,7.507,143.571,7.507s-9.383-13.137-17.828-17.83s-77.886-22.521-89.146-22.521	c-6.672,0-29.821,0.658-49.724,1.196l0.473-0.326c1.478,2.326,2.334,5.086,2.334,8.045c0,8.292-6.722,15.014-15.014,15.014	c-8.293,0-15.015-6.722-15.015-15.014c0-2.073,0.419-4.048,1.179-5.845L390.882,81.771z M243.407,221.136	c-18.657,0-33.782,33.399-33.782,74.601c0,41.202,15.125,74.601,33.782,74.601c18.657,0,33.781-33.398,33.781-74.601	C277.188,254.536,262.064,221.136,243.407,221.136z M47.287,202.37c-6.997,0-13.606,19.026-13.606,49.733	c0,30.706,5.671,55.599,12.668,55.599s12.668-24.893,12.668-55.599C59.017,221.396,54.283,202.37,47.287,202.37z M170.093,38.688	c0,0-59.521,88.858-58.671,94.385c4.677-0.851,65.899-2.125,68.45-2.125c2.551-2.977,33.588-102.463,33.588-102.463	C209.632,29.336,170.093,38.688,170.093,38.688z M460.171,154.513c0,0-48.796,81.638-47.857,91.959	c8.445-0.938,86.33-7.506,94.775-7.506s106.037,6.567,119.174,6.567s136.064,0.938,143.571,0.938	c-0.938-6.568-48.796-85.392-48.796-85.392C713.531,160.143,460.171,154.513,460.171,154.513z'/> </svg>",
	truck:"<svg height='150' width='150' viewbox='0 0 900 800'> <path d='M142.415,704.317c0,13.292-6.646,45.193-35.89,43.864s-60.549,5.528-60.549-23.715c-7.764,22-45.94,11.374-45.94-27.174	s-1.962-126.365,23.293-143.646c18.609-1.329,32.685-2.192,32.685-2.192c-1.626-4.278,38.491-4.278,38.491-4.278l14.679-15.66	c-11.963,2.658-23.09,0.131-23.09,0.131l0.647-12.94l53.016-0.482l3.988-9.305h-18.609c0,0-0.865-38.094-0.218-41.977	c0.788-4.728-29.025-1.889-29.025-1.889l14.622-259.2l13.292-3.988c0,0,14.622-126.277,6.646-139.569	c0-13.292,17.28-10.634,23.926-6.646c6.646,3.987-1.329,139.569-1.329,139.569c6.808-3.914,34.858-120.9,55.337-149.499	c14.793-20.658,75.999-62.913,190.231-38.176c34.211,7.408,66.646,13.588,109.998,40.764c12.294,10.353,24.588,124.88,24.588,124.88	c9.305,0,51.847,26.018,33.238,33.993c-18.609,7.976-34.561-2.658-41.207,5.317c-6.646,7.976,53.17,2.659,53.17,2.659	c5.316,7.976,9.151,14.322,9.151,14.322s5.47-2.359,10.787,0.299c5.316,2.659,2.658,71.779,2.658,71.779s7.976,0,13.292,0	c5.317,0,17.28,9.304,15.951,34.56c-1.329,25.255-2.658,127.606-2.658,127.606h14.621c-6.646-6.646-17.279-27.914,2.658-38.548	c19.939-10.634,31.334,7.475,30.039,19.121c-1.57,14.134-14.234,22-14.234,22s24.073,1.415,28.061,1.415s23.926,2.658,27.914,38.548	c3.987,35.889,5.884,63.119,10.634,62.474c11.037-1.498,5.316,22.597,5.316,22.597l-22.597,2.659c0,0,17.28,2.658,21.268,2.658	c3.988,0-2.655,102.585-2.655,102.585s-23.294,16.822-27.823,20.058c-7.256,5.182,15.795,35.096-18.766,53.705	c-34.56,18.609-59.124-5.98-69.232-18.117c-3.233-3.883-68.146-2-133.938-1.941c-72.101,0.063-146.355-3.428-146.355-3.428	c-5.317,0-68.463-23.102-68.463-23.102s-7.303,49.687-8.632,56.333c-1.33,6.646-71.779,13.292-79.754,3.987	c-7.975-9.305-11.963-62.474-17.28-78.425C153.048,692.354,142.415,704.317,142.415,704.317z M417.123,681.277	c19.495,17.723,82.413,14.179,86.845,11.521s74.437-45.193,77.98-58.486c-9.749,0-55.828-8.861-62.917-11.521	c-7.089-2.658-76.209-3.545-109.884,4.431c-33.674,7.976-77.98-8.86-83.297-8.86C325.85,618.361,397.628,663.554,417.123,681.277z	 M258.501,501.388H222.17v26.584h36.332V501.388z M299.265,502.273H265.59v24.813h33.675V502.273z M674.996,519.998h-36.332v26.584	h36.332V519.998z M715.76,520.882h-33.675v24.813h33.675V520.882z M436.378,330.632l4.26,0.234l-0.626-27.102l-5.564-0.304	l-6.729,12.723c-1.688,3.321-3.054,6.218-4.057,8.894l-0.15-0.008c-0.698-2.85-1.689-5.875-2.911-9.275l-5.049-13.369l-5.563-0.305	l-3.834,26.857l4.16,0.229l1.537-11.522c0.521-4.027,1.019-8.538,1.305-11.896l0.1,0.005c0.777,3.256,1.94,6.813,3.336,10.705	l4.759,13.151l3.309,0.181l6.683-12.766c1.906-3.589,3.496-6.916,4.821-10.017l0.15,0.009c-0.234,3.36-0.183,7.901-0.136,11.679	L436.378,330.632z M475.884,324.282l3.143,8.687l4.661,0.255l-10.05-27.618l-5.263-0.288l-12.957,26.357l4.511,0.248l3.975-8.297	L475.884,324.282z M464.953,320.953l3.737-7.626c0.74-1.606,1.383-3.217,1.972-4.791l0.101,0.005	c0.415,1.588,0.829,3.217,1.483,5.021l2.885,7.948L464.953,320.953z M522.177,331.677c-1.791,0.585-4.521,0.877-7.179,0.732	c-8.219-0.451-12.749-4.956-12.388-11.562c0.389-7.087,5.873-10.843,13.793-10.409c2.806,0.154,5.136,0.763,6.755,1.495l1.208-2.786	c-1.126-0.544-3.743-1.41-7.953-1.64c-10.477-0.574-17.957,4.759-18.42,13.207c-0.485,8.849,6.417,14.087,15.94,14.609	c4.111,0.225,7.356-0.281,8.996-0.833L522.177,331.677z M538.965,336.251l4.361,0.239l0.564-10.291l3.37-2.787l10.4,13.863	l5.162,0.283l-12.331-16.257l12.857-10.782l-5.413-0.296l-10.881,9.564c-0.899,0.834-1.854,1.746-2.814,2.737l-0.149-0.009	l0.713-13.012l-4.361-0.239L538.965,336.251z M605.729,348.539l-252.991-15.087l-0.159,2.654l252.992,15.087L605.729,348.539z	 M605.729,372.464l-252.991-15.087l-0.159,2.654l252.992,15.087L605.729,372.464z M605.729,396.391l-252.991-15.087l-0.159,2.654	l252.992,15.087L605.729,396.391z M605.729,420.318L352.737,405.23l-0.159,2.654l252.992,15.087L605.729,420.318z M605.729,444.244	l-252.991-15.088l-0.159,2.655l252.992,15.086L605.729,444.244z M605.729,468.17l-252.991-15.088l-0.159,2.654l252.992,15.087	L605.729,468.17z M605.729,492.096l-252.991-15.088l-0.159,2.655L605.57,494.75L605.729,492.096z M605.729,516.022l-252.991-15.087	l-0.159,2.654l252.992,15.086L605.729,516.022z M605.729,539.949l-252.991-15.088l-0.159,2.654l252.992,15.087L605.729,539.949z	 M605.729,563.875l-252.991-15.087l-0.159,2.654l252.992,15.086L605.729,563.875z M546.503,297.571c0,0,2.658-70.006,4.43-72.665	c1.772-2.659,26.585,3.544,26.585,3.544l-0.887-5.317c0,0-46.079-1.772-54.055-1.772l6.202,75.323L546.503,297.571z	 M244.323,198.322l-18.609,8.861l-13.292,109.884c0,0,21.268-7.975,23.926-7.975C239.006,309.092,244.323,198.322,244.323,198.322z	 M327.622,293.141l3.545-6.203l51.396,0.886c0,0,4.333-74.857-0.885-76.209c-47.853-12.406-113.429,4.431-119.631,7.976	s-2.659,76.209-2.659,76.209L327.622,293.141z M401.172,214.273l-0.885,76.209l112.541,6.203l-3.544-62.03L401.172,214.273z	 M346.231,280.734c10.278,0,18.609-8.332,18.609-18.609c0-10.277-8.331-18.609-18.609-18.609c-10.278,0-18.609,8.332-18.609,18.609	C327.622,272.403,335.953,280.734,346.231,280.734z M421.555,287.824c10.278,0,18.609-8.332,18.609-18.609	c0-10.277-8.331-18.609-18.609-18.609s-18.609,8.332-18.609,18.609C402.945,279.492,411.276,287.824,421.555,287.824z'/> </svg>",
	robot: "<svg height='150' width='150' viewbox='0 0 900 800'> <path fill='#010101' d='M332.928,691.841c0,0-112.06,0-134.796,0c-22.735,0-34.105-38.979,37.352-37.352	c8.285,0.191,12.994,0,12.994,0v-164.03h-58.466V384.898L68.21,547.3v-68.21H0l74.706-35.724l110.436-125.054v-68.21h113.682	v-50.345h-81.201v-97.445h-27.61v11.37h-14.615V82.826h12.994v8.12h25.981V0h266.343v94.192h19.489v-16.24h9.742v35.73h-8.12	v-12.991h-24.36v92.57h-81.201v56.841h110.438v56.841l125.051,125.055l40.601,29.231l-43.85,9.741l-12.997,47.1l-22.732-55.22	l-87.693-94.198v115.31h-37.358v152.66c0,0,19.483,0,40.601,0c21.118,0,38.979,39.79-39.79,39.79c-39.796,0-90.132,0-90.132,0	v-28.42h9.742V485.589h-66.583v157.531h12.991L332.928,691.841z M284.207,113.682c20.63,0,37.352-16.721,37.352-37.351	s-16.722-37.352-37.352-37.352s-37.351,16.722-37.351,37.352S263.577,113.682,284.207,113.682z M391.394,97.441	c16.142,0,29.231-13.086,29.231-29.231c0-16.145-13.09-29.231-29.231-29.231s-29.231,13.086-29.231,29.231	C362.162,84.355,375.252,97.441,391.394,97.441z M430.917,136.266c-56,33.333-194.201-0.729-182.439,5.026	C333.583,182.933,414.677,167.125,430.917,136.266z M427.123,306.943H256.598v128.298h170.525V306.943z M311.817,500.202h-55.219	v12.997h55.219V500.202z M311.817,527.198h-55.219v12.998h55.219V527.198z M311.817,560.944h-55.219v12.997h55.219V560.944z	 M311.817,587.941h-55.219v12.997h55.219V587.941z M311.817,614.937h-55.219v12.998h55.219V614.937z M311.817,641.934h-55.219	v12.998h55.219V641.934z M453.105,491.428h-55.22v12.998h55.22V491.428z M453.105,518.425h-55.22v12.997h55.22V518.425z	 M453.105,552.171h-55.22v12.997h55.22V552.171z M453.105,579.168h-55.22v12.997h55.22V579.168z M453.105,606.165h-55.22v12.998	h55.22V606.165z M453.105,633.162h-55.22v12.997h55.22V633.162z M382.08,194.863h-73.671v17.341h73.671V194.863z M382.08,230.883	h-73.671v17.341h73.671V230.883z M105.051,476.341L88.108,451.83l-11.752,8.12l16.942,24.513L105.051,476.341z M126.781,449.101	l-16.942-24.519l-11.752,8.12l16.942,24.519L126.781,449.101z M149.131,424.886l-16.942-24.513l-11.752,8.12l16.942,24.513	L149.131,424.886z M166.251,399.596l-16.942-24.512l-11.751,8.12l16.942,24.512L166.251,399.596z M186.12,374.754l-16.942-24.512	l-11.752,8.12l16.942,24.512L186.12,374.754z M530.343,348.236l-16.938,24.516l11.751,8.12l16.946-24.519L530.343,348.236z	 M556.294,370.51l-16.945,24.519l11.751,8.113l16.939-24.512L556.294,370.51z M578.638,393.725l-16.939,24.506l11.752,8.12	l16.945-24.512L578.638,393.725z M598.428,414.675l-16.938,24.519l11.745,8.12l16.945-24.519L598.428,414.675z M618.917,440.266	l-16.938,24.519l11.751,8.12l16.946-24.519L618.917,440.266z'/> </svg>",
  metsa:"<svg     width='500'   height='500'   viewBox='0 0 1044.09448819 1052.3622047'   >    <path       style='fill:#333333;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.48007575;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1'       d='m 8.2432259,66.238533 c 1.08175,-8.54566 4.8692701,-14.55563 12.0834101,-17.35436 l 38.57399,-13.13302 46.009934,-16.41629 c 12.21999,-3.08373 21.43116,-2.95504 30.67328,-2.81421 13.91826,3.66631 22.31373,8.90025 29.27906,14.54013 8.86387,6.61266 15.37526,15.74778 18.35743,25.79701 4.7541,17.13852 2.2126,27.44027 1.6266,31.89451 -1.9242,8.599014 -5.77887,17.198017 -12.08334,25.797027 -7.06326,5.67832 -13.12557,11.86172 -27.77687,13.71099 -9.63337,-0.55991 -19.27252,-0.87935 -30.64028,-5.38213 L 72.843026,107.04475 36.592776,91.566523 14.970376,80.475463 c -4.23827,-4.69037 -6.8635001,-9.54656 -6.7271501,-14.23693 z' /></svg>"
	
};