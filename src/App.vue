<!-- <template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
  name: 'index',
  data(){
    return {
      screenWidth: document.body.clientWidth,  //给它赋值个（个人理解为网页的宽度）
    }
  },
  mounted(){
      const that = this
      this.$nextTick(()=>{
          window.onresize = () => {
          return (() => {
           window.screenWidth = document.body.clientWidth
           that.screenWidth = window.screenWidth
          })()
        }
      })
     
  },
  watch: {
   screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            //console.log(that.screenWidth)
            // that.init()
            that.timer = false
          }, 400)
        }
   }
  }
}
</script>
<style lang="scss">
body{
  margin: 0;
}
p{margin: 0;padding: 0}
li{list-style: none;}
ul{padding: 0;margin: 0}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
 -->
 <template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    font,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    center,
    u,
    b,
    i {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-weight: normal;
        font-style: normal;
        font-size: 100%;
        font-family: inherit;
        vertical-align: baseline
    }

    html {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    html,
    body {
        -webkit-overflow-scrolling: touch;
        height: 100%;
        overflow-x: hidden;
    }

    body {
        line-height: 1;
        font-size: 0.14rem;
    }

    :focus {
        outline: 0
    }

    ol,
    ul {
        list-style: none
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    img {
        border: 0;
        width: 100%;
        max-width: 100% !important;
        vertical-align: middle;
    }

    input,
    textarea {
        margin: 0;
        padding: 0
    }

    a {
        text-decoration: none;
    }

    a:hover,
    a:focus {
        outline: none;
    }

    q:before,
    q:after {
        content: "";
    }
</style>
