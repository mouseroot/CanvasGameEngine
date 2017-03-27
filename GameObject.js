(function(window){
    function GameObject(x, y, width, height) {
        this.en = null;
        this.x = x;
        this.y = y;
        this.xvel = 0;
        this.yvel = 0;
        this.width = width;
        this.height = height;
        this.valid = true;
        this.visible = true;
        this.speed = 0;

        this.anchor = {
            x: 0,
            y: 0
        };

        this.draw = function() {
            if(this.visible) {
                this.en.cx.strokeStyle = "#0E0";
                this.en.cx.strokeRect(this.x - this.anchor.x, this.y - this.anchor.y, this.width, this.height);
            }
        }
        this.update = null;

        this.destroy = function() {
            this.valid = false;
            this.visible = false;
        }

        this.setVisible = function(visMode) {
            this.visible = visMode;
        }

        this.move = function() {
            this.x = this.x += this.xvel*this.speed;
            this.y = this.y += this.yvel*this.speed;
        }

        this.keyup = function(code) {

        }

        this.keydown = function(code) {

        }

        this.colliding = function(rect1) {
            if (rect1.x < this.x + this.width &&
            rect1.x + rect1.width > this.x &&
            rect1.y < this.y + this.height &&
            rect1.height + rect1.y > this.y) {
                return true;
            } else {
                return false;
            }
        }

        //Calculates with anchor as a factor
        this.collidingWithAnchor = function(rect1) {
            var ax = this.x - this.anchor.x;
            var ay = this.y - this.anchor.y;

            var bx = rect1.x - rect1.anchor.x;
            var by = rect1.y - rect1.anchor.y;

            if (bx < ax + this.width &&
            bx + rect1.width > ax &&
            by < ay + this.height &&
            rect1.height + by > ay) {
                return true;
            } else {
                return false;
            }
        }

    }

    window.GameObject = GameObject;

})(window);