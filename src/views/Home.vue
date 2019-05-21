<template>
  <div class="container">
    <canvas ref="canvas" id="canvas" width="400" height="505"></canvas>
  </div>
</template>

<script>
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Flappybird from "../Flappybird";
export default {
  name: "home",
  methods: {
    initFlappy() {
      let cvs = document.getElementById("canvas");
      let ctx = cvs.getContext("2d");

      let flappy = new Flappybird(ctx, cvs);
      window.onload = () => {
        flappy.draw();
      };
    }
  },
  mounted() {
    this.initFlappy();
  }
};
</script>
<style>
.container {
  background: black;
}
</style>
