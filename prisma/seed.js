//import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import prisma from '../src/config/db.js';
import bcrypt from 'bcryptjs';
// ------------------------------
// RAW PLAYER DATA (your CSV)
// ------------------------------

async function main() {
  console.log('🌱 Seeding database...');


const data = [
  // [Confederation, Team, Player, Position, ShirtNumber]
  ["CONCACAF","United States","Matt Turner","GK",1],
  ["CONCACAF","United States","Sergiño Dest","DF",2],
  ["CONCACAF","United States","Chris Richards","DF",3],
  ["CONCACAF","United States","Cameron Carter-Vickers","DF",20],
  ["CONCACAF","United States","Antonee Robinson","DF",5],
  ["CONCACAF","United States","Tyler Adams","MF",4],
  ["CONCACAF","United States","Weston McKennie","MF",8],
  ["CONCACAF","United States","Yunus Musah","MF",6],
  ["CONCACAF","United States","Christian Pulisic","FW",10],
  ["CONCACAF","United States","Folarin Balogun","FW",9],
  ["CONCACAF","United States","Tim Weah","FW",21],

  ["CONCACAF","Mexico","Guillermo Ochoa","GK",13],
  ["CONCACAF","Mexico","Jorge Sánchez","DF",2],
  ["CONCACAF","Mexico","César Montes","DF",3],
  ["CONCACAF","Mexico","Johan Vásquez","DF",5],
  ["CONCACAF","Mexico","Jesús Gallardo","DF",23],
  ["CONCACAF","Mexico","Edson Álvarez","MF",4],
  ["CONCACAF","Mexico","Luis Chávez","MF",24],
  ["CONCACAF","Mexico","Orbelín Pineda","MF",17],
  ["CONCACAF","Mexico","Hirving Lozano","FW",22],
  ["CONCACAF","Mexico","Santiago Giménez","FW",11],
  ["CONCACAF","Mexico","Alexis Vega","FW",10],

  ["CONCACAF","Canada","Dayne St. Clair","GK",1],
  ["CONCACAF","Canada","Alistair Johnston","DF",2],
  ["CONCACAF","Canada","Moïse Bombito","DF",15],
  ["CONCACAF","Canada","Kamal Miller","DF",4],
  ["CONCACAF","Canada","Alphonso Davies","DF",19],
  ["CONCACAF","Canada","Stephen Eustáquio","MF",7],
  ["CONCACAF","Canada","Ismaël Koné","MF",8],
  ["CONCACAF","Canada","Jonathan Osorio","MF",21],
  ["CONCACAF","Canada","Jonathan David","FW",20],
  ["CONCACAF","Canada","Cyle Larin","FW",17],
  ["CONCACAF","Canada","Tajon Buchanan","FW",11],

  // --- AFC ---
  ["AFC","Australia","Mat Ryan","GK",1],
  ["AFC","Australia","Nathaniel Atkinson","DF",3],
  ["AFC","Australia","Harry Souttar","DF",19],
  ["AFC","Australia","Kye Rowles","DF",4],
  ["AFC","Australia","Aziz Behich","DF",16],
  ["AFC","Australia","Jackson Irvine","MF",22],
  ["AFC","Australia","Aiden O'Neill","MF",13],
  ["AFC","Australia","Riley McGree","MF",14],
  ["AFC","Australia","Martin Boyle","FW",6],
  ["AFC","Australia","Mitchell Duke","FW",15],
  ["AFC","Australia","Mathew Leckie","FW",7],

  ["AFC","Japan","Zion Suzuki","GK",23],
  ["AFC","Japan","Takehiro Tomiyasu","DF",16],
  ["AFC","Japan","Ko Itakura","DF",4],
  ["AFC","Japan","Hiroki Ito","DF",21],
  ["AFC","Japan","Yuto Nagatomo","DF",5],
  ["AFC","Japan","Wataru Endo","MF",6],
  ["AFC","Japan","Hidemasa Morita","MF",13],
  ["AFC","Japan","Daichi Kamada","MF",15],
  ["AFC","Japan","Takefusa Kubo","FW",20],
  ["AFC","Japan","Kaoru Mitoma","FW",7],
  ["AFC","Japan","Ayase Ueda","FW",9],
   
  ["AFC","South Korea","Kim Seung-gyu","GK",1],
  ["AFC","South Korea","Kim Min-jae","DF",4],
  ["AFC","South Korea","Kim Young-gwon","DF",19],
  ["AFC","South Korea","Seol Young-woo","DF",2],
  ["AFC","South Korea","Kim Jin-su","DF",3],
  ["AFC","South Korea","Hwang In-beom","MF",6],
  ["AFC","South Korea","Lee Kang-in","MF",18],
  ["AFC","South Korea","Jung Woo-young","MF",5],
  ["AFC","South Korea","Son Heung-min","FW",7],
  ["AFC","South Korea","Hwang Hee-chan","FW",11],
  ["AFC","South Korea","Cho Gue-sung","FW",9],

  ["AFC","Qatar","Meshaal Barsham","GK",22],
  ["AFC","Qatar","Pedro Miguel","DF",2],
  ["AFC","Qatar","Bassam Al-Rawi","DF",12],
  ["AFC","Qatar","Boualem Khoukhi","DF",16],
  ["AFC","Qatar","Homam Ahmed","DF",14],
  ["AFC","Qatar","Karim Boudiaf","MF",12],
  ["AFC","Qatar","Abdulaziz Hatem","MF",6],
  ["AFC","Qatar","Assim Madibo","MF",23],
  ["AFC","Qatar","Akram Afif","FW",10],
  ["AFC","Qatar","Almoez Ali","FW",19],
  ["AFC","Qatar","Hassan Al-Haydos","FW",11],

  // --- CAF ---
  ["CAF","Morocco","Yassine Bounou","GK",1],
  ["CAF","Morocco","Achraf Hakimi","DF",2],
  ["CAF","Morocco","Nayef Aguerd","DF",5],
  ["CAF","Morocco","Romain Saïss","DF",6],
  ["CAF","Morocco","Noussair Mazraoui","DF",3],
  ["CAF","Morocco","Sofyan Amrabat","MF",4],
  ["CAF","Morocco","Azzedine Ounahi","MF",8],
  ["CAF","Morocco","Hakim Ziyech","FW",7],
  ["CAF","Morocco","Sofiane Boufal","FW",17],
  ["CAF","Morocco","Youssef En-Nesyri","FW",19],
  ["CAF","Morocco","Amine Adli","FW",11],

  ["CAF","Senegal","Édouard Mendy","GK",16],
  ["CAF","Senegal","Kalidou Koulibaly","DF",3],
  ["CAF","Senegal","Abdou Diallo","DF",22],
  ["CAF","Senegal","Youssouf Sabaly","DF",21],
  ["CAF","Senegal","Ismail Jakobs","DF",14],
  ["CAF","Senegal","Idrissa Gueye","MF",5],
  ["CAF","Senegal","Pape Matar Sarr","MF",17],
  ["CAF","Senegal","Nampalys Mendy","MF",6],
  ["CAF","Senegal","Sadio Mané","FW",10],
  ["CAF","Senegal","Nicolas Jackson","FW",7],
  ["CAF","Senegal","Ismaïla Sarr","FW",18],

  // --- CONMEBOL ---
  ["CONMEBOL","Argentina","Emiliano Martínez","GK",23],
  ["CONMEBOL","Argentina","Nahuel Molina","DF",26],
  ["CONMEBOL","Argentina","Cristian Romero","DF",13],
  ["CONMEBOL","Argentina","Lisandro Martínez","DF",25],
  ["CONMEBOL","Argentina","Nicolás Tagliafico","DF",3],
  ["CONMEBOL","Argentina","Rodrigo De Paul","MF",7],
  ["CONMEBOL","Argentina","Enzo Fernández","MF",8],
  ["CONMEBOL","Argentina","Alexis Mac Allister","MF",20],
  ["CONMEBOL","Argentina","Lionel Messi","FW",10],
  ["CONMEBOL","Argentina","Julián Álvarez","FW",9],
  ["CONMEBOL","Argentina","Nicolás González","FW",15],

  ["CONMEBOL","Brazil","Alisson","GK",1],
  ["CONMEBOL","Brazil","Danilo","DF",2],
  ["CONMEBOL","Brazil","Marquinhos","DF",4],
  ["CONMEBOL","Brazil","Éder Militão","DF",3],
  ["CONMEBOL","Brazil","Guilherme Arana","DF",16],
  ["CONMEBOL","Brazil","Bruno Guimarães","MF",5],
  ["CONMEBOL","Brazil","João Gomes","MF",8],
  ["CONMEBOL","Brazil","Rodrygo","FW",10],
  ["CONMEBOL","Brazil","Vinícius Jr.","FW",7],
  ["CONMEBOL","Brazil","Endrick","FW",9],
  ["CONMEBOL","Brazil","Raphinha","FW",11],

  ["CONMEBOL","Paraguay","Carlos Coronel","GK",1],
  ["CONMEBOL","Paraguay","Robert Rojas","DF",2],
  ["CONMEBOL","Paraguay","Gustavo Gómez","DF",15],
  ["CONMEBOL","Paraguay","Omar Alderete","DF",3],
  ["CONMEBOL","Paraguay","Junior Alonso","DF",6],
  ["CONMEBOL","Paraguay","Mathías Villasanti","MF",23],
  ["CONMEBOL","Paraguay","Andrés Cubas","MF",14],
  ["CONMEBOL","Paraguay","Miguel Almirón","MF",10],
  ["CONMEBOL","Paraguay","Julio Enciso","FW",19],
  ["CONMEBOL","Paraguay","Antonio Sanabria","FW",9],
  ["CONMEBOL","Paraguay","Ramón Sosa","FW",11],

  ["CONMEBOL","Uruguay","Sergio Rochet","GK",1],
  ["CONMEBOL","Uruguay","Ronald Araújo","DF",4],
  ["CONMEBOL","Uruguay","José María Giménez","DF",2],
  ["CONMEBOL","Uruguay","Sebastián Cáceres","DF",3],
  ["CONMEBOL","Uruguay","Matías Viña","DF",17],
  ["CONMEBOL","Uruguay","Federico Valverde","MF",15],
  ["CONMEBOL","Uruguay","Manuel Ugarte","MF",5],
  ["CONMEBOL","Uruguay","Nicolás de la Cruz","MF",7],
  ["CONMEBOL","Uruguay","Darwin Núñez","FW",9],
  ["CONMEBOL","Uruguay","Luis Suárez","FW",21],
  ["CONMEBOL","Uruguay","Facundo Pellistri","FW",11],

  ["CONMEBOL","Ecuador","Hernán Galíndez","GK",1],
  ["CONMEBOL","Ecuador","Ángelo Preciado","DF",17],
  ["CONMEBOL","Ecuador","Félix Torres","DF",2],
  ["CONMEBOL","Ecuador","Piero Hincapié","DF",3],
  ["CONMEBOL","Ecuador","Pervis Estupiñán","DF",7],
  ["CONMEBOL","Ecuador","Moisés Caicedo","MF",23],
  ["CONMEBOL","Ecuador","Alan Franco","MF",21],
  ["CONMEBOL","Ecuador","Kendry Páez","MF",10],
  ["CONMEBOL","Ecuador","Enner Valencia","FW",13],
  ["CONMEBOL","Ecuador","Gonzalo Plata","FW",19],
  ["CONMEBOL","Ecuador","Kevin Rodríguez","FW",11],

  ["CONMEBOL","Colombia","Camilo Vargas","GK",1],
  ["CONMEBOL","Colombia","Daniel Muñoz","DF",21],
  ["CONMEBOL","Colombia","Dávinson Sánchez","DF",23],
  ["CONMEBOL","Colombia","Yerry Mina","DF",13],
  ["CONMEBOL","Colombia","Johan Mojica","DF",17],
  ["CONMEBOL","Colombia","Wilmar Barrios","MF",5],
  ["CONMEBOL","Colombia","Jefferson Lerma","MF",16],
  ["CONMEBOL","Colombia","James Rodríguez","MF",10],
  ["CONMEBOL","Colombia","Luis Díaz","FW",7],
  ["CONMEBOL","Colombia","Rafael Borré","FW",19],
  ["CONMEBOL","Colombia","Jhon Arias","FW",11],

  // --- UEFA ---
  ["UEFA","France","Mike Maignan","GK",16],
  ["UEFA","France","Jules Koundé","DF",5],
  ["UEFA","France","Dayot Upamecano","DF",4],
  ["UEFA","France","Ibrahima Konaté","DF",15],
  ["UEFA","France","Theo Hernández","DF",22],
  ["UEFA","France","Aurélien Tchouaméni","MF",8],
  ["UEFA","France","Eduardo Camavinga","MF",13],
  ["UEFA","France","Antoine Griezmann","FW",7],
  ["UEFA","France","Ousmane Dembélé","FW",11],
  ["UEFA","France","Marcus Thuram","FW",9],
  ["UEFA","France","Kylian Mbappé","FW",10],

  ["UEFA","England","Jordan Pickford","GK",1],
  ["UEFA","England","Kyle Walker","DF",2],
  ["UEFA","England","John Stones","DF",5],
  ["UEFA","England","Marc Guéhi","DF",6],
  ["UEFA","England","Luke Shaw","DF",3],
  ["UEFA","England","Declan Rice","MF",4],
  ["UEFA","England","Jude Bellingham","MF",10],
  ["UEFA","England","Phil Foden","FW",11],
  ["UEFA","England","Bukayo Saka","FW",7],
  ["UEFA","England","Harry Kane","FW",9],
  ["UEFA","England","Marcus Rashford","FW",19],
   
  ["UEFA","Germany","Manuel Neuer","GK",1],
  ["UEFA","Germany","Joshua Kimmich","DF",6],
  ["UEFA","Germany","Antonio Rüdiger","DF",2],
  ["UEFA","Germany","Nico Schlotterbeck","DF",4],
  ["UEFA","Germany","David Raum","DF",3],
  ["UEFA","Germany","Ilkay Gündogan","MF",21],
  ["UEFA","Germany","Leon Goretzka","MF",8],
  ["UEFA","Germany","Jamal Musiala","MF",10],
  ["UEFA","Germany","Leroy Sané","FW",19],
  ["UEFA","Germany","Niclas Füllkrug","FW",9],
  ["UEFA","Germany","Florian Wirtz","FW",7],

  ["UEFA","Netherlands","Bart Verbruggen","GK",1],
  ["UEFA","Netherlands","Denzel Dumfries","DF",22],
  ["UEFA","Netherlands","Virgil van Dijk","DF",4],
  ["UEFA","Netherlands","Matthijs de Ligt","DF",3],
  ["UEFA","Netherlands","Nathan Aké","DF",5],
  ["UEFA","Netherlands","Frenkie de Jong","MF",21],
  ["UEFA","Netherlands","Teun Koopmeiners","MF",14],
  ["UEFA","Netherlands","Xavi Simons","MF",7],
  ["UEFA","Netherlands","Cody Gakpo","FW",8],
  ["UEFA","Netherlands","Memphis Depay","FW",10],
  ["UEFA","Netherlands","Donyell Malen","FW",18],

  ["UEFA","Norway","Ørjan Nyland","GK",1],
  ["UEFA","Norway","Julian Ryerson","DF",14],
  ["UEFA","Norway","Stefan Strandberg","DF",5],
  ["UEFA","Norway","Leo Østigård","DF",4],
  ["UEFA","Norway","Birger Meling","DF",3],
  ["UEFA","Norway","Martin Ødegaard","MF",10],
  ["UEFA","Norway","Sander Berge","MF",8],
  ["UEFA","Norway","Patrick Berg","MF",6],
  ["UEFA","Norway","Erling Haaland","FW",9],
  ["UEFA","Norway","Alexander Sørloth","FW",7],
  ["UEFA","Norway","Mohamed Elyounoussi","FW",11],

  ["UEFA","Portugal","Diogo Costa","GK",1],
  ["UEFA","Portugal","João Cancelo","DF",20],
  ["UEFA","Portugal","Rúben Dias","DF",3],
  ["UEFA","Portugal","Pepe","DF",4],
  ["UEFA","Portugal","Nuno Mendes","DF",19],
  ["UEFA","Portugal","Bruno Fernandes","MF",8],
  ["UEFA","Portugal","Bernardo Silva","MF",10],
  ["UEFA","Portugal","João Palhinha","MF",6],
  ["UEFA","Portugal","Cristiano Ronaldo","FW",7],
  ["UEFA","Portugal","Rafael Leão","FW",17],
  ["UEFA","Portugal","Gonçalo Ramos","FW",9],

  ["UEFA","Scotland","Angus Gunn","GK",1],
  ["UEFA","Scotland","Aaron Hickey","DF",2],
  ["UEFA","Scotland","Grant Hanley","DF",5],
  ["UEFA","Scotland","Kieran Tierney","DF",3],
  ["UEFA","Scotland","Andrew Robertson","DF",11],
  ["UEFA","Scotland","Scott McTominay","MF",4],
  ["UEFA","Scotland","Billy Gilmour","MF",8],
  ["UEFA","Scotland","John McGinn","MF",7],
  ["UEFA","Scotland","Ryan Christie","FW",10],
  ["UEFA","Scotland","Ché Adams","FW",9],
  ["UEFA","Scotland","Lyndon Dykes","FW",14],

  ["UEFA","Spain","Unai Simón","GK",23],
  ["UEFA","Spain","Dani Carvajal","DF",2],
  ["UEFA","Spain","Rodri","DF",16],
  ["UEFA","Spain","Aymeric Laporte","DF",14],
  ["UEFA","Spain","Alejandro Balde","DF",3],
  ["UEFA","Spain","Pedri","MF",8],
  ["UEFA","Spain","Gavi","MF",9],
  ["UEFA","Spain","Fabián Ruiz","MF",10],
  ["UEFA","Spain","Lamine Yamal","FW",19],
  ["UEFA","Spain","Álvaro Morata","FW",7],
  ["UEFA","Spain","Nico Williams","FW",11],

  ["UEFA","Switzerland","Yann Sommer","GK",1],
  ["UEFA","Switzerland","Silvan Widmer","DF",3],
  ["UEFA","Switzerland","Manuel Akanji","DF",5],
  ["UEFA","Switzerland","Nico Elvedi","DF",4],
  ["UEFA","Switzerland","Ricardo Rodríguez","DF",13],
  ["UEFA","Switzerland","Granit Xhaka","MF",10],
  ["UEFA","Switzerland","Remo Freuler","MF",8],
  ["UEFA","Switzerland","Denis Zakaria","MF",6],
  ["UEFA","Switzerland","Xherdan Shaqiri","FW",23],
  ["UEFA","Switzerland","Breel Embolo","FW",7],
  ["UEFA","Switzerland","Ruben Vargas","FW",17],

  ["UEFA","Belgium","Koen Casteels","GK",1],
  ["UEFA","Belgium","Timothy Castagne","DF",21],
  ["UEFA","Belgium","Jan Vertonghen","DF",5],
  ["UEFA","Belgium","Wout Faes","DF",4],
  ["UEFA","Belgium","Arthur Theate","DF",3],
  ["UEFA","Belgium","Kevin De Bruyne","MF",7],
  ["UEFA","Belgium","Amadou Onana","MF",24],
  ["UEFA","Belgium","Youri Tielemans","MF",8],
  ["UEFA","Belgium","Jérémy Doku","FW",22],
  ["UEFA","Belgium","Romelu Lukaku","FW",9],
  ["UEFA","Belgium","Leandro Trossard","FW",11],

  ["UEFA","Croatia","Dominik Livaković","GK",1],
  ["UEFA","Croatia","Josip Juranović","DF",22],
  ["UEFA","Croatia","Joško Gvardiol","DF",4],
  ["UEFA","Croatia","Domagoj Vida","DF",21],
  ["UEFA","Croatia","Borna Sosa","DF",19],
  ["UEFA","Croatia","Luka Modrić","MF",10],
  ["UEFA","Croatia","Marcelo Brozović","MF",11],
  ["UEFA","Croatia","Mateo Kovačić","MF",8],
  ["UEFA","Croatia","Ivan Perišić","FW",14],
  ["UEFA","Croatia","Andrej Kramarić","FW",9],
  ["UEFA","Croatia","Bruno Petković","FW",16],
];

// ------------------------------
// SEED SCRIPT
// ------------------------------


  // ------------------------------
  // 1. Create Users
  // ------------------------------
  const users = await prisma.user.createMany({
    data: [
       { email: "andrea@example.com", password: await bcrypt.hash("admin123", 10), role: "ADMIN" },
       { email: "jimmy@example.com", password: await bcrypt.hash("password1", 10), role: "USER" },
       { email: "atlas@example.com", password: await bcrypt.hash("password2", 10), role: "USER" },
       { email: "bolt@example.com", password: await bcrypt.hash("password3", 10), role: "USER" }
    ],
    skipDuplicates: true
  });

  // ------------------------------
  // 2. Create Teams + Players
  // ------------------------------
  const teamsMap = {};

   for (const [conf, teamName, playerName, pos, num] of data) {
  if (!teamsMap[teamName]) {
    teamsMap[teamName] = {
      confederation: conf,
      players: []
    };
  }
  teamsMap[teamName].players.push({ playerName, pos, num });
}

const teamIds = {};

for (const teamName of Object.keys(teamsMap)) {
  const teamData = teamsMap[teamName];

  // ⭐ 1. Check if team exists
  let team = await prisma.team.findUnique({
    where: { name: teamName }
  });

  // ⭐ 2. Create only if missing
  if (!team) {
    team = await prisma.team.create({
      data: {
        name: teamName,
        confederation: teamData.confederation
      }
    });
  }

  teamIds[teamName] = team.id;

  // ⭐ 3. Seed players without duplicates
  for (const p of teamData.players) {
    const existingPlayer = await prisma.player.findFirst({
      where: {
        name: p.playerName,
        teamId: team.id
      }
    });

    if (!existingPlayer) {
      await prisma.player.create({
        data: {
          name: p.playerName,
          position: p.pos,
          number: p.num,
          teamId: team.id
        }
      });
    }
  }
}

  // ------------------------------
  // 3. Create Matches
  // ------------------------------
  const matches = [
    // ---- Finished Round of 32 ----
    {
      team1: "United States",
      team2: "Japan",
      g1: 2,
      g2: 1,
      round: "ROUND_OF_32",
      date: "2026-06-20T18:00:00Z"
    },
    {
      team1: "Brazil",
      team2: "Canada",
      g1: 3,
      g2: 0,
      round: "ROUND_OF_32",
      date: "2026-06-20T21:00:00Z"
    },
    {
      team1: "France",
      team2: "Senegal",
      g1: 1,
      g2: 0,
      round: "ROUND_OF_32",
      date: "2026-06-21T18:00:00Z"
    },
    {
      team1: "Argentina",
      team2: "Netherlands",
      g1: 2,
      g2: 2,
      round: "ROUND_OF_32",
      date: "2026-06-21T21:00:00Z"
    },

    // ---- Upcoming Round of 16 ----
    {
      team1: "United States",
      team2: "Brazil",
      g1: null,
      g2: null,
      round: "ROUND_OF_16",
      date: "2026-06-25T18:00:00Z"
    },
    {
      team1: "France",
      team2: "Argentina",
      g1: null,
      g2: null,
      round: "ROUND_OF_16",
      date: "2026-06-25T21:00:00Z"
    },
    {
      team1: "Japan",
      team2: "Senegal",
      g1: null,
      g2: null,
      round: "ROUND_OF_16",
      date: "2026-06-26T18:00:00Z"
    },
    {
      team1: "Canada",
      team2: "Netherlands",
      g1: null,
      g2: null,
      round: "ROUND_OF_16",
      date: "2026-06-26T21:00:00Z"
    }
  ];

  for (const m of matches) {
    await prisma.match.create({
      data: {
        team1Id: teamIds[m.team1],
        team2Id: teamIds[m.team2],
        team1Name: m.team1,
        team2Name: m.team2,
        team1Goals: m.g1,
        team2Goals: m.g2,
        matchDate: m.date,
        round: m.round
      }
    });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
