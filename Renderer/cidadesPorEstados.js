(function() {
  const setEstado = document.getElementById('uf');
  const inputCidade = document.getElementById('cidade');

  const optionsUF = [
    "Selecione", 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
    'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const cidadesPorEstado = {
    "AC": ["Acrelândia", "Assis Brasil", "Brasiléia", "Cruzeiro do Sul", "Epitaciolândia"],
    "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Penedo", "Rio Largo"],
    "AP": ["Macapá", "Santana", "Laranjal do Jari", "Mazagão", "Oiapoque"],
    "AM": ["Manaus", "Parintins", "Itacoatiara", "Coari", "Tefé"],
    "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro"],
    "CE": ["Fortaleza", "Caucaia", "Sobral", "Crato", "Iguatu"],
    "DF": ["Brasília", "Gama", "Taguatinga", "Ceilândia", "Sobradinho"],
    "ES": ["Vitória", "Vila Velha", "Serra", "Cariacica", "Guarapari"],
    "GO": ["Goiânia", "Anápolis", "Aparecida de Goiânia", "Rio Verde", "Luziânia"],
    "MA": ["São Luís", "Imperatriz", "Timon", "Caxias", "Bacabal"],
    "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
    "MS": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
    "MG": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Montes Claros"],
    "PA": ["Belém", "Ananindeua", "Marabá", "Santarem", "Altamira"],
    "PB": ["João Pessoa", "Campina Grande", "Patos", "Bayeux", "Santa Rita"],
    "PR": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Foz do Iguaçu"],
    "PE": ["Recife", "Olinda", "Jaboatão dos Guararapes", "Caruaru", "Petrolina"],
    "PI": ["Teresina", "Parnaíba", "Picos", "Floriano", "Oeiras"],
    "RJ": ["Rio de Janeiro", "Niterói", "Nova Iguaçu", "Duque de Caxias", "São Gonçalo"],
    "RN": ["Natal", "Mossoró", "Parnamirim", "Caicó", "Currais Novos"],
    "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
    "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Cacoal", "Rolim de Moura"],
    "RR": ["Boa Vista", "Rorainópolis", "Caracaraí", "Iranduba", "Mucajaí"],
   "SC": [
      "Abdon Batista", "Abelardo Luz", "Agrolândia", "Agronômica", "Água Doce", "Águas de Chapecó", "Águas Frias", "Águas Mornas", "Alfredo Wagner", "Alto Bela Vista",
      "Anchieta", "Angelina", "Anita Garibaldi", "Anitápolis", "Antônio Carlos", "Apiúna", "Arabutã", "Araquari", "Araranguá", "Armazém",
      "Arroio Trinta", "Ascura", "Atalanta", "Aurora", "Balneário Arroio do Silva", "Balneário Barra do Sul", "Balneário Camboriú", "Balneário Gaivota", "Bandeirante", "Barra Bonita",
      "Barra Velha", "Bela Vista do Toldo", "Belmonte", "Benedito Novo", "Biguaçu", "Blumenau", "Bocaina do Sul", "Bom Jardim da Serra", "Bom Jesus", "Bom Jesus do Oeste",
      "Bom Retiro", "Bombinhas", "Botuverá", "Braço do Norte", "Braço do Trombudo", "Brunópolis", "Brusque", "Caçador", "Caibi", "Calmon",
      "Camboriú", "Campo Alegre", "Campo Belo do Sul", "Campo Erê", "Campos Novos", "Canelinha", "Canoinhas", "Capão Alto", "Capinzal", "Capivari de Baixo",
      "Catanduvas", "Caxambu do Sul", "Celso Ramos", "Cerro Negro", "Chapadão do Lageado", "Chapecó", "Cocal do Sul", "Concórdia", "Cordilheira Alta", "Coronel Freitas",
      "Coronel Martins", "Correia Pinto", "Corupá", "Criciúma", "Cunha Porã", "Cunhataí", "Curitibanos", "Descanso", "Dionísio Cerqueira", "Dona Emma",
      "Doutor Pedrinho", "Entre Rios", "Ermo", "Erval Velho", "Faxinal dos Guedes", "Flor do Sertão", "Florianópolis", "Formosa do Sul", "Forquilhinha", "Fraiburgo",
      "Frei Rogério", "Galvão", "Garopaba", "Garuva", "Gaspar", "Governador Celso Ramos", "Grão Pará", "Gravatal", "Guabiruba", "Guaraciaba",
      "Guaramirim", "Guarujá do Sul", "Guatambú", "Herval d'Oeste", "Ibiam", "Ibicaré", "Ibirama", "Içara", "Ilhota", "Imaruí",
      "Imbituba", "Imbuia", "Indaial", "Iomerê", "Ipira", "Iporã do Oeste", "Ipuaçu", "Ipumirim", "Iraceminha", "Irani",
      "Irati", "Irineópolis", "Itá", "Itaiópolis", "Itajaí", "Itapema", "Itapiranga", "Itapoá", "Ituporanga", "Jaborá",
      "Jacinto Machado", "Jaguaruna", "Jaraguá do Sul", "Jardinópolis", "Joaçaba", "Joinville", "José Boiteux", "Jupiá", "Lacerdópolis", "Lages",
      "Laguna", "Lajeado Grande", "Laurentino", "Lauro Muller", "Lebon Régis", "Leoberto Leal", "Lindóia do Sul", "Lontras", "Luiz Alves", "Luzerna",
      "Macieira", "Mafra", "Major Gercino", "Major Vieira", "Maracajá", "Maravilha", "Marema", "Massaranduba", "Matos Costa", "Meleiro",
      "Mirim Doce", "Modelo", "Mondaí", "Monte Carlo", "Monte Castelo", "Morro da Fumaça", "Morro Grande", "Navegantes", "Nova Erechim", "Nova Itaberaba",
      "Nova Trento", "Nova Veneza", "Novo Horizonte", "Orleans", "Otacílio Costa", "Ouro", "Ouro Verde", "Paial", "Painel", "Palhoça",
      "Palma Sola", "Palmeira", "Palmitos", "Papanduva", "Paraíso", "Passo de Torres", "Passos Maia", "Paulo Lopes", "Pedras Grandes", "Penha",
      "Peritiba", "Pescaria Brava", "Petrolândia", "Pinhalzinho", "Pinheiro Preto", "Piratuba", "Planalto Alegre", "Pomerode", "Ponte Alta", "Ponte Alta do Norte",
      "Ponte Serrada", "Porto Belo", "Porto União", "Pouso Redondo", "Praia Grande", "Presidente Castello Branco", "Presidente Getúlio", "Presidente Nereu", "Princesa", "Quilombo",
      "Rancho Queimado", "Rio das Antas", "Rio do Campo", "Rio do Oeste", "Rio do Sul", "Rio dos Cedros", "Rio Fortuna", "Rio Negrinho", "Rio Rufino", "Riqueza",
      "Rodeio", "Romelândia", "Salete", "Saltinho", "Salto Veloso", "Sangão", "Santa Cecília", "Santa Helena", "Santa Rosa de Lima", "Santa Rosa do Sul",
      "Santa Terezinha", "Santa Terezinha do Progresso", "Santiago do Sul", "Santo Amaro da Imperatriz", "São Bento do Sul", "São Bernardino", "São Bonifácio", "São Carlos", "São Cristóvão do Sul", "São Domingos",
      "São Francisco do Sul", "São João Batista", "São João do Itaperiú", "São João do Oeste", "São João do Sul", "São Joaquim", "São José", "São José do Cedro", "São José do Cerrito", "São Lourenço do Oeste",
      "São Ludgero", "São Martinho", "São Miguel da Boa Vista", "São Miguel do Oeste", "São Pedro de Alcântara", "Saudades", "Schroeder", "Seara", "Serra Alta", "Siderópolis",
      "Sombrio", "Sul Brasil", "Taió", "Tangará", "Tigrinhos", "Tijucas", "Timbé do Sul", "Timbó", "Timbó Grande", "Três Barras",
      "Treviso", "Treze de Maio", "Treze Tílias", "Trombudo Central", "Tubarão", "Tunápolis", "Turvo", "União do Oeste", "Urubici", "Urupema",
      "Urussanga", "Vargeão", "Vargem", "Vargem Bonita", "Vidal Ramos", "Videira", "Vitor Meireles", "Witmarsum", "Xanxerê", "Xavantina",
      "Xaxim", "Zortéa", "Bandeirante", "Barra Velha", "Zortea"
     ],
    "SP": ["São Paulo", "Campinas", "São Bernardo do Campo", "Santo André", "São José dos Campos"],
    "SE": ["Aracaju", "Lagarto", "Nossa Senhora do Socorro", "Estância", "Propriá"],
    "TO": ["Palmas", "Araguaína", "Gurupi", "Tocantinópolis", "Paraíso do Tocantins"],
  };

  // Preenche o select de UF com as opções
  optionsUF.forEach(function(uf) {
    const option = document.createElement('option');
    option.value = uf;
    option.textContent = uf;
    setEstado.appendChild(option);
  });

  // Função para atualizar as cidades conforme o estado selecionado
  function atualizarCidades() {
    const estadoSelecionado = setEstado.value;
    const cidades = cidadesPorEstado[estadoSelecionado] || [];

    // Limpa o select de cidades antes de preencher
    inputCidade.innerHTML = '';

    // Adiciona a opção padrão "Selecione"
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.textContent = 'Selecione';
    inputCidade.appendChild(optionDefault);

    // Adiciona as opções de cidade baseadas no estado selecionado
    cidades.forEach(function(cidade) {
      const option = document.createElement('option');
      option.value = cidade;
      option.textContent = cidade;
      inputCidade.appendChild(option);
    });
  }

  // Atualiza as cidades sempre que o estado for alterado
  setEstado.addEventListener('change', atualizarCidades);

  // Inicializa as cidades no caso de já haver um estado selecionado
  atualizarCidades();
})();
