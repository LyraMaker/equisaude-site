import * as bootstrap from 'bootstrap'
import html2pdf from 'html2pdf.js'
import "../css/estilo.scss"

import * as Print from './print.js'
import * as Data from './data.js'

import * as Database from './database.js'


const btnSave = document.querySelector("#salvar-btn");

const modalHTML = document.querySelector("#modal")
const modal = new bootstrap.Modal(modalHTML)
const msgModal = modalHTML.querySelector(".mensagem")
const savePdf = modalHTML.querySelector("#gerar-pdf");
const newSheet = modalHTML.querySelector("#nova-ficha")

let editandoId = null

Database.verifyCompatibility()

btnSave.addEventListener('click', async function (e) {
  e.preventDefault()

  var values = Data.captureData();
  var info = Data.verifyFieldsMessage(values)

  msgModal.innerHTML = info;

  if(Data.verifyAllFieldsFilled(values)){
    if (editandoId !== null) {
    await Database.update(editandoId, values) 
  } else {
    await Database.add(values)
  }
  }

  editandoId = null 

  Data.renderTabela()

  modal.show();

  savePdf.addEventListener('click', function (e) {
    e.preventDefault()

    var worker = html2pdf()
    var element = Print.generatePrint(values)
    var filename = Print.filename("ficha")

    worker.from(element).saveAs(filename)
  })

  newSheet.addEventListener('click', function (e) {
    window.location.reload()
  })
})

const btnListar = document.getElementById('btnListar')
const container = document.getElementById('containerTabela')

btnListar.addEventListener('click', async (e) => {
  e.preventDefault()


  if (container.innerHTML.trim() !== '') {
    container.innerHTML = ''
    return
  }

  Data.renderTabela()
})

document.addEventListener('click', async (e) => {


  if (e.target.classList.contains('pdf')) {
    const id = Number(e.target.dataset.id)
    let data = await Database.get(id)

    console.log(data, id)
    var worker = html2pdf()
    var element = Print.generatePrint(data)
    var filename = Print.filename("ficha")

    worker.from(element).saveAs(filename)
  }


  if (e.target.classList.contains('delete')) {
    const id = Number(e.target.dataset.id)

    await Database.remove(id)

    Data.renderTabela()
  }


  if (e.target.classList.contains('edit')) {
    const id = Number(e.target.dataset.id)

    const dados = await Database.get(id)

    if (!dados) return

    Object.keys(dados).forEach(key => {
      const campos = document.querySelectorAll(`[name="${key}"]`)

      if (!campos.length) return

      campos.forEach(campo => {
        if (campo.type === 'radio') {
          campo.checked = campo.value == dados[key]
        } else if (campo.tagName === 'SELECT') {
          campo.value = dados[key] || ''
        } else {
          campo.value = dados[key] || ''
        }
      })
    })

    editandoId = id

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

