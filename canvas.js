
window.onload = function () {
    let dpi = window.devicePixelRatio;
    const canvas = document.getElementById("theme");
    let ctx = canvas.getContext("2d");
    fix_dpi();

    function fix_dpi() {
        //get CSS height
        //the + prefix casts it to an integer
        //the slice method gets rid of "px"
        let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);//get CSS width
        let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);//scale the canvas
        canvas.setAttribute('height', style_height * dpi);
        canvas.setAttribute('width', style_width * dpi);
        // thanks to Zak Frisch
    }

    function stars(x, y, r, count, boo) {
        this.y = y;
        this.x = x;
        this.r = r;
        this.count = count;
        this.boo = boo;
        ctx.fillStyle = "white";
        ctx.globalAlpha = 0.6
        let circle = Math.PI * 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, circle, false);
        ctx.fill()
    }

    stars.prototype.move = function () {
        this.y -= 0.20;

       /* if(this.count % 200 === 0) {
            this.count = 0
            if(this.boo === true) {
                this.boo = false
            } else {
                this.boo = true;
            }
        }

        if(this.boo === true) {
            if(this.count > 160) {

                this.x -= 0.02
            } else if(this.count > 150 && this.count < 160) {
            } else if(this.count > 0 && this.count < 20) {
                this.x -= 0.02

            } else {
                this.x -= 0.05
            }
        } else {
            if(this.count > 160) {

                this.x += 0.02
            } else if(this.count > 150 && this.count < 160) {
            } else if(this.count > 0 && this.count < 20) {
                this.x += 0.02
            } else {
                this.x += 0.05
            }
        }
        this.count += 1; */
        if(this.y <= 0 ) this.y = canvas.height;
        stars(this.x, this.y, this.r, this.count, this.boo)

    }

    function constellations(max_star) {

        let ii = 0;
        let constt = [];
        while(ii < max_star) {
            let star1
            if(ii === 0) {
                star1 = Math.floor(Math.random() * star.length);
            } else {
                star1 = Math.floor(Math.random() * star.length);
                let distancex_star = star[star1].x - star[constt[ii - 1].star1].x;
                let distancey_star = star[star1].y - star[constt[ii - 1].star1].y;
                if(Math.sign(distancex_star) === -1) distancex_star = -distancex_star;
                if(Math.sign(distancey_star) === -1) distancey_star = -distancey_star;

                while(distancex_star > 800 || distancey_star > 400) {
                    star1 = Math.floor(Math.random() * star.length);
                    distancex_star = star[star1].x - star[constt[ii - 1].star1].x;
                    distancey_star = star[star1].y - star[constt[ii - 1].star1].y;
                    if(Math.sign(distancex_star) === -1) distancex_star = -distancex_star;
                    if(Math.sign(distancey_star) === -1) distancey_star = -distancey_star;

                }


            }
            let x = star[star1.x];
            let y = star[star1.y];
            constt[ii] = { "x": x, "y": y, "star1": star1 }

            if(ii > 0) {
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(constt[ii-1].x, constt[ii-1].y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath() }
            ii++;
        }
        console.log("dd");
        this.constt = constt;
    }

    constellations.prototype.rewrite = function () {

        for(const i in this.constt) {
            if(i > 0) {
                ctx.globalAlpha = 0.6;
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.moveTo(star[this.constt[i - 1].star1].x, star[this.constt[i - 1].star1].y);
                ctx.lineTo(star[this.constt[i].star1].x, star[this.constt[i].star1].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    let i = 0;
    let star = [];
    let constellation = [];

    while (i < 50) {
        star[i] = new stars(Math.abs(Math.floor(Math.random() * 1900)), Math.abs(Math.floor(Math.random() * 1050)), Math.floor(Math.random() * 3)+1, 0, true);
        i++;
    }

    i = 0;
    while(i < 4) {
        constellation[i] = new constellations(4);
        i++;
    }

    function move() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for(const i in constellation) {
            constellation[i].rewrite();
        }
        for(const i in star) {
            star[i].move();
        }
    }

return setInterval(move, 0);

}
