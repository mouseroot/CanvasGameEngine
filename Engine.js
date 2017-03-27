(function(window){
    function Engine(canvas,width,height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.cx = this.canvas.getContext("2d");
        this.pools = {
            GameObjects: []
        };
        this.resources = {};
        this.screens = {};

        this.Keys = {
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            KEY_Z: 90,
            KEY_X: 88,
            RETURN: 13,
            ESCAPE: 27,
            SPACE: 32
        };

        this.background = function(color) {
            this.cx.fillStyle = color;
            this.cx.fillRect(0,0,this.width, this.height);
        }

        this.update = null;
        this.draw = null;
        this.init = null;
        this.keyup = null;
        this.keydown = null;
        this.mouseup = null;
        this.mousedown = null;

        this.start = function() {

            if(this.keyup !== null) {
                document.addEventListener("keyup",function(e){
                    this.keyup(e.keyCode);
                }.bind(this),false);
            }
            if(this.keydown !== null) {
                document.addEventListener("keydown",function(e){
                    this.keydown(e.keyCode);
                }.bind(this),false);
            }
            if(this.init) {
                this.init();
            }
            
            if(this.draw) {
                this.draw = this.draw.bind(this);
                requestAnimationFrame(this.draw);
            }
        }

        this.createGameObject = function(x,y,width, height) {
            var go = new GameObject(x,y,width, height);
            go.en = this;
            this.pools["GameObjects"].push(go);
            return go;
        }

        this.drawPool = function(poolName) {
            for(var i=0;i < this.pools[poolName].length;i++) {
                var gameObject = this.pools[poolName][i];
                if(gameObject.visible) {
                    gameObject.draw();
                }
            }
        }

        
    }

    function Vector2(x,y) {
        this.x = x;
        this.y = y;
    }

    Vector2.prototype.add = function(otherVector) {
        this.x = this.x + otherVector.x;
        this.y = this.y + otherVector.y;
    }

    window.GameEngine = Engine;
})(window);