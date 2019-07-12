const xbdm = require('xbdm.js');
let connected = false;


window.addEventListener('DOMContentLoaded', () => {


    let connectBtn = document.getElementById('connect');
    let disconnectBtn = document.getElementById('disconnect');
    let sendMemory = document.getElementById('sendMem');
    let getMemory = document.getElementById('getMem');
    let convert2Int = document.getElementById('convert2Int');
    let convert2Str = document.getElementById('convert2Str');

    connectBtn.addEventListener('click', (ev) => {
        if (connected == false) {
            let value = document.getElementById('connect_value').value;
            if (value.length > 0) {
                xbdm.connect(value).then(() => {
                    connected = !connected;
                    document.querySelector('#temp_gauge_wrapper').style.visibility = "visible";
                    GetTempInfo();
                }).catch(console.log);
            }
        }
    }, false);

    disconnectBtn.addEventListener('click', (ev) => {
        if (connected == true) {
            xbdm.disconnect().then(() => {
                connected = !connected;
                document.querySelector('#temp_gauge_wrapper').style.visibility = "hidden";
                document.querySelector('#send_memory').style.visibility = "hidden";
                document.querySelector('#get_memory').style.visibility = "hidden";
                document.querySelector('#convert_value').style.visibility = "hidden";
            });
        }
    }, false);

    sendMemory.addEventListener('click', (ev) => {
        if (connected == true) {
            let addr = document.getElementById('setmem_address').value;
            let value = document.getElementById('setmem_address_value').value;
            if(addr.length > 0 && value.length > 0) {
                xbdm.setMemory(addr, value);
            }
        }
    }, false);

    getMemory.addEventListener('click', (ev) => {
        if (connected == true) {
            let addr = document.getElementById('getmem_address').value;
            let length = document.getElementById('getmem_address_length').value;
            let value = document.getElementById('getmem_address_value');
            if(addr.length > 0 && length.length > 0) {
                xbdm.getMemory(addr, length).then((result) => {
                    value.value = result; 
                }).catch(console.log);
            }
        }
    }, false);

    convert2Int.addEventListener('click', (ev) => {
        if (connected == true) {
            let hex = document.getElementById('convert_address').value;
            let value = document.getElementById('convert_address_value');
            if(hex.length > 0) {
                value.value = parseInt(hex, 16);
            }
        }
    }, false);

    convert2Str.addEventListener('click', (ev) => {
        if (connected == true) {
            let hex = document.getElementById('convert_address').value;
            let value = document.getElementById('convert_address_value');
            if(hex.length > 0) {
                value.value = Buffer.from(hex, "hex").toString();
            }
        }
    }, false);

    function GetTempInfo() {
        let cpu, gpu, edram, mb = 0;
        xbdm.getTemp(xbdm.Temperature.CPU).then((temp) => {
            cpu = temp;
            xbdm.getTemp(xbdm.Temperature.GPU).then((temp) => {
                gpu = temp;
                xbdm.getTemp(xbdm.Temperature.EDRAM).then((temp) => {
                    edram = temp;
                    xbdm.getTemp(xbdm.Temperature.MotherBoard).then((temp) => {
                        mb = temp;
                        document.querySelector('#cpu_temp > div').classList.add(`progress-${cpu}`);
                        document.querySelector('#cpu_temp > div > div').innerText = cpu;
                        document.querySelector('#gpu_temp > div').classList.add(`progress-${gpu}`);
                        document.querySelector('#gpu_temp > div > div').innerText = gpu;
                        document.querySelector('#edram_temp > div').classList.add(`progress-${edram}`);
                        document.querySelector('#edram_temp > div > div').innerText = edram;
                        document.querySelector('#mb_temp > div').classList.add(`progress-${mb}`);
                        document.querySelector('#mb_temp > div > div').innerText = mb;
                        document.querySelector('#send_memory').style.visibility = "visible";
                        document.querySelector('#get_memory').style.visibility = "visible";
                        document.querySelector('#convert_value').style.visibility = "visible";
                    });
                });
            });
        });
    }
});