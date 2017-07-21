import filestack from 'filestack-js';
import axios from 'axios';



const fileStackHelper = () => {
  const api = axios,
        url = '/auth/filestack/credential';

  return new Promise((resolve, reject) =>{
    let apikey, savedPolicy, signature, clientInit;

    api.get(url).then(response => {
      let clientInstance;
      apikey      = response.data.apikey;
      savedPolicy = response.data.policy;
      signature   = response.data.signature;

      clientInit = filestack.init(apikey);
      clientInit.setSecurity({policy: savedPolicy, signature: signature});
      clientInstance = fileName =>{
        return clientInit.pick({
          maxFiles: 1,
          fromSources: ['local_file_system'/*, 'facebook'*/],
          onFileSelected(file) {
            file.name = fileName;
            return file;
          }
        });
      };

      clientInstance ? resolve(clientInstance) : reject('fail on connect filestack');
    });
  });
};


export default fileStackHelper;

/*
client.pick({
  maxFiles: 1,
  fromSources: ['local_file_system' /!*, 'facebook' *!/],
  onFileSelected(file) {
    file.name = fileName;
    return file;
  }
});
*/
