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



const SC = {
  cidade1: "Abdon Batista", cidade2: "Abelardo Luz", cidade3: "Agrolândia", cidade4: "Agronômica", cidade5: "Água Doce",
  cidade6: "Águas de Chapecó", cidade7: "Águas Frias", cidade8: "Águas Mornas", cidade9: "Alfredo Wagner", cidade10: "Alto Bela Vista",
  cidade11: "Anchieta", cidade12: "Angelina", cidade13: "Anita Garibaldi", cidade14: "Anitápolis", cidade15: "Antônio Carlos",
  cidade16: "Apiúna", cidade17: "Arabutã", cidade18: "Araquari", cidade19: "Araranguá", cidade20: "Armazém",
  cidade21: "Arroio Trinta", cidade22: "Ascura", cidade23: "Atalanta", cidade24: "Aurora", cidade25: "Balneário Arroio do Silva",
  cidade26: "Balneário Barra do Sul", cidade27: "Balneário Camboriú", cidade28: "Balneário Gaivota", cidade29: "Bandeirante", cidade30: "Barra Bonita",
  cidade31: "Barra Velha", cidade32: "Bela Vista do Toldo", cidade33: "Belmonte", cidade34: "Benedito Novo", cidade35: "Biguaçu",
  cidade36: "Blumenau", cidade37: "Bocaina do Sul", cidade38: "Bom Jardim da Serra", cidade39: "Bom Jesus", cidade40: "Bom Jesus do Oeste",
  cidade41: "Bom Retiro", cidade42: "Bombinhas", cidade43: "Botuverá", cidade44: "Braço do Norte", cidade45: "Braço do Trombudo",
  cidade46: "Brunópolis", cidade47: "Brusque", cidade48: "Caçador", cidade49: "Caibi", cidade50: "Calmon",
  cidade51: "Camboriú", cidade52: "Campo Alegre", cidade53: "Campo Belo do Sul", cidade54: "Campo Erê", cidade55: "Campos Novos",
  cidade56: "Canelinha", cidade57: "Canoinhas", cidade58: "Capão Alto", cidade59: "Capinzal", cidade60: "Capivari de Baixo",
  cidade61: "Catanduvas", cidade62: "Caxambu do Sul", cidade63: "Celso Ramos", cidade64: "Cerro Negro", cidade65: "Chapadão do Lageado",
  cidade66: "Chapecó", cidade67: "Cocal do Sul", cidade68: "Concórdia", cidade69: "Cordilheira Alta", cidade70: "Coronel Freitas",
  cidade71: "Coronel Martins", cidade72: "Correia Pinto", cidade73: "Corupá", cidade74: "Criciúma", cidade75: "Cunha Porã",
  cidade76: "Cunhataí", cidade77: "Curitibanos", cidade78: "Descanso", cidade79: "Dionísio Cerqueira", cidade80: "Dona Emma",
  cidade81: "Doutor Pedrinho", cidade82: "Entre Rios", cidade83: "Ermo", cidade84: "Erval Velho", cidade85: "Faxinal dos Guedes",
  cidade86: "Flor do Sertão", cidade87: "Florianópolis", cidade88: "Formosa do Sul", cidade89: "Forquilhinha", cidade90: "Fraiburgo",
  cidade91: "Frei Rogério", cidade92: "Galvão", cidade93: "Garopaba", cidade94: "Garuva", cidade95: "Gaspar",
  cidade96: "Governador Celso Ramos", cidade97: "Grão Pará", cidade98: "Gravatal", cidade99: "Guabiruba", cidade100: "Guaraciaba",
  cidade101: "Guaramirim", cidade102: "Guarujá do Sul", cidade103: "Guatambú", cidade104: "Herval d'Oeste", cidade105: "Ibiam",
  cidade106: "Ibicaré", cidade107: "Ibirama", cidade108: "Içara", cidade109: "Ilhota", cidade110: "Imaruí",
  cidade111: "Imbituba", cidade112: "Imbuia", cidade113: "Indaial", cidade114: "Iomerê", cidade115: "Ipira",
  cidade116: "Iporã do Oeste", cidade117: "Ipuaçu", cidade118: "Ipumirim", cidade119: "Iraceminha", cidade120: "Irani",
  cidade121: "Irati", cidade122: "Irineópolis", cidade123: "Itá", cidade124: "Itaiópolis", cidade125: "Itajaí",
  cidade126: "Itapema", cidade127: "Itapiranga", cidade128: "Itapoá", cidade129: "Ituporanga", cidade130: "Jaborá",
  cidade131: "Jacinto Machado", cidade132: "Jaguaruna", cidade133: "Jaraguá do Sul", cidade134: "Jardinópolis", cidade135: "Joaçaba",
  cidade136: "Joinville", cidade137: "José Boiteux", cidade138: "Jupiá", cidade139: "Lacerdópolis", cidade140: "Lages",
  cidade141: "Laguna", cidade142: "Lajeado Grande", cidade143: "Laurentino", cidade144: "Lauro Muller", cidade145: "Lebon Régis",
  cidade146: "Leoberto Leal", cidade147: "Lindóia do Sul", cidade148: "Lontras", cidade149: "Luiz Alves", cidade150: "Luzerna",
  cidade151: "Macieira", cidade152: "Mafra", cidade153: "Major Gercino", cidade154: "Major Vieira", cidade155: "Maracajá",
  cidade156: "Maravilha", cidade157: "Marema", cidade158: "Massaranduba", cidade159: "Matos Costa", cidade160: "Meleiro",
  cidade161: "Mirim Doce", cidade162: "Modelo", cidade163: "Mondaí", cidade164: "Monte Carlo", cidade165: "Monte Castelo",
  cidade166: "Morro da Fumaça", cidade167: "Morro Grande", cidade168: "Navegantes", cidade169: "Nova Erechim", cidade170: "Nova Itaberaba",
  cidade171: "Nova Trento", cidade172: "Nova Veneza", cidade173: "Novo Horizonte", cidade174: "Orleans", cidade175: "Otacílio Costa",
  cidade176: "Ouro", cidade177: "Ouro Verde", cidade178: "Paial", cidade179: "Painel", cidade180: "Palhoça",
  cidade181: "Palma Sola", cidade182: "Palmeira", cidade183: "Palmitos", cidade184: "Papanduva", cidade185: "Paraíso",
  cidade186: "Passo de Torres", cidade187: "Passos Maia", cidade188: "Paulo Lopes", cidade189: "Pedras Grandes", cidade190: "Penha",
  cidade191: "Peritiba", cidade192: "Pescaria Brava", cidade193: "Petrolândia", cidade194: "Pinhalzinho", cidade195: "Pinheiro Preto",
  cidade196: "Piratuba", cidade197: "Planalto Alegre", cidade198: "Pomerode", cidade199: "Ponte Alta", cidade200: "Ponte Alta do Norte",
  cidade201: "Ponte Serrada", cidade202: "Porto Belo", cidade203: "Porto União", cidade204: "Pouso Redondo", cidade205: "Praia Grande",
  cidade206: "Presidente Castello Branco", cidade207: "Presidente Getúlio", cidade208: "Presidente Nereu", cidade209: "Princesa", cidade210: "Quilombo",
  cidade211: "Rancho Queimado", cidade212: "Rio das Antas", cidade213: "Rio do Campo", cidade214: "Rio do Oeste", cidade215: "Rio do Sul",
  cidade216: "Rio dos Cedros", cidade217: "Rio Fortuna", cidade218: "Rio Negrinho", cidade219: "Rio Rufino", cidade220: "Riqueza",
  cidade221: "Rodeio", cidade222: "Romelândia", cidade223: "Salete", cidade224: "Saltinho", cidade225: "Salto Veloso",
  cidade226: "Sangão", cidade227: "Santa Cecília", cidade228: "Santa Helena", cidade229: "Santa Rosa de Lima", cidade230: "Santa Rosa do Sul",
  cidade231: "Santa Terezinha", cidade232: "Santa Terezinha do Progresso", cidade233: "Santiago do Sul", cidade234: "Santo Amaro da Imperatriz", cidade235: "São Bento do Sul",
  cidade236: "São Bernardino", cidade237: "São Bonifácio", cidade238: "São Carlos", cidade239: "São Cristóvão do Sul", cidade240: "São Domingos",
  cidade241: "São Francisco do Sul", cidade242: "São João Batista", cidade243: "São João do Itaperiú", cidade244: "São João do Oeste", cidade245: "São João do Sul",
  cidade246: "São Joaquim", cidade247: "São José", cidade248: "São José do Cedro", cidade249: "São José do Cerrito", cidade250: "São Lourenço do Oeste",
  cidade251: "São Ludgero", cidade252: "São Martinho", cidade253: "São Miguel da Boa Vista", cidade254: "São Miguel do Oeste", cidade255: "São Pedro de Alcântara",
  cidade256: "Saudades", cidade257: "Schroeder", cidade258: "Seara", cidade259: "Serra Alta", cidade260: "Siderópolis",
  cidade261: "Sombrio", cidade262: "Sul Brasil", cidade263: "Taió", cidade264: "Tangará", cidade265: "Tigrinhos",
  cidade266: "Tijucas", cidade267: "Timbé do Sul", cidade268: "Timbó", cidade269: "Timbó Grande", cidade270: "Três Barras",
  cidade271: "Treviso", cidade272: "Treze de Maio", cidade273: "Treze Tílias", cidade274: "Trombudo Central", cidade275: "Tubarão",
  cidade276: "Tunápolis", cidade277: "Turvo", cidade278: "União do Oeste", cidade279: "Urubici", cidade280: "Urupema",
  cidade281: "Urussanga", cidade282: "Vargeão", cidade283: "Vargem", cidade284: "Vargem Bonita", cidade285: "Vidal Ramos",
  cidade286: "Videira", cidade287: "Vitor Meireles", cidade288: "Witmarsum", cidade289: "Xanxerê", cidade290: "Xavantina",
  cidade291: "Xaxim", cidade292: "Zortéa", cidade293: "Bandeirante", cidade294: "Barra Velha", cidade295: "Zortea"
};
