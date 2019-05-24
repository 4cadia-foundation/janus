<template>
  <div class="container">
    <h1>{{title}}</h1>
    <div class="content">
      <div class="col col-image">
        <div class="left">
          <h2 class="subtitle">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</h2>
          <p class="text">Suspendisse potenti. Integer mattis est est, non rhoncus nisl scelerisque eget. Maecenas mollis arcu quis sollicitudin pulvinar. Mauris nec mi luctus, aliquet mi sed, luctus diam. Phasellus auctor sagittis lorem, quis varius nisl elementum vitae. Donec eleifend nisl lectus. Fusce cursus elit at libero pulvinar euismod. Praesent non lobortis est, quis auctor felis. Aliquam ac tempor felis, in condimentum eros. Maecenas sodales bibendum elit sit amet imperdiet. Pellentesque nec massa eget nibh feugiat convallis. Etiam a mollis est, vitae feugiat libero.</p>
        </div>
      </div>
      <div class="col col-list">
        <h2 class="subtitle">Curabitur non consectetur ipsum</h2>
        <div class="list-icon">
          <div class="icon" style="font-size: 90px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20.5 19h-17c-.55 0-1 .45-1 1s.45 1 1 1h17c.55 0 1-.45 1-1s-.45-1-1-1zm1.57-9.36c-.22-.8-1.04-1.27-1.84-1.06L14.92 10 8.46 3.98c-.27-.26-.66-.35-1.02-.25-.68.19-1 .97-.65 1.58l3.44 5.96-4.97 1.33-1.57-1.24c-.25-.19-.57-.26-.88-.18l-.33.09c-.32.08-.47.45-.3.73l1.88 3.25c.23.39.69.58 1.12.47L21 11.48c.8-.22 1.28-1.04 1.07-1.84z"/></svg>
          </div>
          <h5>Universal</h5>
        </div>
        <div class="list-icon">
          <div class="icon" style="font-size: 90px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4zm6 5H6v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"/></svg>
          </div>
          <h5>Peer to Peer</h5>
        </div>
        <div class="list-icon">
          <div class="icon" style="font-size: 90px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/></svg>
          </div>
          <h5>Safety</h5>
        </div>
        <div class="list-icon">
          <div class="icon" style="font-size: 90px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98 9.98-4.47 9.98-9.98S17.51 2.02 12 2.02zm-.52 15.86v-4.14H8.82c-.37 0-.62-.4-.44-.73l3.68-7.17c.23-.47.94-.3.94.23v4.19h2.54c.37 0 .61.39.45.72l-3.56 7.12c-.24.48-.95.31-.95-.22z"/></svg>
          </div>
          <h5>Fast</h5>
        </div>
      </div>
      <div class="col col-bg">
        <img src="https://http2.mlstatic.com/comprar-013-ethereum-eth-promoco-envio-no-mesmo-dia-D_NQ_NP_885660-MLB27392257434_052018-F.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      title: 'About Janus Plataform'
    }
  },
  components: {}
}
</script>

<style scoped>
.content {
  width: 90%;
  margin: auto;
}

.col {
  position: relative;
}

.col-image {
  margin: 0 auto;
  max-width: 1145px;
  height: 300px;
  background: rgba(0, 0, 0, 0) url('https://about.qwant.com/wp-content/themes/qwomcenter/images/array-x1.png') no-repeat scroll 100% top;
  background-size: contain;
  margin-top: 100px;
}

.col-list {
  margin: 50px 0 100px;
}

.list-icon {
  display: inline-block;
  width: 100px;
  margin: auto 100px;
}

.icon svg {
  width: 100%;
  height: auto;
}

.left {
  max-width: 500px;
  width: 45%;
}

.subtitle {
  color: #424242;
  margin: 50px 0;
  font-family: sans-serif;
  font-weight: 100;
  font-size: 25px;
}

.col-image img {
  position: absolute;
  z-index: -1;
  right: 0;
  top: 0;
  width: auto;
  height: 100%;
}

.text {
  color: #cccccc;
  text-align: justify;
}

.col-bg {
  width: 60%;
  margin: auto auto 100px;
}

.col-bg img {
  width: 100%;
}

</style>
