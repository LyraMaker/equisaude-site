export function captureData() {
  let form = document.getElementById('ficha-form')
  let formData = new FormData(form)
  let data = {}

  formData.forEach((v, k) => data[k] = v)

  return data
}

export function verifyFields(data) {
  let allFilled = Object.values(data).every(value => value)
  let someFilled = Object.values(data).some(value => value)
  let msg;

  if (!allFilled && !someFilled) {
    msg = "Nenhum campo foi preenchido"
  }

  if (!allFilled && someFilled) {
    msg = "Há campos que não foram preenchidos"
  }

  if (allFilled) {
    msg = "Todos os campos foram preenchidos!"
  }

  return `<p class='text-center'>${msg}</p>`

}