<template>
  <div class="container">
    <canvas id="canvas" width="1200px" height="650px"></canvas>
  </div>
</template>

<script>
import Flappybird from "../Flappybird";
import { setInterval } from 'timers';
export default {
  name: "home",
  data() {
    return {
      flappy: null,
      scores: 0
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
