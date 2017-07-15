import filestack from 'filestack-js';

const fileStackHelper = () => {
	const apikey = 'AHagxYg4Rlyjx7vN81omgz';
	const signature = '0692ca39d7e0cac079832e78b9da12d26d1dbe90d1d674425eb3aba94a8abbb6';
	const client = filestack.init(apikey);
	const Policy = {
		expiry: 1359391107,
		call: '',
		handle: apikey
	};

	return {
		saveImage: (fileName) => {
			let savePolicy = Policy.call = 'write';

			client.setSecurity({ policy: savePolicy, signature: signature });

			return client.pick({
				maxFiles: 1,
				fromSources: ['local_file_system', 'facebook'],
				onFileSelected(file) {
					file.name = fileName;
					return file;
				}
			});
		},

		getImage: (handler) => {
			let getPolicy = Policy.call = 'read';

			client.getSecurity(getPolicy);

			return client.retrieve(handler);
		},

		removeImage: () => {},
	}

};

export default fileStackHelper;
