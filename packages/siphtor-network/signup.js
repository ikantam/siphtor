const axios = require('axios');
const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

'use strict';

(async function init() {
  const composerClient = require('composer-client');
  const uuid = require("uuid");
  const cardname = 'admin@siphtor-network';
  const namespace = 'com.siphtor.network';
  // const host = 'http://localhost:3001';

  const connection = new composerClient.BusinessNetworkConnection();
  try {
    const definition = await connection.connect(cardname);
    const factory = await definition.getFactory();
    console.log(`Version: ${definition.getVersion()}`);

    const login = "1111";
    const password = "1111";
    const userId = "13";

    let userRegistry = await connection.getParticipantRegistry(`${namespace}.User`);

    async function createUser(data) {
      let user = factory.newResource(namespace, 'User', data.userId);
      user.timestamp = new Date();

      const info = factory.newConcept(namespace, 'UserInfo')
      info.firstName = data.firstName
      info.lastName = data.lastName
      user.info = info

      let credentials = factory.newConcept(namespace, 'UserCredentials')
      credentials.login = data.login
      credentials.password = data.password
      credentials.tfaSecret = ''
      user.credentials = credentials

      return await userRegistry.add(user);
    }

    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    });

    function getFirstName() {
      const a = [
        "Adney", "Aldo", "Aleyn", "Alford",
        "Amherst", "Angel", "Anson", "Addison",
        "Alivia", "Allaya", "Amarie", "Amaris"
      ]
      return a[Math.floor(Math.random() * a.length)];
    }

    function getLastName() {
      const a = [
        "Barefoot", "Bareford", "Bares",
        "Barfield", "Barfield", "Barge",
        "Barham", "Bark", "Barraclough",
        "Barrand", "Barras", "Barratt",
        "Barrell", "Barrell"
      ]
      return a[Math.floor(Math.random() * a.length)];
    }

    await userRegistry.remove(await userRegistry.get('13'));

    await createUser({
      userId: userId || nanoid(),
      firstName: getFirstName(),
      lastName: getLastName(),
      sph: 100,
      usd: 100,
      login: login,
      password: hashedPassword
    });


  } catch (error) {
    console.log(error);
  } finally {
    await connection.disconnect();
  }
})();

