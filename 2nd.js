/* ===== 2nd Anniversary: script ===== */
(function () {
    var OK = ['10252024', '102524', '25102024', '251024'];
    var pin = document.getElementById('pin');
    var err = document.getElementById('err');
    document.getElementById('lockForm').onsubmit = function (e) {
        e.preventDefault();
        var v = pin.value.replace(/\D/g, '');
        if (OK.indexOf(v) > -1) {
            document.body.classList.remove('locked');
            window.scrollTo(0, 0);
        } else {
            err.textContent = 'That’s not it. Try again.';
            pin.select();
        }
    };
    pin.focus();
    var fx = document.getElementById('fx');
    var ctx = fx.getContext('2d');
    var W = 0;
    var H = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var sparks = [];
    var flakes = [];
    var raf = 0;
    var ac;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var COLORS = ['#ff4f98', '#ffb3d1', '#ffffff', '#ff8cc0', '#ffd166'];
    function size() {
        W = innerWidth;
        H = innerHeight;
        fx.width = W * dpr;
        fx.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    addEventListener('resize', size);
    function boom() {
        try {
            ac = ac || new (window.AudioContext || window.webkitAudioContext)();
            var t = ac.currentTime;
            var o = ac.createOscillator();
            var g = ac.createGain();
            o.frequency.setValueAtTime(140, t);
            o.frequency.exponentialRampToValueAtTime(30, t + .3);
            g.gain.setValueAtTime(.3, t);
            g.gain.exponentialRampToValueAtTime(.001, t + .35);
            o.connect(g);
            g.connect(ac.destination);
            o.start(t);
            o.stop(t + .4);
        }
        catch (e) {
        }
    }
    function burst(x, y) {
        var c = COLORS[Math.random() * COLORS.length | 0];
        for (var i = 0; i < 60; i++) {
            var a = Math.random() * 6.283;
            var s = 1 + Math.random() * 4.5;
            sparks.push({
                x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: c
            });
        }
        boom();
    }
    function snow(x, y) {
        for (var i = 0; i < 28; i++) {
            flakes.push({
                x: x + (Math.random() - .5) * 60, y: y + (Math.random() - .5) * 30, vx: (Math.random() - .5) * 1.6, vy: .6 + Math.random() * 1.6, r: 1.5 + Math.random() * 3, l: 1, ph: Math.random() * 6
            });
        }
    }
    function loop() {
        ctx.clearRect(0, 0, W, H);
        sparks = sparks.filter(function (p) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += .045;
            p.vx *= .985;
            p.l -= .011;
            if (p.l <= 0)
                return false;
            ctx.globalAlpha = p.l;
            ctx.fillStyle = p.c;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 6.283);
            ctx.fill();
            return true;
        });
        flakes = flakes.filter(function (f) {
            f.ph += .05;
            f.x += f.vx + Math.sin(f.ph) * .4;
            f.y += f.vy;
            f.l -= .004;
            if (f.l <= 0 || f.y > H + 10)
                return false;
            ctx.globalAlpha = Math.min(1, f.l * 1.6);
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, 6.283);
            ctx.fill();
            return true;
        });
        ctx.globalAlpha = 1;
        raf = (sparks.length || flakes.length) ? requestAnimationFrame(loop) : 0;
    }
    function go() {
        if (!raf)
            raf = requestAnimationFrame(loop);
    }
    var sp = document.getElementById('surprise');
    document.getElementById('surpriseBtn').onclick = function () {
        if (reduce) {
            sp.hidden = false;
            return;
        }
        var n = 0;
        var t = setInterval(function () {
            burst(W * (.15 + Math.random() * .7), H * (.12 + Math.random() * .4));
            go();
            if (++n >= 9)
                clearInterval(t);
        }, 330);
        setTimeout(function () {
            sp.hidden = false;
            burst(W / 2, H * .3);
            go();
        }, 2600);
    };
    document.getElementById('sclose').onclick = function () {
        sp.hidden = true;
    };
    document.addEventListener('pointerdown', function (e) {
        if (document.body.classList.contains('locked') || reduce)
            return;
        snow(e.clientX, e.clientY);
        go();
    });
    var START = new Date(2024, 9, 25, 0, 0, 0);
    var ids = ['y', 'mo', 'd', 'h', 'm', 's'].reduce(function (o, k) {
        o[k] = document.getElementById(k);
        return o;
    }, {});
    function tick() {
        var now = new Date();
        if (now < START) {
            now = START;
        }
        var mt = (now.getFullYear() - START.getFullYear()) * 12 + now.getMonth() - START.getMonth();
        var last = new Date(START.getFullYear(), START.getMonth() + mt, 25, 0, 0, 0);
        if (last > now) {
            mt--;
            last = new Date(START.getFullYear(), START.getMonth() + mt, 25, 0, 0, 0);
        }
        var ms = now - last;
        var sec = Math.floor(ms / 1000);
        ids.y.textContent = Math.floor(mt / 12);
        ids.mo.textContent = mt % 12;
        ids.d.textContent = Math.floor(sec / 86400);
        ids.h.textContent = Math.floor(sec % 86400 / 3600);
        ids.m.textContent = Math.floor(sec % 3600 / 60);
        ids.s.textContent = sec % 60;
        document.getElementById('total').textContent = Math.floor((now - START) / 86400000).toLocaleString() + ' days together so far';
    }
    tick();
    setInterval(tick, 1000);
    // ---------- Memories: photos (1.jpg to 6.jpg) and messages are written in the HTML ----------
    var tiles = document.querySelectorAll('.tile');
    var dlg = document.getElementById('dlg');
    var pic = document.getElementById('pic');
    var msg = document.getElementById('msg');
    var cmt = document.getElementById('cmt');
    var saved = {};
    var cur = 0;

    tiles.forEach(function (tile, i) {
        tile.addEventListener('click', function () {
            cur = i;
            show();
        });
    });

    function show() {
        var tile = tiles[cur];
        var photo = tile.querySelector('img');
        msg.textContent = tile.dataset.message;
        pic.innerHTML = '💗';
        if (photo) {
            var big = document.createElement('img');
            big.alt = photo.alt;
            big.src = photo.src;
            pic.appendChild(big);
        }
        cmt.value = saved[cur] || '';
        try {
            cmt.value = localStorage.getItem('cmt' + cur) || cmt.value;
        } catch (e) {
        }
        dlg.showModal();
    }

    cmt.oninput = function () {
        saved[cur] = cmt.value;
        try {
            localStorage.setItem('cmt' + cur, cmt.value);
        } catch (e) {
        }
    };

    document.getElementById('close').onclick = function () {
        dlg.close();
    };

    dlg.addEventListener('click', function (e) {
        if (e.target === dlg)
            dlg.close();
    });

    // ---------- Music: song.mp3 is set in the HTML ----------
    var audio = document.getElementById('audio');
    var songName = document.getElementById('songName');
    audio.addEventListener('error', function () {
        audio.hidden = true;
        songName.textContent = 'Our song will be here soon.';
    });
})();
