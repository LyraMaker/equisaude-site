import * as Database from './database.js'

export function captureData() {
  let form = document.getElementById('ficha-form')
  let formData = new FormData(form)
  let data = {}

  formData.forEach((v, k) => data[k] = v)

  return data
}

export function verifyFieldsMessage(data) {
  let allFilled = Object.values(data).every(value => value)
  let someFilled = Object.values(data).some(value => value)
  let msg;

  if (!allFilled && !someFilled) {
    msg = "Nenhum campo foi preenchido. Preencha <strong style='color:red'>todos os campos</strong> para registrar na aplicação."
  }

  if (!allFilled && someFilled) {
    msg = "Há campos que não foram preenchidos. Preencha <strong style='color:red'>todos os campos</strong> para registrar na aplicação."
  }

  if (allFilled) {
    msg = "Todos os campos foram preenchidos!"
  }

  return `<p class='text-center'>${msg}</p>`

}

export function verifyAllFieldsFilled(data) {
  let allFilled = Object.values(data).every(value => value)
  let someFilled = Object.values(data).some(value => value)


  if (!allFilled && !someFilled) {
    return false
  }

  if (!allFilled && someFilled) {
    return false
  }

  if (allFilled) {
    return true
  }

}

export async function renderTabela() {
  const container = document.getElementById('containerTabela')

  const dados = await Database.getAll()

  container.innerHTML = ''

  const table = document.createElement('table')
  table.className = 'table table-striped table-hover align-middle'

  const thead = document.createElement('thead')
  thead.className = 'table-dark'

  thead.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Propietário</th>
      <th>Peso</th>
      <th>Idade</th>
      <th>Sexo</th>
      <th>Raça</th>
      <th>Ações</th>
    </tr>
  `

  const tbody = document.createElement('tbody')

  if (!dados.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center text-muted">
          Nenhum registro encontrado
        </td>
      </tr>
    `
  } else {
    dados.forEach(item => {
      const tr = document.createElement('tr')

      tr.innerHTML = `
        <td>${item.nome_paciente || '-'}</td>
        <td>${item.proprietario || '-'}</td>
        <td>${item.peso || '-'}</td>
        <td>${item.idade || '-'}</td>
        <td>${item.sexo || '-'}</td>
        <td>${item.raca || '-'}</td>
        <td>
          <div class="d-flex flex-column flex-md-row gap-2">
            <button class="btn btn-danger btn-sm delete w-100 w-md-auto" data-id="${item.id}">
              Excluir
            </button>
            <button class="btn btn-info btn-sm w-100 w-md-auto pdf" data-id="${item.id}">
              PDF
            </button>
            <button class="btn btn-warning btn-sm edit" data-id="${item.id}">
            Editar
            </button>
          </div>
        </td>
      `

      tbody.appendChild(tr)
    })
  }

  table.appendChild(thead)
  table.appendChild(tbody)

  const wrapper = document.createElement('div')
  wrapper.className = 'table-responsive'
  wrapper.appendChild(table)

  container.appendChild(wrapper)
}