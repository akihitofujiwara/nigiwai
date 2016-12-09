const VL = {
  slerp: function(v1, v2, t){
    return {
      x: v1.x * (1 - t) + v2.x * t,
      y: v1.y * (1 - t) + v2.y * t,
    };
  }
}
Polymer({
  is: "nigi-fx",
  attached: function(){
    this.initFx();
  },
  toRelative: function(pos){
    const rect = this.getBoundingClientRect();
    return {x: pos.x - rect.left, y: pos.y - rect.top};
  },
  spawn: function(data){
    let {src, dst} = data;
    src = this.toRelative(src);
    dst = this.toRelative(dst);
    console.log(src);
    console.log(dst);
    new ParticleSpline(this.demo, src, dst);
    // const max = random( 4, 8 );
    // for ( let j = 0; j < max; j++ ) {
    //   this.demo.spawn( dst.x, dst.y );
    // }
  },
  initFx: function() {
    var MAX_PARTICLES = 280;
    var COLOURS = [ '#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423' ];
    var particles = [];
    var pool = [];
    var demo = Sketch.create({
        container: document.getElementById( 'canvas-host' ),
        retina: 'auto'
    });
    this.demo = demo;
    demo.setup = function() {
        // // Set off some initial particles.
        // var i, x, y;
        // for ( i = 0; i < 20; i++ ) {
        //     x = ( demo.width * 0.5 ) + random( -100, 100 );
        //     y = ( demo.height * 0.5 ) + random( -100, 100 );
        //     demo.spawn( x, y );
        // }
    };
    demo.spawn = function( x, y ) {
        var particle, theta, force;
        if ( particles.length >= MAX_PARTICLES )
            pool.push( particles.shift() );
        particle = pool.length ? pool.pop() : new Particle();
        particle.init( x, y, random( 5, 40 ) );
        particle.wander = random( 0.5, 2.0 );
        particle.color = random( COLOURS );
        particle.drag = random( 0.9, 0.99 );
        theta = random( TWO_PI );
        force = random( 2, 8 );
        particle.vx = sin( theta ) * force;
        particle.vy = cos( theta ) * force;
        particles.push( particle );
    };
    demo.update = function() {
        var i, particle;
        for ( i = particles.length - 1; i >= 0; i-- ) {
            particle = particles[i];
            if ( particle.alive ) particle.move();
            else pool.push( particles.splice( i, 1 )[0] );
        }
    };
    demo.draw = function() {
        demo.globalCompositeOperation  = 'lighter';
        for ( var i = particles.length - 1; i >= 0; i-- ) {
            particles[i].draw( demo );
        }
    };
    // demo.mousemove = function() {
    //     var particle, theta, force, touch, max, i, j, n;
    //     for ( i = 0, n = demo.touches.length; i < n; i++ ) {
    //         touch = demo.touches[i], max = random( 1, 4 );
    //         for ( j = 0; j < max; j++ ) {
    //           demo.spawn( touch.x, touch.y );
    //         }
    //     }
    // };
  }
});

class ParticleSpline {
  constructor(demo, src, dst){
    console.log("constructor!");
    const NUM_POINTS = 10;
    const d = {x: dst.x - src.x, y: dst.y - src.y};
    const n = {x: d.y, y: d.x};
    this.demo = demo;
    this.p = [];
    for (let i = 0; i < NUM_POINTS; ++i) {
      this.p.push(VL.slerp(src, dst, i / (NUM_POINTS - 1)));
    }
    console.log(this.p);
    const max = random( 4, 8 );
    for (let i = 0; i < NUM_POINTS; i++) {
      for (let j = 0; j < max; j++) {
        this.demo.spawn( this.p[i].x, this.p[i].y );
      }
    }
  }

  move(){
  }
}
// ----------------------------------------
// Particle
// ----------------------------------------
function Particle( x, y, radius ) {
    this.init( x, y, radius );
}
Particle.prototype = {
    init: function( x, y, radius ) {
        this.alive = true;
        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 0.92;
        this.color = '#fff';
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.vx = 0.0;
        this.vy = 0.0;
    },
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.theta += random( -0.5, 0.5 ) * this.wander;
        this.vx += sin( this.theta ) * 0.1;
        this.vy += cos( this.theta ) * 0.1;
        this.radius *= 0.96;
        this.alive = this.radius > 0.5;
    },
    draw: function( ctx ) {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = this.color;
        ctx.fill();
    }
};
