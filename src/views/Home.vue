<template>
  <div class="container">
    <canvas id="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script>
import Flappybird from "../Flappybird";
export default {
  name: "home",
  data() {
    return {
      flappy: null,
      scores: 0,
      fps: 0
    }
  },
  methods: {
    initFlappy() {
      let cvs = document.getElementById("canvas");
      let ctx = cvs.getContext("2d");

      this.flappy = new Flappybird(ctx, cvs);
      window.onload = () => {
        this.flappy.draw();
      };
      var before,now,fps;
      before=Date.now();
      fps=0;
      requestAnimationFrame(
          function loop(){
              now=Date.now();
              fps=Math.round(1000/(now-before));
              before=now;
              requestAnimationFrame(loop);
              console.log("fps",fps)
          }
      );
    }
  },
  mounted() {
    this.initFlappy();
    document.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {
          this.flappy.bird_Fly()
        }
      e.preventDefault()
    });
    document.addEventListener('click', (e) => {
        this.flappy.bird_Fly()
      e.preventDefault()
    });
    document.addEventListener('touchstart', (e) => {
        this.flappy.bird_Fly()
      e.preventDefault()
    });
  }
};
</script>
<style>

</style>
