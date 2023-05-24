<script setup>
import {Html5Qrcode} from "html5-qrcode";
import { defineEmits } from 'vue'

const emit = defineEmits(['qr'])

/* QR CODE */ 
const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText) => {
    /* handle success */
    document.getElementById("pip").play();
   // stopQr();
    emit('qr', decodedText)
};
const config = { 
  fps: 10,
  qrbox: {width: 300, height: 400},
};

html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);


function stopQr(){
  html5QrCode.stop().then((ignore) => {
  // QR Code scanning is stopped.
}).catch((err) => {
  // Stop failed, handle it.
});
}

</script>

<template>
    <div>
      <audio id="pip">
        <source src="../../public/pip.mp3">
      </audio>
    </div>
</template>