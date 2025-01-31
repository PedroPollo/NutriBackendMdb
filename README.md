# NutriPoblacional

NutriPoblacional es un proyecto diseñado para la unidad academica de nutricion de la Univesidad Autonoma de Zacatecas (UAZ).

## Tecnologías utilizadas

- **Node.js**: v22.11.0  
- **MongoDB**: v8.0.4  
- **Git**: Control de versiones para la gestión del código fuente.

## Crea una base de datos Mongo
1. Una vez instalado, inicia el servicio de Mongo:
    ```bash
    mongod

2. Abre una termianl de Mongo:
    ```bash
    mongo

3. Crea una base de datos llamada nutri ejecutando el siguiente comando en la terminal de Mongo:
    ```bash
    use nutri
    db.createCollection("encuestas")

## Instrucciones de despliegue

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/PedroPollo/NutriBackendMdb.git

2. Accede a la carpeta del proyecto:
    ```bash
   cd NutriBackendMdb

3. Instala los paquetes del proyecto:
    ```bash
    npm install

4. Configura las variables de entorno:
    Crea un archivo ``` .env``` en la raiz del proyecto con los siguientes valores:
    ```
    PORT = <Puerto en el que alojara la pagina web y la API>
    MONGODB = <URL de la base datos>/nutri
    ````
    Si la base datos esta en el mismo servidor se suele usar el siguiente dato:
    ````
    PORT = <Puerto en el que alojara la pagina web y la API>
    MONGODB = mongodb://localhost:27017/nutri
    ````


5. Ejecuta el servidor:
    ```bash
    npm run dev

## Requisitos previos
- Node.js: v22.11.0
- MongoDB: v8.0.4
- Git: Ultima version disponible

## Contacto
Si tienes preguntas o necesitas soporte, puedes contactarnosa través de pedroaguila4322@gmail.com