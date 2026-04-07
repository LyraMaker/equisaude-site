export function generatePrint(data) {
  return `
  <div style="width:680px; margin:0 auto;">
    <table border="1" cellpadding="6" cellspacing="0" style="width:100%; font-size:13px; border-collapse:collapse;">
      
      <thead style="background-color:#e0e0e0;">
        <tr><th colspan="4" style="text-align:center;">1. Dados de Identificação</th></tr>
      </thead>
      <tbody>
        <tr><th style="width:25%;">Nome do Paciente</th><td style="width:25%;">${data.nome_paciente}</td>
            <th style="width:25%;">Peso (kg)</th><td style="width:25%;">${data.peso}</td></tr>
        <tr><th>Idade</th><td>${data.idade}</td>
            <th>Sexo</th><td>${data.sexo}</td></tr>
        <tr><th>Raça</th><td>${data.raca}</td>
            <th>Pelagem</th><td>${data.pelagem}</td></tr>
        <tr><th>Proprietário</th><td>${data.proprietario}</td>
            <th>Telefone</th><td>${data.telefone}</td></tr>
        <tr><th>E-mail</th><td>${data.email}</td>
            <th>Cidade</th><td>${data.cidade}</td></tr>
      </tbody>

      <thead style="background-color:#e0e0e0;">
        <tr><th colspan="4" style="text-align:center;">2. Manejo Alimentar e Sanidade</th></tr>
      </thead>
      <tbody>
        <tr><th>Volumoso - Tipo e quantidade</th><td colspan="3">${data.volumoso_tipo} - ${data.volumoso_quantidade}</td></tr>
        <tr><th>Concentrado - Tipo e quantidade</th><td colspan="3">${data.concentrado_tipo} - ${data.concentrado_quantidade}</td></tr>
        <tr><th>Ingestão de água</th><td>${data.agua}</td>
            <th>Sal mineral</th><td>${data.sal_mineral == 1 ? 'Sim - ' + data.sal_quantidade : 'Não'}</td></tr>
        <tr><th>Suplementos</th><td colspan="3">${data.suplementos}</td></tr>
        <tr><th>Vacinação</th><td>${data.vacinacao}</td>
            <th>Vermifugação</th><td>${data.vermifugacao == 1 ? 'Sim' : 'Não'}</td></tr>
        <tr><th>Treinamento</th><td colspan="3">${data.treinamento == 1 ? 'Sim' : 'Não'}</td></tr>
      </tbody>

      <thead style="background-color:#e0e0e0;">
        <tr><th colspan="4" style="text-align:center;">3. Exame Físico Geral</th></tr>
      </thead>
      <tbody>
        <tr><th>Escore de condição corporal</th><td>${data.escore_condicao_corporal}</td>
            <th>Estado geral</th><td>${data.estado_geral}</td></tr>
        <tr><th>Nível de consciência</th><td>${data.nivel_consciencia}</td>
            <th>Comportamento</th><td>${data.comportamento}</td></tr>
        <tr><th>Postura</th><td>${data.postura}</td>
            <th>Temperatura</th><td>${data.temperatura}</td></tr>
        <tr><th>Motilidade</th><td>${data.motilidade}</td>
            <th>Mucosas</th><td>${data.mucosas}</td></tr>
        <tr><th>Hidratação</th><td>${data.hidratacao}</td>
            <th>TPC</th><td>${data.tpc}</td></tr>
        <tr><th>FC</th><td>${data.fc}</td>
            <th>FR</th><td>${data.fr}</td></tr>
        <tr><th>Pulso arterial</th><td>${data.pulso}</td>
            <th>Linfonodos</th><td>${data.linfonodos}</td></tr>
        <tr><th>Ectoparasitas</th><td>${data.ectoparasitas == 1 ? 'Sim' : 'Não'}</td>
            <th>Cascos</th><td>${data.cascos}</td></tr>
      </tbody>

<thead style="background-color:#e0e0e0;">
  <tr><th colspan="4" style="text-align:center;">4. Anamnese Específica e Condições Adicionais</th></tr>
</thead>
<tbody>
  <tr>
    <th><strong>Condições</strong></th>
    <td colspan="3">
      <strong>Ferrageamento:</strong> ${data.ferrageamento == 1 ? 'Sim' : 'Não'} |
      <strong>Claudicação:</strong> ${data.claudicacao == 1 ? 'Sim' : 'Não'} |
      <strong>Ferimentos:</strong> ${data.ferimentos == 1 ? 'Sim' : 'Não'}
    </td>
  </tr>
</tbody>

<thead style="background-color:#e0e0e0;">
  <tr><th colspan="4" style="text-align:center;">5. Avaliação da Dor</th></tr>
</thead>
<tbody>
  <tr>
    <th colspan="1"><strong>Indicadores</strong></th>
    <td colspan="3">
      <strong>Orelhas rígidas apontadas para trás:</strong> ${data.dor_orelhas || '0'} / 3 |
      <strong>Aperto orbital:</strong> ${data.dor_aperto_orbital || '0'} / 3 |
      <strong>Tensão na região superior dos olhos:</strong> ${data.dor_tensao_olhos || '0'} / 3 |
      <strong>Músculos mastigatórios tensos e proeminentes:</strong> ${data.dor_musculos_mastigatorios || '0'} / 3 |
      <strong>Boca tensa e queixo proeminente:</strong> ${data.dor_boca_queixo || '0'} / 3 |
      <strong>Narinas tensas e perfil achatado:</strong> ${data.dor_narinas || '0'} / 3
    </td>
  </tr>
</tbody>

      <thead style="background-color:#e0e0e0;">
        <tr><th colspan="4" style="text-align:center;">6. Observações</th></tr>
      </thead>
      <tbody>
        <tr><td colspan="4">${data.observacoes}</td></tr>
      </tbody>
    </table>
  </div>
  `
}

export function filename(prefixo) {
  const agora = new Date();
  const year = agora.getFullYear();
  const month = String(agora.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const day = String(agora.getDate()).padStart(2, '0');
  const hours = String(agora.getHours()).padStart(2, '0');
  const minutes = String(agora.getMinutes()).padStart(2, '0');
  const seconds = String(agora.getSeconds()).padStart(2, '0');

  return `${prefixo}-${year}${month}${day}-${hours}${minutes}${seconds}`;
}


