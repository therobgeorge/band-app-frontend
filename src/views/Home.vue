<template>
  <div class="home">
    <div class="slider fullwidthbanner-container roundedcorners">
      <div class="fullwidthbanner">
        <ul class="hide">
          <!-- SLIDE  -->
          <li data-transition="fade" data-slotamount="14" data-masterspeed="300" data-delay="10000">
            <!-- COVER IMAGE -->
            <img
              src="assets/images/1x1.png"
              data-lazyload="/my-images/mitski.jpg"
              alt=""
              data-bgfit="cover"
              data-bgposition="left top"
              data-bgrepeat="no-repeat"
            />
            <!-- 
            <div
              class="tp-caption medium_text lfl stl"
              data-x="63"
              data-y="200"
              data-speed="300"
              data-start="500"
              data-easing="easeOutExpo"
            >
              EPONA TEMPLATE
            </div>

            <div
              class="tp-caption large_bold_white sft stb"
              data-x="60"
              data-y="223"
              data-speed="300"
              data-start="1000"
              data-easing="easeOutExpo"
            >
              MULTIPURPOSE
            </div>

            <div
              class="tp-caption italic small_light_white sft stb"
              data-x="63"
              data-y="286"
              data-speed="500"
              data-start="2000"
              data-easing="easeOutExpo"
            >
              Marketing &bull; Design &bull; Multipurpose
            </div>

            <div
              class="tp-caption sft medium_light_white"
              data-x="600"
              data-y="60"
              data-speed="600"
              data-start="1500"
              data-easing="easeOutExpo"
            ></div> -->
          </li>
        </ul>
        <div class="tp-bannertimer"></div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {},
  methods: {},
};
</script>
