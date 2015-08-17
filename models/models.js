var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importar definición de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // exportar tabla Quiz
// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({ pregunta: 'Capital de Italia',
      	            respuesta: 'Roma',
                    tema: 'Geografía'
      	         });
     Quiz.create({ pregunta: 'Capital de Portugal',
     	             respuesta: 'Lisboa',
                   tema: 'Geografía'
     	         });
     Quiz.create({ pregunta: 'Escritor de "La Iliada"',
                   respuesta: 'Homero',
                   tema: 'Humanidades'
               })
        Quiz.create({ pregunta: 'Escritor de "La Celestina"',
                    respuesta: 'Fernando de Rojas',
                    tema: 'Humanidades'
        })
        Quiz.create({ pregunta: 'Escritor de "Tiempo Anclado"',
                    respuesta: 'Julián Escobar',
                    tema: 'Humanidades'
        })
        Quiz.create({ pregunta: 'Escritor de "Hamsel y Gretel"',
                    respuesta: 'Hnos Green',
                        tema: 'Humanidades'
        })
        Quiz.create({ pregunta: 'Escritor de "Zipi y Zape"',
            respuesta: 'Escobar',
            tema: 'Ocio'
        })
        Quiz.create({ pregunta: 'Pioneros en televisión',
            respuesta: 'TVE',
            tema: 'Humanidades'
        })
      .then(function(){console.log('Base de datos arrancada')});
    };
  });
});
