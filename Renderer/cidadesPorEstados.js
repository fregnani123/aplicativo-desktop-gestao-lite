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
  "SC": ["Florianópolis", "Joinville", "Blumenau", "Chapecó", "Itajaí"],
  "SP": ["São Paulo", "Campinas", "São Bernardo do Campo", "Santo André", "São José dos Campos"],
  "SE": ["Aracaju", "Lagarto", "Nossa Senhora do Socorro", "Estância", "Propriá"],
  "TO": ["Palmas", "Araguaína", "Gurupi", "Tocantinópolis", "Paraíso do Tocantins"],
};




  
  