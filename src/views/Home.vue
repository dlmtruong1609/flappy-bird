<template>
  <div class="container">
    <canvas ref="canvas" id="canvas" width="300" height="512"></canvas>
  </div>
</template>

<script>
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Flappybird from "../Flappybird";
import MySprite from '../drawBird';
export default {
  name: "home",
  data() {
    return {
      flappy: null,
      scores: 0,
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
        this.flappy.bird_Fly()
      e.preventDefault()
    })
  }
};
</script>
<style>

</style>
