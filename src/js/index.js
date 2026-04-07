import * as bootstrap from 'bootstrap'
import html2pdf from 'html2pdf.js'
import "../css/estilo.scss"

import * as Print from './print.js'
import * as Data from './data.js'


const btnSave = document.querySelector("#salvar-btn");

const modalHTML = document.querySelector("#modal")
const modal = new bootstrap.Modal(modalHTML)
const msgModal = modalHTML.querySelector(".mensagem")
const savePdf = modalHTML.querySelector("#gerar-pdf");

btnSave.addEventListener('click', function (e) {
  e.preventDefault()

  var values = Data.captureData();
  var info = Data.verifyFields(values)

  msgModal.innerHTML = info;

  modal.show();

  savePdf.addEventListener('click', function(e){
    e.preventDefault()
    
    var worker = html2pdf()
    var element = Print.generatePrint(values)
    var filename = Print.filename("ficha")

    worker.from(element).saveAs(filename)
  })
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

